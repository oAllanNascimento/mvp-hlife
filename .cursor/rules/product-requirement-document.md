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

4. **Notificações por Email** [CONCLUÍDO - PENDENTE TESTES]
   - [CONCLUÍDO] Configuração do sistema de envio de emails via Resend
   - [CONCLUÍDO] Templates para confirmação de agendamento
   - [CONCLUÍDO] API para processamento de agendamentos e envio de email
   - Email para cancelamento (não implementado nesta fase)

5. **Testes e Documentação** [PARCIALMENTE CONCLUÍDO]
   - Testes básicos de interface
   - [CONCLUÍDO] Documentação de uso do sistema
   - [CONCLUÍDO] Manual do usuário

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

4. **Sistema de Agendamento Público** [CONCLUÍDO - PENDENTE TESTES]
   - [CONCLUÍDO] Desenvolver interface pública
   - [CONCLUÍDO] Implementar seleção de horários
   - [CONCLUÍDO] Criar fluxo de validação de dados
   - [CONCLUÍDO] Integração com API para salvar agendamentos

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

8. **Sistema de Agendamento Público** (Allan) [CONCLUÍDO - PENDENTE TESTES]
   - [CONCLUÍDO] Desenvolver interface pública
   - [CONCLUÍDO] Implementar seleção de horários
   - [CONCLUÍDO] Criar fluxo de validação de dados
   - [CONCLUÍDO] Integração com API para salvar agendamentos

9. **Notificações por Email** (Paulo) [CONCLUÍDO - PENDENTE TESTES]
   - [CONCLUÍDO] Configurar serviço de emails (Resend)
   - [CONCLUÍDO] Criar templates de notificação para confirmação
   - [CONCLUÍDO] Implementar gatilhos de envio de email
   - Implementar cancelamento de agendamento (pendente)

### Fase 4: Funcionalidades Complementares e Finalização
10. **Registro de Presença** (Allan) [CONCLUÍDO]
    - [CONCLUÍDO] Implementar interface de presença/ausência
    - [CONCLUÍDO] Desenvolver visualização de status
    - [CONCLUÍDO] Criar filtros e busca

11. **Testes e Documentação** (Paulo) [PARCIALMENTE CONCLUÍDO]
    - Realizar testes de interface
    - [CONCLUÍDO] Documentar funcionalidades
    - [CONCLUÍDO] Criar manual do usuário

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
- [CONCLUÍDO] Sistema de notificações por email (confirmação de agendamento)
- [CONCLUÍDO] API de processamento de agendamentos
- [CONCLUÍDO] Documentação completa do sistema (manual do usuário, guias rápidos, guia visual e solução de problemas)

Pendências principais:
- [PENDENTE] Testes de integração do backend e frontend
- [PENDENTE] Testes do sistema de confirmação por email
- [PENDENTE] Testes do fluxo completo de agendamento público
- Sistema de autenticação funcional (Next Auth)
- Email de cancelamento de agendamento
- [ATUALIZADO] Integração da lógica de negócio com a interface do usuário

## Observações Importantes

Para concluir a implementação, é necessário:

1. [CONCLUÍDO] Configurar um projeto real no Supabase e atualizar as variáveis de ambiente
2. Executar as migrações e o script de seed para popular o banco de dados
3. Realizar testes de integração para validar:
   - Algoritmo de disponibilidade
   - Tratamento de conflitos de horários
   - Operações de CRUD para agendas e agendamentos
   - [PENDENTE] Sistema de confirmação por email
   - [PENDENTE] API de processamento de agendamentos
4. Integrar a interface visual existente com as APIs do backend