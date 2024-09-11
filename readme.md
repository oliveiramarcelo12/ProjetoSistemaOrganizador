# Escopo do Projeto: Sistema Organizador Financeiro para Hamon Corp

## 1. Objetivo Geral
Desenvolver um sistema organizador financeiro para Hamon Corp, permitindo que colaboradores gerenciem de forma segura e eficiente seus ganhos e despesas. O sistema permitirá controle financeiro personalizado, oferecendo funcionalidades como registro de transações, categorização de despesas e receitas, além de relatórios detalhados para apoio na tomada de decisões.

## 2. Objetivos Específicos
- Implementar login individual para garantir que cada usuário tenha acesso apenas aos seus próprios dados financeiros.
- Fornecer uma interface para registro de transações de ganhos e despesas.
- Permitir a categorização de transações (ex.: alimentação, transporte, salário).
- Gerar relatórios detalhados para acompanhamento financeiro por período, categoria e total de transações.
- Oferecer uma visualização gráfica das despesas e receitas ao longo do tempo.
- Assegurar a segurança dos dados financeiros utilizando autenticação JWT e criptografia de senhas.

## Requisitos Funcionais
- **Autenticação e Autorização**:
  - O sistema deve permitir o login e cadastro de usuários, garantindo que cada colaborador veja apenas suas transações.
  - Utilização de JWT para autenticação segura e persistente.
- **Gestão de Transações**:
  - Inserir, editar e excluir transações financeiras.
  - Classificação de transações como “Despesa” ou “Receita”.
  - Categorização de transações por categorias customizáveis.
- **Relatórios e Visualizações**:
  - Relatórios mensais e anuais com totais por categoria.
  - Gráficos de receitas e despesas ao longo do tempo.
  - Filtros para visualizar transações por período e categoria.
- **Notificações**
  - Alertas sobre datas de vencimento ou quando o saldo atinge um limite predefinido.

1. **Alertas sobre Datas de Vencimento**: O sistema deve enviar notificações quando uma data de vencimento se aproximar.
2. **Alertas de Saldo**: O sistema deve alertar quando o saldo atingir um limite predefinido.

## Requisitos Não Funcionais

### Segurança
- **Conexão Segura com o Banco de Dados**: Utilizar TLS/SSL para garantir uma conexão segura com o banco de dados.

### Escalabilidade
- **Estrutura Modular**: Desenvolver uma arquitetura modular que permita a adição de novas funcionalidades sem comprometer o desempenho existente.

### Performance
- **Tempo de Resposta**: Assegurar que o tempo de resposta seja inferior a 2 segundos para a maioria das transações.
- **Otimização de Consultas**: Implementar otimizações nas consultas ao MongoDB para melhorar o desempenho.

### Usabilidade
- **Interface Intuitiva**: Criar uma interface que seja fácil de navegar e intuitiva para o usuário final.
- **Layout Responsivo**: Garantir que o layout seja responsivo e acessível em diferentes dispositivos, incluindo desktop e mobile.

## 2.Objetivos SMART

## 1. Específico (Specific):
Desenvolver um sistema que permita aos colaboradores da Hamon Corp registrar, categorizar e visualizar suas transações financeiras, garantindo que cada usuário tenha acesso apenas aos seus próprios dados por meio de login individual.
## 2. Mensurável (Measurable):
O sistema deverá ser capaz de registrar até 100 transações diárias por usuário, com relatórios mensais e anuais que apresentem, no mínimo, 90% de precisão na categorização de receitas e despesas.
## 3. Atingível (Achievable):
Utilizando tecnologias como Node.js, React e MongoDB, o sistema será desenvolvido em um prazo de 12 semanas, com entrega de um MVP (Produto Mínimo Viável) ao final da 8ª semana, permitindo ajustes e melhorias nas semanas subsequentes.
## 4. Relevante (Relevant):
Este sistema é fundamental para Hamon Corp, pois otimizará o gerenciamento financeiro dos colaboradores, melhorando a precisão no controle de gastos e receitas, além de facilitar a tomada de decisões financeiras estratégicas.
## 5. Temporal (Time-bound):
O sistema completo será desenvolvido e entregue em 12 semanas, com as funcionalidades principais (login, registro de transações e categorização) disponíveis no final da 8ª semana, e o módulo de relatórios finalizado até a 10ª semana.

## 3. Cronograma 

Semana 1-2: Análise de Requisitos e Prototipação do Design (UI/UX)
Semana 3-4: Configuração do ambiente de desenvolvimento, criação da estrutura do projeto (Node.js, MongoDB, React).
Semana 5-6: Implementação de autenticação e gerenciamento de usuários.
Semana 7-8: Desenvolvimento do módulo de registro de transações e categorização.
Semana 9-10: Implementação de relatórios e visualização de dados financeiros.
Semana 11: Testes de segurança e performance.
Semana 12: Entrega, feedback e ajustes finais. gerar um código para usar no plantText

## Diagrama de Gantt
![alt text](Cronograma.png)

# Análise de Riscos - Sistema Organizador Financeiro

## 1. Falha na Segurança dos Dados
- **Descrição**: Acesso indevido a dados financeiros.
- **Probabilidade**: Alta
- **Impacto**: Muito alto
- **Mitigação**: Criptografia de senhas (bcrypt), autenticação JWT, conexões HTTPS.

## 2. Perda de Dados
- **Descrição**: Perda de transações ou informações financeiras.
- **Probabilidade**: Moderada
- **Impacto**: Alto
- **Mitigação**: Backups automáticos e replicação no MongoDB.

## 4. Incompatibilidade Frontend/Backend
- **Descrição**: Problemas de integração entre React e Node.js.
- **Probabilidade**: Baixa
- **Impacto**: Moderado
- **Mitigação**: Boas práticas REST e testes de integração constantes.

## 5. Dificuldade de Uso
- **Descrição**: Sistema complicado para os colaboradores.
- **Probabilidade**: Moderada
- **Impacto**: Alto
- **Mitigação**: Interface intuitiva e treinamento.

## 6. Estouro de Prazo
- **Descrição**: Atrasos no desenvolvimento.
- **Probabilidade**: Moderada
- **Impacto**: Alto
- **Mitigação**: Cronograma claro e entregas iterativas.

## 7. Sobrecarga de Servidor
- **Descrição**: Sistema sobrecarregado com muitos usuários.
- **Probabilidade**: Baixa
- **Impacto**: Alto
- **Mitigação**: Escalabilidade e monitoramento de recursos.

## 8. Falha de Comunicação na Equipe
- **Descrição**: Retrabalho devido à má comunicação.
- **Probabilidade**: Moderada
- **Impacto**: Moderado
- **Mitigação**: Metodologias ágeis e ferramentas de colaboração.


