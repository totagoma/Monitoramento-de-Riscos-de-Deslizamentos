# Documentação Técnica - Monitoramento de Riscos de Deslizamentos

## Visão Geral

Este documento fornece uma documentação técnica detalhada do aplicativo mobile para monitoramento de riscos de deslizamentos, desenvolvido com React Native. O aplicativo simula uma rede de sensores inteligentes para monitorar indicadores ambientais, prever riscos e emitir alertas.

## Arquitetura

### Estrutura de Diretórios

```
monitoramento-deslizamentos/
├── App.js                 # Ponto de entrada do aplicativo
├── src/
│   ├── screens/           # Telas principais
│   ├── components/        # Componentes reutilizáveis
│   ├── services/          # Serviços e lógica de negócios
│   ├── utils/             # Funções utilitárias
│   ├── assets/            # Recursos estáticos
│   └── tests/             # Testes unitários e de integração
├── package.json           # Dependências e scripts
└── README.md              # Documentação do projeto
```

### Fluxo de Navegação

O aplicativo utiliza o React Navigation para gerenciar a navegação entre telas:

1. **WelcomeScreen**: Tela inicial que permite ao usuário iniciar o monitoramento ou visualizar o histórico.
2. **InputDataScreen**: Permite a inserção de dados ambientais (umidade do solo e inclinação).
3. **RiskViewScreen**: Exibe o nível de risco calculado e gráficos dos indicadores.
4. **HistoryScreen**: Mostra o histórico de registros de monitoramento.
5. **MitigationScreen**: Apresenta ações recomendadas com base no nível de risco.

## Componentes Principais

### Telas

#### WelcomeScreen

Tela de boas-vindas que apresenta o aplicativo e fornece opções para iniciar o monitoramento ou visualizar o histórico.

```javascript
// Principais funcionalidades:
// - Apresentação do aplicativo
// - Navegação para InputDataScreen ou HistoryScreen
```

#### InputDataScreen

Interface para inserção dos dados de umidade do solo e inclinação.

```javascript
// Principais funcionalidades:
// - Campos para inserção de dados
// - Validação de entradas
// - Salvamento de dados usando MonitoringService
// - Navegação para RiskViewScreen com os dados coletados
```

#### RiskViewScreen

Exibe o nível de risco calculado, gráficos dos indicadores e alertas.

```javascript
// Principais funcionalidades:
// - Exibição do nível de risco
// - Visualização de dados em gráficos
// - Alertas para riscos elevados
// - Navegação para MitigationScreen ou InputDataScreen
```

#### HistoryScreen

Listagem dos registros anteriores com detalhes e filtros.

```javascript
// Principais funcionalidades:
// - Carregamento de registros do AsyncStorage
// - Exibição em lista com detalhes
// - Navegação para RiskViewScreen ao selecionar um registro
```

#### MitigationScreen

Sugestões de ações preventivas e corretivas com base no nível de risco.

```javascript
// Principais funcionalidades:
// - Exibição de ações recomendadas baseadas no nível de risco
// - Informações de contato para emergências
```

### Componentes Reutilizáveis

#### RiskIndicator

Componente para exibir o indicador de nível de risco.

```javascript
// Props:
// - riskLevel: Nível de risco ('baixo', 'medio', 'alto')
// - style: Estilos adicionais
```

#### AlertMessage

Componente para exibir mensagens de alerta baseadas no nível de risco.

```javascript
// Props:
// - riskLevel: Nível de risco ('baixo', 'medio', 'alto')
// - customMessage: Mensagem personalizada (opcional)
// - style: Estilos adicionais
```

#### DataDisplay

Componente para exibir dados de monitoramento.

```javascript
// Props:
// - soilMoisture: Valor da umidade do solo
// - inclination: Valor da inclinação
// - style: Estilos adicionais
```

#### ChartDisplay

Componente para exibir gráficos de linha.

```javascript
// Props:
// - title: Título do gráfico
// - data: Dados para o gráfico (opcional)
// - currentValue: Valor atual para incluir no gráfico
// - label: Rótulo para a legenda
// - color: Cor da linha
// - minValue: Valor mínimo para dados aleatórios
// - maxValue: Valor máximo para dados aleatórios
// - style: Estilos adicionais
```

## Serviços

### MonitoringService

Serviço para gerenciar as operações de monitoramento.

```javascript
// Métodos principais:
// - saveRecord(data): Salva um novo registro de monitoramento
// - getAllRecords(): Recupera todos os registros
// - getOrderedRecords(): Recupera registros ordenados por data
// - getRecordById(id): Recupera um registro específico pelo ID
// - calculateRiskLevel(moisture, inclination): Calcula o nível de risco
// - clearAllRecords(): Limpa todos os registros (para testes)
```

## Utilitários

### RiskUtils

Utilitários para cálculos e formatação relacionados a riscos.

```javascript
// Funções principais:
// - getRiskColor(risk): Obtém a cor correspondente ao nível de risco
// - getAlertMessage(risk): Obtém a mensagem de alerta para o nível de risco
// - validateInputs(moisture, inclination): Valida os valores de entrada
// - generateChartData(currentValue, min, max): Gera dados simulados para gráficos
```

## Armazenamento de Dados

O aplicativo utiliza o AsyncStorage para persistência local de dados. Os registros são armazenados como uma lista de objetos JSON:

```json
[
  {
    "id": "timestamp_ou_uuid",
    "data": "YYYY-MM-DD",
    "hora": "HH:MM:SS",
    "umidade_solo": "valor_numerico",
    "inclinacao": "valor_numerico",
    "risco": "baixo/medio/alto",
    "alerta_emitido": "true/false"
  },
  // ... outros registros
]
```

## Algoritmo de Cálculo de Risco

O aplicativo utiliza um algoritmo simplificado para determinar o nível de risco com base nos indicadores:

- **Risco Alto**: Umidade do solo > 80% E Inclinação > 30°
- **Risco Médio**: 
  - Umidade do solo > 60% E Inclinação > 20° OU
  - Umidade do solo > 70% E Inclinação > 15° OU
  - Umidade do solo > 50% E Inclinação > 35°
- **Risco Baixo**: Demais casos

## Testes

O projeto inclui testes unitários e de integração utilizando Jest e Testing Library:

- **MonitoringService.test.js**: Testes para o serviço de monitoramento
- **RiskUtils.test.js**: Testes para os utilitários de risco

## Considerações de Desempenho

- O aplicativo utiliza componentes reutilizáveis para otimizar o desempenho e a manutenção.
- Os dados são carregados de forma assíncrona para evitar bloqueios na interface.
- A geração de gráficos é otimizada para evitar re-renderizações desnecessárias.

## Melhorias Futuras

- Implementação de notificações push para alertas em tempo real
- Integração com APIs de previsão meteorológica
- Suporte a múltiplos sensores e localidades
- Sincronização com servidores remotos para backup de dados
- Implementação de mapas para visualização geográfica de riscos

