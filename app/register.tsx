import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleRegister = () => {
    // Placeholder: should call API then navigate to add-phone or verify
    router.push('./add-phone');
  };

  return (
    <ImageBackground
      source={require('../assets/images/background1.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Text style={styles.logo}>nesen</Text>
            <Text style={styles.tagline}>sense your space</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Đăng ký</Text>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Username */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Text style={styles.icon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tên người dùng"
                  placeholderTextColor="#9ca3af"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Text style={styles.icon}>📧</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Text style={styles.icon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Text style={styles.icon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor="#9ca3af"
                  value={confirm}
                  onChangeText={setConfirm}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Text>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Checkbox */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgreed(!agreed)}
            >
              <View style={[styles.checkbox, agreed && styles.checkboxOn]} />
              <Text style={styles.checkboxText}>
                Tôi đã đọc và đồng ý với{' '}
                <Text style={styles.checkboxLinkText}>Thỏa thuận người dùng</Text>
                {' '}và{' '}
                <Text style={styles.checkboxLinkText}>Chính sách Riêng tư</Text>
              </Text>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity
              style={[styles.cta, !agreed && styles.ctaDisabled]}
              onPress={handleRegister}
              disabled={!agreed}
            >
              <Text style={styles.ctaText}>Đăng ký</Text>
            </TouchableOpacity>

            {/* Link to Login */}
            <TouchableOpacity onPress={() => router.push('./login')}>
              <Text style={styles.link}>Bạn đã có tài khoản? Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safe: { flex: 1, backgroundColor: 'transparent' },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: Dimensions.get('window').height * 0.05,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.08,
    marginBottom: Dimensions.get('window').height * 0.1,
  },
  container: {
    flex: 1,
  },
  logo: {
    fontSize: 47,
    fontWeight: '500',
    color: '#e2d1b2',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    color: '#e2d1b2',
    marginTop: -10,
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 25,
    fontWeight: '400',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  icon: {
    fontSize: 18,
    marginRight: 12,
    color: '#ffffff',
    width: 24,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 15,
    color: '#ffffff',
  },
  eyeIcon: {
    padding: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 12,
  },
  checkboxOn: { backgroundColor: '#e6d5be' },
  checkboxText: { color: '#cbd5e1', flex: 1 },
  checkboxLinkText: {
    color: '#e6d5be',
    textDecorationLine: 'underline',
  },
  cta: {
    backgroundColor: '#e6d5be',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  ctaDisabled: { opacity: 0.5 },
  ctaText: { color: '#1a2332', fontWeight: '700' },
  link: { color: '#e6d5be', textAlign: 'center', marginTop: 12 },
});
