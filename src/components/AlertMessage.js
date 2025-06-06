import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getRiskColor, getAlertMessage } from '../utils/RiskUtils';

/**
 * Componente para exibir mensagens de alerta baseadas no nível de risco
 * @param {Object} props - Propriedades do componente
 * @param {string} props.riskLevel - Nível de risco ('baixo', 'medio', 'alto')
 * @param {string} props.customMessage - Mensagem personalizada (opcional)
 * @param {Object} props.style - Estilos adicionais para o container
 */
const AlertMessage = ({ riskLevel = 'baixo', customMessage, style = {} }) => {
  // Só exibir para risco médio ou alto
  if (riskLevel === 'baixo') {
    return null;
  }
  
  const riskColor = getRiskColor(riskLevel);
  const message = customMessage || getAlertMessage(riskLevel);
  
  return (
    <View style={[styles.container, { backgroundColor: riskColor }, style]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AlertMessage;

