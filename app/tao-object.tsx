import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PRESETS = {
  nong: { label: 'Nông', scale: 1.7, topRatio: 0.48 },
  vua: { label: 'Vừa', scale: 2.0, topRatio: 0.5 },
  sau: { label: 'Sâu', scale: 2.8, topRatio: 0.64 },
} as const;

type PresetKey = keyof typeof PRESETS;

export default function TaoObjectScreen() {
  const router = useRouter();
  const [presetKey, setPresetKey] = useState<PresetKey>('sau');

  const preset = useMemo(() => PRESETS[presetKey], [presetKey]);
  const bigCircleSize = 220 * preset.scale;
  const bigTop = -(220 * preset.topRatio);
  const smallCircleSize = 160 * preset.scale;
  const smallTop = -(160 * preset.topRatio);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Tạo object</Text>

      <View style={styles.presetRow}>
        {(Object.keys(PRESETS) as PresetKey[]).map((key) => {
          const active = key === presetKey;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.presetBtn, active && styles.presetBtnActive]}
              onPress={() => setPresetKey(key)}
            >
              <Text style={[styles.presetText, active && styles.presetTextActive]}>{PRESETS[key].label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.previewWrap}>
        <Text style={styles.caption}>Object gốc (ảnh 2)</Text>
        <View style={styles.objectSquare}>
          <View
            style={[
              styles.cutCircle,
              {
                width: bigCircleSize,
                height: bigCircleSize,
                borderRadius: bigCircleSize / 2,
                top: bigTop,
              },
            ]}
          />
        </View>

        <Text style={styles.caption}>Ghép 2 object (ảnh 3)</Text>
        <View style={styles.pairRow}>
          <View style={styles.objectSquareSmall}>
            <View
              style={[
                styles.cutCircleSmall,
                {
                  width: smallCircleSize,
                  height: smallCircleSize,
                  borderRadius: smallCircleSize / 2,
                  top: smallTop,
                },
              ]}
            />
          </View>
          <View style={[styles.objectSquareSmall, styles.mirrorX]}>
            <View
              style={[
                styles.cutCircleSmall,
                {
                  width: smallCircleSize,
                  height: smallCircleSize,
                  borderRadius: smallCircleSize / 2,
                  top: smallTop,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  backText: {
    fontSize: 18,
    color: '#223250',
    fontWeight: '600',
  },
  title: {
    marginTop: 6,
    fontSize: 28,
    color: '#223250',
    fontWeight: '700',
  },
  presetRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  presetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#d9d9d9',
  },
  presetBtnActive: {
    backgroundColor: '#22355a',
  },
  presetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22355a',
  },
  presetTextActive: {
    color: '#efefef',
  },
  previewWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  caption: {
    fontSize: 16,
    fontWeight: '600',
    color: '#223250',
  },
  objectSquare: {
    width: 220,
    height: 220,
    backgroundColor: '#22355a',
    overflow: 'hidden',
  },
  cutCircle: {
    position: 'absolute',
    backgroundColor: '#efefef',
    left: 0,
    top: -110,
  },
  pairRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  objectSquareSmall: {
    width: 160,
    height: 160,
    backgroundColor: '#22355a',
    overflow: 'hidden',
  },
  cutCircleSmall: {
    position: 'absolute',
    backgroundColor: '#efefef',
    left: 0,
    top: -80,
  },
  mirrorX: {
    transform: [{ scaleX: -1 }],
  },
});
