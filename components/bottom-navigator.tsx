import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TABS = [
  { key: 'devices', label: 'Thiết bị', icon: 'grid-outline', route: './devices' },
  { key: 'search', label: 'Tìm kiếm', icon: 'search-outline' },
  { key: 'home', label: '', icon: 'home', route: './home', center: true },
  { key: 'history', label: 'Lịch sử', icon: 'timer-outline', route: './history' },
  { key: 'account', label: 'Tài khoản', icon: 'person-outline', route: './account' },
];

export default function BottomNavigator() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (key: string) => {
    if (key === 'home') return pathname === '/home';
    if (key === 'devices') return pathname === '/devices';
    if (key === 'history') return pathname === '/history';
    if (key === 'account') return pathname === '/account';
    return false;
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const active = isActive(tab.key);
          const iconColor = active ? '#f3e2c0' : '#7f8ca3';

          if (tab.center) {
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.centerTouch}
                onPress={() => tab.route && router.navigate(tab.route as never)}
              >
                <View style={styles.centerCircle}>
                  <Ionicons name="home" size={28} color="#223350" />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.item}
              onPress={() => tab.route && router.navigate(tab.route as never)}
              disabled={!tab.route}
            >
              <Ionicons name={tab.icon as any} size={26} color={iconColor} style={styles.icon} />
              <Text style={[styles.label, { color: iconColor }]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 10,
    backgroundColor: 'rgba(21, 37, 63, 0.95)',
  },
  bar: {
    height: 78,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    paddingBottom: 4,
  },
  icon: {
    marginBottom: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
  centerTouch: {
    marginTop: -34,
  },
  centerCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#e6d5be',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(21, 37, 63, 0.95)',
  },
});