import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

const NumericInput = ({ value, setValue, step = 1, suffix = '' }) => {
    const increment = () => setValue(prev => prev + step);
    const decrement = () => setValue(prev => (prev > step ? prev - step : prev));
  
    return (
      <View style={styles.numericInputContainer}>
        <TouchableOpacity onPress={decrement} style={styles.numericButton}>
          <Text style={styles.numericButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.numericValue}>{value}{suffix}</Text>
        <TouchableOpacity onPress={increment} style={styles.numericButton}>
          <Text style={styles.numericButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
};

export default function ConfigExercicio({ route, navigation }) {
  // Recebe os exercícios da tela anterior
  const { exercicios } = route.params;
  
  // Foca no primeiro exercício por enquanto
  const [exercicioAtual, setExercicioAtual] = useState(exercicios[0]);
  const [numeroDeSeries, setNumeroDeSeries] = useState(3);
  const [descanso, setDescanso] = useState(60);
  const [series, setSeries] = useState([]);
  

  // Atualiza o array de séries sempre que o número de séries mudar
  useEffect(() => {
    setSeries(
      Array.from({ length: numeroDeSeries }, () => ({ reps: '0', carga: '0.0' }))
    );
  }, [numeroDeSeries]);
  const handleSalvar = () => {
    // 1. Junta todos os dados do exercício configurado em um objeto
    const exercicioConfigurado = {
      id: exercicioAtual.id, // Garante um ID único
      nome: exercicioAtual.nome,
      imagem_url: exercicioAtual.imagem_url,
      detalhes: {
        numeroDeSeries: numeroDeSeries,
        descanso: descanso,
        series: series, // Array com {reps, carga} de cada série
      },
    };
    // 2. Navega para a tela 'Treino' e passa um array com os exercícios configurados
    // No futuro, você pode adicionar mais exercícios a este array
    navigation.navigate('Treino', {
      exerciciosConfigurados: [exercicioConfigurado],
      nomeDoTreino: 'Peito', // Você pode passar o nome do treino dinamicamente
    });
  };

  const handleSerieChange = (index, field, value) => {
    const novasSeries = [...series];
    novasSeries[index][field] = value;
    setSeries(novasSeries);
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {/* CABEÇALHO - BOTÃO SALVAR ALTERADO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurar Exercício</Text>
        {/* Adiciona a chamada da função handleSalvar */}
        <TouchableOpacity onPress={handleSalvar}>
          <Text style={styles.headerButton}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* DETALHES DO EXERCÍCIO */}
        <View style={styles.exercicioInfoContainer}>
          <Image source={{ uri: exercicioAtual.imagem_url }} style={styles.exercicioImage} />
          <View>
            <Text style={styles.exercicioTitle}>{exercicioAtual.nome}</Text>
          </View>
        </View>

        {/* CONFIGURAÇÕES */}
        <View style={styles.configContainer}>
          <Text style={styles.label}>Tipo de séries:</Text>
          {/* Adicionar botões aqui depois */}
          
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Número de séries:</Text>
              <NumericInput value={numeroDeSeries} setValue={setNumeroDeSeries} />
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Descanso entre séries:</Text>
              <NumericInput value={descanso} setValue={setDescanso} step={5} suffix=" seg" />
            </View>
          </View>
          
          {/* SÉRIES INPUTS */}
          <Text style={styles.label}>Séries</Text>
          {series.map((serie, index) => (
            <View key={index} style={styles.serieRow}>
              <Text style={styles.serieIndex}>{index + 1}ª</Text>
              <Text style={styles.inputLabel}>Rep:</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                value={serie.reps}
                onChangeText={(val) => handleSerieChange(index, 'reps', val)}
              />
              <Text style={styles.inputLabel}>Carga:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={serie.carga}
                onChangeText={(val) => handleSerieChange(index, 'carga', val)}
              />
              <Text style={styles.inputLabel}>kg</Text>
            </View>
          ))}

          {/* OBSERVAÇÕES */}
          <Text style={styles.label}>Observações</Text>
          <TextInput
            style={[styles.input, styles.obsInput]}
            placeholder="Adicione uma observação..."
            placeholderTextColor="#777"
            multiline
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
    headerButton: { color: '#F9A825', fontSize: 16 },
    headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    exercicioInfoContainer: { flexDirection: 'row', alignItems: 'center', padding: 20 },
    exercicioImage: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
    exercicioTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
    verMais: { color: '#F9A825', fontSize: 14, marginTop: 5 },
    configContainer: { paddingHorizontal: 20 },
    label: { color: '#FFF', fontSize: 16, marginTop: 20, marginBottom: 10 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    col: { flex: 1, marginRight: 10 },
    numericInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C1E', borderRadius: 8, padding: 5, justifyContent: 'space-between' },
    numericButton: { padding: 10 },
    numericButtonText: { color: '#F9A825', fontSize: 20, fontWeight: 'bold' },
    numericValue: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    serieRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C1E', borderRadius: 8, padding: 10, marginBottom: 10},
    serieIndex: { color: '#FFF', fontSize: 16, marginRight: 15 },
    inputLabel: { color: '#AAA', fontSize: 16, marginRight: 5 },
    input: { color: '#FFF', backgroundColor: '#333', borderRadius: 5, padding: 10, minWidth: 50, textAlign: 'center'},
    obsInput: { textAlign: 'left', height: 100, paddingTop: 10 },
});