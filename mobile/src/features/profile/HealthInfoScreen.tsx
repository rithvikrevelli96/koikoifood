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
import { ArrowLeft, Check } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F, Button, Input } from '../../design-system';
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

export default function HealthInfoScreen() {
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
  const heightRef = React.useRef<TextInput>(null);
  const weightRef = React.useRef<TextInput>(null);

  // Shake animations
  const heightShake = React.useRef(new Animated.Value(0)).current;
  const weightShake = React.useRef(new Animated.Value(0)).current;

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
      case 'height':
        const h = parseFloat(val);
        if (isNaN(h) || h <= 0) return '❌ Height must be a positive number.';
        if (h < 50 || h > 250) return '❌ Please enter a valid height (50 - 250 cm).';
        return '';
      case 'weight':
        const w = parseFloat(val);
        if (isNaN(w) || w <= 0) return '❌ Weight must be a positive number.';
        if (w < 20 || w > 300) return '❌ Please enter a valid weight (20 - 300 kg).';
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
        <Text style={[styles.headerTitle, { color: t.text }]}>Health Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={[styles.supportForm, { backgroundColor: t.card, borderColor: t.border, padding: 20 }]}>
          
          <Input
            ref={heightRef}
            label="Height (cm)"
            required
            value={user.height}
            onChangeText={val => handleFieldChange('height', val.replace(/[^0-9.]/g, ''), text => setUser((prev: any) => ({ ...prev, height: text })))}
            onBlur={() => handleFieldBlur('height', user.height)}
            keyboardType="numeric"
            error={errors.height}
            success={touched.height && !errors.height && user.height.trim().length > 0}
            shakeTrigger={!!errors.height}
          />

          <Input
            ref={weightRef}
            label="Weight (kg)"
            required
            value={user.weight}
            onChangeText={val => handleFieldChange('weight', val.replace(/[^0-9.]/g, ''), text => setUser((prev: any) => ({ ...prev, weight: text })))}
            onBlur={() => handleFieldBlur('weight', user.weight)}
            keyboardType="numeric"
            error={errors.weight}
            success={touched.weight && !errors.weight && user.weight.trim().length > 0}
            shakeTrigger={!!errors.weight}
          />

          <Text style={[styles.setupLabel, { color: t.text, marginTop: 16 }]}>Current Goal</Text>
          <View style={styles.chipRow}>
            {['Weight Loss', 'Muscle Gain', 'Healthy Living', 'Senior Diet'].map(goal => {
              const active = user.goal === goal;
              return (
                <TouchableOpacity
                  key={goal}
                  style={[
                    styles.chip,
                    { backgroundColor: active ? B.orange + '15' : (isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF'), borderColor: active ? B.orange : t.border, borderWidth: 1 }
                  ]}
                  onPress={() => setUser((prev: any) => ({ ...prev, goal: goal }))}
                >
                  <Text style={{ fontSize: 12, color: active ? B.orange : t.text, fontWeight: active ? 'bold' : 'normal' }}>{goal}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ marginTop: 24 }}>
            <Button
              title="Save Profile"
              onPress={() => {
                const e1 = validateField('height', user.height);
                const e2 = validateField('weight', user.weight);

                const newErrors: Record<string, string> = {};
                if (e1) newErrors.height = e1;
                if (e2) newErrors.weight = e2;

                setErrors(newErrors);
                setTouched({ height: true, weight: true });

                if (Object.keys(newErrors).length > 0) {
                  if (newErrors.height) {
                    triggerShake(heightShake);
                    heightRef.current?.focus();
                  } else if (newErrors.weight) {
                    triggerShake(weightShake);
                    weightRef.current?.focus();
                  }
                  return;
                }

                setToast('Health Goals Updated!');
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
    marginTop: 6,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
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
