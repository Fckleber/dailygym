import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PREPARATION_TIME = 15;

export default function ExeTreino({ route, navigation }) {
    const { exercicios, nomeDoTreino } = route.params;

    const [estado, setEstado] = useState('preparacao');
    const [indiceExercicio, setIndiceExercicio] = useState(0);
    const [indiceSerie, setIndiceSerie] = useState(0);
    const [tempo, setTempo] = useState(PREPARATION_TIME);

    const exercicioAtual = exercicios[indiceExercicio];
    const serieAtual = exercicioAtual.detalhes.series[indiceSerie];
    const totalSeries = exercicioAtual.detalhes.series.length;


    useEffect(() => {
        if (estado === 'preparacao' || estado === 'descanso') {
            if (tempo === 0) {
                if (estado === 'preparacao') {
                    setEstado('execucao');
                } else if (estado === 'descanso') {
                    
                    setIndiceSerie(s => s + 1);
                    setEstado('execucao');
                }
                return;
            }

            const timerId = setTimeout(() => {
                setTempo(t => t - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        }
    }, [tempo, estado]);
    const handleFinalizarTreinoNavegacao = () => {
        navigation.navigate('Treino', {
            exerciciosConfigurados: exercicios,
            nomeDoTreino: nomeDoTreino
        });
    };


    const handleFinalizarSerie = () => {
        if (indiceSerie < totalSeries - 1) {
           
            setEstado('descanso');
            setTempo(exercicioAtual.detalhes.descanso);
        } else {
           
            if (indiceExercicio < exercicios.length - 1) {
               
                setEstado('feito');
            } else {

                alert("Treino Finalizado!");
                navigation.navigate('TelaInicial', { workoutCompleted: true });
            }
        }
    };

    const handleProximoExercicio = () => {
        setIndiceExercicio(i => i + 1);
        setIndiceSerie(0);
        setTempo(PREPARATION_TIME);
        setEstado('preparacao');
    }

    const renderConteudo = () => {
        switch (estado) {
            case 'preparacao':
                return <View style={styles.stateContainer}>
                    <Text style={styles.timer}>{tempo}</Text>
                    <Text style={styles.stateTitle}>Tempo de Preparação</Text>
                </View>;
            case 'execucao':
                 return <View style={styles.stateContainer}>
                    <Icon name="dumbbell" size={40} color="#34D399" />
                    <Text style={styles.stateTitle}>Em execução</Text>
                    <Text style={styles.stateSubtitle}>Faça o exercício</Text>
                </View>;
            case 'descanso':
                return <View style={styles.stateContainer}>
                    <Text style={styles.timer}>{tempo}</Text>
                    <Text style={styles.stateTitle}>Tempo em descanso</Text>
                </View>;
            case 'feito':
                return <View style={styles.stateContainer}>
                    <Icon name="check-circle" size={40} color="#34D399" />
                    <Text style={styles.stateTitle}>Feito</Text>
                    <Text style={styles.stateSubtitle}>Série finalizada</Text>
                </View>;
            default:
                return null;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} 
                style={styles.closeButton}>
                <Icon name="times" size={24} color="#FFF" />
            </TouchableOpacity>
            
            <Text style={styles.title}>{exercicioAtual.nome}</Text>
            <Image source={{ uri: exercicioAtual.imagem_url }} style={styles.image} />
            
            <Text style={styles.label}>Séries</Text>
            <View style={styles.seriesContainer}>
                {exercicioAtual.detalhes.series.map((serie, index) => (
                    <View key={index} style={[styles.serieBox, 
                    index === indiceSerie ? styles.serieBoxAtiva : 
                    styles.serieBoxInativa]}>
                        <Text style={styles.serieText}>{serie.reps} reps</Text>
                        <Text style={styles.serieText}>{serie.carga} kg</Text>
                    </View>
                ))}
            </View>

            {renderConteudo()}

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name="chevron-left" size={20} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.mainButton} 
                    onPress={handleFinalizarTreinoNavegacao}>
                    <Text style={styles.mainButtonText}>Finalizar Treino</Text>
                </TouchableOpacity>

                
                {estado === 'feito' ? (
                     <TouchableOpacity style={styles.footerButton} 
                        onPress={handleProximoExercicio}>
                        <Icon name="chevron-right" size={20} color="#FFF" />
                     </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.footerButton} 
                        onPress={handleFinalizarSerie}>
                        <Icon name="user-check" size={20} color="#FFF" />
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#333',
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  seriesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  serieBox: {
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  serieBoxAtiva: {
    backgroundColor: '#F9A825',
  },
  serieBoxInativa: {
    backgroundColor: '#3A3A3C',
  },
  serieText: {
    color: '#FFF',
    fontSize: 14,
  },
  stateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    color: '#FFF',
    fontSize: 60,
    fontWeight: 'bold',
  },
  stateTitle: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 10,
  },
  stateSubtitle: {
    color: '#AAA',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerButton: {
    padding: 15,
    backgroundColor: '#3A3A3C',
    borderRadius: 25,
  },
  mainButton: {
    backgroundColor: '#34D399',
    padding: 15,
    borderRadius: 10,
    flex: 0.6,
  },
  mainButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


