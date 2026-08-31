-- Fix handle_new_user trigger function to safely process phone numbers and prevent profile creation failure during sign up
BEGIN;

ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_phone_format;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_phone_format CHECK (phone IS NULL OR phone = '' OR phone ~ '^[0-9+()\-\s]+$');

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_phone text;
BEGIN
  v_phone := NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'phone', NEW.phone, '')), '');

  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    v_phone,
    'customer'
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone);

  RETURN NEW;
END;
$$;

COMMIT;
