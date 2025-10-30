import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView,       KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/Feather'; 

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleCadastro = async () => {
    if (email === 'hello@reallygreatsite.com') {
      setError('O formato do e-mail é inválido.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);
    setError('');
    const { error: signUpError } = await signUp(email, password);
    setLoading(false);

    if (signUpError) {
      if (signUpError.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso.');
      } else if (signUpError.code === 'auth/invalid-email') {
        setError('O formato do e-mail é inválido.');
      } else if (signUpError.code === 'auth/weak-password') {
        setError('A senha é muito fraca. Use pelo menos 6 caracteres.');
      } else {
        setError('Ocorreu um erro ao tentar criar a conta. Use pelo menos 6 caracteres na senha');
      }
    } else {
      navigation.navigate('Login');
    }
  };

  const isEmailError = error.toLowerCase().includes('e-mail inválido') || email === 'hello@reallygreatsite.com';
  const isPasswordError = error.toLowerCase().includes('senha');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

     
      <View style={styles.topBlackBar}></View>

      
      <KeyboardAvoidingView
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      >
        <ScrollView
          contentContainerStyle={styles.contentContainerScroll}
          keyboardShouldPersistTaps="handled" 
        >
          <View style={styles.contentInner}> 
            <Image
              source={require('../../assets/dumbbells.png')}
              style={styles.logo}
            />

            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputContainer, isEmailError && styles.errorBorder]}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#888"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={[styles.inputContainer, isPasswordError && styles.errorBorder]}>
              <Icon name="lock" size={20} color="#000" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="#000" style={styles.inputEyeIcon} />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, isPasswordError && styles.errorBorder]}>
              <Icon name="lock" size={20} color="#000" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirma senha"
                placeholderTextColor="#888"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#000" style={styles.inputEyeIcon} />
              </TouchableOpacity>
            </View>

            {error && !isEmailError && !isPasswordError ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}
            {isEmailError && error ? (
              <Text style={styles.errorTextEmail}>{error}</Text>
            ) : null}
            {isPasswordError && error ? (
              <Text style={styles.errorTextPassword}>{error}</Text>
            ) : null}

            {loading ? (
              <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
            ) : (
              <>
                <TouchableOpacity style={styles.signupButton} onPress={handleCadastro}>
                  <Text style={styles.signupButtonText}>CADASTRAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backToLoginButton} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.backToLoginButtonText}>VOLTAR PARA LOGIN</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topBlackBar: {
    height: '15%',
    backgroundColor: 'black',
  },
  contentContainerScroll: { 
    flexGrow: 1, 
    backgroundColor: '#ADFF2F',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  contentInner: {
    flex: 1, 
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 5,
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 0,
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000',
    fontSize: 16,
    paddingLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputEyeIcon: {
    marginLeft: 10,
  },
  signupButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  signupButtonText: {
    color: '#ADFF2F',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLoginButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 10,
  },
  backToLoginButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorTextEmail: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorTextPassword: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
  }
});