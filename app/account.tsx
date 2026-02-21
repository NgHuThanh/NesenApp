import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function Account() {
  const router = useRouter();
  const { height: screenHeight } = useWindowDimensions();

  const handleLogout = () => {
    // Placeholder: clear session and navigate to login
    console.log('Logging out...');
    router.replace('./login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.containerContent, { paddingTop: screenHeight * 0.08 }]}
      >
        {/* User Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>LT</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Linh Trần</Text>
            <Text style={styles.userEmail}>linhtran209@gmail.com</Text>
            <TouchableOpacity onPress={() => router.push('./edit-profile')}>
              <Text style={styles.editLink}>Chính sửa</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sleep Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CÀI ĐẶT GIẤC NGỦ</Text>
          <View style={styles.menuGroup}>
            <MenuItem icon="🔔" label="Mục tiêu ngủ" onPress={() => {}} />
            <MenuItem icon="⏰" label="Thời gian thức dậy" onPress={() => {}} />
            <MenuItem icon="🌙" label="Thời gian đi ngủ" onPress={() => {}} />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>THÔNG BÁO</Text>
          <View style={styles.menuGroup}>
            <MenuItem icon="💡" label="Lịch đèn" onPress={() => {}} />
            <MenuItem icon="⚠️" label="Cảnh báo cảm biến" onPress={() => {}} />
            <MenuItem icon="📝" label="Nhắc nhở ngủ" onPress={() => {}} />
            <MenuItem icon="📋" label="Thức dậy" onPress={() => {}} />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#ff6558" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

interface MenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

function MenuItem({ icon, label, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuIcon}>{icon}</Text>
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <Text style={styles.menuChevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b1720' },
  container: { flex: 1 },
  containerContent: { paddingBottom: 96, paddingTop: 8 },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 12,
    borderRadius: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#d4a574',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 3,
  },
  userEmail: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 5,
  },
  editLink: {
    color: '#e5e7eb',
    fontSize: 13,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#60a5fa',
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 14,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  menuGroup: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  menuLabel: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  menuChevron: {
    color: '#9ca3af',
    fontSize: 20,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 12,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginTop: 12,
  },
  logoutIcon: { marginRight: 8 },
  logoutText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 28,
  },
});
