# Guia de Solução de Problemas - Sistema de Agendamento HealthLife

Este guia oferece soluções para problemas comuns que podem ocorrer durante o uso do sistema de agendamento HealthLife.

## Problemas de Acesso

### Não consigo fazer login

**Sintomas:**
- Mensagem de erro "Credenciais inválidas"
- A página de login não avança após tentar entrar

**Possíveis causas e soluções:**

1. **Credenciais incorretas**
   - Verifique se está digitando o email correto
   - Verifique se o caps lock está ativado ao digitar a senha
   - Utilize a opção "Esqueci minha senha" para redefinir sua senha

2. **Conta desativada**
   - Entre em contato com o administrador do sistema para verificar o status da sua conta

3. **Problemas com o navegador**
   - Limpe o cache e cookies do navegador
   - Tente utilizar outro navegador
   - Verifique se o JavaScript está habilitado

### Erro "Acesso não autorizado"

**Sintomas:**
- Mensagem de erro "Acesso não autorizado" ao tentar acessar uma página
- Redirecionamento inesperado para o dashboard

**Possíveis causas e soluções:**

1. **Permissões insuficientes**
   - Verifique se você possui o nível de acesso necessário para a função desejada
   - Entre em contato com o administrador para solicitar as permissões adequadas

2. **Sessão expirada**
   - Faça logout e login novamente para renovar sua sessão

## Problemas com Agendas

### Não consigo criar uma agenda

**Sintomas:**
- Botão "Salvar" não funciona ao tentar criar uma agenda
- Mensagem de erro ao tentar salvar

**Possíveis causas e soluções:**

1. **Campos obrigatórios não preenchidos**
   - Verifique se todos os campos obrigatórios estão preenchidos
   - Campos com asterisco (*) são obrigatórios

2. **Horários inválidos**
   - Verifique se o horário de início é anterior ao horário de término
   - Garanta que os intervalos de tempo sejam logicamente válidos

3. **Gestor não selecionado**
   - É necessário vincular a agenda a pelo menos um gestor
   - Selecione um gestor válido da lista

### A agenda não aparece na lista

**Sintomas:**
- Após criar uma agenda, ela não aparece na lista de agendas

**Possíveis causas e soluções:**

1. **Filtros ativos**
   - Verifique se há filtros aplicados à lista de agendas
   - Tente limpar todos os filtros para ver todas as agendas

2. **Problemas de sincronização**
   - Atualize a página para garantir que está vendo os dados mais recentes
   - Limpe o cache do navegador se o problema persistir

## Problemas com Agendamentos

### Os horários não aparecem para seleção

**Sintomas:**
- Na tela de agendamento, não aparecem horários disponíveis
- Mensagem "Não há horários disponíveis"

**Possíveis causas e soluções:**

1. **Data incorreta ou sem disponibilidade**
   - Tente selecionar outra data
   - Verifique se a agenda possui horários configurados para o dia selecionado

2. **Horários completamente ocupados**
   - Todos os horários disponíveis para a data selecionada já foram agendados
   - Tente outra data

3. **Problema de configuração da agenda**
   - A agenda pode estar configurada incorretamente
   - Entre em contato com o administrador para verificar as configurações da agenda

### Erro ao salvar agendamento

**Sintomas:**
- Mensagem de erro ao tentar finalizar um agendamento
- A página de confirmação não é exibida

**Possíveis causas e soluções:**

1. **Conflito de horário**
   - O horário selecionado pode ter sido reservado por outro cliente enquanto você preenchia o formulário
   - Selecione outro horário disponível

2. **Dados inválidos**
   - Verifique se todos os campos obrigatórios foram preenchidos corretamente
   - Preste atenção especial ao formato do email e telefone

3. **Problemas de conexão**
   - Verifique sua conexão com a internet
   - Tente novamente após alguns instantes

### Não recebi email de confirmação

**Sintomas:**
- O agendamento foi concluído com sucesso, mas não recebeu email de confirmação

**Possíveis causas e soluções:**

1. **Email incorreto**
   - Verifique se o email foi digitado corretamente
   - Tente refazer o agendamento com o email correto

2. **Problemas com a pasta de spam**
   - Verifique sua pasta de spam/lixo eletrônico
   - Adicione o domínio do sistema à sua lista de remetentes confiáveis

