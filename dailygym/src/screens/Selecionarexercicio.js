import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput,ActivityIndicator, SafeAreaView } from 'react-native';
import { supabase } from '../supabase';
import Icon from 'react-native-vector-icons/FontAwesome';

const NOME_DA_COLUNA_NOME = 'nome';
const NOME_DA_COLUNA_GRUPO_MUSCULAR = 'grupo_muscular';
const NOME_DA_COLUNA_IMAGEM = 'imagem_url';

const ExercicioItem = ({ item, onPress, isSelected }) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <Image
      source={{ uri: item[NOME_DA_COLUNA_IMAGEM] }}
      style={styles.itemImage}
      defaultSource={require('../../assets/dumbbells.png')}
    />
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemTitle}>{item[NOME_DA_COLUNA_NOME] || 'Exercício sem nome'}</Text>
      <Text style={styles.itemSubtitle}>{item[NOME_DA_COLUNA_GRUPO_MUSCULAR] || 'Sem grupo muscular'}</Text>
    </View>
    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
      {isSelected && <Icon name="check" size={14} color="#FFF" />}
    </View>
  </TouchableOpacity>
);


export default function SelecionarExercicio({ route, navigation }) {
  
  const { nomeDoTreino } = route.params;

  const [exercicios, setExercicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercicios, setSelectedExercicios] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchExercicios = async () => {
      const { data, error } = await supabase.from('exercicios').select('*');
      if (error) {
        console.error('Erro ao buscar exercícios:', error);
      } else {
        setExercicios(data);
      }
      setLoading(false);
    };
    fetchExercicios();
  }, []);

  const toggleSelection = (exercicio) => {
    setSelectedExercicios((prevSelected) => {
      const isSelected = prevSelected.find((e) => e.id === exercicio.id);
      if (isSelected) {
        return prevSelected.filter((e) => e.id !== exercicio.id);
      } else {
        return [...prevSelected, exercicio];
      }
    });
  };

  const handleAdicionarExercicios = () => {
    if (selectedExercicios.length > 0) {
      
      navigation.navigate('ConfigExercicio', {
        exercicios: selectedExercicios,
        nomeDoTreino: nomeDoTreino,
      });
    } else {
      alert('Por favor, selecione pelo menos um exercício.');
    }
  };

  const filtaredExercicios = exercicios.filter((exercicio) => {
    const nomeDoExercicio = exercicio[NOME_DA_COLUNA_NOME];
    if (typeof nomeDoExercicio === 'string') {
      return nomeDoExercicio.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#F9A825" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Selecionar Exercícios</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButton}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar exercício..."
          placeholderTextColor="#777"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filtaredExercicios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExercicioItem
            item={item}
            onPress={() => toggleSelection(item)}
            isSelected={!!selectedExercicios.find((e) => e.id === item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      

      <TouchableOpacity style={styles.addButton} onPress={handleAdicionarExercicios}>
        <Text style={styles.addButtonText}>
          ADICIONAR ({selectedExercicios.length})
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cancelButton: {
    color: '#F9A825',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    height: 50,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#333'
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F9A825',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#F9A825',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#F9A825',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
});