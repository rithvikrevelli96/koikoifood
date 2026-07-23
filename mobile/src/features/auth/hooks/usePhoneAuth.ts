import React from 'react';
import { Animated, Platform } from 'react-native';
import { useAppContext } from '../../../app/context';
import { COUNTRIES, Country } from '../../../design-system/constants/countries';

export function usePhoneAuth() {
  const {
    mobileNumber,
    setMobileNumber,
    otpCode,
    setOtpCode,
    otpSent,
    setOtpSent,
    otpCountdown,
    setOtpCountdown,
    setToast,
    setUser,
    subscribed,
    setSubscribed,
    go,
    authFade,
    authSlideY,
  } = useAppContext();

  // Active country selector state (defaults to India)
  const [country, setCountry] = React.useState<Country>(
    COUNTRIES.find(c => c.code === 'IN') || COUNTRIES[0]
  );

  // Local validation and interaction states
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [btnState, setBtnState] = React.useState<'idle' | 'loading' | 'success'>('idle');

  // Modals for Google & Apple Sign-In Simulator
  const [googleModalVisible, setGoogleModalVisible] = React.useState(false);
  const [appleModalVisible, setAppleModalVisible] = React.useState(false);

  // Custom email for Google Sign-In "use another account"
  const [customEmail, setCustomEmail] = React.useState('');
  const [showCustomEmailInput, setShowCustomEmailInput] = React.useState(false);
  const [customEmailError, setCustomEmailError] = React.useState('');

  const formatPhone = (val: string, length: number) => {
    const clean = val.replace(/[^0-9]/g, '');
    const mid = Math.floor(length / 2);
    if (clean.length > mid) {
      return `${clean.slice(0, mid)} ${clean.slice(mid, length)}`;
    }
    return clean.slice(0, length);
  };

  // Re-format and re-validate when country changes
  React.useEffect(() => {
    if (mobileNumber) {
      const cleanPhone = mobileNumber.replace(/[^0-9]/g, '');
      const formatted = formatPhone(cleanPhone, country.maxLength);
      setMobileNumber(formatted);

      if (touched.phone) {
        validatePhoneNumber(cleanPhone);
      }
    } else {
      setErrors(prev => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  }, [country]);

  // Trigger fade-in/slide-up transition animations on mount and OTP phase change
  React.useEffect(() => {
    authFade.setValue(0);
    authSlideY.setValue(45);

    Animated.parallel([
      Animated.timing(authFade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(authSlideY, {
        toValue: 0,
        friction: 7,
        tension: 35,
        useNativeDriver: Platform.OS !== 'web',
      })
    ]).start();
  }, [otpSent]);

  const validatePhoneNumber = (cleanPhone: string) => {
    let isValid = true;
    if (cleanPhone.length < country.minLength || cleanPhone.length > country.maxLength) {
      isValid = false;
      const errorMsg = country.minLength === country.maxLength
        ? `❌ Mobile number must be exactly ${country.maxLength} digits.`
        : `❌ Mobile number must be between ${country.minLength} and ${country.maxLength} digits.`;
      setErrors(prev => ({ ...prev, phone: errorMsg }));
    } else if (country.validationPattern && !country.validationPattern.test(cleanPhone)) {
      isValid = false;
      setErrors(prev => ({ ...prev, phone: '❌ Mobile number format is invalid.' }));
    } else {
      setErrors(prev => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
    return isValid;
  };

  const handlePhoneChange = (val: string) => {
    const formatted = formatPhone(val, country.maxLength);
    setMobileNumber(formatted);
    if (touched.phone) {
      const cleanPhone = formatted.replace(/[^0-9]/g, '');
      validatePhoneNumber(cleanPhone);
    }
  };

  const handlePhoneBlur = () => {
    setTouched(prev => ({ ...prev, phone: true }));
    const cleanPhone = mobileNumber.replace(/[^0-9]/g, '');
    validatePhoneNumber(cleanPhone);
  };

  const handleOtpChange = (val: string) => {
    setOtpCode(val);
    if (errors.otp) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.otp;
        return next;
      });
    }
  };

  const handleSendOtp = () => {
    const cleanPhone = mobileNumber.replace(/[^0-9]/g, '');
    const isValid = validatePhoneNumber(cleanPhone);
    if (!isValid) {
      setTouched(prev => ({ ...prev, phone: true }));
      return;
    }

    setBtnState('loading');
    setTimeout(() => {
      setBtnState('success');
      setTimeout(() => {
        setOtpSent(true);
        setOtpCountdown(30);
        setBtnState('idle');
        setToast('🔑 OTP Code sent: 123456');
      }, 500);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otpCode !== '123456') {
      setErrors(prev => ({ ...prev, otp: '❌ Invalid verification code. Try again.' }));
      return;
    }

    setBtnState('loading');
    setTimeout(() => {
      setBtnState('success');
      setTimeout(() => {
        setToast('🎉 Signed in successfully!');
        setUser((prev: any) => {
          const updated = {
            ...prev,
            phone: country.dialCode + ' ' + mobileNumber,
            name: '',
            email: '',
          };
          const nextScreen = getNextScreen(updated);
          setTimeout(() => go(nextScreen), 100);
          return updated;
        });
      }, 500);
    }, 1000);
  };

  const getNextScreen = (userData: any): any => {
    if (userData.profileCompleted && userData.locationCompleted) {
      return 'home';
    }
    if (userData.profileCompleted) {
      return 'setup2';
    }
    return 'setup1';
  };

  return {
    mobileNumber,
    setMobileNumber,
    otpCode,
    setOtpCode,
    otpSent,
    setOtpSent,
    otpCountdown,
    setOtpCountdown,
    errors,
    setErrors,
    touched,
    setTouched,
    btnState,
    setBtnState,
    country,
    setCountry,
    googleModalVisible,
    setGoogleModalVisible,
    appleModalVisible,
    setAppleModalVisible,
    customEmail,
    setCustomEmail,
    showCustomEmailInput,
    setShowCustomEmailInput,
    customEmailError,
    setCustomEmailError,
    handlePhoneChange,
    handlePhoneBlur,
    handleOtpChange,
    handleSendOtp,
    handleVerifyOtp,
    authFade,
    authSlideY,
    setToast,
    setUser,
    subscribed,
    setSubscribed,
    go,
  };
}
