import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Animated
} from 'react-native';
import { ArrowLeft, Camera, Lock, Calendar, Check } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F, Button, Input, DateInput } from '../../design-system';
import { Text as RNText } from 'react-native';

const B = {
  orange: theme.colors.secondary,
  orangeL: 'rgba(201, 107, 60, 0.08)',
  green: theme.colors.success,
  greenL: 'rgba(75, 93, 58, 0.08)',
  cream: theme.colors.light.surface,
  creamL: theme.colors.light.bg,
};

function Text({ style, ...props }: any) {
  const flatStyle = StyleSheet.flatten(style || {});
  let fontFamily = F.body;
  const content = String(props.children || '');
  const isNumeric = /[₹\d]/.test(content) && (
    /^[₹\d\s★%\-.:\+a-zA-Z\s]+$/.test(content) ||
    content.includes('kcal') ||
    content.includes('protein') ||
    content.includes('Carbs') ||
    content.includes('₹') ||
    content.includes('min') ||
    content.includes('km')
  );

  if (flatStyle.fontFamily) {
    fontFamily = flatStyle.fontFamily;
  } else if (flatStyle.fontSize >= 15 && (flatStyle.fontWeight === '900' || flatStyle.fontWeight === '800' || flatStyle.fontWeight === 'bold')) {
    fontFamily = isNumeric ? F.mono : F.heading;
  } else if (isNumeric) {
    fontFamily = F.mono;
  }
  return <RNText style={[{ fontFamily }, style]} {...props} />;
}

