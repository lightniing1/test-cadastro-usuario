INSERT INTO users (id, name, email, password, created_at) VALUES
('a3d37890-799c-4c07-8432-8232c09d359b', 'Test', 'test@test.com', '$2a$10$YTKUmDray96Ma7j80owmLO6773qZni6o2f8RycvcznpmQzwT6DQUK', '2025-09-04 01:32:59.580')
ON CONFLICT (id) DO NOTHING;