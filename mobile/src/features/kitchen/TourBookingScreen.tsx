import React from 'react';
import { View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  Input,
  DateInput,
  PageLayout,
  Modal
} from '../../design-system';

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
    back
  } = useAppContext();

  // Validations State
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const validateField = (field: string, val: string): string => {
    switch (field) {
      case 'date':
        if (!val.trim()) return '❌ Please enter date for kitchen tour.';
        if (val.trim().length < 10) return '❌ Please enter date in DD-MM-YYYY format.';
        return '';
      case 'name':
        if (!val.trim()) return '❌ Please enter contact person name.';
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

  const handleFieldChange = (field: string, val: string, updateState: (v: string) => void) => {
    updateState(val);
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

  const handleBookTour = () => {
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
      setToast('⚠️ Please correct validation errors.');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmTour = () => {
    setShowConfirmModal(false);
    setToast("🎉 Kitchen tour booked successfully!");
    back();
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }}>
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
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>BOOK KITCHEN TOUR</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text variant="title" color="primary">Plan Your Visit</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 4, lineHeight: 18 }}>
            Schedule an inspection of our facilities. Get an in-person walkthrough of hygiene standards and food prep steps.
          </Text>
        </View>

        <View style={{ gap: theme.spacing.md }}>
          <DateInput
            label="TOUR DATE"
            required
            value={tourDate}
            onChangeText={val => handleFieldChange('date', val, setTourDate)}
            onBlur={() => handleFieldBlur('date', tourDate)}
            placeholder="DD-MM-YYYY"
            error={errors.date}
          />

          {/* Time slot selector */}
          <View>
            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>PREFERRED TIME SLOT</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {['09:30 AM', '11:30 AM', '03:30 PM', '05:30 PM'].map((slot) => {
                const isSelected = tourTimeSlot === slot;
                return (
                  <Button
                    key={slot}
                    title={slot}
                    variant={isSelected ? 'primary' : 'outline'}
                    size="medium"
                    fullWidth={false}
                    onPress={() => setTourTimeSlot(slot)}
                  />
                );
              })}
            </View>
          </View>

          {/* Visitors counter */}
          <View>
            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>NUMBER OF VISITORS</Text>
            <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
              {[1, 2, 3, 4, 5].map((num) => {
                const isSelected = tourVisitors === num;
                return (
                  <Button
                    key={num}
                    title={String(num)}
                    variant={isSelected ? 'primary' : 'outline'}
                    size="medium"
                    fullWidth={false}
                    style={{ flex: 1 }}
                    onPress={() => setTourVisitors(num)}
                  />
                );
              })}
            </View>
          </View>

          <Input
            label="CONTACT PERSON NAME"
            required
            value={tourContactName}
            onChangeText={val => handleFieldChange('name', val.replace(/[^a-zA-Z\s]/g, ''), setTourContactName)}
            onBlur={() => handleFieldBlur('name', tourContactName)}
            placeholder="E.g. Bhargav"
            error={errors.name}
          />

          <Input
            label="CONTACT PHONE NUMBER"
            required
            value={tourContactPhone}
            onChangeText={val => handleFieldChange('phone', val.replace(/[^0-9]/g, ''), setTourContactPhone)}
            onBlur={() => handleFieldBlur('phone', tourContactPhone)}
            placeholder="10-digit number"
            keyboardType="phone-pad"
            error={errors.phone}
          />
        </View>

        <Button 
          title="Schedule Tour ‣"
          onPress={handleBookTour}
          style={{ marginTop: theme.spacing.xl }}
        />
      </ScrollView>

      {/* Booking confirmation dialog */}
      <Modal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <View style={{ alignItems: 'center' }}>
          <Text variant="title" color="text" style={{ textAlign: 'center', marginBottom: theme.spacing.sm }}>Confirm Kitchen Visit?</Text>
          <Text variant="caption" color="sub" style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
            Book kitchen visit for <Text variant="caption" color="secondary" style={{ fontWeight: 'bold' }}>{tourVisitors} visitors</Text> on <Text variant="caption" color="secondary" style={{ fontWeight: 'bold' }}>{tourDate}</Text> at <Text variant="caption" color="secondary" style={{ fontWeight: 'bold' }}>{tourTimeSlot}</Text>?
          </Text>
          <View style={{ flexDirection: 'row', gap: theme.spacing.md, width: '100%' }}>
            <Button
              title="Cancel"
              variant="outline"
              size="medium"
              style={{ flex: 1 }}
              onPress={() => setShowConfirmModal(false)}
            />
            <Button
              title="Confirm"
              variant="primary"
              size="medium"
              style={{ flex: 1 }}
              onPress={handleConfirmTour}
            />
          </View>
        </View>
      </Modal>
    </PageLayout>
  );
}
