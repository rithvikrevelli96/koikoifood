import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { GoogleLogoSvg } from '../../core/components/SvgIcons';
import {
  theme,
  Input,
  Button,
  Text,
  ProfileCard,
  BottomSheet
} from '../../design-system';
import { usePhoneAuth } from './hooks/usePhoneAuth';
import { AuthenticationLayout } from './components/AuthenticationLayout';
import { AuthContent } from './components/AuthContent';

export default function AuthScreen() {
  const authProps = usePhoneAuth();

  const {
    authFade,
    authSlideY,
    googleModalVisible,
    setGoogleModalVisible,
    appleModalVisible,
    setAppleModalVisible,
    showCustomEmailInput,
    setShowCustomEmailInput,
    customEmail,
    setCustomEmail,
    customEmailError,
    setCustomEmailError,
    setUser,
    setSubscribed,
    go,
    setToast,
  } = authProps;

  const getNextScreen = (userData: any): any => {
    if (userData.profileCompleted && userData.locationCompleted) {
      return 'home';
    }
    if (userData.profileCompleted) {
      return 'setup2';
    }
    return 'setup1';
  };

  return (
    <AuthenticationLayout>

      {/* Slide / Fade Container */}
      <Animated.View style={{
        width: '100%',
        opacity: authFade,
        transform: [{ translateY: authSlideY }]
      }}>
        <AuthContent {...authProps} />
      </Animated.View>

      {/* Google Sign-In Simulator Bottom Sheet */}
      <BottomSheet
        visible={googleModalVisible}
        onClose={() => setGoogleModalVisible(false)}
        height={450}
      >
        <View style={{ paddingVertical: theme.spacing.sm }}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
            <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
              <GoogleLogoSvg />
            </View>
            <Text variant="title" color="text" style={{ textAlign: 'center' }}>Choose an account</Text>
            <Text variant="caption" color="sub" style={{ marginTop: 4 }}>to continue to Koi Koi Dabba</Text>
          </View>

          {/* Account choices */}
          {!showCustomEmailInput ? (
            <View style={{ gap: theme.spacing.md }}>
              <TouchableOpacity
                onPress={() => {
                  setGoogleModalVisible(false);
                  setToast('Signed in as bhargav@koikoi.in');
                  setUser((prev: any) => {
                    const updated = {
                      ...prev,
                      phone: '+91 9876543210',
                      name: 'Bhargav',
                      email: 'bhargav@koikoi.in',
                      address: 'Plot 42, Jubilee Hills',
                      height: '178',
                      weight: '74',
                      goal: 'Healthy Living',
                      profileCompleted: true,
                      locationCompleted: true,
                      healthCompleted: true,
                    };
                    setSubscribed(true);
                    setTimeout(() => go(getNextScreen(updated)), 100);
                    return updated;
                  });
                }}
              >
                <ProfileCard style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
                  <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: theme.colors.secondary, justifyContent: 'center', alignItems: 'center' }}>
                    <Text variant="mono" color="inverse" style={{ fontWeight: 'bold' }}>B</Text>
                  </View>
                  <View>
                    <Text variant="body" color="text" style={{ fontWeight: 'bold' }}>Bhargav</Text>
                    <Text variant="caption" color="sub">bhargav@koikoi.in</Text>
                  </View>
                </ProfileCard>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setGoogleModalVisible(false);
                  setToast('Signed in as rithvik@gmail.com');
                  setUser((prev: any) => {
                    const updated = {
                      ...prev,
                      phone: '',
                      name: 'Rithvik Revelli',
                      email: 'rithvik@gmail.com',
                      address: '',
                      height: '',
                      weight: '',
                      profileCompleted: false,
                      locationCompleted: false,
                      healthCompleted: false,
                    };
                    setSubscribed(false);
                    setTimeout(() => go(getNextScreen(updated)), 100);
                    return updated;
                  });
                }}
              >
                <ProfileCard style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
                  <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: theme.colors.success, justifyContent: 'center', alignItems: 'center' }}>
                    <Text variant="mono" color="inverse" style={{ fontWeight: 'bold' }}>R</Text>
                  </View>
                  <View>
                    <Text variant="body" color="text" style={{ fontWeight: 'bold' }}>Rithvik Revelli</Text>
                    <Text variant="caption" color="sub">rithvik@gmail.com</Text>
                  </View>
                </ProfileCard>
              </TouchableOpacity>

              <Button
                title="+ Use another account"
                variant="ghost"
                size="medium"
                onPress={() => setShowCustomEmailInput(true)}
              />
            </View>
          ) : (
            <View style={{ gap: theme.spacing.md }}>
              <Input
                label="Email Address"
                value={customEmail}
                onChangeText={(text) => {
                  setCustomEmail(text);
                  setCustomEmailError('');
                }}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={customEmailError}
              />

              <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                <Button
                  title="Back"
                  variant="outline"
                  size="medium"
                  fullWidth={false}
                  style={{ flex: 1 }}
                  onPress={() => {
                    setShowCustomEmailInput(false);
                    setCustomEmail('');
                    setCustomEmailError('');
                  }}
                />
                <Button
                  title="Next"
                  variant="primary"
                  size="medium"
                  fullWidth={false}
                  style={{ flex: 1 }}
                  onPress={() => {
                    const emailRegex = /\S+@\S+\.\S+/;
                    if (!emailRegex.test(customEmail.trim())) {
                      setCustomEmailError('❌ Please enter a valid email address.');
                      return;
                    }
                    setGoogleModalVisible(false);
                    setToast(`Signed in as ${customEmail}`);
                    setUser((prev: any) => {
                      const updated = {
                        ...prev,
                        phone: '',
                        name: customEmail.split('@')[0],
                        email: customEmail.trim(),
                        address: '',
                        height: '',
                        weight: '',
                        profileCompleted: false,
                        locationCompleted: false,
                        healthCompleted: false,
                      };
                      setSubscribed(false);
                      setTimeout(() => go(getNextScreen(updated)), 100);
                      return updated;
                    });
                  }}
                />
              </View>
            </View>
          )}

          {/* Simulate error buttons */}
          {!showCustomEmailInput && (
            <View style={{ borderTopWidth: 1, borderColor: theme.colors.light.border, marginTop: theme.spacing.lg, paddingTop: theme.spacing.md }}>
              <Text variant="label" color="muted" style={{ textAlign: 'center', marginBottom: theme.spacing.sm }}>SIMULATE ERROR STATES</Text>
              <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                <Button
                  title="Auth Failed"
                  variant="outline"
                  size="small"
                  style={{ flex: 1, borderColor: theme.colors.error }}
                  textStyle={{ color: theme.colors.error }}
                  onPress={() => {
                    setGoogleModalVisible(false);
                    setToast('❌ Authentication failed. Try again.');
                  }}
                />
                <Button
                  title="No Internet"
                  variant="outline"
                  size="small"
                  style={{ flex: 1, borderColor: theme.colors.error }}
                  textStyle={{ color: theme.colors.error }}
                  onPress={() => {
                    setGoogleModalVisible(false);
                    setToast('❌ No internet connection.');
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </BottomSheet>

      {/* Apple Sign-In Simulator Modal */}
      <BottomSheet
        visible={appleModalVisible}
        onClose={() => setAppleModalVisible(false)}
        height={340}
      >
        <View style={{ alignItems: 'center', paddingVertical: theme.spacing.sm }}>
          {/* Apple Logo */}
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="#FFFFFF">
              <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.1.08.21.12.28.12.9 0 2.03-.65 2.53-1.45" />
            </Svg>
          </View>

          <Text variant="title" color="text">Sign in with Apple ID</Text>
          <Text variant="caption" color="sub" style={{ textAlign: 'center', marginVertical: theme.spacing.md }}>
            Sign in to Koi Koi Dabba using your Apple ID <Text variant="caption" color="text" style={{ fontWeight: 'bold' }}>amrita.sen@icloud.com</Text>.
          </Text>

          <View style={{ width: '100%', gap: theme.spacing.sm }}>
            <Button
              title="Continue"
              onPress={() => {
                setAppleModalVisible(false);
                setToast('Signed in with Apple ID');
                setUser((prev: any) => {
                  const updated = {
                    ...prev,
                    phone: '',
                    name: 'Amrita Sen',
                    email: 'amrita.sen@icloud.com',
                    address: '',
                    height: '',
                    weight: '',
                    profileCompleted: false,
                    locationCompleted: false,
                    healthCompleted: false,
                  };
                  setSubscribed(false);
                  setTimeout(() => go(getNextScreen(updated)), 100);
                  return updated;
                });
              }}
            />
            <Button
              title="Cancel"
              variant="outline"
              size="medium"
              onPress={() => setAppleModalVisible(false)}
            />
            <Button
              title="Simulate Apple Fail"
              variant="ghost"
              size="small"
              textStyle={{ color: theme.colors.error }}
              onPress={() => {
                setAppleModalVisible(false);
                setToast('❌ Sign-in failed. Apple service error.');
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </AuthenticationLayout>
  );
}
