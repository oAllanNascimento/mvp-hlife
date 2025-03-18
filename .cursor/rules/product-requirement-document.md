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

## Distribuição de Responsabilidades

### Paulo (Tarefas Mais Simples)
1. **Autenticação e Login** [PARCIALMENTE CONCLUÍDO]
   - [CONCLUÍDO] Implementação da tela de login
   - Integração com Next Auth js
   - Redirecionamentos e proteção de rotas

2. **Interface do Dashboard** [PARCIALMENTE CONCLUÍDO]
   - [CONCLUÍDO] Layout básico do dashboard
   - [CONCLUÍDO] Componentes de navegação
   - Estatísticas simples de agendamentos

3. **Visualização de Agendamentos** [CONCLUÍDO]
   - [CONCLUÍDO] Implementação da visualização em lista
   - [CONCLUÍDO] Filtros básicos (data, status)
   - [CONCLUÍDO] Paginação dos resultados

4. **Notificações por Email**
   - Configuração do sistema de envio de emails
   - Templates para confirmação de agendamento
   - Templates para cancelamento

5. **Testes e Documentação**
   - Testes básicos de interface
   - Documentação de uso do sistema
   - Manual do usuário

### Allan (Tarefas Mais Complexas)
1. **Modelagem do Banco de Dados** [CONCLUÍDO]
   - [CONCLUÍDO] Definição de schemas no Prisma
   - [CONCLUÍDO] Relacionamentos entre entidades
   - [CONCLUÍDO] Configuração do Supabase

2. **Criação de Agendas** [CONCLUÍDO]
   - [CONCLUÍDO] Interface de criação e edição de agendas
   - [CONCLUÍDO] Configuração avançada de disponibilidade
   - [CONCLUÍDO] Sistema de vinculação com gestores e profissionais

3. **Controle de Disponibilidade** [CONCLUÍDO - PENDENTE TESTES]
   - [CONCLUÍDO] Interface de seleção de slots de horários
   - [CONCLUÍDO] Algoritmo para cálculo de slots disponíveis
   - [CONCLUÍDO] Tratamento de conflitos de horários

4. **Sistema de Agendamento Público** [CONCLUÍDO]
   - [CONCLUÍDO] Interface do cliente para URL pública
   - [CONCLUÍDO] Sistema de seleção de horários disponíveis
   - [CONCLUÍDO] Formulário para informações do cliente

5. **Registro de Presença** [CONCLUÍDO]
   - [CONCLUÍDO] Interface para profissionais marcarem presença/ausência
   - [CONCLUÍDO] Exibição de status dos agendamentos
   - [CONCLUÍDO] Filtros de visualização

6. **Arquitetura e Segurança** [PARCIALMENTE CONCLUÍDO]
   - [CONCLUÍDO] Estrutura geral da aplicação
   - Gerenciamento de permissões
   - Proteção contra abusos no sistema público

## Cronograma de Implementação

### Fase 1: Fundação e Estrutura Base
1. **Arquitetura e Segurança** (Allan) [PARCIALMENTE CONCLUÍDO]
   - [CONCLUÍDO] Definir estrutura do projeto
   - Configurar rotas e proteções básicas
   - Estabelecer padrões de código

2. **Modelagem do Banco de Dados** (Allan) [CONCLUÍDO]
   - [CONCLUÍDO] Implementar schemas e relações
   - [CONCLUÍDO] Configurar conexão com Supabase
   - [CONCLUÍDO] Criar migrações iniciais

3. **Autenticação e Login** (Paulo) [PARCIALMENTE CONCLUÍDO]
   - [CONCLUÍDO] Implementar tela de login
   - Configurar Next Auth js
   - Testar fluxos de autenticação

### Fase 2: Interface Básica e Fluxos Principais
4. **Interface do Dashboard** (Paulo) [PARCIALMENTE CONCLUÍDO]
   - [CONCLUÍDO] Desenvolver layout base e navegação
   - [CONCLUÍDO] Implementar sidebar e menus
   - Criar componentes compartilhados

5. **Criação de Agendas** (Allan) [CONCLUÍDO]
   - [CONCLUÍDO] Desenvolver formulários de criação
   - [CONCLUÍDO] Implementar configuração de disponibilidade
   - [CONCLUÍDO] Criar interface de vinculação de usuários

6. **Visualização de Agendamentos** (Paulo) [CONCLUÍDO]
   - [CONCLUÍDO] Implementar visualização em lista
   - [CONCLUÍDO] Desenvolver filtros e buscas
   - [CONCLUÍDO] Criar paginação e ordenação

### Fase 3: Lógica de Negócio e Funcionalidades Avançadas
7. **Controle de Disponibilidade** (Allan) [CONCLUÍDO - PENDENTE TESTES]
   - [CONCLUÍDO] Interface de seleção de horários
   - [CONCLUÍDO] Implementar algoritmo de slots disponíveis
   - [CONCLUÍDO] Desenvolver regras de conflitos

8. **Sistema de Agendamento Público** (Allan) [CONCLUÍDO]
   - [CONCLUÍDO] Desenvolver interface pública
   - [CONCLUÍDO] Implementar seleção de horários
   - [CONCLUÍDO] Criar fluxo de validação de dados

9. **Notificações por Email** (Paulo)
   - Configurar serviço de emails
   - Criar templates de notificação
   - Implementar gatilhos de envio

### Fase 4: Funcionalidades Complementares e Finalização
10. **Registro de Presença** (Allan) [CONCLUÍDO]
    - [CONCLUÍDO] Implementar interface de presença/ausência
    - [CONCLUÍDO] Desenvolver visualização de status
    - [CONCLUÍDO] Criar filtros e busca

11. **Testes e Documentação** (Paulo)
    - Realizar testes de interface
    - Documentar funcionalidades
    - Criar manual do usuário

12. **Revisão Final e Lançamento** (Allan e Paulo)
    - Testar todo o sistema em conjunto
    - Corrigir bugs identificados
    - Preparar ambiente de produção

## Status do Projeto: Interface Visual Concluída, Backend Em Desenvolvimento

O projeto atualmente tem a maior parte da interface visual implementada, e a estrutura do backend foi desenvolvida, mas ainda requer testes com banco de dados real. Os seguintes componentes foram concluídos:

- Interface de login
- Dashboard básico
- Listagem de agendamentos
- Interface de criação de agendas
- Sistema de registro de presença
- Interface pública para agendamento
- [CONCLUÍDO] Modelagem do banco de dados com Prisma
- [CONCLUÍDO] Algoritmo para cálculo de disponibilidade
- [CONCLUÍDO] Tratamento de conflitos de horários
- [CONCLUÍDO] Integração com Supabase

Pendências principais:
- [ATUALIZADO] Testes de integração do backend e frontend
- Sistema de autenticação funcional (Next Auth)
- Serviço de notificações por email
- [ATUALIZADO] Integração da lógica de negócio com a interface do usuário

## Observações Importantes

Para concluir a implementação, é necessário:

1. [CONCLUÍDO] Configurar um projeto real no Supabase e atualizar as variáveis de ambiente
2. Executar as migrações e o script de seed para popular o banco de dados
3. Realizar testes de integração para validar:
   - Algoritmo de disponibilidade
   - Tratamento de conflitos de horários
   - Operações de CRUD para agendas e agendamentos
4. Integrar a interface visual existente com as APIs do backend