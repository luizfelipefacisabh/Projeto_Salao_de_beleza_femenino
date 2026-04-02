# Documento de Planejamento (PRD) - Plataforma Premium para Salões

Este documento consolida os requisitos para o site/aplicativo de salão feminino e barbearia, definindo a arquitetura do sistema e as próximas etapas de desenvolvimento.

## User Review Required

> [!IMPORTANT]
> - **Fluxo de Agendamento (Wizard):** Confirme se deseja seguir com a substituição de botões soltos por um fluxo passo a passo linear (Serviço -> Profissional -> Data/Hora).
> - **Login Simples:** Confirme se o login de cliente será focado no Número de Telefone (sem senha/com código OTP ou WhatsApp) para reduzir o atrito e aumentar conversões.
> - **Supabase Pessoal:** Onde está exatamente o projeto base exportado do Lovable? Se não houver, devemos iniciar um projeto Vite + React do zero?

## Proposed Changes

A aplicação será dividida em três níveis de acesso e perfis de usuário, construídos sobre a base React/Vite:

### Perfis de Usuário e Funcionalidades

#### 1. Administrador Master (Super Admin)
- Gestão global no estilo SaaS.
- **Menus:** Dashboard (salões, assinaturas ativas, faturamento da plataforma), Novo salão, Salões cadastrados, Assinaturas.
- Acesso à visão do banco de dados pela própria interface para testes ou suportes de emergência.

#### 2. Administrador (Dono do salão)
- Acesso total ao próprio salão usando E-mail e Senha (com recurso "Esqueci minha senha").
- **Menus:** 
  - *Agenda:* Bloquear/disponibilizar horários (almoço, médico).
  - *Profissionais:* Gerenciar equipe, fotos e especialidades.
  - *Serviços:* Configurar preços, descrições e durações.
  - *Galeria:* Fotos e portfólio dos trabalhos.
  - *Faturamento & Fidelidade.* 
  - *Configurações:* Links de agendamento, endereço e customizações.

#### 3. Cliente (Mobile-first)
- Experiência premium, acessível facilmente via link.
- **Identificação Simplificada:** Login focado no telefone.
- **Fluxo Linear de Agendamento:** Filtro intuitivo: 1. Cliente seleciona o serviço -> 2. Filtra profissionais disponíveis -> 3. Escolhe data e hora com base no tempo de duração.

### Integração Técnica

#### [NOVO] Banco de Dados & Supabase
- Conectar o projeto ao banco de dados **Supabase** apontando para sua estrutura de tabelas: Usuários, Perfis, Salões, Serviços e Agendamentos.

#### [NOVO] Autenticação (Auth)
- Implementar fluxos apropriados: OTP via Supabase/provedor para clientes; Senha e recuperação para administradores.

#### [NOVO] Experiência de Agendamento (UI/UX)
- Adequar os componentes React (Tailwind) para a interface do Flow de Agendamento (Wizard Linear), impedindo passagens falsas (ex: pular o serviço).

#### [NOVO] Assistente de Inteligência Artificial (Insights)
- **Central de Notificações Inteligentes**: Adição de um painel/pop-up de *"Push Notifications"* interagindo ativamente com o gestor do salão, comunicando novas tendências (ex: "*Unhas Cromadas em Alta! Aproveite e faça uma campanha.*").
- **Análise Financeira Ativa no Frontend**: Uma lógica JS interceptará os arrays de Receita. Se detectar retração percentual, irá renderizar sugestões estratégicas automáticas via IA simulada (ex: Pacotes Promocionais ou Retenção).
- **Back-End API (Projeção Futura)**: Previsão de integração do Supabase em Cron Jobs passando as métricas financeiras anônimas para uma API LLM (ex: OpenAI/Gemini) montar estratégias personalizadas dinâmicas.

## Verification Plan

### Automated Tests
- Criar regras RLS verificadas no Supabase.

### Manual Verification
- Testaremos manualmente todo o fluxo da criação da infra e aplicação:
  1. Criação do Salão de Teste pelo acesso do Super Admin.
  2. Uso do acesso de Administrador de Salão para configurar serviços.
  3. Acesso à área pública do Cliente para checkout e agendamento.
