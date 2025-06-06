# Monitoramento de Riscos de Deslizamentos

## Aplicativo Mobile para Monitoramento de Riscos de Deslizamentos

**Disciplina:** Advanced Programming And Mobile Dev

## Descrição do Projeto

Este aplicativo mobile foi desenvolvido com React Native para simular uma rede de sensores inteligentes, inspirado em iniciativas como o Alerta Rio e os Early Warning Systems. O objetivo principal é monitorar indicadores ambientais como umidade do solo e inclinação, prever riscos de deslizamentos e emitir alertas para áreas vulneráveis.

### Funcionalidades Principais

- **Monitoramento de Indicadores Ambientais**: Coleta e análise de dados de umidade do solo e inclinação.
- **Previsão de Riscos**: Algoritmo para cálculo do nível de risco (baixo, médio, alto) com base nos indicadores.
- **Sistema de Alertas**: Emissão de alertas quando o nível de risco é elevado.
- **Histórico de Monitoramento**: Registro e consulta de medições anteriores.
- **Ações de Mitigação**: Recomendações de ações preventivas e corretivas com base no nível de risco.

## Estrutura do Aplicativo

O aplicativo contém 5 telas principais:

1. **Tela de Boas-vindas**: Apresentação do aplicativo e opções para iniciar o monitoramento ou visualizar o histórico.
2. **Tela de Inserção de Dados Ambientais**: Interface para inserção dos dados de umidade do solo e inclinação.
3. **Tela de Visualização de Riscos**: Exibição do nível de risco atual, gráficos dos indicadores e alertas.
4. **Tela de Histórico de Monitoramento**: Listagem dos registros anteriores com detalhes e filtros.
5. **Tela de Ações de Mitigação**: Sugestões de ações preventivas e corretivas com base no nível de risco.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile multiplataforma.
- **Expo**: Plataforma para facilitar o desenvolvimento e teste de aplicativos React Native.
- **React Navigation**: Biblioteca para navegação entre telas.
- **AsyncStorage**: Sistema de armazenamento local para persistência de dados.
- **React Native Chart Kit**: Biblioteca para criação de gráficos e visualizações.

## Arquitetura do Projeto

O projeto segue uma arquitetura organizada em:

- **screens/**: Contém as telas principais do aplicativo.
- **components/**: Componentes reutilizáveis como indicadores de risco, gráficos e alertas.
- **services/**: Serviços para gerenciamento de dados e lógica de negócios.
- **utils/**: Funções utilitárias para cálculos, validações e formatações.
- **assets/**: Recursos como imagens e ícones.
- **tests/**: Testes unitários e de integração.

## Instalação e Execução

1. Clone o repositório:
   ```
   git clone https://github.com/totagoma/monitoramento-deslizamentos.git
   ```

2. Instale as dependências:
   ```
cd monitoramento-deslizamentos
npm install

   ```

3. Execute o aplicativo:
   ```
   npm start
   ```

4. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR code ou execute em um emulador.

## Testes

O projeto inclui testes unitários e de integração para garantir a qualidade do código:

```
npm test
```

## Integrantes do Grupo

- Pedro Lopes Domingues RM: 99628
- Mateus Fairbanks RM: 98202 
- Felipe Pereira de Assis RM: 98187 

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

