import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Audio } from 'expo-av';

const Tempo_preparacao = 15;

export default function ExeTreino({ route, navigation }) {
    const { exercicios, nomeDoTreino } = route.params;

    const [estado, setEstado] = useState('preparacao');
    const [indiceExercicio, setIndiceExercicio] = useState(0);
    const [indiceSerie, setIndiceSerie] = useState(0);
    const [tempo, setTempo] = useState(Tempo_preparacao);

    const [beepSound, setBeepSound] = useState();
    const [finalBeepSound, setFinalBeepSound] = useState();

    const exercicioAtual = exercicios[indiceExercicio];
    
    
    const serieAtual = useMemo(() => 
        exercicioAtual.detalhes.series[indiceSerie] || { reps: 0, carga: 0, tempo: 0 }
    , [exercicioAtual, indiceSerie]);

    const totalSeries = exercicioAtual.detalhes.series.length;

    useEffect(() => {
        let beepSoundInstance = null;
        let finalBeepSoundInstance = null;
        async function loadSounds() {
            try {
                const { sound: beep } = await Audio.Sound.createAsync(require('../../assets/sounds/beep.mp3'));
                beepSoundInstance = beep;
                setBeepSound(beep);
                const { sound: finalBeep } = await Audio.Sound.createAsync(require('../../assets/sounds/finalbeep.mp3'));
                finalBeepSoundInstance = finalBeep;
                setFinalBeepSound(finalBeep);
            } catch (error) {
                console.error("Erro ao carregar os sons", error);
            }
        }
        loadSounds();
        return () => {
            if (beepSoundInstance) { beepSoundInstance.unloadAsync(); }
            if (finalBeepSoundInstance) { finalBeepSoundInstance.unloadAsync(); }
        };
    }, []);
    
    const handleVoltar = () => {
        switch (estado) {
            case 'execucao':
                if (indiceSerie > 0) {
                    const serieAnteriorIndex = indiceSerie - 1;
                    setIndiceSerie(serieAnteriorIndex);
                    setEstado('descanso');
                    setTempo(exercicioAtual.detalhes.descanso);
                } else {
                    setEstado('preparacao');
                    setTempo(Tempo_preparacao);
                }
                break;
            case 'descanso':
                setEstado('execucao');
                setTempo(parseInt(serieAtual.tempo, 10) || 0);
                break;
            case 'feito':
                setEstado('execucao');
                setTempo(parseInt(serieAtual.tempo, 10) || 0);
                break;
        }
    };

    const handleFinalizarSerie = useCallback(() => {
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
    }, [indiceSerie, totalSeries, exercicioAtual, indiceExercicio, navigation, exercicios.length]);

    const handleAvancar = useCallback(() => {
        switch (estado) {
            case 'preparacao':
                setEstado('execucao');
                setTempo(parseInt(serieAtual.tempo, 10) || 0);
                break;
            case 'execucao':
                handleFinalizarSerie();
                break;
            case 'descanso': {
                const proximaSerieIndex = indiceSerie + 1;
                if (proximaSerieIndex < totalSeries) {
                    setIndiceSerie(proximaSerieIndex);
                    setEstado('execucao');
                    const tempoDaProximaSerie = parseInt(exercicioAtual.detalhes.series[proximaSerieIndex].tempo, 10) || 0;
                    setTempo(tempoDaProximaSerie);
                }
                break;
            }
        }
    }, [estado, indiceSerie, serieAtual, totalSeries, exercicioAtual, handleFinalizarSerie]);

    useEffect(() => {
        const isTimerActive = ['preparacao', 'execucao', 'descanso'].includes(estado);
        if (!isTimerActive) return;

        if (tempo === 4 || tempo === 3 || tempo === 2) {
            if (beepSound) beepSound.replayAsync();
        } else if (tempo === 1) {
            if (finalBeepSound) finalBeepSound.replayAsync();
        }

        if (tempo === 0) {
            handleAvancar();
        }

        const timerId = setTimeout(() => {
            setTempo(t => t - 1);
        }, 1000);

        return () => clearTimeout(timerId);

    }, [tempo, estado, handleAvancar, beepSound, finalBeepSound]);

    const handleProximoExercicio = () => {
        setIndiceExercicio(i => i + 1);
        setIndiceSerie(0);
        setTempo(Tempo_preparacao);
        setEstado('preparacao');
    }

    const renderConteudo = () => {
        switch (estado) {
            case 'preparacao':
            case 'descanso':
            case 'execucao':
                return <View style={styles.stateContainer}>
                    <Text style={styles.timer}>{tempo}</Text>
                    <Text style={styles.stateTitle}>
                        {estado === 'preparacao' && 'Tempo de Preparação'}
                        {estado === 'execucao' && 'Em execução'}
                        {estado === 'descanso' && 'Tempo em descanso'}
                    </Text>
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
                        <Text style={styles.serieTextSmall}>{serie.tempo}s</Text>
                        <Text style={styles.serieText}>{serie.carga} kg</Text>
                    </View>
                ))}
            </View>

            {renderConteudo()}

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={handleVoltar}>
                    <Icon name="chevron-left" size={20} color="#FFF" />
                </TouchableOpacity>

                {estado === 'feito' ? (
                    <TouchableOpacity style={styles.footerButton}
                        onPress={handleProximoExercicio}>
                        <Icon name="chevron-right" size={20} color="#FFF" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.footerButton}
                        onPress={handleAvancar}>
                        <Icon name="forward" size={20} color="#FFF" />
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
        flexWrap: 'wrap',
    },
    serieBox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
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
        fontWeight: 'bold',
    },
    serieTextSmall: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 2,
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
        textTransform: 'capitalize'
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
    }
});