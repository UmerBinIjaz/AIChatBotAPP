import React, { useState } from 'react';
import {   View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform, } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { RootStackParamList } from '../types/navigation';
import { registerUser } from '../api/auth';

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');

  const mutation = useMutation({
    mutationFn: ({
      name,
      email,
      phone,
      password,
      verificationMethod,
    }: {
      name: string;
      email: string;
      phone: string;
      password: string;
      verificationMethod: 'email' | 'phone';
    }) => registerUser({ name, email, phone, password, verificationMethod }),

    onSuccess: () => {
      Alert.alert('Success', 'Registration successful. Check your email for OTP.');
      navigation.navigate('OTP', { email });
    },
    onError: (err: any) => {
      Alert.alert('Registration Failed', err?.response?.data?.message || 'Something went wrong.');
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
        placeholder="Name"
        placeholderTextColor="#b0b0b0"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        keyboardType="name-phone-pad"
      />

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
        placeholder="Phone"
        placeholderTextColor="#b0b0b0"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

        <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#b0b0b0"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        />

    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20}}>
        <TouchableOpacity
            style={{
            flex: 1,
            backgroundColor: verificationMethod === 'email' ? '#FF6600' : '#fff',
            borderColor: '#FF6600',
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginRight: 8,
            alignItems: 'center',
            }}
            onPress={() => setVerificationMethod('email')}
        >
            <Text style={{ color: verificationMethod === 'email' ? '#fff' : '#FF6600', fontWeight: '600' }}>
            Verify by Email
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
            flex: 1,
            backgroundColor: verificationMethod === 'phone' ? '#FF6600' : '#fff',
            borderColor: '#FF6600',
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginLeft: 8,
            alignItems: 'center',
            }}
            onPress={() => setVerificationMethod('phone')}
        >
            <Text style={{ color: verificationMethod === 'phone' ? '#fff' : '#FF6600', fontWeight: '600' }}>
            Verify by Phone
            </Text>
        </TouchableOpacity>
    </View>


      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgotPasswordContainer}
      >
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => mutation.mutate({ name, email, phone, password, verificationMethod})}
        disabled={mutation.isPending}
      >
        <Text style={styles.signInButtonText}>
          {mutation.isPending ? 'Logging in...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.createAccountContainer}
      >
        <Text style={styles.createAccountText}>Already have An Account?</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>


    // <View style={styles.container}>
    //   <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
    //   <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
    //   <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     secureTextEntry
    //     value={password}
    //     onChangeText={setPassword}
    //   />
    //   <Button
    //     title="Register"
    //     onPress={() =>
    //       mutation.mutate({
    //         name,
    //         email,
    //         phone,
    //         password,
    //         verificationMethod: 'email',
    //       })
    //     }
    //     disabled={mutation.isPending}
    //   />
    // </View>
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
