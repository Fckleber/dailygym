import React, { useState } from 'react'
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native'
import { useAuth } from '../contexts/AuthContext'

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  const handleCadastro = async () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }
    
    setLoading(true)
    setError('')
    const { error } = await signUp(email, password)
    setLoading(false)
    
    if (error) {
      setError(error.message)
    } else {
      navigation.navigate('Login')
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Cadastrar" onPress={handleCadastro} />
      )}
      
      <Button
        title="Voltar para Login"
        onPress={() => navigation.navigate('Login')}
      />
      
      {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
    </View>
  )
}