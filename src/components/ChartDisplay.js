import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { generateChartData } from '../utils/RiskUtils';

const screenWidth = Dimensions.get('window').width;

/**
 * Componente para exibir gráficos de linha
 * @param {Object} props - Propriedades do componente
 * @param {string} props.title - Título do gráfico
 * @param {Array} props.data - Dados para o gráfico (opcional)
 * @param {string|number} props.currentValue - Valor atual para incluir no gráfico
 * @param {string} props.label - Rótulo para a legenda
 * @param {string} props.color - Cor da linha (formato rgba)
 * @param {number} props.minValue - Valor mínimo para dados aleatórios
 * @param {number} props.maxValue - Valor máximo para dados aleatórios
 * @param {Object} props.style - Estilos adicionais para o container
 */
const ChartDisplay = ({ 
  title, 
  data, 
  currentValue = '0',
  label = 'Dados',
  color = 'rgba(52, 152, 219, 1)',
  minValue = 0,
  maxValue = 100,
  style = {} 
}) => {
  // Se não houver dados fornecidos, gerar dados simulados
  const chartData = data || generateChartData(currentValue, minValue, maxValue);
  
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
    }
  };
  
  const formattedData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        data: chartData,
        color: (opacity = 1) => color.replace('1)', `${opacity})`),
        strokeWidth: 2
      }
    ],
    legend: [label]
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={formattedData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ChartDisplay;

