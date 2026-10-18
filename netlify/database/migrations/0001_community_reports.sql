CREATE TABLE IF NOT EXISTS community_reports (
  id text PRIMARY KEY NOT NULL,
  "userId" text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  photo_pathname text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS community_reports_status_idx ON community_reports (status);
CREATE INDEX IF NOT EXISTS community_reports_created_at_idx ON community_reports (created_at DESC);
