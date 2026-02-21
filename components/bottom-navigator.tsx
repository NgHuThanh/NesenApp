import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

const LEFT_TABS = [
  { key: 'devices', label: 'Thiết bị', icon: 'grid-outline', route: './devices' },
  { key: 'search', label: 'Tìm kiếm', icon: 'search-outline' },
];

const RIGHT_TABS = [
  { key: 'history', label: 'Lịch sử', icon: 'timer-outline', route: './history' },
  { key: 'account', label: 'Tài khoản', icon: 'person-outline', route: './account' },
];

const CENTER_CURVE_PATH = 'M0 0 C 0 66, 48 100, 100 100 L100 100 L0 100 Z';

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

  const renderTab = (tab: { key: string; label: string; icon: string; route?: string }) => {
    const active = isActive(tab.key);
    const iconColor = active ? '#f0ddb8' : '#79879f';
    const labelColor = active ? '#f0ddb8' : '#79879f';

    return (
      <TouchableOpacity
        key={tab.key}
        style={[styles.item, !tab.route && styles.itemDisabled]}
        onPress={() => tab.route && router.navigate(tab.route as never)}
        disabled={!tab.route}
      >
        <Ionicons name={tab.icon as any} size={22} color={iconColor} style={styles.icon} />
        <Text style={[styles.label, { color: labelColor }]}>{tab.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrap}> 
      <View style={styles.rowShell}>
        <View style={[styles.sidePanel, styles.leftPanel]}>{LEFT_TABS.map(renderTab)}</View>
        <View style={styles.centerGap}>
          <View style={styles.centerGapStack}>
            <View style={styles.centerGapBottomFill}>
              <View style={[styles.centerGapHalf, styles.centerGapHalfLeft]}>
                <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <Path d={CENTER_CURVE_PATH} fill="rgba(34, 50, 79, 0.96)" />
                </Svg>
              </View>
              <View style={[styles.centerGapHalf, styles.centerGapHalfRight]}>
                <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <Path d={CENTER_CURVE_PATH} fill="rgba(34, 50, 79, 0.96)" />
                </Svg>
              </View>
            </View>
            <View style={styles.centerGapLowerRow}>
              <View style={styles.centerGapLowerBlock} />
              <View style={styles.centerGapLowerBlock} />
            </View>
          </View>
        </View>
        <View style={[styles.sidePanel, styles.rightPanel]}>{RIGHT_TABS.map(renderTab)}</View>
      </View>

      <TouchableOpacity style={styles.homeTouch} onPress={() => router.navigate('./home' as never)}>
        <View style={styles.homeOuterCircle}>
          <View style={styles.homeCircle}>
            <Ionicons
              name="home"
              size={24}
              color={isActive('home') ? '#223350' : '#314563'}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  rowShell: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  sidePanel: {
    width: '40%',
    height: 60,
    backgroundColor: 'rgba(34, 50, 79, 0.96)',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 0,
  },
  leftPanel: {
    borderTopRightRadius: 25,
  },
  rightPanel: {
    borderTopLeftRadius: 18,
  },
  centerGap: {
    width: '20%',
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  centerGapStack: {
    height: '100%',
    position: 'relative',
  },
  centerGapBottomFill: {
    position: 'absolute',
    top: '32%',
    left: 0,
    right: 0,
    height: '38%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  centerGapHalf: {
    flex: 1,
    overflow: 'hidden',
  },
  centerGapHalfLeft: {
    marginRight: 0,
  },
  centerGapHalfRight: {
    transform: [{ scaleX: -1 }],
  },
  centerGapLowerRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  centerGapLowerBlock: {
    flex: 1,
    backgroundColor: 'rgba(34, 50, 79, 0.96)',
  },
  homeTouch: {
    position: 'absolute',
    top: -28,
    left: '50%',
    transform: [{ translateX: -35 }],
  },
  homeOuterCircle: {
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  homeCircle: {
    width: 56,
    height: 56,
    borderRadius: 58,
    backgroundColor: '#e6d5be',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    paddingTop: 0,
  },
  itemDisabled: { opacity: 0.85 },
  icon: {
    marginBottom: 0,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  },
});