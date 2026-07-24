CREATE POLICY "Anon uploads to order-files" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'order-files');