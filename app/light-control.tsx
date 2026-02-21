import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const ENV_ITEMS = [
  { icon: 'thermometer', label: 'Nhiệt độ', value: '25.2 °C' },
  { icon: 'water', label: 'Độ ẩm', value: '45%' },
  { icon: 'cloud-alert', label: 'Khí CO2', value: '420 ppm' },
  { icon: 'blur', label: 'Bụi mịn PM 2.5', value: '2,5 μm/m³' },
];

const ARC_SIZE = 248;
const ARC_STROKE = 10;
const ARC_START_DEG = 283;
const ARC_SWEEP_DEG = 155;
const ARC_TOP_OFFSET = 0;
const ARC_LEFT_OFFSET = -30;
const ARC_TOUCH_PADDING = 28;
const SUN_ICON_SIZE = 22;
const SUN_ICON_LEFT_SHIFT = 3;
const SUN_ICON_EXTRA_LEFT_SHIFT = 13;

const normalizeDeg = (deg: number) => ((deg % 360) + 360) % 360;

export default function LightControl() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(true);
  const [brightness, setBrightness] = useState(40);

  const updateBrightnessFromTouch = (x: number, y: number) => {
    const center = ARC_SIZE / 2;
    const dx = x - center;
    const dy = y - center;
    const touchDeg = normalizeDeg((Math.atan2(dy, dx) * 180) / Math.PI);

    const start = normalizeDeg(ARC_START_DEG);
    const end = normalizeDeg(ARC_START_DEG + ARC_SWEEP_DEG);

    let clamped = touchDeg;

    if (start <= end) {
      clamped = Math.min(Math.max(touchDeg, start), end);
    } else {
      const inWrappedRange = touchDeg >= start || touchDeg <= end;
      if (!inWrappedRange) {
        const distToStart = Math.abs(touchDeg - start);
        const distToEnd = Math.abs(touchDeg - end);
        clamped = distToStart < distToEnd ? start : end;
      }
    }

    const progress = ((clamped - start + 360) % 360) / ARC_SWEEP_DEG;
    const nextBrightness = Math.round((1 - Math.min(Math.max(progress, 0), 1)) * 100);
    setBrightness(nextBrightness);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: event => {
          updateBrightnessFromTouch(
            event.nativeEvent.locationX - ARC_TOUCH_PADDING,
            event.nativeEvent.locationY - ARC_TOUCH_PADDING
          );
        },
        onPanResponderMove: event => {
          updateBrightnessFromTouch(
            event.nativeEvent.locationX - ARC_TOUCH_PADDING,
            event.nativeEvent.locationY - ARC_TOUCH_PADDING
          );
        },
      }),
    []
  );

  const radius = (ARC_SIZE - ARC_STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * (ARC_SWEEP_DEG / 360);
  const activeArcLength = arcLength * (brightness / 100);
  const activeArcOffset = -(arcLength - activeArcLength);
  const knobProgress = 1 - brightness / 100;
  const knobAngle = (ARC_START_DEG + ARC_SWEEP_DEG * knobProgress) * (Math.PI / 180);
  const knobX = ARC_SIZE / 2 + radius * Math.cos(knobAngle);
  const knobY = ARC_SIZE / 2 + radius * Math.sin(knobAngle);
  const startAngle = (ARC_START_DEG * Math.PI) / 180;
  const endAngle = ((ARC_START_DEG + ARC_SWEEP_DEG) * Math.PI) / 180;
  const sunStartX =
    ARC_SIZE / 2 +
    radius * Math.cos(startAngle) -
    SUN_ICON_SIZE / 2 -
    SUN_ICON_LEFT_SHIFT -
    SUN_ICON_EXTRA_LEFT_SHIFT +
    ARC_LEFT_OFFSET;
  const sunStartY =
    ARC_SIZE / 2 +
    radius * Math.sin(startAngle) -
    SUN_ICON_SIZE / 2 +
    ARC_TOP_OFFSET;
  const sunEndX =
    ARC_SIZE / 2 +
    radius * Math.cos(endAngle) -
    SUN_ICON_SIZE / 2 -
    SUN_ICON_LEFT_SHIFT -
    SUN_ICON_EXTRA_LEFT_SHIFT +
    ARC_LEFT_OFFSET;
  const sunEndY =
    ARC_SIZE / 2 +
    radius * Math.sin(endAngle) -
    SUN_ICON_SIZE / 2 +
    ARC_TOP_OFFSET;

  const auraCenterX = 65;
  const auraCenterY = 76;
  const auraOuterSize = 130 + brightness * 0.5;
  const auraInnerSize = 96 + brightness * 0.35;
  const auraOuterOpacity = 0.08 + brightness * 0.0011;
  const auraInnerOpacity = 0.14 + brightness * 0.0015;

  return (
    <ImageBackground
      source={require('../assets/images/background2.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.topSpacer} />

        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={34} color="#f3f4f6" />
          </TouchableOpacity>
          <Text style={styles.title}>Đèn ngủ</Text>
          <TouchableOpacity>
            <Text style={styles.saveText}>Lưu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.controlArea}>
          <View style={styles.leftArea}>
            <View style={styles.arcWrap}>
              <Svg width={ARC_SIZE} height={ARC_SIZE} style={styles.arcSvg}>
                <G rotation={ARC_START_DEG} origin={`${ARC_SIZE / 2}, ${ARC_SIZE / 2}`}>
                  <Circle
                    cx={ARC_SIZE / 2}
                    cy={ARC_SIZE / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(205, 220, 233, 0.78)"
                    strokeWidth={ARC_STROKE}
                    strokeLinecap="round"
                    strokeDasharray={`${arcLength} ${circumference}`}
                  />
                  <Circle
                    cx={ARC_SIZE / 2}
                    cy={ARC_SIZE / 2}
                    r={radius}
                    fill="none"
                    stroke="#eadcb7"
                    strokeWidth={ARC_STROKE}
                    strokeLinecap="round"
                    strokeDasharray={`${activeArcLength} ${circumference}`}
                    strokeDashoffset={activeArcOffset}
                  />
                </G>
              </Svg>

              <MaterialCommunityIcons
                name="white-balance-sunny"
                size={SUN_ICON_SIZE}
                color="#e3cda6"
                style={[styles.sunIcon, { left: sunStartX, top: sunStartY }]}
              />
              <MaterialCommunityIcons
                name="white-balance-sunny"
                size={SUN_ICON_SIZE}
                color="rgba(226, 232, 240, 0.5)"
                style={[styles.sunIcon, { left: sunEndX, top: sunEndY }]}
              />

              <View style={[styles.knob, { left: knobX - 12 + ARC_LEFT_OFFSET, top: knobY - 12 + ARC_TOP_OFFSET }]} />

              <View style={styles.lampMock}>
                <View
                  style={[
                    styles.lampAuraOuter,
                    {
                      width: auraOuterSize,
                      height: auraOuterSize,
                      borderRadius: auraOuterSize / 2,
                      left: auraCenterX - auraOuterSize / 2,
                      top: auraCenterY - auraOuterSize / 2,
                      backgroundColor: `rgba(243, 218, 165, ${auraOuterOpacity})`,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.lampAuraInner,
                    {
                      width: auraInnerSize,
                      height: auraInnerSize,
                      borderRadius: auraInnerSize / 2,
                      left: auraCenterX - auraInnerSize / 2,
                      top: auraCenterY - auraInnerSize / 2,
                      backgroundColor: `rgba(243, 218, 165, ${auraInnerOpacity})`,
                    },
                  ]}
                />
                <Image source={require('../assets/images/lamp.png')} style={styles.lampImage} resizeMode="contain" />
              </View>

              <View style={styles.arcTouchLayer} {...panResponder.panHandlers} />
            </View>
          </View>

          <View style={styles.rightPanelWrap}>
            <Switch
              value={enabled}
              onValueChange={setEnabled}
              trackColor={{ false: '#475569', true: '#d8c39f' }}
              thumbColor="#f5f5f5"
              style={styles.switchStyle}
            />

            <View style={styles.quickPanel}>
              <View style={styles.quickItem}>
                <View style={styles.quickIconWrap}>
                  <MaterialCommunityIcons name="timer-outline" size={24} color="#e5e7eb" />
                </View>
                <Text style={styles.quickText}>Hẹn giờ</Text>
              </View>
              <View style={styles.quickItem}>
                <View style={styles.quickIconWrap}>
                  <MaterialCommunityIcons name="bed-queen-outline" size={24} color="#e5e7eb" />
                </View>
                <Text style={styles.quickText}>Ngủ</Text>
              </View>
              <View style={styles.quickItem}>
                <View style={styles.quickIconWrap}>
                  <MaterialCommunityIcons name="meditation" size={24} color="#e5e7eb" />
                </View>
                <Text style={styles.quickText}>Thư giãn</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.brightnessPill}>
          <Text style={styles.brightnessText}>Độ sáng: {brightness}%</Text>
        </View>

        <Text style={styles.sectionTitle}>MÔI TRƯỜNG PHÒNG NGỦ</Text>

        <View style={styles.envCard}>
          {ENV_ITEMS.map((item, index) => (
            <View key={item.label} style={[styles.envRow, index < ENV_ITEMS.length - 1 && styles.envRowBorder]}>
              <View style={styles.envLeft}>
                <View style={styles.envIconBox}>
                  <MaterialCommunityIcons name={item.icon as any} size={22} color="#e3cda6" />
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
  topSpacer: {
    height: '5%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    marginBottom: 14,
  },
  title: { color: '#f3f4f6', fontSize: 24, fontWeight: '600' },
  saveText: { color: '#e6d5be', fontSize: 20, fontWeight: '600' },
  controlArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: 286,
    marginBottom: 12,
    marginLeft: -16,
  },
  leftArea: {
    width: '70%',
    alignItems: 'flex-start',
    marginLeft: -10,
    justifyContent: 'center',
  },
  arcWrap: {
    width: ARC_SIZE,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 2,
  },
  arcSvg: {
    position: 'absolute',
    left: ARC_LEFT_OFFSET,
    top: ARC_TOP_OFFSET,
  },
  arcTouchLayer: {
    position: 'absolute',
    width: ARC_SIZE + ARC_TOUCH_PADDING * 2,
    height: ARC_SIZE + ARC_TOUCH_PADDING * 2,
    left: ARC_LEFT_OFFSET - ARC_TOUCH_PADDING,
    top: ARC_TOP_OFFSET - ARC_TOUCH_PADDING,
    zIndex: 10,
  },
  sunIcon: {
    position: 'absolute',
  },
  knob: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e8d8bc',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  lampMock: {
    marginTop: 34,
    width: 130,
    height: 205,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    left: -18,
  },
  lampImage: {
    width: 130,
    height: 205,
  },
  lampAuraOuter: {
    position: 'absolute',
  },
  lampAuraInner: {
    position: 'absolute',
  },
  brightnessPill: {
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(66, 95, 124, 0.74)',
  },
  brightnessText: { color: '#eaf2fb', fontSize: 14, fontWeight: '700' },
  rightPanelWrap: {
    width: '29%',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    height: 250,
    paddingTop: 11,
    paddingBottom: 7,
    position: 'relative',
    top: -24,
  },
  switchStyle: {
    transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
    marginBottom: 0,
  },
  quickPanel: {
    width: '100%',
    backgroundColor: 'rgba(32, 56, 86, 0.72)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 6,
    gap: 4,
  },
  quickItem: { alignItems: 'center' },
  quickIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(59, 85, 119, 0.9)',
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickText: { color: '#dbe7f4', fontSize: 9, fontWeight: '500' },
  sectionTitle: {
    color: '#5f89ad',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 4,
  },
  envCard: {
    backgroundColor: 'rgba(46, 73, 108, 0.82)',
    borderRadius: 16,
    paddingHorizontal: 13,
    paddingVertical: 1,
  },
  envRow: {
    minHeight: 72,
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
    width: 43,
    height: 43,
    borderRadius: 11,
    backgroundColor: 'rgba(80, 109, 146, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  envLabel: { color: '#93a7ba', fontSize: 15 },
  envValue: { color: '#dfebf8', fontSize: 16, fontWeight: '700' },
});