-- =========================================================================
-- PLATAFORMA PREMIUM PARA SALÕES DE BELEZA - SEED DATA INICIAL
-- Copie todo este arquivo e rode no seu Supabase > SQL Editor
-- =========================================================================

-- 1. Criar o Salão "Maison Privé"
INSERT INTO public.salons (id, name, description, address, phone, saas_plan)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 
    'Maison Privé', 
    'Seu espaço premium em São Paulo. Especialistas em mechas balayage, coloração avançada e cuidados de alto padrão.', 
    'Jardins, SP', 
    '+5511999999999', 
    'Premium'
) ON CONFLICT (id) DO NOTHING;

-- 2. Serviços (Menu)
INSERT INTO public.services (id, salon_id, name, description, price, duration_minutes)
VALUES 
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Balayage & Coloração', 'Técnica francesa de iluminação degradê personalizada.', 290.00, 120),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Corte Premium', 'Corte visagista com lavagem e relaxamento.', 150.00, 60),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380d44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Manicure Gel (Alongamento)', 'Proteção e brilho duradouro para as unhas.', 110.00, 60)
ON CONFLICT (id) DO NOTHING;

-- 3. Profissionais Especialistas
INSERT INTO public.professionals (id, salon_id, name, role_title, avatar_url)
VALUES 
('e1aebc99-9c0b-4ef8-bb6d-6bb9bd380e55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Mariana Luz', 'Especialista Ouro', 'Mariana Luz'),
('e2aebc99-9c0b-4ef8-bb6d-6bb9bd380f66', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Camila P.', 'Especialista Prata', 'Camila P.')
ON CONFLICT (id) DO NOTHING;
