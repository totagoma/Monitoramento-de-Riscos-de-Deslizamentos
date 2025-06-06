import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, SafeAreaView, Text } from 'react-native';

// Componentes
import RiskIndicator from '../components/RiskIndicator';
import AlertMessage from '../components/AlertMessage';
import DataDisplay from '../components/DataDisplay';
import ChartDisplay from '../components/ChartDisplay';

// Utilitários
import { getAlertMessage } from '../utils/RiskUtils';

const RiskViewScreen = ({ route, navigation }) => {
  const { record } = route.params || {};
  const [riskLevel, setRiskLevel] = useState('baixo');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (record) {
      setRiskLevel(record.risco);
      setAlertMessage(getAlertMessage(record.risco));
    }
  }, [record]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Análise de Risco</Text>
          <Text style={styles.subtitle}>
            {record ? `Dados de ${record.data} às ${record.hora}` : 'Dados atuais'}
          </Text>
        </View>

        <RiskIndicator riskLevel={riskLevel} />

        {record && record.risco === 'alto' && (
          <AlertMessage riskLevel={riskLevel} customMessage={alertMessage} />
        )}

        <DataDisplay
          soilMoisture={record ? record.umidade_solo : '0'}
          inclination={record ? record.inclinacao : '0'}
        />

        <ChartDisplay
          title="Histórico de Umidade do Solo"
          currentValue={record ? record.umidade_solo : '0'}
          label="Umidade do Solo (%)"
          color="rgba(52, 152, 219, 1)"
          minValue={20}
          maxValue={50}
        />

        <ChartDisplay
          title="Histórico de Inclinação"
          currentValue={record ? record.inclinacao : '0'}
          label="Inclinação (graus)"
          color="rgba(155, 89, 182, 1)"
          minValue={5}
          maxValue={20}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Mitigation', { record })}
          >
            <Text style={styles.buttonText}>Ver Ações de Mitigação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('InputData')}
          >
            <Text style={styles.buttonText}>Novo Monitoramento</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
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
  riskIndicator: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  riskText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertContainer: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  alertText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataContainer: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  dataLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  dataValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 8,
  },
  secondaryButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RiskViewScreen;
