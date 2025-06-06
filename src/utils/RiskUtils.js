/**
 * Utilitários para cálculos e formatação relacionados a riscos
 */

/**
 * Obtém a cor correspondente ao nível de risco
 * @param {string} risk - Nível de risco ('baixo', 'medio', 'alto')
 * @returns {string} - Código de cor hexadecimal
 */
export const getRiskColor = (risk) => {
  switch (risk) {
    case 'alto':
      return '#e74c3c';
    case 'medio':
      return '#f39c12';
    case 'baixo':
      return '#2ecc71';
    default:
      return '#95a5a6';
  }
};

/**
 * Obtém a mensagem de alerta correspondente ao nível de risco
 * @param {string} risk - Nível de risco ('baixo', 'medio', 'alto')
 * @returns {string} - Mensagem de alerta
 */
export const getAlertMessage = (risk) => {
  switch (risk) {
    case 'alto':
      return 'ALERTA! Risco elevado de deslizamento. Evacue a área imediatamente!';
    case 'medio':
      return 'Atenção! Risco moderado de deslizamento. Monitore a situação.';
    case 'baixo':
      return 'Situação normal. Risco baixo de deslizamento.';
    default:
      return 'Nível de risco desconhecido.';
  }
};

/**
 * Valida os valores de umidade do solo e inclinação
 * @param {string|number} moisture - Valor da umidade do solo
 * @param {string|number} inclination - Valor da inclinação
 * @returns {Object} - Objeto com resultado da validação e mensagem de erro
 */
export const validateInputs = (moisture, inclination) => {
  if (moisture === '' || inclination === '') {
    return { 
      isValid: false, 
      message: 'Por favor, preencha todos os campos.' 
    };
  }
  
  const moistureValue = parseFloat(moisture);
  const inclinationValue = parseFloat(inclination);
  
  if (isNaN(moistureValue) || isNaN(inclinationValue)) {
    return { 
      isValid: false, 
      message: 'Por favor, insira valores numéricos válidos.' 
    };
  }
  
  if (moistureValue < 0 || moistureValue > 100) {
    return { 
      isValid: false, 
      message: 'A umidade do solo deve estar entre 0% e 100%.' 
    };
  }
  
  if (inclinationValue < 0 || inclinationValue > 90) {
    return { 
      isValid: false, 
      message: 'A inclinação deve estar entre 0° e 90°.' 
    };
  }
  
  return { isValid: true };
};

/**
 * Gera dados simulados para gráficos históricos
 * @param {number} currentValue - Valor atual para incluir no final da série
 * @param {number} min - Valor mínimo para os dados aleatórios
 * @param {number} max - Valor máximo para os dados aleatórios
 * @returns {Array} - Array de valores para o gráfico
 */
export const generateChartData = (currentValue, min, max) => {
  const data = [];
  
  // Gerar 5 valores aleatórios
  for (let i = 0; i < 5; i++) {
    data.push(Math.random() * (max - min) + min);
  }
  
  // Adicionar o valor atual no final
  data.push(parseFloat(currentValue));
  
  return data;
};

