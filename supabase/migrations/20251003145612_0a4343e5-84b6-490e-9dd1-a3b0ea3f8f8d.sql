-- Drop the insecure policy that allows anyone to assign admin role
DROP POLICY IF EXISTS "Allow first admin assignment" ON public.user_roles;

-- Create a secure policy that:
-- 1. Only allows authenticated users (TO authenticated)
-- 2. Verifies the user_id matches the authenticated user (auth.uid() = user_id)
-- 3. Only allows assignment if no admin exists
CREATE POLICY "Only authenticated can assign first admin"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  (NOT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE role = 'admin'::app_role
  ))
  AND auth.uid() = user_id
);