import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

export default function AddTreino({ navigation }) {
  const [nomeTreino, setNomeTreino] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  // Função para adicionar ou remover um dia da lista de selecionados
  const toggleDaySelection = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day) // Remove o dia se já estiver selecionado
        : [...prevDays, day] // Adiciona o dia se não estiver selecionado
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
            {/* Você precisará de um ícone aqui. Troque o require por sua imagem. */}
            <Image source={require('../../assets/clipboard-icon.png')} style={styles.headerIcon}/>
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Adicionar Treino</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Peito e Tríceps"
            placeholderTextColor="#777"
            value={nomeTreino}
            onChangeText={setNomeTreino}
          />

          <Text style={styles.label}>Dia(s) deste Treino</Text>
          <View style={styles.daysContainer}>
            {DAYS.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayBox,
                  selectedDays.includes(day) && styles.dayBoxSelected,
                ]}
                onPress={() => toggleDaySelection(day)}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDays.includes(day) && styles.dayTextSelected,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerButtonText}>CANCELAR</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity>
            <Text style={styles.footerButtonText}>ADICIONAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#F9A825',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIcon: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
  },
  form: {
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#F9A825',
    borderRadius: 10,
    padding: 15,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#F9A825',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBoxSelected: {
    backgroundColor: '#F9A825',
  },
  dayText: {
    color: '#F9A825',
  },
  dayTextSelected: {
    color: '#1C1C1E',
    fontWeight: 'bold'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#3A3A3C'
  },
  footerButtonText: {
    color: '#F9A825',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: '#3A3A3C'
  }
});