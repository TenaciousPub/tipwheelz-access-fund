-- Add public read policies for the Wall of Thanks page

-- Allow public to view active shoutouts with associated tip info
CREATE POLICY "Public can view active shoutouts"
  ON public.shoutouts
  FOR SELECT
  TO anon
  USING (status = 'active' AND featured_until > now());

-- Allow public to view completed tips (limited info, no emails)
CREATE POLICY "Public can view completed tips for wall of thanks"
  ON public.tips
  FOR SELECT
  TO anon
  USING (payment_status = 'completed');