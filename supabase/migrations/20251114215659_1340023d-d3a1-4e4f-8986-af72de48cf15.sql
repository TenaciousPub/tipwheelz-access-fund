-- Recreate the public_tips view as SECURITY DEFINER to allow public access
-- This is safe because the view only exposes non-sensitive fields
DROP VIEW IF EXISTS public.public_tips;

CREATE VIEW public.public_tips
WITH (security_invoker = false) AS
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

-- Grant SELECT to anonymous and authenticated users
GRANT SELECT ON public.public_tips TO anon;
GRANT SELECT ON public.public_tips TO authenticated;

-- Add a comment explaining why this view is SECURITY DEFINER
COMMENT ON VIEW public.public_tips IS 
'Public view of completed tips. Uses SECURITY DEFINER to bypass RLS on tips table, but only exposes non-sensitive fields (excludes donor_email, payment_reference, payment_provider). Safe for public access.';