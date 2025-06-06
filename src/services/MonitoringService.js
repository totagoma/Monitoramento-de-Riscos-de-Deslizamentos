import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para armazenar os registros no AsyncStorage
const STORAGE_KEY = 'monitoring_records';

/**
 * Serviço para gerenciar as operações de monitoramento
 */
class MonitoringService {
  /**
   * Salva um novo registro de monitoramento
   * @param {Object} data - Dados do monitoramento (umidade_solo, inclinacao)
   * @returns {Promise<Object>} - O registro salvo com informações adicionais
   */
  async saveRecord(data) {
    try {
      const { umidade_solo, inclinacao } = data;
      
      // Validar dados
      if (!umidade_solo || !inclinacao) {
        throw new Error('Dados incompletos');
      }
      
      // Calcular nível de risco
      const riskLevel = this.calculateRiskLevel(umidade_solo, inclinacao);
      
      // Criar registro
      const timestamp = Date.now();
      const date = new Date();
      
      const newRecord = {
        id: timestamp.toString(),
        data: date.toISOString().split('T')[0],
        hora: date.toTimeString().split(' ')[0],
        umidade_solo,
        inclinacao,
        risco: riskLevel,
        alerta_emitido: riskLevel === 'alto'
      };
      
      // Recuperar registros existentes
      const records = await this.getAllRecords();
      
      // Adicionar novo registro
      records.push(newRecord);
      
      // Salvar registros atualizados
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      
      return newRecord;
    } catch (error) {
      console.error('Erro ao salvar registro:', error);
      throw error;
    }
  }
  
  /**
   * Recupera todos os registros de monitoramento
   * @returns {Promise<Array>} - Lista de registros
   */
  async getAllRecords() {
    try {
      const recordsJSON = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (recordsJSON) {
        return JSON.parse(recordsJSON);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao recuperar registros:', error);
      return [];
    }
  }
  
  /**
   * Recupera os registros ordenados por data (mais recente primeiro)
   * @returns {Promise<Array>} - Lista de registros ordenados
   */
  async getOrderedRecords() {
    try {
      const records = await this.getAllRecords();
      
      // Ordenar por data/hora (mais recente primeiro)
      return records.sort((a, b) => {
        return new Date(b.data + 'T' + b.hora) - new Date(a.data + 'T' + a.hora);
      });
    } catch (error) {
      console.error('Erro ao ordenar registros:', error);
      return [];
    }
  }
  
  /**
   * Recupera um registro específico pelo ID
   * @param {string} id - ID do registro
   * @returns {Promise<Object|null>} - O registro encontrado ou null
   */
  async getRecordById(id) {
    try {
      const records = await this.getAllRecords();
      return records.find(record => record.id === id) || null;
    } catch (error) {
      console.error('Erro ao buscar registro por ID:', error);
      return null;
    }
  }
  
  /**
   * Calcula o nível de risco com base nos indicadores
   * @param {number|string} moisture - Umidade do solo (%)
   * @param {number|string} inclination - Inclinação (graus)
   * @returns {string} - Nível de risco ('baixo', 'medio', 'alto')
   */
  calculateRiskLevel(moisture, inclination) {
    const moistureValue = parseFloat(moisture);
    const inclinationValue = parseFloat(inclination);
    
    // Lógica para determinar o nível de risco
    if (moistureValue > 80 && inclinationValue > 30) {
      return 'alto';
    } else if ((moistureValue > 60 && inclinationValue > 20) || 
               (moistureValue > 70 && inclinationValue > 15) ||
               (moistureValue > 50 && inclinationValue > 35)) {
      return 'medio';
    } else {
      return 'baixo';
    }
  }
  
  /**
   * Limpa todos os registros de monitoramento (para testes)
   * @returns {Promise<void>}
   */
  async clearAllRecords() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar registros:', error);
    }
  }
}

// Exportar uma instância única do serviço
export default new MonitoringService();

