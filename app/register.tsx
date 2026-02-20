import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleRegister = () => {
    // Placeholder: should call API then navigate to add-phone or verify
    router.push('./add-phone');
  };

  return (
    <ImageBackground 
      source={require('../assets/images/background1.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Đăng ký</Text>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Tên người dùng</Text>
          <TextInput value={username} onChangeText={setUsername} style={styles.input} placeholder="Tên người dùng" />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email" keyboardType="email-address" />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="Mật khẩu" secureTextEntry />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Nhập lại mật khẩu</Text>
          <TextInput value={confirm} onChangeText={setConfirm} style={styles.input} placeholder="Nhập lại mật khẩu" secureTextEntry />
        </View>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxOn]} />
          <Text style={styles.checkboxText}>Tôi đã đọc và đồng ý với Thỏa thuận người dùng và Chính sách Riêng tư</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cta, !agreed && styles.ctaDisabled]} onPress={handleRegister} disabled={!agreed}>
          <Text style={styles.ctaText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('./login')}>
          <Text style={styles.link}>Bạn đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safe: { flex: 1, backgroundColor: 'transparent' },
  container: { padding: 24, alignItems: 'stretch' },
  title: { fontSize: 24, color: '#fff', alignSelf: 'center', marginVertical: 24 },
  inputRow: { marginBottom: 12 },
  label: { color: '#e6eef6', marginBottom: 8 },
  input: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, color: '#fff' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  checkbox: { width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 12 },
  checkboxOn: { backgroundColor: '#e6d5be' },
  checkboxText: { color: '#cbd5e1', flex: 1 },
  cta: { backgroundColor: '#e6d5be', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  ctaDisabled: { opacity: 0.5 },
  ctaText: { color: '#1f2937', fontWeight: '700' },
  link: { color: '#e6d5be', textAlign: 'center', marginTop: 12 },
});
