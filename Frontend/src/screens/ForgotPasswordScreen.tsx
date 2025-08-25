import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { RootStackParamList } from '../types/navigation';
import { forgotPassword } from '../api/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');

  const mutation = useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPassword({ email }),
    onSuccess: () => {
      navigation.navigate('ResetPassword', { email });
    },
    onError: (err: any) => {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to send OTP');
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>We’ll send you an OTP to reset your password</Text>

      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#b0b0b0"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => mutation.mutate({ email })}
        disabled={mutation.isPending}
      >
        <Text style={styles.buttonText}>
          {mutation.isPending ? 'Sending...' : 'Send OTP'}
        </Text>
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
    color: '#FF6600',
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6600',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
