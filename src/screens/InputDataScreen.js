import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';

// Serviços e utilitários
import MonitoringService from '../services/MonitoringService';
import { validateInputs } from '../utils/RiskUtils';

const InputDataScreen = ({ navigation }) => {
  const [soilMoisture, setSoilMoisture] = useState('');
  const [inclination, setInclination] = useState('');
  const [loading, setLoading] = useState(false);

  const saveData = async () => {
    // Validar entradas
    const validation = validateInputs(soilMoisture, inclination);
    if (!validation.isValid) {
      Alert.alert('Erro', validation.message);
      return;
    }
    
    setLoading(true);
    
    try {
      // Salvar dados usando o serviço
      const newRecord = await MonitoringService.saveRecord({
        umidade_solo: soilMoisture,
        inclinacao: inclination
      });
      
      // Navegar para a tela de visualização de riscos
      navigation.navigate('RiskView', { record: newRecord });
      
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Inserção de Dados</Text>
          <Text style={styles.subtitle}>Insira os dados ambientais para análise</Text>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Umidade do Solo (%)</Text>
            <TextInput
              style={styles.input}
              value={soilMoisture}
              onChangeText={setSoilMoisture}
              placeholder="Ex: 75"
              keyboardType="numeric"
            />
            <Text style={styles.hint}>Insira um valor entre 0 e 100</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Inclinação (graus)</Text>
            <TextInput
              style={styles.input}
              value={inclination}
              onChangeText={setInclination}
              placeholder="Ex: 25"
              keyboardType="numeric"
            />
            <Text style={styles.hint}>Insira um valor entre 0 e 90</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={saveData}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Processando...' : 'Analisar Risco'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Como medir:</Text>
          <Text style={styles.infoText}>
            • Umidade do solo: Utilize um sensor de umidade ou estime com base na aparência e toque do solo.
          </Text>
          <Text style={styles.infoText}>
            • Inclinação: Utilize um aplicativo de nível ou inclinômetro para medir o ângulo da encosta.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  hint: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#e8f4f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default InputDataScreen;

