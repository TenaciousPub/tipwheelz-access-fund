-- Remove the public SELECT policy that exposes donor emails
DROP POLICY IF EXISTS "Public can view completed tips for wall of thanks" ON public.tips;

-- Create a secure view that excludes sensitive donor information
CREATE OR REPLACE VIEW public.public_tips AS
SELECT 
  id,
  amount,
  created_at,
  donor_name,
  tier_label,
  message,
  tip_type,
  payment_status
FROM public.tips
WHERE payment_status = 'completed';

-- Grant SELECT access to the view for anonymous users
GRANT SELECT ON public.public_tips TO anon;
GRANT SELECT ON public.public_tips TO authenticated;