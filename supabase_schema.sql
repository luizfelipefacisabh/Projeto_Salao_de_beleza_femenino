-- =========================================================================
-- PLATAFORMA PREMIUM PARA SALÕES DE BELEZA - SUPABASE SCHEMA
-- Copie todo este arquivo e cole no "SQL Editor" do seu Supabase Dashboard.
-- =========================================================================

-- Ativar extensão de uuid para chaves primárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela de SALÕES (Tenant Mestre Multi-empresa)
CREATE TABLE public.salons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    address TEXT,
    phone TEXT,
    whatsapp_greeting_text TEXT,
    saas_plan TEXT DEFAULT 'Basic', -- Basic, Premium
    saas_status TEXT DEFAULT 'active', -- active, inactive
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de PERFIS DE USUÁRIO (Administradores da Tela Gestão e Clientes Finais)
-- Nota: Aqui referenciamos o UUID do serviço de autenticação nativo do Supabase.
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY, -- Será o map da tabela auth.users.id
    role TEXT CHECK (role IN ('superadmin', 'admin', 'client')) NOT NULL DEFAULT 'client',
    salon_id UUID REFERENCES public.salons(id), -- Null se for superadmin ou cliente solto
    full_name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de PROFISSIONAIS (Cabelereiras, Manicures atreladas a um salão)
CREATE TABLE public.professionals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    avatar_url TEXT,
    status TEXT DEFAULT 'active' -- active, off
);

-- 4. Tabela de SERVIÇOS DO SALÃO (O que é vendido)
CREATE TABLE public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabela de AGENDAMENTOS (Transações e Histórico de Horários)
CREATE TABLE public.appointments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES public.profiles(id), 
    professional_id UUID REFERENCES public.professionals(id) NOT NULL,
    service_id UUID REFERENCES public.services(id) NOT NULL,
    appointment_time TIMESTAMP WITH TIME ZONE NOT NULL,
    payment_method TEXT CHECK (payment_method IN ('pix_app', 'card_app', 'local_store')),
    payment_status TEXT DEFAULT 'pending', -- pending, completed
    appointment_status TEXT DEFAULT 'scheduled', -- scheduled, in-progress, done, canceled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabela do PORTFÓLIO E GALERIA
CREATE TABLE public.portfolio_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT
);

-- =========================================================================
-- POLÍTICAS DE SEGURANÇA (RLS - ROW LEVEL SECURITY) BÁSICAS
-- =========================================================================

-- Habilitar RLS nas tabelas essenciais para que um Salão A não veja os dados do Salão B
ALTER TABLE public.salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;

-- Exemplo: Políticas (Apenas como base para iniciarmos estruturalmente)
CREATE POLICY "Serviços e Portfólios são visíveis publicamente" 
ON public.services FOR SELECT USING (true);

-- =========================================================================
-- FIM DO SCRIPT
-- Rode no seu Supabase > SQL Editor > Run!
-- =========================================================================
