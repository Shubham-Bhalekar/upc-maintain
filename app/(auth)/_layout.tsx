import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import GlobalProvider from '@/context/GlobalContext'

const AuthLayout = () => {
  return (
    <GlobalProvider>
    <>
      <Stack>
        <Stack.Screen name="log-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#F5F5F5" style="dark" />
    </>
    </GlobalProvider>
  )
}

export default AuthLayout