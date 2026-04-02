# Documento de Planejamento (PRD) - Plataforma Premium para Salões

Este documento consolida os requisitos para o site/aplicativo de salão feminino e barbearia, definindo a arquitetura do sistema e as próximas etapas de desenvolvimento.

## User Review Required

> [!IMPORTANT]
> - **Fluxo de Agendamento (Wizard):** Confirme se deseja seguir com a substituição de botões soltos por um fluxo passo a passo linear (Serviço -> Profissional -> Data/Hora).
> - **Login Simples:** Confirme se o login de cliente será focado no Número de Telefone (sem senha/com código OTP ou WhatsApp) para reduzir o atrito e aumentar conversões.
> - **Supabase Pessoal:** Vi que já existe um projeto base exportado (Vite + React com Tailwind). Precisaremos inicializar e conectar os dados deste app ao seu banco de dados Supabase pessoal para ter controle total (como você havia mencionado nas conversas anteriores). Confirma essa abordagem?

## Proposed Changes

A aplicação será dividida em três níveis de acesso e perfis de usuário, construídos sobre a base React/Vite existente:

### Perfis de Usuário e Funcionalidades

#### 1. Administrador Master (Super Admin)
- Gestão global no estilo SaaS.
- **Menus:** Dashboard (salões, assinaturas ativas, faturamento da plataforma), Novo salão, Salões cadastrados, Assinaturas.
- Acesso à visão do banco de dados pela própria interface para testes ou suportes de emergência (ex: redefinir a senha de um dono de salão).

#### 2. Administrador (Dono do salão)
- Acesso total ao próprio salão usando E-mail e Senha (com recurso "Esqueci minha senha").
- **Menus:** 
  - *Agenda:* Bloquear/disponibilizar horários (almoço, médico).
  - *Profissionais:* Gerenciar equipe, fotos e especialidades.
  - *Serviços:* Configurar preços, descrições e durações (afetando o cálculo da agenda).
  - *Galeria:* Fotos e portfólio dos trabalhos.
  - *Faturamento (Opcional):* Lançamentos, gráficos e visualização de lucros. No futuro, usar IA para sugerir estratégias.
  - *Fidelidade (Opcional):* Regras configuráveis de pontuação e acompanhamento de clientes qualificados para brindes.
  - *Configurações:* Links de agendamento, endereço e customizações do salão, integração com WhatsApp.

#### 3. Cliente (Mobile-first)
- Experiência premium, acessível facilmente via link.
- **Identificação Simplificada:** Login focado no telefone, sem senha complexa.
- **Fluxo Linear de Agendamento:** Filtro intuitivo: 1. Cliente seleciona o serviço -> 2. Filtra profissionais disponíveis -> 3. Escolhe data e hora com base no tempo de duração.
- **Histórico:** Tela mostrando saldo da Fidelidade (ex: "Faltam 3 serviços para sua recompensa") e opções de reagendamento rápido ("Repetir último serviço").

### Integração Técnica
O projeto base localizado é um front-end avançado em Vite + React com TailwindCSS. As próximas etapas focarão em conectar e refinar a plataforma:

#### [NOVO/MODIFICADO] Banco de Dados & Supabase
- Conectar o projeto ao seu banco de dados **Supabase** apontando para sua estrutura de tabelas: Usuários, Perfis, Salões, Serviços e Agendamentos.

#### [MODIFICADO] Autenticação (Auth)
- Implementar fluxos apropriados: OTP via Supabase/provedor para clientes; Senha e recuperação para administradores.

#### [MODIFICADO] Experiência de Agendamento (UI/UX)
- Adequar os componentes React (Tailwind) para a interface do Flow de Agendamento (Wizard Linear), impedindo passagens falsas (ex: pular o serviço).
- Integrar os alertas e notificações (lembretes/confirmações) via links de redirecionamento ou APIs do WhatsApp usando o número do administrador.

## Verification Plan

### Automated Tests
- Criar suítes de teste de integração local caso desejado, com foco especial nas permissões do Row Level Security (RLS) do Supabase para impedir o acesso indevido (Donos de Salão visualizarem apenas sua própria filial).

### Manual Verification
- Testaremos manualmente todo o fluxo da criação da infra e aplicação:
  1. Criação do Salão de Teste pelo acesso do Administrador Master.
  2. Uso do acesso de Administrador de Salão para configurar serviços, bloqueios de agenda e funcionários.
  3. Acesso à área pública do Cliente (visualização mobile-first) simulando a seleção do serviço, preencimento de telefone e o check-out do agendamento confirmando se o mesmo aparece corretamente na visão do gestor.
