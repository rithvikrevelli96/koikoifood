import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Platform } from 'react-native';
import { ArrowLeft, Camera, ChevronRight } from 'lucide-react-native';
import { useAppContext } from '../../../app/context';
import {
  theme,
  Text,
  Button,
  Input,
  DateInput,
  PageLayout,
  ScrollableLayout,
  Modal
} from '../../../design-system';
import { validateField } from '../utils/validation';

export function SetupStep1() {
  const { user, setUser, go, back, setToast } = useAppContext();

  // Local validation and focus states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleFieldChange = (field: string, cleanVal: string, key: string) => {
    setUser((prev: any) => ({ ...prev, [key]: cleanVal }));
    if (touched[field]) {
      const errMsg = validateField(field, cleanVal);
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

  const handleNext = () => {
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
      return;
    }

    setUser((prev: any) => ({ ...prev, profileCompleted: true }));
    go('setup2');
  };

  const handleHeaderBack = () => {
    setShowDiscardModal(true);
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic">
      <ScrollableLayout contentContainerStyle={{ paddingHorizontal: theme.spacing.xxl, paddingVertical: theme.spacing.xl }}>
        
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <Button
            onlyIcon
            variant="ghost"
            size="medium"
            onPress={handleHeaderBack}
            iconLeft={<ArrowLeft size={16} color={theme.colors.light.text} />}
          />
          <View style={{ alignItems: 'flex-end' }}>
            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 0.5 }}>STEP 1 OF 3</Text>
          </View>
        </View>

        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text variant="headingM" color="primary">Create Your Profile</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 4 }}>
            Help us personalize your Koi Koi dabba experience.
          </Text>
        </View>

        {/* Profile Avatar Toggler */}
        <View style={{ alignItems: 'center', marginVertical: theme.spacing.xl }}>
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
              setToast('Profile Photo updated!');
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

        {/* Form Inputs */}
        <View style={{ gap: theme.spacing.md }}>
          <Input
            label="FULL NAME"
            required
            value={user.name}
            onChangeText={val => handleFieldChange('name', val.replace(/[^a-zA-Z\s]/g, ''), 'name')}
            onBlur={() => handleFieldBlur('name', user.name)}
            placeholder="e.g. Bhargav"
            error={errors.name}
            success={touched.name && !errors.name && user.name.trim().length >= 3}
            shakeTrigger={!!errors.name}
          />

          <Input
            label="EMAIL ADDRESS"
            required
            value={user.email}
            onChangeText={val => handleFieldChange('email', val.replace(/[^a-zA-Z0-9@._+-]/g, ''), 'email')}
            onBlur={() => handleFieldBlur('email', user.email)}
            placeholder="e.g. bhargav@gmail.com"
            keyboardType="email-address"
            error={errors.email}
            success={touched.email && !errors.email && user.email.trim().length > 0}
            shakeTrigger={!!errors.email}
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
            shakeTrigger={!!errors.dob}
          />

          {/* Gender Toggles */}
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
          title="Continue"
          onPress={handleNext}
          iconRight={<ChevronRight size={18} color="#FFFFFF" />}
          style={{ marginTop: theme.spacing.lg }}
        />
      </ScrollableLayout>

      {/* Discard changes modal */}
      <Modal
        visible={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
      >
        <View style={{ alignItems: 'center' }}>
          <Text variant="title" color="text" style={{ textAlign: 'center', marginBottom: theme.spacing.sm }}>Discard Profile Changes?</Text>
          <Text variant="caption" color="sub" style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
            Are you sure you want to go back? Any setup information entered will be discarded.
          </Text>
          <View style={{ flexDirection: 'row', gap: theme.spacing.md, width: '100%' }}>
            <View style={{ flex: 1 }}>
              <Button
                title="Keep Editing"
                variant="outline"
                size="medium"
                onPress={() => setShowDiscardModal(false)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="Discard"
                variant="destructive"
                size="medium"
                onPress={() => {
                  setShowDiscardModal(false);
                  back();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </PageLayout>
  );
}
