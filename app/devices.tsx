import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

interface Device {
  id: string;
  name: string;
  location: string;
  lastConnected: string;
  isConnected: boolean;
  isEnabled: boolean;
}

const DEMO_DEVICES: Device[] = [
  {
    id: '1',
    name: 'Đèn ngủ 1',
    location: 'Phòng ngủ',
    lastConnected: '10/08/2025',
    isConnected: true,
    isEnabled: true,
  },
  {
    id: '2',
    name: 'Đèn ngủ 1',
    location: 'Phòng ngủ',
    lastConnected: '10/08/2025',
    isConnected: true,
    isEnabled: true,
  },
  {
    id: '3',
    name: 'Đèn ngủ 1',
    location: 'Phòng ngủ',
    lastConnected: '10/08/2025',
    isConnected: false,
    isEnabled: false,
  },
  {
    id: '4',
    name: 'Đèn ngủ 1',
    location: 'Phòng ngủ',
    lastConnected: '10/08/2025',
    isConnected: false,
    isEnabled: false,
  },
];

export default function Devices() {
  const router = useRouter();
  const { height: screenHeight } = useWindowDimensions();
  const [devices, setDevices] = useState<Device[]>(DEMO_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggle = (id: string) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, isEnabled: !d.isEnabled } : d
    ));
  };

  const handleMenuOpen = (device: Device) => {
    setSelectedDevice(device);
    setShowMenu(true);
  };

  const handleEdit = () => {
    setShowMenu(false);
    // Navigate to edit page
    console.log('Edit device:', selectedDevice?.name);
  };

  const handleDeleteConfirm = () => {
    if (selectedDevice) {
      setDevices(devices.filter(d => d.id !== selectedDevice.id));
    }
    setShowDeleteModal(false);
    setShowMenu(false);
    setSelectedDevice(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.header, { marginTop: screenHeight * 0.05 }]}>
        <Text style={styles.title}>Quản lý thiết bị</Text>
        <TouchableOpacity 
          style={styles.addBtn} 
          onPress={() => router.push('./add-device')}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>DANH SÁCH THIẾT BỊ</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{devices.length}</Text>
          </View>
        </View>

        {devices.map((device) => (
          <View key={device.id} style={styles.deviceCard}>
            <View style={styles.statusRow}>
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, device.isConnected && styles.statusDotActive]} />
                <Text style={[styles.statusText, device.isConnected && styles.statusTextActive]}>
                  {device.isConnected ? 'Đang kết nối' : 'Không kết nối'}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.menuBtn}
                onPress={() => handleMenuOpen(device)}
              >
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.deviceContent}>
              <View style={styles.deviceIcon}>
                <Text style={styles.deviceEmoji}>💡</Text>
              </View>

              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceLocation}>Vị trí: {device.location}</Text>
                <Text style={styles.deviceDate}>Kết nối gần nhất: {device.lastConnected}</Text>
              </View>

              <Switch
                value={device.isEnabled}
                onValueChange={() => handleToggle(device.id)}
                trackColor={{ false: '#4b5563', true: '#d4a574' }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Sheet Menu */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            
            <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
              <Text style={styles.menuItemIcon}>✏️</Text>
              <Text style={styles.menuItemText}>Chỉnh sửa thiết bị</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                setShowMenu(false);
                setShowDeleteModal(true);
              }}
            >
              <Text style={styles.menuItemIcon}>🗑️</Text>
              <Text style={[styles.menuItemText, styles.menuItemDanger]}>Xóa thiết bị</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>
            <View style={styles.deleteHandle} />
            <Text style={styles.deleteTitle}>Xóa thiết bị</Text>
            <Text style={styles.deleteMessage}>
              Bạn có chắc muốn xóa thiết bị "{selectedDevice?.name}" khỏi danh sách không?
            </Text>
            
            <View style={styles.deleteActions}>
              <TouchableOpacity 
                style={[styles.deleteBtn, styles.cancelBtn]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.deleteBtn, styles.confirmBtn]}
                onPress={handleDeleteConfirm}
              >
                <Text style={styles.confirmText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b1720' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '600', textAlign: 'center' },
  addBtn: {
    position: 'absolute',
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 28, fontWeight: '300', lineHeight: 28 },
  container: { flex: 1, padding: 16 },
  containerContent: { paddingBottom: 120 },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginRight: 8,
  },
  badge: {
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: { color: '#60a5fa', fontSize: 12, fontWeight: '600' },
  deviceCard: {
    backgroundColor: '#22324b',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6b7280',
    marginRight: 8,
  },
  statusDotActive: { backgroundColor: '#10b981' },
  statusText: { color: '#9ca3af', fontSize: 13, fontWeight: '500' },
  statusTextActive: { color: '#34d399' },
  menuBtn: { padding: 2 },
  menuIcon: { color: '#9ca3af', fontSize: 20, lineHeight: 20 },
  cardDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    marginBottom: 10,
  },
  deviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIcon: {
    width: 62,
    height: 62,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  deviceEmoji: { fontSize: 30 },
  deviceInfo: { flex: 1 },
  deviceName: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  deviceLocation: { color: '#a7b1c2', fontSize: 12, marginBottom: 4 },
  deviceDate: { color: '#8a95a8', fontSize: 11 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#4b5563',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItemIcon: { fontSize: 20, marginRight: 12 },
  menuItemText: { color: '#e5e7eb', fontSize: 16 },
  menuItemDanger: { color: '#ef4444' },
  deleteModal: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 32,
    alignSelf: 'center',
  },
  deleteHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#4b5563',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  deleteTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  deleteMessage: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  deleteActions: {
    flexDirection: 'row',
    gap: 12,
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  confirmBtn: {
    backgroundColor: '#ef4444',
  },
  cancelText: { color: '#e5e7eb', fontWeight: '600' },
  confirmText: { color: '#fff', fontWeight: '600' },
});
