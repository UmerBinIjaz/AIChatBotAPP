import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { RootStackParamList } from '../types/navigation';
import { loginUser } from '../api/auth';
import { setToken } from '../store/token';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser({ email, password }),
    onSuccess: (res) => {
      setToken(res.data.token);
      navigation.replace('Chat');
    },
    onError: (err: any) => {
      Alert.alert('Login Failed', err?.response?.data?.message || 'Login failed');
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Login here</Text>
      <Text style={styles.subtitle}>Welcome back you’ve been missed!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#b0b0b0"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#b0b0b0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgotPasswordContainer}
      >
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => mutation.mutate({ email, password })}
        disabled={mutation.isPending}
      >
        <Text style={styles.signInButtonText}>
          {mutation.isPending ? 'Logging in...' : 'Sign in'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.createAccountContainer}
      >
        <Text style={styles.createAccountText}>Create new account</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6600', // orange
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#222',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF6600',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: '#FF6600',
    fontSize: 13,
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#FF6600',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 25,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  createAccountContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  createAccountText: {
    color: '#888',
    fontSize: 14,
  },
  orContinueText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 10,
  },
  socialLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  socialLogoApple: {
    width: 24,
    height: 28,
    resizeMode: 'contain',
  },
});
