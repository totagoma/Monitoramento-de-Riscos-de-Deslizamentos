import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Componente para exibir dados de monitoramento
 * @param {Object} props - Propriedades do componente
 * @param {string|number} props.soilMoisture - Valor da umidade do solo
 * @param {string|number} props.inclination - Valor da inclinação
 * @param {Object} props.style - Estilos adicionais para o container
 */
const DataDisplay = ({ soilMoisture = '0', inclination = '0', style = {} }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.sectionTitle}>Dados Monitorados</Text>
      
      <View style={styles.dataRow}>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Umidade do Solo</Text>
          <Text style={styles.dataValue}>{soilMoisture}%</Text>
        </View>
        
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Inclinação</Text>
          <Text style={styles.dataValue}>{inclination}°</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default DataDisplay;

