import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

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
  const { height: screenHeight } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'brightness':
        return { name: 'settings-outline' as const, color: '#e5e7eb' };
      case 'connect':
        return { name: 'checkmark-outline' as const, color: '#e5e7eb' };
      case 'power':
        return { name: 'power-outline' as const, color: '#e5e7eb' };
      case 'delete':
        return { name: 'trash-outline' as const, color: '#e5e7eb' };
      default:
        return { name: 'ellipse-outline' as const, color: '#e5e7eb' };
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.header, { marginTop: screenHeight * 0.05 }]}>
        <Text style={styles.title}>Lịch sử</Text>
        <TouchableOpacity style={styles.calendarBtn}>
          <Ionicons name="calendar-outline" size={24} color="#e5e7eb" />
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

      <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
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
                <Ionicons
                  name={getActivityIcon(activity.type).name}
                  size={26}
                  color={getActivityIcon(activity.type).color}
                />
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
  safe: { flex: 1, backgroundColor: 'transparent' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '600',
    textAlign: 'center',
  },
  calendarBtn: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  filterContainer: {
    maxHeight: 64,
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 10,
  },
  filterTab: {
    minWidth: 100,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabActive: {
    backgroundColor: '#d4a574',
  },
  filterText: {
    color: '#9ca3af',
    fontSize: 15,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#1f2937',
    fontWeight: '600',
  },
  container: { flex: 1, paddingHorizontal: 16 },
  containerContent: { paddingBottom: 120 },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 12,
  },
  listTitle: {
    color: '#60a5fa',
    fontSize: 13,
    fontWeight: '600',
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
    fontSize: 13,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: 'rgba(35, 53, 81, 0.92)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: 14,
  },
  iconContainer: {
    width: 54,
    height: 54,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
    height: 20,
  },
});
