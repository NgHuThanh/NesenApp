import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DEMO_DEVICES = [
  { id: '1', name: 'Đèn ngủ', location: 'Phòng ngủ', isConnected: true },
  { id: '2', name: 'Đồng hồ', location: 'Phòng ngủ', isConnected: false },
  { id: '3', name: 'Công tắc', location: 'Phòng ngủ', isConnected: false },
  { id: '4', name: 'Cảm biến', location: 'Phòng ngủ', isConnected: true },
];

export default function Home() {
  const router = useRouter();
  const hasDevices = DEMO_DEVICES.length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.logo}>nesen</Text>
            <TouchableOpacity style={styles.notifBtn}>
              <Text style={styles.notifIcon}>🔔</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.greetingCard}>
            <View>
            <Text style={styles.greeting}>Chào buổi sáng,</Text>
            <Text style={styles.userName}>Alex Nguyen</Text>
            </View>
            <View style={styles.weather}>
              <Text style={styles.weatherIcon}>☁️</Text>
              <View>
                <Text style={styles.weatherTemp}>26°C | °F</Text>
                <Text style={styles.weatherDesc}>Nhiều mây</Text>
              </View>
            </View>
          </View>
        </View>

        {hasDevices ? (
          <>
            {/* Sleep Quality Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Chất lượng giấc ngủ</Text>
                <View style={styles.scoreCircle}>
                  <Text style={styles.scoreValue}>90</Text>
                  <Text style={styles.scoreLabel}>điểm</Text>
                </View>
              </View>

              <View style={styles.statColumn}>
                <View style={styles.statMiniCard}>
                  <Text style={styles.statMiniLabel}>Thời gian ngủ</Text>
                  <Text style={styles.statMiniValue}>21:30:40</Text>
                </View>
                <View style={styles.statMiniCard}>
                  <Text style={styles.statMiniLabel}>Giấc ngủ sâu</Text>
                  <Text style={styles.statMiniValue}>05:30:40</Text>
                </View>
              </View>

              <View style={styles.statColumn}>
                <View style={styles.statMiniCard}>
                  <Text style={styles.statMiniLabel}>REM</Text>
                  <Text style={styles.statMiniValue}>00:40</Text>
                </View>
              </View>
            </View>

            {/* Connected Devices */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>THIẾT BỊ ĐÃ KẾT NỐI</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{DEMO_DEVICES.length}</Text>
                </View>
              </View>

              <View style={styles.devicesGrid}>
                {DEMO_DEVICES.map((device) => (
                  <TouchableOpacity 
                    key={device.id} 
                    style={styles.deviceCard}
                    onPress={() => router.push('./devices')}
                  >
                    <View style={styles.deviceIcon}>
                      <Text style={styles.deviceEmoji}>
                        {device.name.includes('Đèn') ? '💡' : 
                         device.name.includes('Đồng hồ') ? '⏰' :
                         device.name.includes('Công tắc') ? '🔌' : '📡'}
                      </Text>
                    </View>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceLocation}>{device.location}</Text>
                    <View style={styles.deviceStatus}>
                      <View style={[styles.statusDot, device.isConnected && styles.statusDotActive]} />
                      <Text style={[styles.statusText, device.isConnected && styles.statusTextActive]}>
                        {device.isConnected ? 'Đang kết nối' : 'Không kết nối'}
                      </Text>
                    </View>
                    <Text style={styles.deviceChevron}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          /* Empty State */
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>🏠</Text>
            </View>
            <Text style={styles.emptyText}>Không tìm thấy thiết bị nào.</Text>
            <TouchableOpacity 
              style={styles.addDeviceBtn}
              onPress={() => router.push('./add-device')}
            >
              <Text style={styles.addDeviceBtnText}>Thêm thiết bị</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VỀ CHÚNG TÔI</Text>

          <TouchableOpacity style={styles.aboutCard}>
            <View style={styles.aboutContent}>
              <Text style={styles.aboutTitle}>Giới thiệu</Text>
              <Text style={styles.aboutDesc}>Khám phá hành trình và sứ mệnh của Nesen</Text>
            </View>
            <View style={styles.aboutIcon}>
              <Text style={styles.aboutEmoji}>🌙</Text>
              <Text style={styles.aboutEmoji2}>💡</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.aboutRow}>
            <TouchableOpacity style={styles.aboutSmallCard}>
              <Text style={styles.aboutSmallIcon}>🛍️</Text>
              <Text style={styles.aboutSmallTitle}>Sản phẩm</Text>
              <Text style={styles.aboutSmallDesc}>Xem các sản phẩm hỗ trợ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.aboutSmallCard}>
              <Text style={styles.aboutSmallIcon}>📰</Text>
              <Text style={styles.aboutSmallTitle}>Tin tức</Text>
              <Text style={styles.aboutSmallDesc}>Tin tức và chia sẻ hữu ích mỗi ngày</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f1e2e' },
  container: { flex: 1 },
  header: {
    padding: 20,
    paddingTop: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  greetingCard: {
    backgroundColor: 'rgba(30, 58, 80, 0.6)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  greeting: {
    color: '#9ca3af',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  notifBtn: {},
  notifIcon: {
    fontSize: 20,
  },
  weather: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weatherIcon: {
    fontSize: 32,
  },
  weatherTemp: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  weatherDesc: {
    color: '#9ca3af',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 58, 80, 0.6)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 11,
    marginBottom: 12,
    textAlign: 'center',
  },
  scoreCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#d4a574',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  scoreLabel: {
    color: '#9ca3af',
    fontSize: 11,
  },
  statColumn: {
    flex: 1,
    gap: 8,
  },
  statMiniCard: {
    backgroundColor: 'rgba(30, 58, 80, 0.6)',
    borderRadius: 12,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  statMiniLabel: {
    color: '#9ca3af',
    fontSize: 10,
    marginBottom: 4,
  },
  statMiniValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: 'rgba(30, 58, 80, 0.4)',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyIconText: {
    fontSize: 48,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 16,
  },
  addDeviceBtn: {
    backgroundColor: '#d4a574',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addDeviceBtnText: {
    color: '#1f2937',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#60a5fa',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginRight: 8,
  },
  countBadge: {
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    color: '#60a5fa',
    fontSize: 11,
    fontWeight: '600',
  },
  devicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  deviceCard: {
    width: '48%',
    backgroundColor: 'rgba(30, 58, 80, 0.6)',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  deviceIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  deviceEmoji: {
    fontSize: 24,
  },
  deviceName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  deviceLocation: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 8,
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6b7280',
    marginRight: 6,
  },
  statusDotActive: {
    backgroundColor: '#10b981',
  },
  statusText: {
    color: '#6b7280',
    fontSize: 11,
  },
  statusTextActive: {
    color: '#10b981',
  },
  deviceChevron: {
    position: 'absolute',
    top: 12,
    right: 12,
    color: '#9ca3af',
    fontSize: 20,
  },
  aboutCard: {
    backgroundColor: 'rgba(30, 58, 80, 0.6)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutContent: {
    flex: 1,
  },
  aboutTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  aboutDesc: {
    color: '#9ca3af',
    fontSize: 12,
    lineHeight: 18,
  },
  aboutIcon: {
    position: 'relative',
    width: 60,
    height: 60,
  },
  aboutEmoji: {
    fontSize: 32,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  aboutEmoji2: {
    fontSize: 28,
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  aboutRow: {
    flexDirection: 'row',
    gap: 12,
  },
  aboutSmallCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 58, 80, 0.6)',
    borderRadius: 12,
    padding: 16,
  },
  aboutSmallIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  aboutSmallTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  aboutSmallDesc: {
    color: '#9ca3af',
    fontSize: 11,
    lineHeight: 16,
  },
  bottomSpacer: {
    height: 40,
  },
});
