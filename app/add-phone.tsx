import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddPhone() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    // Placeholder: save phone and send verification
    router.push('./verify');
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
            <Text style={styles.title}>Thêm số điện thoại</Text>
            <Text style={styles.subtitle}>Nhập số điện thoại của bạn để chúng tôi có thể xác nhận và bắt đầu.</Text>

            <View style={styles.inputRow}>
              <View style={styles.codeBox}><Text style={styles.codeText}>(+84)</Text></View>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.cta} onPress={handleContinue}>
            <Text style={styles.ctaText}>Tiếp tục</Text>
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
  contentTop: { width: '100%', marginTop: screenHeight * 0.25 },
  title: { color: '#fff', fontSize: 22, alignSelf: 'center' },
  subtitle: { color: '#cbd5e1', textAlign: 'center', marginTop: 12, marginBottom: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10 },
  codeBox: { paddingHorizontal: 10, justifyContent: 'center' },
  codeText: { color: '#fff' },
  input: { flex: 1, color: '#fff', marginLeft: 8 },
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