export default function PersonalScreen() {
  const {
    user,
    setUser,
    back,
    setToast,
    isDark,
    t
  } = useAppContext();

  // Validations Local State
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  // Input refs
  const nameRef = React.useRef<TextInput>(null);
  const emailRef = React.useRef<TextInput>(null);
  const dobRef = React.useRef<TextInput>(null);

  // Shake animation states
  const nameShake = React.useRef(new Animated.Value(0)).current;
  const emailShake = React.useRef(new Animated.Value(0)).current;
  const dobShake = React.useRef(new Animated.Value(0)).current;

  const triggerShake = (shakeVal: Animated.Value) => {
    Animated.sequence([
      Animated.timing(shakeVal, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeVal, { toValue: -10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeVal, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeVal, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const validateField = (field: string, val: string): string => {
    switch (field) {
      case 'name':
        if (!val.trim()) return '❌ Please enter your full name.';
        if (val.trim().length < 3) return '❌ Name must contain at least 3 characters.';
        return '';
      case 'email':
        if (!val.trim()) return '❌ Please enter a valid email address.';
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(val.trim())) return '❌ Please enter a valid email address.';
        return '';
      case 'dob':
        if (!val.trim()) return '❌ Please enter date of birth (DD/MM/YYYY).';
        if (val.trim().length < 10) return '❌ Please enter date of birth in DD/MM/YYYY format.';
        return '';
      default:
        return '';
    }
  };

  const handleFieldBlur = (field: string, val: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errMsg = validateField(field, val);
    setErrors(prev => {
      const copy = { ...prev };
      if (errMsg) copy[field] = errMsg;
      else delete copy[field];
      return copy;
    });
  };

  const handleFieldChange = (field: string, val: string, setter: (v: string) => void) => {
    setter(val);
    if (touched[field]) {
      const errMsg = validateField(field, val);
      setErrors(prev => {
        const copy = { ...prev };
        if (errMsg) copy[field] = errMsg;
        else delete copy[field];
        return copy;
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.headerBar, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Personal Details</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={[styles.supportForm, { backgroundColor: t.card, borderColor: t.border, padding: 20 }]}>
          
          {/* Profile Photo selector */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity 
              style={{
                width: 84,
                height: 84,
                borderRadius: 42,
                backgroundColor: '#FFF1E5',
                borderWidth: 2,
                borderColor: '#FFEEDB',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                shadowColor: '#A05020',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2
              }}
              onPress={() => {
                const avatars = ['👩‍🍳', '👨‍🍳', '🥗', '🍲', '🥑', '🥦', '🥕', '🍎', '🥘'];
                const curIdx = avatars.indexOf(user.avatar);
                const nextIdx = (curIdx + 1) % avatars.length;
                setUser((prev: any) => ({ ...prev, avatar: avatars[nextIdx] }));
                setToast('Profile Photo updated!');
              }}
            >
              <Text style={{ fontSize: 40 }}>{user.avatar}</Text>
              <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#DF7E2C',
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Camera size={12} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          <View style={{ gap: 14 }}>
            <Input
              ref={nameRef}
              label="Full Name"
              required
              value={user.name}
              onChangeText={val => handleFieldChange('name', val.replace(/[^a-zA-Z\s]/g, ''), text => setUser((prev: any) => ({ ...prev, name: text })))}
              onBlur={() => handleFieldBlur('name', user.name)}
              error={errors.name}
              success={touched.name && !errors.name && user.name.trim().length >= 3}
              shakeTrigger={!!errors.name}
            />

            <Input
              label="Mobile Number (Read Only)"
              value={user.phone}
              editable={false}
            />

            <Input
              ref={emailRef}
              label="Email Address"
              required
              value={user.email}
              onChangeText={val => handleFieldChange('email', val.replace(/[^a-zA-Z0-9@._+-]/g, ''), text => setUser((prev: any) => ({ ...prev, email: text })))}
              onBlur={() => handleFieldBlur('email', user.email)}
              keyboardType="email-address"
              error={errors.email}
              success={touched.email && !errors.email && user.email.trim().length > 0}
              shakeTrigger={!!errors.email}
            />

            <DateInput
              ref={dobRef}
              label="Date of Birth"
              required
              value={user.dob}
              onChangeText={val => handleFieldChange('dob', val, text => setUser((prev: any) => ({ ...prev, dob: text })))}
              onBlur={() => handleFieldBlur('dob', user.dob)}
              placeholder="DD-MM-YYYY"
              error={errors.dob}
              success={touched.dob && !errors.dob && user.dob.trim().length === 10}
              shakeTrigger={!!errors.dob}
            />

            <View>
              <Text style={[styles.setupLabel, { color: t.text, marginBottom: 6 }]}>Gender</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {['Male', 'Female', 'Other'].map(g => {
                  const isSelected = user.gender === g;
                  return (
                    <TouchableOpacity
                      key={g}
                      style={{
                        flex: 1,
                        height: 44,
                        borderRadius: 12,
                        borderWidth: 1.5,
                        borderColor: isSelected ? '#DF7E2C' : t.border,
                        backgroundColor: isSelected ? (isDark ? '#4A2A10' : '#FFF4EC') : (isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF'),
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      onPress={() => setUser((prev: any) => ({ ...prev, gender: g }))}
                    >
                      <Text style={{ fontSize: 12, fontWeight: '800', color: isSelected ? '#DF7E2C' : t.text }}>
                        {g}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={{ marginTop: 24 }}>
            <Button
              title="Save Changes"
              onPress={() => {
                const e1 = validateField('name', user.name);
                const e2 = validateField('email', user.email);
                const e3 = validateField('dob', user.dob);

                const newErrors: Record<string, string> = {};
                if (e1) newErrors.name = e1;
                if (e2) newErrors.email = e2;
                if (e3) newErrors.dob = e3;

                setErrors(newErrors);
                setTouched({ name: true, email: true, dob: true });

                if (Object.keys(newErrors).length > 0) {
                  if (newErrors.name) {
                    triggerShake(nameShake);
                    nameRef.current?.focus();
                  } else if (newErrors.email) {
                    triggerShake(emailShake);
                    emailRef.current?.focus();
                  } else if (newErrors.dob) {
                    triggerShake(dobShake);
                    dobRef.current?.focus();
                  }
                  return;
                }

                setToast('Details Updated!');
                back();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 12,
  },
  supportForm: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  setupLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  setupInput: {
    height: 56,
    borderRadius: 18,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '600',
  },
  obBtnGradient: {
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  obBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});

