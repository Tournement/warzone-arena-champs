CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.squads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tag text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.squads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.squads TO authenticated;
GRANT ALL ON public.squads TO service_role;
ALTER TABLE public.squads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Squads are public" ON public.squads FOR SELECT USING (true);
CREATE POLICY "Admins manage squads" ON public.squads FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.squad_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  squad_id uuid NOT NULL REFERENCES public.squads(id) ON DELETE CASCADE,
  name text NOT NULL,
  is_reserve boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.squad_players TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.squad_players TO authenticated;
GRANT ALL ON public.squad_players TO service_role;
ALTER TABLE public.squad_players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Players are public" ON public.squad_players FOR SELECT USING (true);
CREATE POLICY "Admins manage players" ON public.squad_players FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.match_team_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_no int NOT NULL CHECK (match_no BETWEEN 1 AND 6),
  squad_id uuid NOT NULL REFERENCES public.squads(id) ON DELETE CASCADE,
  placement int CHECK (placement > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (match_no, squad_id)
);
GRANT SELECT ON public.match_team_entries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.match_team_entries TO authenticated;
GRANT ALL ON public.match_team_entries TO service_role;
ALTER TABLE public.match_team_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Match entries are public" ON public.match_team_entries FOR SELECT USING (true);
CREATE POLICY "Admins manage match entries" ON public.match_team_entries FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.match_player_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_no int NOT NULL CHECK (match_no BETWEEN 1 AND 6),
  player_id uuid NOT NULL REFERENCES public.squad_players(id) ON DELETE CASCADE,
  squad_id uuid NOT NULL REFERENCES public.squads(id) ON DELETE CASCADE,
  kills int NOT NULL DEFAULT 0,
  redeploys int NOT NULL DEFAULT 0,
  damage int NOT NULL DEFAULT 0,
  assists int NOT NULL DEFAULT 0,
  score int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (match_no, player_id)
);
GRANT SELECT ON public.match_player_stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.match_player_stats TO authenticated;
GRANT ALL ON public.match_player_stats TO service_role;
ALTER TABLE public.match_player_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Player stats are public" ON public.match_player_stats FOR SELECT USING (true);
CREATE POLICY "Admins manage player stats" ON public.match_player_stats FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));