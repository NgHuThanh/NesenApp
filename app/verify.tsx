import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Verify() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const updateDigit = (idx: number, value: string) => {
    const next = [...code];
    next[idx] = value.slice(-1);
    setCode(next);
    // Auto-advance is left out for simplicity
  };

  const handleConfirm = () => {
    // Placeholder: verify code then navigate home
    router.push('./login');
  };

  return (
    <ImageBackground 
      source={require('../assets/images/background2.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
        <Text style={styles.title}>Xác thực tài khoản</Text>
        <Text style={styles.subtitle}>Nhập mã xác thực đã được gửi đến số điện thoại 07******67</Text>

        <View style={styles.codeRow}>
          {code.map((d, i) => (
            <TextInput
              key={i}
              value={d}
              onChangeText={(v) => updateDigit(i, v)}
              style={styles.digit}
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.resend}>Không nhận được mã OPT? <Text style={styles.resendLink}>Gửi lại</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cta} onPress={handleConfirm}>
          <Text style={styles.ctaText}>Xác nhận</Text>
        </TouchableOpacity>
        </View>
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
  container: { padding: 24, alignItems: 'center' },
  title: { color: '#fff', fontSize: 22, marginTop: 24 },
  subtitle: { color: '#cbd5e1', textAlign: 'center', marginTop: 12, marginBottom: 20 },
  codeRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 24 },
  digit: { width: 44, height: 44, marginHorizontal: 6, backgroundColor: 'rgba(255,255,255,0.03)', color: '#fff', textAlign: 'center', borderRadius: 8 },
  resend: { color: '#9aa4b2' },
  resendLink: { color: '#e6d5be' },
  cta: { backgroundColor: '#e6d5be', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 40, width: '80%' },
  ctaText: { color: '#1f2937', fontWeight: '700' },
});
