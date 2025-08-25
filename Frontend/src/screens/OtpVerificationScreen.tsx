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
import { verifyOtp } from '../api/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'OTP'>;

export default function OtpVerificationScreen({ navigation, route }: Props) {
  const [otp, setOtp] = useState('');
  const { email } = route.params;

  const mutation = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) => verifyOtp({ email, otp }),
    onSuccess: () => {
      Alert.alert('Success', 'OTP verified successfully');
      navigation.replace('Login');
    },
    onError: (err: any) => {
      Alert.alert('Verification Failed', err?.response?.data?.message || 'Invalid OTP');
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="#b0b0b0"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
      />

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={() => mutation.mutate({ email, otp })}
        disabled={mutation.isPending}
      >
        <Text style={styles.verifyButtonText}>
          {mutation.isPending ? 'Verifying...' : 'Verify OTP'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.resendContainer}
        onPress={() => Alert.alert('Resend', 'OTP has been resent.')}
      >
        <Text style={styles.resendText}>Didn't receive code? Resend</Text>
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
    marginBottom: 25,
    letterSpacing: 4,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#FF6600',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 25,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    color: '#888',
    fontSize: 14,
  },
});
