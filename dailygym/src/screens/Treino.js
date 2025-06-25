import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CardExercicio = ({ item }) => {
    const primeiraSerie = item.detalhes.series[0] || { reps: 0, carga: 0 };
    const totalSeries = item.detalhes.numeroDeSeries;
  
    return (
      <View style={styles.cardExercicio}>
        <Image source={{ uri: item.imagem_url }} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.nome}</Text>
          <Text style={styles.cardSubtitle}>
            {totalSeries} séries • {primeiraSerie.reps} reps • {primeiraSerie.carga} kg
          </Text>
        </View>
      </View>
    );
};

export default function Treino({ route, navigation }) {
    const { exerciciosConfigurados = [], nomeDoTreino = "Meu Treino" } = route.params || {};
    
    const handleAdicionarExercicio = () => {
        navigation.navigate('SelecionarExercicio', { nomeDoTreino: nomeDoTreino });
    };

    if (exerciciosConfigurados.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
            </SafeAreaView>
        );
    }
    const handleNavegarParaHome = () => {
        const treinoSalvo = {
            nome: nomeDoTreino,
            exercicios: exerciciosConfigurados
        };
        navigation.navigate('TelaInicial', { novoTreino: treinoSalvo });
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleNavegarParaHome}>
                    <Text style={styles.headerButton}>Meu Treino</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{nomeDoTreino}</Text>
            </View>
            
             <TouchableOpacity 
                style={[styles.mainButton, {marginHorizontal: 20}]}
                onPress={() => navigation.navigate('ExeTreino', 
                { exercicios: exerciciosConfigurados })}
              >
                <Text style={styles.mainButtonText}>Iniciar Treino</Text>
            </TouchableOpacity>

            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Exercícios</Text>
                <TouchableOpacity onPress={handleAdicionarExercicio}>
                    <Text style={styles.headerButton}>Substituir</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={exerciciosConfigurados}
                renderItem={({ item }) => <CardExercicio item={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
  },
  headerButton: {
    color: '#F9A825',
    fontSize: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  mainButton: {
    backgroundColor: '#F9A825',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  mainButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  listTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardExercicio: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 4,
  },
});

