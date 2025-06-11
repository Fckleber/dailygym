import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Usaremos ícones

const CardExercicio = ({ item }) => {
    // Pega os detalhes da primeira série para exibir no card
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
    // Recebe os dados da tela anterior. Usamos um array vazio como padrão.
    const { exerciciosConfigurados = [], nomeDoTreino = "Meu Treino" } = route.params || {};

    const handleAdicionarExercicio = () => {
        // Leva o usuário de volta ao fluxo para adicionar um novo treino
        navigation.navigate('AddTreino');
    };

    // Se não houver exercícios, mostra a tela de estado vazio
    if (exerciciosConfigurados.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{nomeDoTreino}</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Image source={require('../../assets/dumbbells.png')} style={styles.emptyImage} />
                    <Text style={styles.emptyTitle}>Sem exercícios</Text>
                    <Text style={styles.emptySubtitle}>Adicione exercícios ao seu treino para começar a treinar.</Text>
                    <TouchableOpacity style={styles.mainButton} onPress={handleAdicionarExercicio}>
                        <Text style={styles.mainButtonText}>Adicionar Exercício</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
    
    // Se houver exercícios, mostra a lista
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('TelaInicial')}>
                    <Text style={styles.headerButton}>Meu Treino</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{nomeDoTreino}</Text>
            </View>

            

            <TouchableOpacity style={[styles.mainButton, {marginHorizontal: 20}]}>
                <Text style={styles.mainButtonText}>Iniciar Treino</Text>
            </TouchableOpacity>

            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Exercícios</Text>
                <TouchableOpacity onPress={handleAdicionarExercicio}>
                    <Text style={styles.headerButton}>Adicionar</Text>
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
    container: { flex: 1, backgroundColor: '#000' },
    header: { padding: 20 },
    headerButton: { color: '#F9A825', fontSize: 16 },
    title: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginTop: 5 },
    summaryContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15 },
    summaryText: { color: '#FFF', fontSize: 16 },
    mainButton: { backgroundColor: '#F9A825', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
    mainButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
    listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    listTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
    cardExercicio: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C1E', borderRadius: 10, padding: 10, marginBottom: 10 },
    cardImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
    cardTextContainer: { flex: 1 },
    cardTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    cardSubtitle: { color: '#AAA', fontSize: 14, marginTop: 4 },
    // Estilos para estado vazio
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
    emptyImage: { width: 80, height: 80, tintColor: '#555', marginBottom: 20 },
    emptyTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    emptySubtitle: { color: '#AAA', fontSize: 16, textAlign: 'center', marginBottom: 30 },
});