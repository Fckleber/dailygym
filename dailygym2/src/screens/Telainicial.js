import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
// Importe o ícone que vamos usar. Veja o Passo 2 para instalar.
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TelaInicial({navigation}) {
  const { user, signOut } = useAuth();

  // Vamos assumir que o nome do usuário está em 'user.displayName'
  // Se estiver em outro lugar (ex: user.name), apenas ajuste aqui.
  const userEmail = user?.email;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* --- CABEÇALHO --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Treinos</Text>
          <View style={styles.userSection}>
            <Text style={styles.userName}>{userEmail}</Text>
            <Icon name="user-circle" size={28} color="#FFF" />
          </View>
        </View>

        {/* --- CARD DE TREINO --- */}
        <View style={styles.card}>
          <View style={styles.dumbbellBackground} />
          <Image
            // PASSO 1: Coloque sua imagem de halteres na pasta 'assets'
            source={require('../../assets/dumbbells.png')} 
            style={styles.dumbbellImage}
          />
          <Text style={styles.cardTitle}>Treino Personalizado</Text>
          <Text style={styles.cardSubtitle}>Definição - Balanceado</Text>
          
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Progresso 0%</Text>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.actionButton}
  // Adicione esta linha para navegar para a nova tela
          onPress={() => navigation.navigate('AddTreino')}
        >
          <Text style={styles.actionButtonText}>Criar uma nova rotina de treino</Text>
        </TouchableOpacity>

        {/* --- BOTÃO DE SAIR (OPCIONAL) --- */}
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
            <Text style={styles.signOutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo preto
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Cabeçalho
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: '#FFFFFF',
    marginRight: 10,
    fontSize: 16,
  },
  // Card Principal
  card: {
    backgroundColor: '#1C1C1E', // Cinza escuro
    borderRadius: 20,
    padding: 25,
    marginTop: 20,
    overflow: 'hidden', // Importante para a imagem não vazar
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#E0E0E0',
    fontSize: 16,
    marginTop: 5,
  },
  // Progress Bar
  progressContainer: {
    marginTop: 30,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#3A3A3C',
    borderRadius: 4,
    marginTop: 8,
  },
  progressBarFill: {
    height: '100%',
    width: '0%', // Mude isso para o progresso real, ex: '50%'
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  // Imagem
  dumbbellBackground: {
    position: 'absolute',
    bottom: -40,
    right: -50,
    width: 200,
    height: 150,
    backgroundColor: '#F9A825', // Cor laranja/dourado
    transform: [{ rotate: '-15deg' }],
    borderTopLeftRadius: 60,
  },
  dumbbellImage: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  // Botão de Ação
  actionButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 25,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Botão de Sair
  signOutButton: {
    marginTop: 40,
    alignSelf: 'center',
  },
  signOutText: {
    color: '#F9A825',
    fontSize: 16,
    fontWeight: 'bold'
  }
});