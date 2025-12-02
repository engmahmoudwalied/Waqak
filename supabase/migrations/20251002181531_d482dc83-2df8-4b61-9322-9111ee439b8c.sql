-- Fix critical RLS issue: Allow admin role assignment during signup
-- This policy allows inserting the first admin role only when no admins exist
CREATE POLICY "Allow first admin assignment"
ON public.user_roles
FOR INSERT
WITH CHECK (
  -- Only allow if no admin exists yet
  NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  )
);