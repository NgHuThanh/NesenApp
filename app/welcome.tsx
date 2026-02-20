import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Welcome() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/background2.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.logoWrap}>
            <Text style={styles.logo}>nesen</Text>
            <Text style={styles.tagline}>sense your space</Text>
          </View>
          <View style={styles.fakeRight} />
        </View>

        <View style={styles.content}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>LT</Text>
          </View>

          <TouchableOpacity style={styles.addPhotoBtn}>
            <Text style={styles.addPhotoText}>+ Thêm ảnh</Text>
          </TouchableOpacity>

          <View style={styles.orbitWrap}>
            <View style={styles.orbit1} />
            <View style={styles.orbit2} />
            <View style={styles.orbit3} />

            <Text style={styles.welcomeBold}>Chào Linh Trần,</Text>
            <Text style={styles.welcomeText}>Thiết bị của bạn đã sẵn sàng!</Text>
          </View>

          <TouchableOpacity style={styles.startBtn} onPress={() => router.replace('./home')}>
            <Text style={styles.startText}>Bắt đầu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  safe: { flex: 1, backgroundColor: 'transparent', paddingHorizontal: 16 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  backIcon: { color: '#dbe7f4', fontSize: 38, lineHeight: 38 },
  logoWrap: { alignItems: 'center' },
  logo: { color: '#f7f0e3', fontSize: 40, fontWeight: '500' },
  tagline: { color: '#f7f0e3', fontSize: 14, marginTop: -6 },
  fakeRight: { width: 24 },
  content: { flex: 1, alignItems: 'center' },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#e6d5be',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  avatarText: { color: '#f8f4eb', fontSize: 44, fontWeight: '700' },
  addPhotoBtn: {
    backgroundColor: '#dfcfb4',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 24,
  },
  addPhotoText: { color: '#24344f', fontSize: 28, fontWeight: '600' },
  orbitWrap: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbit1: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    borderWidth: 1,
    borderColor: 'rgba(183, 205, 233, 0.2)',
  },
  orbit2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: 'rgba(183, 205, 233, 0.2)',
  },
  orbit3: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(183, 205, 233, 0.2)',
  },
  welcomeBold: { color: '#e6d5be', fontSize: 38, fontWeight: '700', marginBottom: 6 },
  welcomeText: { color: '#dbe7f4', fontSize: 32 },
  startBtn: {
    width: '95%',
    backgroundColor: '#dfcfb4',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 20,
  },
  startText: { color: '#24344f', fontSize: 30, fontWeight: '600' },
});