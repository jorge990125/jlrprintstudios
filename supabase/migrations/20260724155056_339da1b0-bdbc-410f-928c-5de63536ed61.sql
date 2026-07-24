DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

CREATE POLICY "Anyone can create orders" ON public.orders
  FOR INSERT TO anon
  WITH CHECK (status = 'pending');