import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

const MitigationScreen = ({ navigation, route }) => {
  const { record } = route.params || {};
  const riskLevel = record ? record.risco : 'baixo';
  
  // Ações de mitigação baseadas no nível de risco
  const getMitigationActions = () => {
    switch (riskLevel) {
      case 'alto':
        return [
          {
            title: 'Evacuação Imediata',
            description: 'Abandone a área imediatamente e dirija-se para um local seguro, longe de encostas e áreas de risco.',
            urgent: true
          },
          {
            title: 'Alerte as Autoridades',
            description: 'Entre em contato com a Defesa Civil (telefone 199) ou Corpo de Bombeiros (telefone 193).',
            urgent: true
          },
          {
            title: 'Avise os Vizinhos',
            description: 'Informe os vizinhos sobre o risco iminente para que também possam evacuar.',
            urgent: true
          },
          {
            title: 'Evite Áreas de Risco',
            description: 'Mantenha-se longe de encostas, barrancos e áreas com sinais de rachaduras ou deslizamentos anteriores.',
            urgent: false
          },
          {
            title: 'Monitore Notícias',
            description: 'Acompanhe os alertas e orientações das autoridades através de rádio, TV ou internet.',
            urgent: false
          }
        ];
      case 'medio':
        return [
          {
            title: 'Prepare-se para Evacuação',
            description: 'Tenha uma mochila de emergência pronta com documentos, medicamentos e itens essenciais.',
            urgent: true
          },
          {
            title: 'Monitore Sinais de Alerta',
            description: 'Observe rachaduras no solo, inclinação de árvores ou postes, e sons estranhos que podem indicar movimentação do solo.',
            urgent: true
          },
          {
            title: 'Verifique Rotas de Fuga',
            description: 'Identifique e mantenha desobstruídas as rotas de evacuação mais seguras.',
            urgent: false
          },
          {
            title: 'Evite Intervenções no Terreno',
            description: 'Não realize cortes, aterros ou remoção de vegetação que possam desestabilizar o solo.',
            urgent: false
          },
          {
            title: 'Contate a Defesa Civil',
            description: 'Solicite uma vistoria técnica para avaliar o risco e receber orientações específicas.',
            urgent: false
          }
        ];
      default: // baixo
        return [
          {
            title: 'Mantenha Drenagens Limpas',
            description: 'Verifique regularmente se as canaletas, bueiros e sistemas de drenagem estão desobstruídos.',
            urgent: false
          },
          {
            title: 'Preserve a Vegetação',
            description: 'Mantenha a cobertura vegetal em encostas, pois as raízes ajudam a estabilizar o solo.',
            urgent: false
          },
          {
            title: 'Monitore Períodos Chuvosos',
            description: 'Aumente a frequência de monitoramento durante estações chuvosas ou após chuvas intensas.',
            urgent: false
          },
          {
            title: 'Evite Acúmulo de Lixo',
            description: 'Não descarte lixo ou entulho em encostas, pois podem obstruir drenagens e aumentar a instabilidade.',
            urgent: false
          },
          {
            title: 'Conheça os Sinais de Alerta',
            description: 'Familiarize-se com sinais como rachaduras no solo, inclinação de árvores e muros, ou surgimento de nascentes de água.',
            urgent: false
          }
        ];
    }
  };
  
  const mitigationActions = getMitigationActions();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Ações de Mitigação</Text>
          <Text style={styles.subtitle}>
            Recomendações para nível de risco {riskLevel.toUpperCase()}
          </Text>
        </View>
        
        {riskLevel === 'alto' && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>
              ALERTA! Risco elevado de deslizamento. Siga as instruções abaixo imediatamente!
            </Text>
          </View>
        )}
        
        <View style={styles.actionsContainer}>
          {mitigationActions.map((action, index) => (
            <View 
              key={index} 
              style={[
                styles.actionCard,
                action.urgent ? styles.urgentCard : {}
              ]}
            >
              <Text style={[
                styles.actionTitle,
                action.urgent ? styles.urgentTitle : {}
              ]}>
                {action.title}
              </Text>
              <Text style={styles.actionDescription}>
                {action.description}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Informações Importantes:</Text>
          <Text style={styles.infoText}>
            • Os deslizamentos podem ocorrer rapidamente e sem aviso adicional.
          </Text>
          <Text style={styles.infoText}>
            • Chuvas intensas aumentam significativamente o risco de deslizamentos.
          </Text>
          <Text style={styles.infoText}>
            • Sempre priorize sua segurança e a de sua família.
          </Text>
          <Text style={styles.infoText}>
            • Mantenha este aplicativo atualizado para receber os alertas mais precisos.
          </Text>
        </View>
        
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contatos de Emergência:</Text>
          <Text style={styles.contactText}>Defesa Civil: 199</Text>
          <Text style={styles.contactText}>Corpo de Bombeiros: 193</Text>
          <Text style={styles.contactText}>SAMU: 192</Text>
          <Text style={styles.contactText}>Polícia Militar: 190</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.buttonText}>Voltar para Início</Text>
        </TouchableOpacity>
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
  actionsContainer: {
    marginBottom: 20,
  },
  actionCard: {
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
  urgentCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#e74c3c',
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  urgentTitle: {
    color: '#e74c3c',
  },
  actionDescription: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
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
  contactContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MitigationScreen;

