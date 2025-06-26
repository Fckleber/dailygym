import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView,
KeyboardAvoidingView, Platform, } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/Feather'; 
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [isPasswordVisilvel, setIsPasswordVisilvel] = useState(false); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha o email e a senha.');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/dumbbells.png')} 
          style={styles.logo}
        />

        
        <Text style={styles.title}>Seja bem-vindo</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

       
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="seuemail@exemplo.com"
            placeholderTextColor="#555"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[styles.input, styles.emailInput]} 
          />

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Sua senha"
              placeholderTextColor="#555"
              secureTextEntry={!isPasswordVisilvel} 
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisilvel(!isPasswordVisilvel)}>
              <Icon name={isPasswordVisilvel ? 'eye-off' : 'eye'} 
              size={20} color="#333" style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>

          
          <TouchableOpacity style={styles.loginButton} 
          onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>LOGIN</Text>
            )}
          </TouchableOpacity>
        </View>

        
        <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.createAccountText}>
            Não possui uma conta? 
            <Text style={styles.createAccountLink}>Criar conta</Text>
          </Text>
        </TouchableOpacity>

        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flexGrow: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
},
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A9A9A9',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#DFFF00', 
    borderRadius: 20,
    padding: 20,
  },
  label: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    width: '100%',
  },
  emailInput: {
    borderColor: '#FF4747', 
    borderWidth: 2,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 25,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  loginButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccountButton: {
    marginTop: 20,
  },
  createAccountText: {
    color: '#A9A9A9',
    fontSize: 14,
  },
  createAccountLink: {
    color: '#DFFF00', 
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF4747',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
});