import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Animated
} from 'react-native';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F, Button, Input, DateInput, PhoneInput } from '../../design-system';
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
    content.includes('km') ||
    content.includes('Serving') ||
    content.includes('Visitors') ||
    content.includes('Slot') ||
    content.includes(':')
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
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function TourBookingScreen() {
  const {
    tourDate,
    setTourDate,
    tourTimeSlot,
    setTourTimeSlot,
    tourVisitors,
    setTourVisitors,
    tourContactName,
    setTourContactName,
    tourContactPhone,
    setTourContactPhone,
    setToast,
    back,
    t
  } = useAppContext();

  // Validations State
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  // Refs
  const scrollViewRef = React.useRef<ScrollView>(null);
  const dateRef = React.useRef<TextInput>(null);
  const nameRef = React.useRef<TextInput>(null);
  const phoneRef = React.useRef<TextInput>(null);

  // Shake variables
  const dateShake = React.useRef(new Animated.Value(0)).current;
  const nameShake = React.useRef(new Animated.Value(0)).current;
  const phoneShake = React.useRef(new Animated.Value(0)).current;

  const triggerShake = (shakeVal: Animated.Value) => {
    Animated.sequence([
      Animated.timing(shakeVal, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeVal, { toValue: -10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeVal, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeVal, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const scrollAndShake = (field: string, ref: React.RefObject<any>, shakeVal: Animated.Value, yOffset: number) => {
    triggerShake(shakeVal);
    ref.current?.focus();
    scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
  };

  const validateField = (field: string, val: string): string => {
    switch (field) {
      case 'date':
        if (!val.trim()) return '❌ Please enter a preferred date.';
        if (val.trim().length < 10) return '❌ Date must be in DD-MM-YYYY format.';
        return '';
      case 'name':
        if (!val.trim()) return '❌ Please enter visitor contact name.';
        if (val.trim().length < 3) return '❌ Name must contain at least 3 characters.';
        return '';
      case 'phone':
        const cleanPhone = val.replace(/[^0-9]/g, '');
        if (cleanPhone.length !== 10) return '❌ Please enter a valid 10-digit phone number.';
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

  const formatPhone = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    if (clean.length > 5) {
      return `${clean.slice(0, 5)} ${clean.slice(5, 10)}`;
    }
    return clean;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.light.bg }}>
      {/* Top Header Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: t.border, backgroundColor: t.surface }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={back} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}>
            <ArrowLeft size={16} color={t.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, marginLeft: 16, letterSpacing: 0.5 }}>Request Tour Scheduling</Text>
        </View>
        <TouchableOpacity onPress={back}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: B.orange }}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Preferred Date */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <DateInput
            ref={dateRef}
            label="Preferred Date"
            required
            value={tourDate}
            onChangeText={val => handleFieldChange('date', val, setTourDate)}
            onBlur={() => handleFieldBlur('date', tourDate)}
            placeholder="DD-MM-YYYY"
            error={errors.date}
            success={touched.date && !errors.date && tourDate.trim().length === 10}
            shakeTrigger={!!errors.date}
          />
        </View>

        {/* Preferred Time Slot */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Preferred Time Slot</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {['10:00 AM', '11:30 AM', '4:00 PM'].map(slot => {
              const isSelected = tourTimeSlot === slot;
              return (
                <TouchableOpacity
                  key={slot}
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    height: 50,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: isSelected ? B.orange : t.border,
                    backgroundColor: isSelected ? B.orangeL : t.card,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => setTourTimeSlot(slot)}
                >
                  <Text style={{ fontSize: 13.5, fontWeight: '800', color: isSelected ? B.orange : t.text }}>{slot}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Number of Visitors */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>Number of Visitors</Text>
          <Text style={{ fontSize: 11, color: t.sub, marginTop: 2, marginBottom: 12 }}>(Max 4 per tour)</Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: t.card,
                borderWidth: 1.5,
                borderColor: t.border,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => setTourVisitors((prev: number) => Math.max(1, prev - 1))}
            >
              <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>-</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, minWidth: 24, textAlign: 'center' }}>{tourVisitors}</Text>

            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: t.card,
                borderWidth: 1.5,
                borderColor: t.border,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => setTourVisitors((prev: number) => Math.min(4, prev + 1))}
            >
              <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Input
            ref={nameRef}
            label="Visitor Contact Name"
            required
            value={tourContactName}
            onChangeText={val => handleFieldChange('name', val.replace(/[^a-zA-Z\s]/g, ''), setTourContactName)}
            onBlur={() => handleFieldBlur('name', tourContactName)}
            placeholder="Enter Full Name"
            error={errors.name}
            success={touched.name && !errors.name && tourContactName.trim().length >= 3}
            shakeTrigger={!!errors.name}
          />
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 12 }}>
          <PhoneInput
            ref={phoneRef}
            label="Contact Number"
            required
            value={tourContactPhone}
            onChangeText={val => handleFieldChange('phone', val, setTourContactPhone)}
            onBlur={() => handleFieldBlur('phone', tourContactPhone)}
            placeholder="98765 43210"
            error={errors.phone}
            success={touched.phone && !errors.phone && tourContactPhone.replace(/[^0-9]/g, '').length === 10}
            shakeTrigger={!!errors.phone}
          />
        </View>

        {/* Confirm Tour Request Button */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <Button
            title="Confirm Tour Request"
            onPress={() => {
              const e1 = validateField('date', tourDate);
              const e2 = validateField('name', tourContactName);
              const e3 = validateField('phone', tourContactPhone);

              const newErrors: Record<string, string> = {};
              if (e1) newErrors.date = e1;
              if (e2) newErrors.name = e2;
              if (e3) newErrors.phone = e3;

              setErrors(newErrors);
              setTouched({ date: true, name: true, phone: true });

              if (Object.keys(newErrors).length > 0) {
                if (newErrors.date) {
                  scrollAndShake('date', dateRef, dateShake, 0);
                } else if (newErrors.name) {
                  scrollAndShake('name', nameRef, nameShake, 100);
                } else if (newErrors.phone) {
                  scrollAndShake('phone', phoneRef, phoneShake, 200);
                }
                return;
              }

              setToast("Tour Request Confirmed successfully!");
              back();
            }}
          />
        </View>
      </ScrollView>

      <BottomTabNav active="kitchen" />
    </SafeAreaView>
  );
}

