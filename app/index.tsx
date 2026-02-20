import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const pages = [
  { label: 'Trang chủ', id: 'home' },
  { label: 'Đăng nhsập', id: 'login' },
  { label: 'Đăng ký', id: 'register' },
  { label: 'Xác thực', id: 'verify' },
  { label: 'Thêm số điện thoại', id: 'add-phone' },
  { label: 'Thêm thiết bị', id: 'add-device' },
  { label: 'Kết nối', id: 'connect' },
  { label: 'Quản lý thiết bị', id: 'devices' },
  { label: 'Lịch sử', id: 'history' },
  { label: 'Tài khoản', id: 'account' },
];

export default function StartMenu() {
  const router = useRouter();

  const handlePress = (pageId: string) => {
    console.log(`Navigate to ${pageId}`);
    switch (pageId) {
      case 'login':
        router.push('./login');
        break;
      case 'register':
        router.push('./register');
        break;
      case 'verify':
        router.push('./verify');
        break;
      case 'add-phone':
        router.push('./add-phone');
        break;
      case 'add-device':
        router.push('./add-device');
        break;
      default:
        router.push(`./${pageId}`);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Menu Chính</Text>
        <View style={styles.grid}>
          {pages.map((page) => (
            <TouchableOpacity 
              key={page.id} 
              style={styles.btn} 
              onPress={() => handlePress(page.id)}
            >
              <Text style={styles.btnText}>{page.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  container: { padding: 24, alignItems: 'center' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  grid: { width: '100%' },
  btn: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  btnText: { color: '#111827', fontWeight: '600' },
});