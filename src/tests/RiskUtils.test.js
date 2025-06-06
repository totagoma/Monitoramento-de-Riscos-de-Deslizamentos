import { getRiskColor, getAlertMessage, validateInputs, generateChartData } from '../utils/RiskUtils';

describe('RiskUtils', () => {
  describe('getRiskColor', () => {
    test('deve retornar a cor correta para risco alto', () => {
      expect(getRiskColor('alto')).toBe('#e74c3c');
    });
    
    test('deve retornar a cor correta para risco médio', () => {
      expect(getRiskColor('medio')).toBe('#f39c12');
    });
    
    test('deve retornar a cor correta para risco baixo', () => {
      expect(getRiskColor('baixo')).toBe('#2ecc71');
    });
    
    test('deve retornar a cor padrão para risco desconhecido', () => {
      expect(getRiskColor('desconhecido')).toBe('#95a5a6');
    });
  });
  
  describe('getAlertMessage', () => {
    test('deve retornar a mensagem correta para risco alto', () => {
      expect(getAlertMessage('alto')).toContain('ALERTA!');
      expect(getAlertMessage('alto')).toContain('evacue');
    });
    
    test('deve retornar a mensagem correta para risco médio', () => {
      expect(getAlertMessage('medio')).toContain('Atenção!');
      expect(getAlertMessage('medio')).toContain('monitore');
    });
    
    test('deve retornar a mensagem correta para risco baixo', () => {
      expect(getAlertMessage('baixo')).toContain('normal');
      expect(getAlertMessage('baixo')).toContain('baixo');
    });
  });
  
  describe('validateInputs', () => {
    test('deve validar entradas corretas', () => {
      const result = validateInputs('75', '25');
      expect(result.isValid).toBe(true);
    });
    
    test('deve rejeitar campos vazios', () => {
      const result = validateInputs('', '25');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('preencha todos os campos');
    });
    
    test('deve rejeitar valores não numéricos', () => {
      const result = validateInputs('abc', '25');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('valores numéricos válidos');
    });
    
    test('deve rejeitar umidade fora do intervalo', () => {
      const result = validateInputs('150', '25');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('umidade do solo');
    });
    
    test('deve rejeitar inclinação fora do intervalo', () => {
      const result = validateInputs('75', '95');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('inclinação');
    });
  });
  
  describe('generateChartData', () => {
    test('deve gerar array com 6 elementos', () => {
      const result = generateChartData(75, 0, 100);
      expect(result).toHaveLength(6);
    });
    
    test('deve incluir o valor atual como último elemento', () => {
      const result = generateChartData(75, 0, 100);
      expect(result[5]).toBe(75);
    });
    
    test('deve gerar valores dentro do intervalo especificado', () => {
      const min = 20;
      const max = 50;
      const result = generateChartData(35, min, max);
      
      // Verificar os 5 primeiros valores (aleatórios)
      for (let i = 0; i < 5; i++) {
        expect(result[i]).toBeGreaterThanOrEqual(min);
        expect(result[i]).toBeLessThanOrEqual(max);
      }
    });
  });
});

