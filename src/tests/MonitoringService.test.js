import MonitoringService from '../services/MonitoringService';

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

import AsyncStorage from '@react-native-async-storage/async-storage';

describe('MonitoringService', () => {
  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  describe('calculateRiskLevel', () => {
    test('deve retornar risco alto quando umidade > 80 e inclinação > 30', () => {
      const result = MonitoringService.calculateRiskLevel(85, 35);
      expect(result).toBe('alto');
    });

    test('deve retornar risco médio quando umidade > 60 e inclinação > 20', () => {
      const result = MonitoringService.calculateRiskLevel(65, 25);
      expect(result).toBe('medio');
    });

    test('deve retornar risco baixo para valores baixos', () => {
      const result = MonitoringService.calculateRiskLevel(40, 10);
      expect(result).toBe('baixo');
    });
  });

  describe('saveRecord', () => {
    test('deve salvar um novo registro corretamente', async () => {
      // Mock do AsyncStorage para retornar um array vazio
      AsyncStorage.getItem.mockResolvedValue(null);
      
      // Dados de teste
      const testData = {
        umidade_solo: '75',
        inclinacao: '25'
      };
      
      // Chamar o método
      const result = await MonitoringService.saveRecord(testData);
      
      // Verificar se o resultado tem os campos esperados
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('hora');
      expect(result).toHaveProperty('umidade_solo', '75');
      expect(result).toHaveProperty('inclinacao', '25');
      expect(result).toHaveProperty('risco');
      
      // Verificar se AsyncStorage.setItem foi chamado
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
    
    test('deve lançar erro para dados incompletos', async () => {
      // Dados de teste incompletos
      const testData = {
        umidade_solo: '75'
        // inclinação está faltando
      };
      
      // Verificar se lança erro
      await expect(MonitoringService.saveRecord(testData)).rejects.toThrow();
    });
  });

  describe('getAllRecords', () => {
    test('deve retornar registros do AsyncStorage', async () => {
      // Mock de dados
      const mockRecords = [
        { id: '1', umidade_solo: '75', inclinacao: '25', risco: 'medio' },
        { id: '2', umidade_solo: '85', inclinacao: '35', risco: 'alto' }
      ];
      
      // Configurar o mock para retornar os dados
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockRecords));
      
      // Chamar o método
      const result = await MonitoringService.getAllRecords();
      
      // Verificar o resultado
      expect(result).toEqual(mockRecords);
      expect(AsyncStorage.getItem).toHaveBeenCalled();
    });
    
    test('deve retornar array vazio quando não há registros', async () => {
      // Configurar o mock para retornar null
      AsyncStorage.getItem.mockResolvedValue(null);
      
      // Chamar o método
      const result = await MonitoringService.getAllRecords();
      
      // Verificar o resultado
      expect(result).toEqual([]);
    });
  });
});

