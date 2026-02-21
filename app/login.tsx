import { Ionicons } from '@expo/vector-icons';
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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.replace('./welcome');
  };

  const handleForgotPassword = () => {
    console.log('Quên mật khẩu');
  };

  const handleGoToRegister = () => {
    router.push('./register');
  };

  const handleGoBack = () => {
    router.back();
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
          <Text style={styles.title}>Đăng nhập</Text>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Email/Phone Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={18} color="#ffffff" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email/SDT"
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  editable={true}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={18} color="#ffffff" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={true}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={18}
                    color="#ffffff"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password & Help */}
            <View style={styles.helpRow}>
              <TouchableOpacity onPress={handleGoToRegister}>
                <Text style={styles.helpText}>Đăng ký</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.helpText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Hoặc đăng nhập bằng</Text>
              <View style={styles.line} />
            </View>

            {/* Social Login */}
            <View style={styles.socialSection}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={20} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Footer Text */}
            <Text style={styles.footerText}>
              Bằng việc sử dụng Nesen, tôi đồng ý với{'\n'}
              <Text style={styles.link}>Điều khoản và Điều kiện</Text> của Nesen
            </Text>
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
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: Dimensions.get('window').height * 0.05,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    color: '#8cc0d6',
    fontSize: 14,
    fontWeight: '500',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.08,
    marginBottom: Dimensions.get('window').height * 0.1,
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
    marginHorizontal: '10%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
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
    paddingHorizontal: 0,
  },
  eyeIcon: {
    padding: 8,
  },
  helpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginHorizontal: '10%',
  },
  helpText: {
    fontSize: 13,
    color: '#e2d1b2',
    
  },
  loginButton: {
    backgroundColor: '#e2d1b2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: '10%',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a2332',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: '10%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#85959d',
    fontSize: 12,
  },
  socialSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
    marginHorizontal: '10%',
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footerText: { position: 'absolute', bottom: Dimensions.get('window').height * -0.15, width: '100%', fontSize: 11, color: '#909fa6', textAlign: 'center', lineHeight: 16, },
  link: {
    textDecorationLine: 'underline',
    color: '#e2d1b2'
  },
});
