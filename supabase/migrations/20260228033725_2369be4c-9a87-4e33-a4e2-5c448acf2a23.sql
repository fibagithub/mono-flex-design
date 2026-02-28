
-- Drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Also fix the other tables while we're at it
DROP POLICY IF EXISTS "Anyone can view active services" ON public.services;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;

CREATE POLICY "Anyone can view active services"
ON public.services
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can view active team members" ON public.team_members;
DROP POLICY IF EXISTS "Admins can manage team members" ON public.team_members;

CREATE POLICY "Anyone can view active team members"
ON public.team_members
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage team members"
ON public.team_members
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can view active partners" ON public.partners;
DROP POLICY IF EXISTS "Admins can manage partners" ON public.partners;

CREATE POLICY "Anyone can view active partners"
ON public.partners
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage partners"
ON public.partners
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
