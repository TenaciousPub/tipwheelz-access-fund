-- Create enum for tip types
CREATE TYPE tip_type AS ENUM ('one-time', 'monthly');

-- Create enum for payment providers
CREATE TYPE payment_provider AS ENUM ('stripe', 'paypal');

-- Create enum for payment status
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Create enum for user roles
CREATE TYPE app_role AS ENUM ('admin', 'user');

-- Create tips table
CREATE TABLE public.tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_email TEXT NOT NULL,
  donor_name TEXT,
  amount NUMERIC(10,2) NOT NULL,
  tip_type tip_type NOT NULL,
  tier_label TEXT NOT NULL,
  message TEXT,
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_provider payment_provider NOT NULL,
  payment_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create shoutouts table
CREATE TABLE public.shoutouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_id UUID NOT NULL REFERENCES public.tips(id) ON DELETE CASCADE,
  featured_until TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shoutouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = $1
      AND role = 'admin'
  )
$$;

-- RLS Policies for tips
CREATE POLICY "Admins can view all tips"
  ON public.tips
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert tips"
  ON public.tips
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update tips"
  ON public.tips
  FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- RLS Policies for shoutouts
CREATE POLICY "Admins can view all shoutouts"
  ON public.shoutouts
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage shoutouts"
  ON public.shoutouts
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- RLS Policies for user_roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.tips
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.shoutouts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_tips_created_at ON public.tips(created_at DESC);
CREATE INDEX idx_tips_payment_status ON public.tips(payment_status);
CREATE INDEX idx_tips_donor_email ON public.tips(donor_email);
CREATE INDEX idx_shoutouts_status ON public.shoutouts(status);
CREATE INDEX idx_shoutouts_featured_until ON public.shoutouts(featured_until);