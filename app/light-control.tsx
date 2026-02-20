import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ENV_ITEMS = [
  { icon: '🌡️', label: 'Nhiệt độ', value: '25.2 °C' },
  { icon: '💧', label: 'Độ ẩm', value: '45%' },
  { icon: '☁️', label: 'Khí CO2', value: '420 ppm' },
  { icon: '🌫️', label: 'Bụi mịn PM 2.5', value: '2,5 μm/m³' },
];

export default function LightControl() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(true);

  return (
    <ImageBackground
      source={require('../assets/images/background2.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Đèn ngủ</Text>
          <TouchableOpacity>
            <Text style={styles.saveText}>Lưu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.controlArea}>
          <View style={styles.leftArea}>
            <View style={styles.arcWrap}>
              <View style={styles.arcOuter}>
                <View style={styles.arcInner} />
                <View style={styles.knob} />
              </View>
              <View style={styles.lampMock}>
                <Text style={styles.lampEmoji}>💡</Text>
              </View>
            </View>

            <View style={styles.brightnessPill}>
              <Text style={styles.brightnessText}>Độ sáng: 40%</Text>
            </View>
          </View>

          <View style={styles.rightPanelWrap}>
            <Switch
              value={enabled}
              onValueChange={setEnabled}
              trackColor={{ false: '#475569', true: '#d8c39f' }}
              thumbColor="#f5f5f5"
            />

            <View style={styles.quickPanel}>
              <View style={styles.quickItem}>
                <Text style={styles.quickIcon}>⏱️</Text>
                <Text style={styles.quickText}>Hẹn giờ</Text>
              </View>
              <View style={styles.quickItem}>
                <Text style={styles.quickIcon}>🛏️</Text>
                <Text style={styles.quickText}>Ngủ</Text>
              </View>
              <View style={styles.quickItem}>
                <Text style={styles.quickIcon}>🧘</Text>
                <Text style={styles.quickText}>Thư giãn</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>MÔI TRƯỜNG PHÒNG NGỦ</Text>

        <View style={styles.envCard}>
          {ENV_ITEMS.map((item, index) => (
            <View key={item.label} style={[styles.envRow, index < ENV_ITEMS.length - 1 && styles.envRowBorder]}>
              <View style={styles.envLeft}>
                <View style={styles.envIconBox}>
                  <Text style={styles.envIcon}>{item.icon}</Text>
                </View>
                <Text style={styles.envLabel}>{item.label}</Text>
              </View>
              <Text style={styles.envValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  safe: { flex: 1, backgroundColor: 'transparent', paddingHorizontal: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    marginBottom: 18,
  },
  backIcon: { color: '#d8e5f3', fontSize: 40, lineHeight: 40 },
  title: { color: '#f3f4f6', fontSize: 36, fontWeight: '600' },
  saveText: { color: '#e6d5be', fontSize: 34, fontWeight: '500' },
  controlArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  leftArea: { width: '67%', alignItems: 'center' },
  arcWrap: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arcOuter: {
    width: '86%',
    height: '86%',
    borderRadius: 999,
    borderWidth: 10,
    borderColor: 'rgba(220, 235, 247, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arcInner: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: 999,
    backgroundColor: 'rgba(15, 30, 46, 0.5)',
  },
  knob: {
    position: 'absolute',
    right: -8,
    bottom: 72,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#e8d8bc',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  lampMock: {
    position: 'absolute',
    width: 132,
    height: 132,
    borderRadius: 66,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(229, 218, 188, 0.16)',
  },
  lampEmoji: { fontSize: 64 },
  brightnessPill: {
    marginTop: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(66, 95, 124, 0.8)',
  },
  brightnessText: { color: '#eaf2fb', fontSize: 22, fontWeight: '700' },
  rightPanelWrap: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quickPanel: {
    width: '100%',
    marginTop: 12,
    backgroundColor: 'rgba(32, 56, 86, 0.78)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 10,
  },
  quickItem: { alignItems: 'center' },
  quickIcon: {
    fontSize: 26,
    width: 54,
    height: 54,
    borderRadius: 27,
    textAlign: 'center',
    lineHeight: 54,
    backgroundColor: 'rgba(59, 85, 119, 0.9)',
    marginBottom: 4,
  },
  quickText: { color: '#dbe7f4', fontSize: 15, fontWeight: '500' },
  sectionTitle: {
    color: '#5f89ad',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 8,
  },
  envCard: {
    backgroundColor: 'rgba(46, 73, 108, 0.82)',
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  envRow: {
    minHeight: 76,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  envRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  envLeft: { flexDirection: 'row', alignItems: 'center' },
  envIconBox: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: 'rgba(80, 109, 146, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  envIcon: { fontSize: 24 },
  envLabel: { color: '#aab8c7', fontSize: 16 },
  envValue: { color: '#dfebf8', fontSize: 19, fontWeight: '700' },
});