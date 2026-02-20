import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ActivityType = 'brightness' | 'connect' | 'power' | 'delete';

interface Activity {
  id: string;
  deviceName: string;
  action: string;
  location: string;
  timestamp: string;
  type: ActivityType;
}

const DEMO_ACTIVITIES: Activity[] = [
  {
    id: '1',
    deviceName: 'Đèn ngủ chính',
    action: 'Bật đèn với độ sáng 20%',
    location: 'Phòng ngủ',
    timestamp: '22:30:20 03-09-2025',
    type: 'brightness',
  },
  {
    id: '2',
    deviceName: 'Đèn ngủ chính',
    action: 'Kết nối thiết bị',
    location: 'Phòng ngủ',
    timestamp: '22:30:20 03-09-2025',
    type: 'connect',
  },
  {
    id: '3',
    deviceName: 'Đèn ngủ chính',
    action: 'Bật đèn với độ sáng 20%',
    location: 'Phòng ngủ',
    timestamp: '22:30:20 03-09-2025',
    type: 'power',
  },
  {
    id: '4',
    deviceName: 'Đèn ngủ chính',
    action: 'Xóa thiết bị',
    location: 'Phòng ngủ',
    timestamp: '22:30:20 03-09-2025',
    type: 'delete',
  },
  {
    id: '5',
    deviceName: 'Đèn ngủ chính',
    action: 'Bật đèn với độ sáng 20%',
    location: 'Phòng ngủ',
    timestamp: '22:30:20 03-09-2025',
    type: 'brightness',
  },
  {
    id: '6',
    deviceName: 'Đèn ngủ chính',
    action: 'Kết nối thiết bị',
    location: 'Phòng ngủ',
    timestamp: '22:30:20 03-09-2025',
    type: 'connect',
  },
];

const FILTERS = ['Tất cả', 'Đèn ngủ', 'Cảm biến', 'Đồng hồ'];

export default function History() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'brightness':
        return '⚙️';
      case 'connect':
        return '✓';
      case 'power':
        return '⏻';
      case 'delete':
        return '🗑️';
      default:
        return '•';
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Lịch sử</Text>
        <TouchableOpacity style={styles.calendarBtn}>
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterTab, activeFilter === filter && styles.filterTabActive]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.container}>
        {/* Activity List Header */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>DANH SÁCH HOẠT ĐỘNG</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{DEMO_ACTIVITIES.length}</Text>
          </View>
        </View>

        {/* Activity Cards */}
        {DEMO_ACTIVITIES.map((activity) => (
          <View key={activity.id} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.deviceName}>{activity.deviceName}</Text>
              <Text style={styles.timestamp}>{activity.timestamp}</Text>
            </View>

            <View style={styles.activityBody}>
              <View style={styles.iconContainer}>
                <Text style={styles.activityIcon}>{getActivityIcon(activity.type)}</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.actionText}>{activity.action}</Text>
                <Text style={styles.locationText}>Vị trí: {activity.location}</Text>
              </View>
            </View>
          </View>
        ))}

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
  title: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  calendarBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarIcon: { fontSize: 20 },
  filterContainer: {
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  filterTabActive: {
    backgroundColor: '#d4a574',
  },
  filterText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#1f2937',
    fontWeight: '600',
  },
  container: { flex: 1, paddingHorizontal: 16 },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  listTitle: {
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
  activityCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  timestamp: {
    color: '#9ca3af',
    fontSize: 12,
  },
  activityBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  actionText: {
    color: '#e5e7eb',
    fontSize: 14,
    marginBottom: 4,
  },
  locationText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  bottomSpacer: {
    height: 40,
  },
});
