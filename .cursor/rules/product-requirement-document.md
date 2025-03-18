# Requisitos do MVP

## Visão Geral
Sistema de agendamento com foco em três funcionalidades principais:
1. Criação de agendas por administradores
2. Visualização de agendamentos por gestores e profissionais
3. Agendamento via URL pública por clientes finais

## Usuários do Sistema
- **Administrador**: Cria agendas e as vincula a gestores
- **Gestor**: Visualiza e gerencia agendamentos vinculados a ele
- **Profissional**: Visualiza agendamentos e marca presença/ausência
- **Cliente Final**: Realiza agendamentos via URL pública (sem login)

## Requisitos Essenciais

### Criação de Agendas
- Administrador cria agendas vinculadas a gestores específicos
- Configuração básica de horários disponíveis
- Geração de URL pública para cada agenda

### Visualização de Agendamentos
- Interface simples de lista para gestores e profissionais
- Diferenciação de permissões entre gestor e profissional
- Funcionalidade de marcar presença/ausência (profissional)

### Agendamento por Clientes
- Acesso via URL pública sem necessidade de login
- Seleção de horários disponíveis
- Formulário simplificado de informações (nome, email)
- Confirmação por email

### Notificações por Email
- Email de confirmação ao agendar
- Email de cancelamento

## Interface de Usuário Simplificada
- Foco em funcionalidade, não em design elaborado
- Tela principal centrada na visualização dos agendamentos
- Formato de lista para visualização rápida

## Restrições Técnicas
- Desenvolvimento em Next.js
- Banco de dados PostgreSQL via Prisma + Supabase
- Autenticação Next Auth js
- Envio de emails via Resend