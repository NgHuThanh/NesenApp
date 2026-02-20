import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddDevice() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'qr' | 'manual'>('qr');
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [location, setLocation] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const handleConfirm = () => {
    // Placeholder: save device info
    console.log({ deviceName, deviceType, location, ipAddress });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Thêm thiết bị</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'qr' && styles.tabActive]}
          onPress={() => setActiveTab('qr')}
        >
          <Text style={[styles.tabText, activeTab === 'qr' && styles.tabTextActive]}>Quét mã QR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'manual' && styles.tabActive]}
          onPress={() => setActiveTab('manual')}
        >
          <Text style={[styles.tabText, activeTab === 'manual' && styles.tabTextActive]}>Tìm thủ công</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'qr' ? (
        <View style={styles.qrContainer}>
          <View style={styles.cameraPlaceholder}>
            <View style={styles.scanFrame} />
            <Text style={styles.cameraText}>Camera Preview</Text>
          </View>
          <View style={styles.qrActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>📷</Text>
              <Text style={styles.actionText}>Thư viện</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>🔦</Text>
              <Text style={styles.actionText}>Đèn pin</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
          <Text style={styles.sectionTitle}>NHẬP THỦ CÔNG</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Tên thiết bị</Text>
            <TextInput
              value={deviceName}
              onChangeText={setDeviceName}
              placeholder="Nhập tên thiết bị"
              placeholderTextColor="#6b7280"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Loại thiết bị</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={[styles.dropdownText, !deviceType && styles.placeholder]}>
                {deviceType || 'Chọn loại thiết bị'}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Vị trí lắp đặt</Text>
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Nhập vị trí lắp đặt"
              placeholderTextColor="#6b7280"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Địa chỉ IP</Text>
            <TextInput
              value={ipAddress}
              onChangeText={setIpAddress}
              placeholder="Nhập địa chỉ IP"
              placeholderTextColor="#6b7280"
              style={styles.input}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Xác nhận</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f1c2e' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backBtn: { width: 40, alignItems: 'flex-start' },
  backText: { color: '#fff', fontSize: 24 },
  title: { color: '#fff', fontSize: 18, fontWeight: '600' },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#1a2332',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: { backgroundColor: '#2d3f5f' },
  tabText: { color: '#6b7280', fontWeight: '600' },
  tabTextActive: { color: '#fff' },
  qrContainer: { flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 32 },
  cameraPlaceholder: {
    width: 320,
    height: 360,
    backgroundColor: '#1a2332',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  scanFrame: {
    width: 240,
    height: 240,
    borderWidth: 3,
    borderColor: '#4ade80',
    borderRadius: 12,
    position: 'absolute',
  },
  cameraText: { color: '#6b7280', marginTop: 200 },
  qrActions: { flexDirection: 'row', gap: 40 },
  actionBtn: { alignItems: 'center' },
  actionIcon: { fontSize: 32, marginBottom: 8 },
  actionText: { color: '#e5e7eb', fontSize: 14 },
  formContainer: { flex: 1 },
  formContent: { padding: 16 },
  sectionTitle: { color: '#60a5fa', fontSize: 13, fontWeight: '600', marginBottom: 16 },
  field: { marginBottom: 20 },
  label: { color: '#e5e7eb', marginBottom: 8 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 14,
    color: '#fff',
    fontSize: 15,
  },
  placeholder: { color: '#6b7280' },
  dropdown: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: { color: '#fff', fontSize: 15 },
  dropdownIcon: { color: '#9ca3af' },
  confirmBtn: {
    backgroundColor: '#e6d5be',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmText: { color: '#1f2937', fontWeight: '700', fontSize: 16 },
});
