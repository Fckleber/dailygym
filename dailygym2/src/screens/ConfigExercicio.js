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
  const { exercicios, nomeDoTreino } = route.params;
  
  const [exercicioAtual, setExercicioAtual] = useState(exercicios[0]);
  const [numeroDeSeries, setNumeroDeSeries] = useState(3);
  const [descanso, setDescanso] = useState(10);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries(
      Array.from({ length: numeroDeSeries }, () => ({ reps: '0', carga: '0.0', tempo: '15' }))
    );
  }, [numeroDeSeries]);

  const handleSerieChange = (index, field, value) => {
    const novasSeries = [...series];
    novasSeries[index][field] = value;
    setSeries(novasSeries);
  };
  
  const handleSalvar = () => {
    const exercicioConfigurado = {
      id: exercicioAtual.id,
      nome: exercicioAtual.nome,
      imagem_url: exercicioAtual.imagem_url,
      detalhes: {
        numeroDeSeries: numeroDeSeries,
        descanso: descanso,
        series: series, 
      },
    };

    navigation.navigate('Treino', {
      exerciciosConfigurados: [exercicioConfigurado],
      nomeDoTreino: nomeDoTreino,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurar Exercício</Text>
        <TouchableOpacity onPress={handleSalvar}>
          <Text style={styles.headerButton}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.exercicioInfoContainer}>
          <Image source={{ uri: exercicioAtual.imagem_url }} style={styles.exercicioImage} />
          <View>
            <Text style={styles.exercicioTitle}>{exercicioAtual.nome}</Text>
          </View>
        </View>

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
              
              {/* PASSO 2: Adicionar o campo de texto para o tempo */}
              <Text style={styles.inputLabel}>Tempo:</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                value={serie.tempo}
                onChangeText={(val) => handleSerieChange(index, 'tempo', val)}
              />
              <Text style={styles.inputLabel}>s</Text>

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
    container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerButton: {
    color: '#F9A825',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exercicioInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  exercicioImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  exercicioTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  configContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
    marginRight: 10,
  },
  numericInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 5,
    justifyContent: 'space-between',
  },
  numericButton: {
    padding: 10,
  },
  numericButtonText: {
    color: '#F9A825',
    fontSize: 20,
    fontWeight: 'bold',
  },
  numericValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  serieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  serieIndex: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 10, 
  },
  inputLabel: {
    color: '#AAA',
    fontSize: 16,
    marginHorizontal: 4, 
  },
  input: {
    color: '#FFF',
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 8, 
    paddingVertical: 10,
    minWidth: 40, 
    textAlign: 'center',
  },
  obsInput: {
    textAlign: 'left',
    height: 100,
    paddingTop: 10,
  },
});