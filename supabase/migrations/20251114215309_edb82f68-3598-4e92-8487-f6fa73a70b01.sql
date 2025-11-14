-- Fix the security definer view by recreating it with SECURITY INVOKER
DROP VIEW IF EXISTS public.public_tips;

CREATE VIEW public.public_tips
WITH (security_invoker = true) AS
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

-- Grant SELECT access to the view
GRANT SELECT ON public.public_tips TO anon;
GRANT SELECT ON public.public_tips TO authenticated;