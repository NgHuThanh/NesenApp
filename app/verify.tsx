import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Verify() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const updateDigit = (idx: number, value: string) => {
    const cleaned = value.replace(/\D/g, '');

    if (!cleaned) {
      const next = [...code];
      next[idx] = '';
      setCode(next);
      return;
    }

    if (cleaned.length > 1) {
      const next = [...code];
      const chars = cleaned.slice(0, code.length - idx).split('');
      chars.forEach((char, offset) => {
        next[idx + offset] = char;
      });
      setCode(next);

      const focusIndex = Math.min(idx + chars.length, code.length - 1);
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    const next = [...code];
    next[idx] = cleaned;
    setCode(next);
    if (idx < code.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (idx: number, key: string) => {
    if (key !== 'Backspace') {
      return;
    }

    if (code[idx]) {
      const next = [...code];
      next[idx] = '';
      setCode(next);
      return;
    }

    if (idx > 0) {
      inputRefs.current[idx - 1]?.focus();
      const next = [...code];
      next[idx - 1] = '';
      setCode(next);
    }
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
          <View style={styles.contentTop}>
            <Text style={styles.title}>Xác thực tài khoản</Text>
            <Text style={styles.subtitle}>Nhập mã xác thực đã được gửi đến số điện thoại 07******67</Text>

            <View style={styles.codeRow}>
              {code.map((d, i) => (
                <TextInput
                  key={i}
                  ref={(ref) => {
                    inputRefs.current[i] = ref;
                  }}
                  value={d}
                  onChangeText={(v) => updateDigit(i, v)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
                  style={styles.digit}
                  keyboardType="number-pad"
                  maxLength={6}
                  autoFocus={i === 0}
                />
              ))}
            </View>

            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.resend}>Không nhận được mã OPT? {'\n'}<Text style={styles.resendLink}>Gửi lại</Text></Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cta} onPress={handleConfirm}>
            <Text style={styles.ctaText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safe: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1, paddingHorizontal: 24, alignItems: 'center' },
  contentTop: { width: '100%', alignItems: 'center', marginTop: screenHeight * 0.25 },
  title: { color: '#fff', fontSize: 22 },
  subtitle: { color: '#cbd5e1', textAlign: 'center', marginTop: 12, marginBottom: 20 },
  codeRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 24 },
  digit: { width: 44, height: 44, marginHorizontal: 6, backgroundColor: 'rgba(255,255,255,0.03)', color: '#fff', textAlign: 'center', borderRadius: 8 },
  resend: { color: '#9aa4b2', textAlign: 'center' },
  resendLink: { color: '#e6d5be' ,textAlign: 'center'},
  cta: {
    backgroundColor: '#e6d5be',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
    position: 'absolute',
    bottom: screenHeight * 0.05,
  },
  ctaText: { color: '#1f2937', fontWeight: '700' },
});
