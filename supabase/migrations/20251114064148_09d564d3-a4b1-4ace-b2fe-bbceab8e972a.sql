-- Fix the search_path for the handle_updated_at function
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the triggers
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.tips
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.shoutouts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();