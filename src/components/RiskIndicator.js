import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getRiskColor } from '../utils/RiskUtils';

/**
 * Componente para exibir o indicador de nível de risco
 * @param {Object} props - Propriedades do componente
 * @param {string} props.riskLevel - Nível de risco ('baixo', 'medio', 'alto')
 * @param {Object} props.style - Estilos adicionais para o container
 */
const RiskIndicator = ({ riskLevel = 'baixo', style = {} }) => {
  const riskColor = getRiskColor(riskLevel);
  
  return (
    <View style={[styles.container, { backgroundColor: riskColor }, style]}>
      <Text style={styles.text}>
        Nível de Risco: {riskLevel.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RiskIndicator;

