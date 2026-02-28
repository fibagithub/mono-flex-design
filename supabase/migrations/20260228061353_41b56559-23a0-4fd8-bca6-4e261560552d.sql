ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS name_mn text NOT NULL DEFAULT '';
ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS name_en text NOT NULL DEFAULT '';
UPDATE public.team_members SET name_mn = name, name_en = name WHERE name_mn = '' OR name_en = '';