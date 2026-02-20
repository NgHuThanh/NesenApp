import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EditProfile() {
  const router = useRouter();
  const [username, setUsername] = useState('Linh Trần');
  const [timezone, setTimezone] = useState('Việt Nam');
  const [email] = useState('linhtran209@gmail.com');
  const [phone] = useState('0787644565');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container}>
        {/* Account Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>THÔNG TIN TÀI KHOẢN</Text>
          
          <View style={styles.card}>
            {/* Avatar Row */}
            <View style={styles.row}>
              <Text style={styles.label}>Ảnh đại diện</Text>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>LT</Text>
              </View>
            </View>

            {/* Username Row */}
            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Tên người dùng</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{username}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>

            {/* Change Password Row */}
            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Thay đổi mật khẩu</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.valueMuted}>Đổi mật khẩu</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>

            {/* Timezone Row */}
            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Múi giờ</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{timezone}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Linked Accounts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LIÊN KẾT</Text>
          
          <View style={styles.card}>
            {/* Email Row */}
            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.valueMuted}>{email}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>

            {/* Phone Row */}
            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Điện thoại</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{phone}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>

            {/* Facebook Row */}
            <View style={styles.row}>
              <Text style={styles.label}>Facebook</Text>
              <TouchableOpacity style={styles.connectBtn}>
                <Text style={styles.connectText}>Liên kết</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b1720' },
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
  backText: { color: '#fff', fontSize: 32 },
  title: { color: '#fff', fontSize: 18, fontWeight: '600' },
  container: { flex: 1 },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 24,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  label: {
    color: '#e5e7eb',
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    color: '#e5e7eb',
    fontSize: 15,
    marginRight: 8,
  },
  valueMuted: {
    color: '#9ca3af',
    fontSize: 15,
    marginRight: 8,
  },
  chevron: {
    color: '#9ca3af',
    fontSize: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#d4a574',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  connectBtn: {
    backgroundColor: '#d4a574',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  connectText: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});
