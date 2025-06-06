# Tutorial de Uso - Monitoramento de Riscos de Deslizamentos

Este tutorial fornece instruções detalhadas sobre como utilizar o aplicativo de Monitoramento de Riscos de Deslizamentos.

## Instalação

1. Certifique-se de ter o aplicativo Expo Go instalado em seu dispositivo móvel:
   - [Expo Go para Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Expo Go para iOS](https://apps.apple.com/app/expo-go/id982107779)

2. Escaneie o QR code fornecido pelo desenvolvedor ou execute o aplicativo em um emulador.

## Navegação pelo Aplicativo

### Tela de Boas-vindas

Ao abrir o aplicativo, você verá a tela de boas-vindas com:

- **Título e descrição** do aplicativo
- Botão **"Iniciar Monitoramento"** para inserir novos dados
- Botão **"Ver Histórico"** para consultar registros anteriores

![Tela de Boas-vindas](./src/assets/screenshots/welcome_screen.png)

### Inserção de Dados Ambientais

Para inserir novos dados de monitoramento:

1. Na tela de boas-vindas, toque em **"Iniciar Monitoramento"**
2. Preencha os campos:
   - **Umidade do Solo (%)**: Insira um valor entre 0 e 100
   - **Inclinação (graus)**: Insira um valor entre 0 e 90
3. Toque em **"Analisar Risco"** para processar os dados

**Dicas para medição:**
- Para umidade do solo: Utilize um sensor de umidade ou estime com base na aparência e toque do solo
- Para inclinação: Utilize um aplicativo de nível ou inclinômetro para medir o ângulo da encosta

![Tela de Inserção de Dados](./src/assets/screenshots/input_screen.png)

### Visualização de Riscos

Após inserir os dados, você verá a análise de risco:

1. **Indicador de Nível de Risco**: Mostra se o risco é baixo, médio ou alto
2. **Mensagem de Alerta**: Aparece quando o risco é elevado
3. **Dados Monitorados**: Exibe os valores inseridos
4. **Gráficos**: Mostram o histórico simulado de umidade do solo e inclinação
5. Opções:
   - **"Ver Ações de Mitigação"**: Exibe recomendações baseadas no nível de risco
   - **"Novo Monitoramento"**: Retorna à tela de inserção de dados

![Tela de Visualização de Riscos](./src/assets/screenshots/risk_view_screen.png)

### Histórico de Monitoramento

Para consultar registros anteriores:

1. Na tela de boas-vindas, toque em **"Ver Histórico"**
2. Veja a lista de registros ordenados por data (mais recente primeiro)
3. Cada registro mostra:
   - Data e hora
   - Nível de risco (com código de cores)
   - Valores de umidade do solo e inclinação
   - Indicação se um alerta foi emitido
4. Toque em qualquer registro para ver os detalhes completos

**Dica:** Puxe a lista para baixo para atualizar os dados.

![Tela de Histórico](./src/assets/screenshots/history_screen.png)

### Ações de Mitigação

Esta tela fornece recomendações baseadas no nível de risco:

1. **Risco Alto**: Ações urgentes como evacuação imediata e contato com autoridades
2. **Risco Médio**: Preparação para evacuação e monitoramento contínuo
3. **Risco Baixo**: Medidas preventivas e manutenção

A tela também inclui:
- **Informações Importantes**: Fatos sobre deslizamentos e segurança
- **Contatos de Emergência**: Números de telefone úteis

![Tela de Ações de Mitigação](./src/assets/screenshots/mitigation_screen.png)

## Interpretação dos Níveis de Risco

### Risco Baixo (Verde)
- **Significado**: Condições estáveis com baixa probabilidade de deslizamentos
- **Ação recomendada**: Manutenção preventiva e monitoramento regular

### Risco Médio (Amarelo)
- **Significado**: Condições que requerem atenção, com possibilidade de deslizamentos
- **Ação recomendada**: Aumento da frequência de monitoramento e preparação para evacuação

### Risco Alto (Vermelho)
- **Significado**: Condições críticas com alta probabilidade de deslizamentos
- **Ação recomendada**: Evacuação imediata e contato com autoridades

## Perguntas Frequentes

### O aplicativo funciona offline?
Sim, todos os dados são armazenados localmente no dispositivo.

### Como o nível de risco é calculado?
O aplicativo utiliza um algoritmo que considera a umidade do solo e a inclinação para determinar o nível de risco.

### Posso excluir registros antigos?
Atualmente, o aplicativo não oferece a funcionalidade de exclusão de registros individuais.

### O aplicativo envia notificações?
Esta versão não inclui notificações push. Você precisa abrir o aplicativo para verificar os alertas.

## Suporte

Para suporte técnico ou dúvidas sobre o aplicativo, entre em contato com a equipe de desenvolvimento através do e-mail: suporte@monitoramento-deslizamentos.com

