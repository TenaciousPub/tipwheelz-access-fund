
-- Drop and recreate the public_tips view with SECURITY INVOKER
DROP VIEW IF EXISTS public.public_tips;

CREATE VIEW public.public_tips 
WITH (security_invoker = true)
AS
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
WHERE payment_status = 'completed'::payment_status;

-- Grant select permission to anonymous users
GRANT SELECT ON public.public_tips TO anon;
GRANT SELECT ON public.public_tips TO authenticated;
