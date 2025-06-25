import React from 'react'
import { View, Text, Button } from 'react-native'
import { useAuth } from '../contexts/AuthContext'

export default function HomeScreen() {
  const { user, signOut } = useAuth()

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>
        Bem-vindo ao App!
      </Text>
      
      {user ? (
        <>
          <Text style={{ marginBottom: 10 }}>Email: {user.email}</Text>
          <Text style={{ marginBottom: 20 }}>
            Conta criada em: {new Date(user.created_at).toLocaleDateString()}
          </Text>
          <Button title="Sair" onPress={signOut} />
        </>
      ) : (
        <Text>Nenhum usuário logado</Text>
      )}
    </View>
  )
}