import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
              <Ionicons name="notifications-outline" size={20} color="#f3f4f6" style={styles.notifIcon} />
            </TouchableOpacity>
          </View>

          <LinearGradient
            colors={['#254b5d', '#213041', '#254b5d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.greetingCard}
          >
            <View>
            <Text style={styles.greeting}>Chào buổi sáng,</Text>
            <Text style={styles.userName}>Alex Nguyen</Text>
            </View>
            <View style={styles.weather}>
              <Ionicons name="cloud-outline" size={30} color="#e5e7eb" style={styles.weatherIcon} />
              <View>
                <Text style={styles.weatherTemp}>26°C | °F</Text>
                <Text style={styles.weatherDesc}>Nhiều mây</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {hasDevices ? (
          <>
            {/* Sleep Quality Stats */}
            <View style={styles.statsContainer}>
              <LinearGradient
                colors={['#254b5d', '#213041', '#254b5d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sleepCard}
              >
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

                  <View style={styles.deepSleepWrap}>
                    <LinearGradient
                      colors={['#172332', '#1b2c38', '#22313f']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.deepSleepPill}
                    >
                      <Text style={styles.statMiniLabel} numberOfLines={1}>Giấc ngủ sâu</Text>
                      <Text style={styles.deepSleepValue} numberOfLines={1}>05:30:40</Text>
                    </LinearGradient>
                  </View>
                </View>
              </LinearGradient>
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
                          <Ionicons
                            name={
                              device.name.includes('Đèn')
                                ? 'bulb-outline'
                                : device.name.includes('Đồng hồ')
                                  ? 'alarm-outline'
                                  : device.name.includes('Công tắc')
                                    ? 'flash-outline'
                                    : 'radio-outline'
                            }
                            size={20}
                            color="#e3cda6"
                            style={styles.deviceEmoji}
                          />
                        </View>
                        <View style={styles.deviceInfoText}>
                          <Text style={styles.deviceName}>{device.name}</Text>
                          <Text style={styles.deviceLocation}>{device.location}</Text>
                        </View>
                      </View>
                      <View style={styles.deviceChevronCircle}>
                        <Ionicons name="chevron-forward" size={16} color="#e3cda6" style={styles.deviceChevron} />
                      </View>
                    </View>

                    <View style={styles.deviceStatus}>
                      <View style={[styles.statusIconCircle, device.isConnected ? styles.statusIconCircleActive : styles.statusIconCircleInactive]}>
                        <Ionicons
                          name={device.isConnected ? 'checkmark' : 'close'}
                          size={9}
                          color={device.isConnected ? '#22c55e' : '#e3cda6'}
                          style={styles.statusIconText}
                        />
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
              <Ionicons name="home-outline" size={48} color="#e3cda6" style={styles.emptyIconText} />
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
            <LinearGradient
              colors={['#254b5d', '#213041', '#254b5d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.aboutCardGradient}
            >
              <View style={styles.aboutContent}>
                <Text style={styles.aboutTitle}>Giới thiệu</Text>
                <Text style={styles.aboutDesc}>Khám phá hành trình và sứ mệnh của Nesen</Text>
              </View>
              <View style={styles.aboutArt}>
                <Ionicons name="moon-outline" size={12} color="#e3cda6" style={styles.aboutMoon} />
                <Ionicons name="bulb-outline" size={24} color="#e3cda6" style={styles.aboutLamp} />
                <Ionicons name="bed-outline" size={34} color="#e3cda6" style={styles.aboutSofa} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.aboutRow}>
            <TouchableOpacity style={styles.aboutSmallCard}>
              <LinearGradient
                colors={['#254b5d', '#213041', '#254b5d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aboutSmallCardGradient}
              >
                <View style={styles.aboutSmallTop}>
                  <Ionicons name="home-outline" size={14} color="#e3cda6" style={styles.aboutSmallIcon} />
                  <Text style={styles.aboutSmallTitle}>Sản phẩm</Text>
                </View>
                <Text style={styles.aboutSmallDesc}>Xem các sản phẩm hỗ trợ</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.aboutSmallCard}>
              <LinearGradient
                colors={['#254b5d', '#213041', '#254b5d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aboutSmallCardGradient}
              >
                <View style={styles.aboutSmallTop}>
                  <Ionicons name="newspaper-outline" size={14} color="#e3cda6" style={styles.aboutSmallIcon} />
                  <Text style={styles.aboutSmallTitle}>Tin tức</Text>
                </View>
                <Text style={styles.aboutSmallDesc}>Tin tức và chia sẻ hữu ích mỗi ngày</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
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
    marginHorizontal: -4,
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
    minHeight: 52,
    marginBottom: 6,
  },
  sleepMetricBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 52,
  },
  innerDivider: {
    width: 1,
    height: 44,
    alignSelf: 'center',
    backgroundColor: 'rgba(148, 163, 184, 0.35)',
    marginHorizontal: 6,
  },
  deepSleepPill: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 28,
  },
  deepSleepWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  deepSleepValue: {
    color: '#dbeafe',
    fontSize: 13,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
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
    fontVariant: ['tabular-nums'],
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
    backgroundColor: '#bbf7d0',
  },
  statusIconCircleInactive: {
    backgroundColor: '#637186',
  },
  statusIconText: {
    fontSize: 9,
    fontWeight: '700',
  },
  statusText: {
    color: '#8492a5',
    fontSize: 9,
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#22c55e',
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
    color: '#e3cda6',
    fontSize: 18,
    lineHeight: 20,
    marginLeft: 1,
  },
  aboutCard: {
    borderRadius: 14,
    overflow: 'hidden',
    minHeight: 98,
    marginBottom: 12,
  },
  aboutCardGradient: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 98,
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
    borderRadius: 12,
    overflow: 'hidden',
  },
  aboutSmallCardGradient: {
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
    color: '#e3cda6',
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
