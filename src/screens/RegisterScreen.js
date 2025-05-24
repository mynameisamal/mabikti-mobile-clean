import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function RegisterScreen({ navigation }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [parentId, setParentId] = useState(null);
  const [open, setOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        // const res = await fetch('http://192.168.0.228:3000/api/public/admin-vihara');
        const res = await fetch('http://amals.my.id/public/admin-vihara');
        const data = await res.json();
        console.log('DATA ADMIN:', data);

        if (!Array.isArray(data)) {
          Alert.alert('Error', 'Data admin tidak valid');
          return;
        }

        const items = data.map((admin) => ({
          label: `${admin.name} (${admin.region?.name ?? 'Tanpa Wilayah'})`,
          value: admin.id,
        }));

        setDropdownItems(items);
        setParentId(items[0]?.value ?? null);
      } catch (err) {
        Alert.alert('Error', 'Gagal mengambil daftar admin vihara');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !password || !parentId) {
      return Alert.alert('Peringatan', 'Lengkapi semua data!');
    }

    if (password.length < 6) {
      return Alert.alert('Peringatan', 'Password minimal 6 karakter');
    }

    try {
      // const res = await fetch('http://192.168.0.228:3000/api/auth/register', {
      const res = await fetch('http://amals.my.id/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role_id: '5',
          region_id: 1,
          parent_id: parentId,
        }),
      });

      if (res.status !== 201 && res.status !== 200) {
        const error = await res.json();
        throw new Error(error?.error || 'Pendaftaran gagal');
      }      

      Alert.alert('Sukses', 'Pendaftaran berhasil! Tunggu persetujuan admin.');
      navigation.replace('Login');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Akun Anggota</Text>

      <TextInput
        placeholder="Nama Lengkap"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Text style={styles.label}>Pilih Admin Vihara</Text>
      <DropDownPicker
        open={open}
        value={parentId}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={setParentId}
        setItems={setDropdownItems}
        placeholder="Pilih Admin Vihara"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={999} // Untuk menghindari dropdown ketutupan
      />

      <Button title="Daftar" onPress={handleRegister} color="#007AFF" />

      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.backToLogin}>Sudah punya akun? Masuk di sini</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff', flexGrow: 1 },
  title: {
    paddingTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#007AFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    marginBottom: 8,
    color: '#555',
    fontWeight: '600',
    marginTop: 8,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 24,
    zIndex: 10,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    zIndex: 9,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backToLogin: {
    marginTop: 24,
    textAlign: 'center',
    color: '#007AFF',
    fontSize: 14,
  },
});
