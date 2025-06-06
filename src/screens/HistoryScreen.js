import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

// Serviços e utilitários
import MonitoringService from '../services/MonitoringService';
import { getRiskColor } from '../utils/RiskUtils';

const HistoryScreen = ({ navigation }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecords();
    
    // Atualizar registros quando a tela receber foco
    const unsubscribe = navigation.addListener('focus', () => {
      loadRecords();
    });

    return unsubscribe;
  }, [navigation]);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const sortedRecords = await MonitoringService.getOrderedRecords();
      setRecords(sortedRecords);
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.recordItem}
      onPress={() => navigation.navigate('RiskView', { record: item })}
    >
      <View style={styles.recordHeader}>
        <Text style={styles.recordDate}>{item.data} às {item.hora}</Text>
        <View style={[styles.riskBadge, { backgroundColor: getRiskColor(item.risco) }]}>
          <Text style={styles.riskText}>{item.risco.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.recordDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Umidade</Text>
          <Text style={styles.detailValue}>{item.umidade_solo}%</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Inclinação</Text>
          <Text style={styles.detailValue}>{item.inclinacao}°</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Alerta</Text>
          <Text style={styles.detailValue}>{item.alerta_emitido ? 'Sim' : 'Não'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum registro encontrado.</Text>
      <Text style={styles.emptySubtext}>Comece a monitorar para ver o histórico aqui.</Text>
      <TouchableOpacity 
        style={styles.emptyButton}
        onPress={() => navigation.navigate('InputData')}
      >
        <Text style={styles.emptyButtonText}>Iniciar Monitoramento</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico de Monitoramento</Text>
        <Text style={styles.subtitle}>Registros anteriores de medições</Text>
      </View>
      
      <FlatList
        data={records}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={EmptyListComponent}
        refreshing={loading}
        onRefresh={loadRecords}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
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
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  recordItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recordDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  riskText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recordDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '80%',
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;