3. **Atraso na entrega**
   - Alguns provedores de email podem atrasar a entrega
   - Aguarde alguns minutos e verifique novamente

## Problemas de Registro de Presença

### Não consigo marcar presença/ausência

**Sintomas:**
- Botão de "Registrar Atendimento" não funciona
- Mensagem de erro ao tentar salvar o registro

**Possíveis causas e soluções:**

1. **Permissões insuficientes**
   - Verifique se você possui as permissões necessárias (perfil de profissional)
   - Entre em contato com o administrador para ajustar suas permissões

2. **Estado inválido do agendamento**
   - O agendamento pode já ter sido marcado como atendido ou cancelado
   - Apenas agendamentos com status "Confirmado" podem ter presença registrada

3. **Data inválida**
   - Não é possível registrar presença para agendamentos futuros
   - Verifique se a data do agendamento já passou

## Problemas com Relatórios

### O relatório está vazio

**Sintomas:**
- O relatório gerado não mostra nenhum dado
- Aparece a mensagem "Nenhum resultado encontrado"

**Possíveis causas e soluções:**

1. **Filtros muito restritivos**
   - Tente ampliar o período de datas
   - Remova alguns filtros para obter mais resultados

2. **Sem dados no período selecionado**
   - Não existem dados que correspondam aos critérios selecionados
   - Selecione outro período ou critérios

### Não consigo exportar o relatório

**Sintomas:**
- Botão de exportação não funciona
- Arquivo não é baixado

**Possíveis causas e soluções:**

1. **Bloqueador de pop-ups**
   - Verifique se o navegador está bloqueando pop-ups
   - Permita pop-ups para o domínio do sistema

2. **Relatório muito grande**
   - Reduza o escopo do relatório (menos dados)
   - Divida em múltiplos relatórios menores

## Problemas Técnicos Gerais

### O sistema está lento

**Sintomas:**
- Carregamento lento das páginas
- Demora na resposta após clicar em botões

**Possíveis causas e soluções:**

1. **Conexão de internet lenta**
   - Verifique a velocidade da sua conexão
   - Tente usar uma conexão mais estável

2. **Muitas abas abertas**
   - Feche abas e programas desnecessários
   - Reinicie o navegador

3. **Cache do navegador**
   - Limpe o cache do navegador
   - Tente usar o modo anônimo/privado

### A página está com layout quebrado

**Sintomas:**
- Elementos visuais fora do lugar
- Textos sobrepostos ou cortados

**Possíveis causas e soluções:**

1. **Zoom do navegador**
   - Verifique se o zoom do navegador está em 100%
   - Use Ctrl+0 (Windows/Linux) ou Command+0 (Mac) para resetar o zoom

2. **Navegador desatualizado**
   - Atualize seu navegador para a versão mais recente
   - Tente usar outro navegador moderno (Chrome, Firefox, Edge)

3. **Resolução de tela incompatível**
   - O sistema é otimizado para resolução mínima de 1366x768
   - Ajuste a resolução da sua tela se possível

### Mensagens de erro genéricas

**Sintomas:**
- Mensagens como "Erro interno do servidor" ou "Algo deu errado"

**Possíveis causas e soluções:**

1. **Problemas temporários do servidor**
   - Aguarde alguns minutos e tente novamente
   - Atualize a página (F5)

2. **Ações específicas causando erros**
   - Tente identificar exatamente qual ação está causando o erro
   - Relate ao suporte técnico com os passos específicos para reproduzir o problema

## Contato para Suporte Técnico

Se você encontrar problemas não listados neste guia ou se as soluções propostas não resolverem seu problema, entre em contato com nossa equipe de suporte:

- **Email:** suporte@healthlife.com
- **Telefone:** (XX) XXXX-XXXX
- **Horário de atendimento:** Segunda a Sexta, das 8h às 18h

Ao entrar em contato, forneça as seguintes informações:
1. Seu nome completo e função (administrador, gestor, profissional)
2. Descrição detalhada do problema
3. Passos para reproduzir o problema
4. Capturas de tela do erro (se possível)
5. Navegador e sistema operacional que está utilizando

---

*Este guia está sujeito a atualizações. Última atualização: Julho/2024.* 