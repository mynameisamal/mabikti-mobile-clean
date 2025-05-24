import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      // const res = await fetch('http://192.168.0.228:3000/api/auth/login', {
      const res = await fetch('http://amals.my.id/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Login gagal');

      const data = await res.json();
      login({
        token: data.token,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role.name.toLowerCase().replace(' ', '_'),
        id: data.user.id,
        region_id: data.user.region_id,
        parent_id: data.user.parent_id
      });

      navigation.replace('Dashboard');
    } catch (err) {
      Alert.alert('Login Gagal', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Judul atau Logo */}
      <Image source={require('../../assets/logo.png')} style={{ width: 130, height: 130, alignSelf: 'center', marginBottom: 20 }} />
      <Text style={styles.subtitle}>Masuk ke akun Anda</Text>

      {/* Input Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/* Input Password */}
      <TextInput
        style={styles.input}
        placeholder="Kata Sandi"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Tombol Login */}
      <View style={styles.buttonContainer}>
        <Button title={loading ? 'Memuat...' : 'Masuk'} onPress={handleLogin} disabled={loading} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#007AFF', marginTop: 16, textAlign: 'center' }}>
            Belum punya akun? Daftar di sini
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2a2a2a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 8,
  }
});
