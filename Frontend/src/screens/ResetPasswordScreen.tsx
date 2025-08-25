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
import { resetPassword } from '../api/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen({ navigation }: Props) {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const mutation = useMutation({
    mutationFn: ({
      otp,
      password,
      confirmPassword,
    }: {
      otp: string;
      password: string;
      confirmPassword: string;
    }) => resetPassword({ otp, password, confirmPassword }),

    onSuccess: () => {
      Alert.alert('Success', 'Password reset successful');
      navigation.replace('Login');
    },

    onError: (err: any) => {
      Alert.alert('Reset Failed', err?.response?.data?.message || 'Something went wrong');
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter OTP and new password</Text>

      <TextInput
        placeholder="OTP"
        placeholderTextColor="#b0b0b0"
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
      />

      <TextInput
        placeholder="New Password"
        placeholderTextColor="#b0b0b0"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#b0b0b0"
        secureTextEntry
        style={styles.input}
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => mutation.mutate({ otp, password, confirmPassword: confirm })}
        disabled={mutation.isPending}
      >
        <Text style={styles.resetButtonText}>
          {mutation.isPending ? 'Resetting...' : 'Reset Password'}
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
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: '#FF6600',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
