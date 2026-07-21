import React, { useState } from 'react';
import { View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  Input,
  DateInput,
  PageLayout
} from '../../design-system';

export default function PersonalScreen() {
  const {
    user,
    setUser,
    back,
    setToast,
  } = useAppContext();

  // Validations Local State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
        if (!val.trim()) return '❌ Please enter date of birth (DD-MM-YYYY).';
        if (val.trim().length < 10) return '❌ Please enter date of birth in DD-MM-YYYY format.';
        return '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field: string, val: string, key: string) => {
    setUser((prev: any) => ({ ...prev, [key]: val }));
    if (touched[field]) {
      const errMsg = validateField(field, val);
      if (errMsg) {
        setErrors(prev => ({ ...prev, [field]: errMsg }));
      } else {
        setErrors(prev => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    }
  };

  const handleFieldBlur = (field: string, val: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errMsg = validateField(field, val);
    if (errMsg) {
      setErrors(prev => ({ ...prev, [field]: errMsg }));
    }
  };

  const handleSave = () => {
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
      setToast('⚠️ Please correct validation errors.');
      return;
    }

    setToast('🎉 Personal details saved successfully!');
    back();
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="clean">
      {/* Top Header Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: theme.colors.light.border, backgroundColor: theme.colors.light.surface }}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={theme.colors.light.text} />}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.light.surface }}
        />
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>EDIT PROFILE</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        {/* Profile Avatar Selector */}
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
          <TouchableOpacity 
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              backgroundColor: theme.colors.light.surface,
              borderWidth: 2,
              borderColor: theme.colors.light.border,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
            onPress={() => {
              const avatars = ['👩‍🍳', '👨‍🍳', '🥗', '🍲', '🥑', '🥦', '🥕', '🍎', '🥘'];
              const curIdx = avatars.indexOf(user.avatar);
              const nextIdx = (curIdx + 1) % avatars.length;
              setUser((prev: any) => ({ ...prev, avatar: avatars[nextIdx] }));
              setToast('Avatar updated!');
            }}
          >
            <Text variant="display" style={{ fontSize: 44, lineHeight: Platform.OS === 'ios' ? 56 : 50 }}>{user.avatar}</Text>
            <View style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: theme.colors.secondary,
              width: 28,
              height: 28,
              borderRadius: 14,
              borderWidth: 2,
              borderColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Camera size={14} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text variant="label" color="muted" style={{ marginTop: theme.spacing.sm, fontWeight: '700', letterSpacing: 0.5 }}>
            TAP TO CHANGE PHOTO
          </Text>
        </View>

        {/* Inputs */}
        <View style={{ gap: theme.spacing.md }}>
          <Input
            label="FULL NAME"
            required
            value={user.name}
            onChangeText={val => handleFieldChange('name', val.replace(/[^a-zA-Z\s]/g, ''), 'name')}
            onBlur={() => handleFieldBlur('name', user.name)}
            placeholder="Bhargav"
            error={errors.name}
            success={touched.name && !errors.name && user.name.trim().length >= 3}
          />

          <Input
            label="MOBILE NUMBER (READ ONLY)"
            value={user.phone}
            editable={false}
          />

          <Input
            label="EMAIL ADDRESS"
            required
            value={user.email}
            onChangeText={val => handleFieldChange('email', val.replace(/[^a-zA-Z0-9@._+-]/g, ''), 'email')}
            onBlur={() => handleFieldBlur('email', user.email)}
            placeholder="bhargav@koikoi.in"
            keyboardType="email-address"
            error={errors.email}
            success={touched.email && !errors.email && user.email.trim().length > 0}
          />

          <DateInput
            label="DATE OF BIRTH"
            required
            value={user.dob}
            onChangeText={val => handleFieldChange('dob', val, 'dob')}
            onBlur={() => handleFieldBlur('dob', user.dob)}
            placeholder="DD-MM-YYYY"
            error={errors.dob}
            success={touched.dob && !errors.dob && user.dob.trim().length === 10}
          />

          {/* Gender */}
          <View style={{ marginBottom: theme.spacing.md }}>
            <Text variant="label" color="muted" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>GENDER</Text>
            <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
              {['Male', 'Female', 'Other'].map(g => {
                const isSelected = user.gender === g;
                return (
                  <Button
                    key={g}
                    title={g}
                    variant={isSelected ? 'primary' : 'outline'}
                    size="medium"
                    fullWidth={false}
                    style={{ flex: 1 }}
                    textStyle={{ fontWeight: '700' }}
                    onPress={() => setUser((prev: any) => ({ ...prev, gender: g }))}
                  />
                );
              })}
            </View>
          </View>
        </View>

        <Button 
          title="Save Details ✓"
          onPress={handleSave}
          style={{ marginTop: theme.spacing.xl }}
        />
      </ScrollView>
    </PageLayout>
  );
}
