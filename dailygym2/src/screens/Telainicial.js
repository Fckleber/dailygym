import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';


const ColecaoCard = ({ treino, onPress }) => (
    <TouchableOpacity style={styles.colecaoCard} onPress={onPress}>
        <Text style={styles.colecaoCardTitle}>{treino.nome}</Text>
    </TouchableOpacity>
);

export default function TelaInicial({ route, navigation }) {
    const { user, signOut } = useAuth();
  
    const displayName = user?.displayName || user?.email;
    const [meusTreinos, setMeusTreinos] = useState([]);

    useEffect(() => {
        if (route.params?.novoTreino) {
            setMeusTreinos(prevTreinos => {
                const treinoJaExiste = prevTreinos.some(
                  t => t.nome === route.params.novoTreino.nome);
                if (!treinoJaExiste) {
                    return [...prevTreinos, route.params.novoTreino];
                }
                return prevTreinos;
            });
        }
    }, [route.params?.novoTreino]);

    const irParaTreino = (treino) => {
        navigation.navigate('Treino', {
            exerciciosConfigurados: treino.exercicios,
            nomeDoTreino: treino.nome
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Treinos</Text>
                    <View style={styles.userSection}>
                        <Text style={styles.userName}>{displayName}</Text>
                        <Icon name="user-circle-o" size={28} color="#FFF" />
                    </View>
                </View>

                <View style={styles.mainCard}>
                    <View>
                        <Text style={styles.cardTitle}>Treino Personalizado</Text>
                        <Text style={styles.cardSubtitle}>Definição - Balanceado</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.progressText}></Text>
                        
                    </View>
                    
                    <View style={styles.cardAccent} />
                    <Image
                        source={require('../../assets/dumbbells.png')}
                        style={styles.cardImage}
                    />
                </View>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('AddTreino')}
                >
                    <Text style={styles.actionButtonText}>
                    Criar uma nova rotina de treino</Text>
                </TouchableOpacity>

                
                {meusTreinos.length > 0 && (
                    <>
                        <Text style={styles.collectionHeader}>Meus Exercícios:</Text>
                        {meusTreinos.map((treino, index) => (
                            <ColecaoCard key={index} treino={treino} 
                            onPress={() => irParaTreino(treino)} />
                        ))}
                    </>
                )}

                
                <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
                    <Text style={styles.signOutText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', 
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30, 
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: 'bold',
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        color: '#E0E0E0', 
        marginRight: 12,
        fontSize: 16,
    },
    mainCard: {
        backgroundColor: '#2A2A2A', 
        borderRadius: 16,
        padding: 20,
        position: 'relative', 
        overflow: 'hidden',   
    },
    cardTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        color: '#BDBDBD', 
        fontSize: 15,
        marginTop: 4,
    },
    progressText: {
        color: '#BDBDBD',
        fontSize: 14,
        marginBottom: 8,
    },
    
    cardAccent: {
        position: 'absolute',
    bottom: -40,
    right: -50,
    width: 200,
    height: 150,
    backgroundColor: '#F9A825',
    transform: [{ rotate: '-15deg' }],
    borderTopLeftRadius: 60,
    },
    cardImage: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    actionButton: {
        backgroundColor: '#2A2A2A', 
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 20,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    collectionHeader: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
    },
    colecaoCard: {
        backgroundColor: '#2A2A2A',
        borderRadius: 16,
        padding: 20,
        marginTop: 10,
    },
    colecaoCardTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signOutButton: {
        marginTop: 'auto', 
        marginBottom: 20,
        alignSelf: 'center',
    },
    signOutText: {
        color: '#F9A825',
        fontSize: 16,
        fontWeight: 'bold',
    },
});