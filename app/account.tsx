import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Account() {
  const router = useRouter();

  const handleLogout = () => {
    // Placeholder: clear session and navigate to login
    console.log('Logging out...');
    router.replace('./login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
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
          <Text style={styles.logoutIcon}>🚪</Text>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#d4a574',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 8,
  },
  editLink: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 24,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  menuGroup: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuLabel: {
    color: '#e5e7eb',
    fontSize: 16,
  },
  menuChevron: {
    color: '#9ca3af',
    fontSize: 24,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 16,
    marginTop: 16,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});
