import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DEMO_DEVICES = [
  { id: '1', name: 'Đèn ngủ', location: 'Phòng ngủ', isConnected: true },
  { id: '2', name: 'Đồng hồ', location: 'Phòng ngủ', isConnected: false },
  { id: '3', name: 'Công tắc', location: 'Phòng ngủ', isConnected: false },
  { id: '4', name: 'Cảm biến', location: 'Phòng ngủ', isConnected: true },
];

const screenHeight = Dimensions.get('window').height;

export default function Home() {
  const router = useRouter();
  const hasDevices = DEMO_DEVICES.length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
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
              <View style={styles.sleepCard}>
                <View style={styles.sleepLeft}>
                  <Text style={styles.statLabel} numberOfLines={1}>Chất lượng giấc ngủ</Text>
                  <View style={styles.scoreCircle}>
                    <Text style={styles.scoreValue}>90</Text>
                    <Text style={styles.scoreLabel}>điểm</Text>
                  </View>
                </View>

                <View style={styles.sleepRight}>
                  <View style={styles.sleepTopRow}>
                    <View style={styles.sleepMetricBlock}>
                      <Text style={styles.statMiniLabel} numberOfLines={1}>Thời gian ngủ</Text>
                      <Text style={styles.statMiniValue} numberOfLines={1}>21:30:40</Text>
                    </View>
                    <View style={styles.innerDivider} />
                    <View style={styles.sleepMetricBlock}>
                      <Text style={styles.statMiniLabel} numberOfLines={1}>REM</Text>
                      <Text style={styles.statMiniValue} numberOfLines={1}>00:40</Text>
                    </View>
                  </View>

                  <View style={styles.deepSleepPill}>
                    <Text style={styles.statMiniLabel} numberOfLines={1}>Giấc ngủ sâu</Text>
                    <Text style={styles.deepSleepValue} numberOfLines={1}>05:30:40</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Connected Devices */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>THIẾT BỊ ĐÃ KẾT NỐI</Text>
                <Text style={styles.countNumber}>{DEMO_DEVICES.length}</Text>
              </View>

              <View style={styles.devicesGrid}>
                {DEMO_DEVICES.map((device) => (
                  <TouchableOpacity 
                    key={device.id} 
                    style={styles.deviceCard}
                    onPress={() => {
                      if (device.name.includes('Đèn')) {
                        router.push('./light-control');
                        return;
                      }
                      router.push('./devices');
                    }}
                  >
                    <View style={styles.deviceTopRow}>
                      <View style={styles.deviceInfoRow}>
                        <View style={styles.deviceIcon}>
                          <Text style={styles.deviceEmoji}>
                            {device.name.includes('Đèn') ? '💡' : 
                             device.name.includes('Đồng hồ') ? '⏰' :
                             device.name.includes('Công tắc') ? '🔌' : '📡'}
                          </Text>
                        </View>
                        <View style={styles.deviceInfoText}>
                          <Text style={styles.deviceName}>{device.name}</Text>
                          <Text style={styles.deviceLocation}>{device.location}</Text>
                        </View>
                      </View>
                      <View style={styles.deviceChevronCircle}>
                        <Text style={styles.deviceChevron}>›</Text>
                      </View>
                    </View>

                    <View style={styles.deviceStatus}>
                      <View style={[styles.statusIconCircle, device.isConnected ? styles.statusIconCircleActive : styles.statusIconCircleInactive]}>
                        <Text style={styles.statusIconText}>{device.isConnected ? '✓' : '×'}</Text>
                      </View>
                      <Text style={[styles.statusText, device.isConnected && styles.statusTextActive]}>
                        {device.isConnected ? 'Đang kết nối' : 'Không kết nối'}
                      </Text>
                    </View>
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
          <Text style={styles.aboutSectionTitle}>VỀ CHÚNG TÔI</Text>

          <TouchableOpacity style={styles.aboutCard}>
            <View style={styles.aboutContent}>
              <Text style={styles.aboutTitle}>Giới thiệu</Text>
              <Text style={styles.aboutDesc}>Khám phá hành trình và sứ mệnh của Nesen</Text>
            </View>
            <View style={styles.aboutArt}>
              <Text style={styles.aboutMoon}>🌙</Text>
              <Text style={styles.aboutLamp}>💡</Text>
              <Text style={styles.aboutSofa}>🛋️</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.aboutRow}>
            <TouchableOpacity style={styles.aboutSmallCard}>
              <View style={styles.aboutSmallTop}>
                <Text style={styles.aboutSmallIcon}>⌂</Text>
                <Text style={styles.aboutSmallTitle}>Sản phẩm</Text>
              </View>
              <Text style={styles.aboutSmallDesc}>Xem các sản phẩm hỗ trợ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.aboutSmallCard}>
              <View style={styles.aboutSmallTop}>
                <Text style={styles.aboutSmallIcon}>◷</Text>
                <Text style={styles.aboutSmallTitle}>Tin tức</Text>
              </View>
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
  containerContent: { paddingBottom: 120 },
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
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '400',
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
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sleepCard: {
    backgroundColor: 'rgba(30, 58, 80, 0.6)',
    borderRadius: 16,
    height: screenHeight / 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  sleepLeft: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepRight: {
    width: '60%',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(148, 163, 184, 0.2)',
    paddingLeft: 8,
    justifyContent: 'center',
  },
  sleepTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sleepMetricBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDivider: {
    width: 1,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
    marginHorizontal: 6,
  },
  deepSleepPill: {
    backgroundColor: 'rgba(80, 153, 181, 0.35)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 28,
  },
  deepSleepValue: {
    color: '#dbeafe',
    fontSize: 13,
    fontWeight: '700',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 9,
    marginBottom: 4,
    textAlign: 'center',
  },
  scoreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#f0dfc2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
  },
  scoreLabel: {
    color: '#d1d5db',
    fontSize: 8,
  },
  statMiniLabel: {
    color: '#94a3b8',
    fontSize: 9,
    marginBottom: 1,
  },
  statMiniValue: {
    color: '#dbeafe',
    fontSize: 13,
    fontWeight: '700',
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
    marginBottom: 0,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#7593ac',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
    marginRight: 10,
  },
  countNumber: {
    color: '#dbeafe',
    fontSize: 14,
    fontWeight: '500',
  },
  devicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deviceCard: {
    width: '48%',
    backgroundColor: 'rgba(54, 80, 116, 0.55)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
    marginBottom: 10,
  },
  deviceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  deviceInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceInfoText: {
    flex: 1,
  },
  deviceIcon: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(230, 213, 190, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  deviceEmoji: {
    fontSize: 20,
  },
  deviceName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  deviceLocation: {
    color: '#a7b4c4',
    fontSize: 10,
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(148, 163, 184, 0.15)',
    marginTop: 10,
    paddingTop: 8,
  },
  statusIconCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  statusIconCircleActive: {
    backgroundColor: '#1ec98d',
  },
  statusIconCircleInactive: {
    backgroundColor: '#637186',
  },
  statusIconText: {
    color: '#eaf6ff',
    fontSize: 9,
    fontWeight: '700',
  },
  statusText: {
    color: '#8492a5',
    fontSize: 9,
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#33d39b',
  },
  deviceChevronCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 30, 46, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceChevron: {
    color: '#9fb1c7',
    fontSize: 18,
    lineHeight: 20,
    marginLeft: 1,
  },
  aboutCard: {
    backgroundColor: 'rgba(58, 84, 120, 0.6)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    minHeight: 98,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutSectionTitle: {
    color: '#7593ac',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 12,
  },
  aboutContent: {
    flex: 1,
    paddingRight: 10,
  },
  aboutTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  aboutDesc: {
    color: '#aebcc9',
    fontSize: 12,
    lineHeight: 22,
  },
  aboutArt: {
    position: 'relative',
    width: 92,
    height: 70,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  aboutMoon: {
    fontSize: 12,
    position: 'absolute',
    top: 0,
    right: 18,
  },
  aboutLamp: {
    fontSize: 24,
    position: 'absolute',
    top: 10,
    right: 0,
  },
  aboutSofa: {
    fontSize: 34,
    position: 'absolute',
    bottom: 0,
    right: 14,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutSmallCard: {
    width: '48%',
    backgroundColor: 'rgba(58, 84, 120, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  aboutSmallTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aboutSmallIcon: {
    fontSize: 14,
    color: '#d8c39f',
    marginRight: 8,
  },
  aboutSmallTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  aboutSmallDesc: {
    color: '#aebcc9',
    fontSize: 12,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 40,
  },
});
