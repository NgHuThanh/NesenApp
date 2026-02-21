import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function EditProfile() {
  const router = useRouter();
  const { height: screenHeight } = useWindowDimensions();
  const [username] = useState('Linh Trần');
  const [timezone] = useState('Việt Nam');
  const [email] = useState('linhtran209@gmail.com');
  const [phone] = useState('0787644565');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.header, { paddingTop: screenHeight * 0.05 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.containerContent, { paddingTop: screenHeight * 0.04 }]}
      >
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
            <TouchableOpacity style={[styles.row, styles.lastRow]}>
              <Text style={styles.label}>Múi giờ</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>{timezone}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Linked Accounts Section */}
        <View style={[styles.section, styles.sectionSpacing]}>
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
            <TouchableOpacity style={[styles.row, styles.lastRow]}>
              <Text style={styles.label}>Facebook</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.valueMuted}>Liên kết</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
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
    paddingTop: 8,
    paddingBottom: 6,
  },
  backBtn: { width: 40, alignItems: 'flex-start' },
  backText: { color: '#fff', fontSize: 30, lineHeight: 32 },
  title: { color: '#e5e7eb', fontSize: 18, fontWeight: '600' },
  container: { flex: 1 },
  containerContent: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 0,
  },
  sectionSpacing: {
    marginTop: 18,
  },
  sectionTitle: {
    color: '#60a5fa',
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 14,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  label: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    color: '#9ca3af',
    fontSize: 14,
    marginRight: 8,
  },
  valueMuted: {
    color: '#9ca3af',
    fontSize: 14,
    marginRight: 8,
  },
  chevron: {
    color: '#9ca3af',
    fontSize: 20,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#d4a574',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 24,
  },
});
