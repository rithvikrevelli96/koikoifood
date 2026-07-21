import React, { useState } from 'react';
import { View, Platform, TouchableOpacity, FlatList, Animated } from 'react-native';
import Svg, { Path, Rect, Ellipse, Circle } from 'react-native-svg';
import { ArrowLeft, ChevronRight, Search, MapPin, X, Contact, Check, ShieldCheck } from 'lucide-react-native';
import { useAppContext } from '../../../app/context';
import {
  theme,
  Text,
  Button,
  Input,
  PageLayout,
  BottomSheet
} from '../../../design-system';
import { validateField } from '../utils/validation';
import { StepIndicator } from './StepIndicator';

export function SetupStep2() {
  const {
    user,
    setUser,
    go,
    back,
    setToast,
    selectedAddress,
    setSelectedAddress,
    addressDetails,
    setAddressDetails,
    locationPermissionEnabled,
    setShowLocationDialog,
    receiverDetailsName,
    setReceiverDetailsName,
    receiverDetailsPhone,
    setReceiverDetailsPhone,
    showPhotoPicker,
    setShowPhotoPicker,
    showContactsModal,
    setShowContactsModal,
    deviceContacts,
    setDeviceContacts,
    contactsSearchQuery,
    setContactsSearchQuery,
    mapTranslateX,
    setMapTranslateX,
    mapTranslateY,
    setMapTranslateY,
    setMapOffsetList,
    isDraggingMap,
    detectCurrentLocation,
    panResponder,
    t
  } = useAppContext();

  // Local validation and interaction states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

  const handleNext = () => {
    const e1 = validateField('addressDetails', addressDetails);
    const e2 = validateField('recName', receiverDetailsName);
    const e3 = validateField('recPhone', receiverDetailsPhone);

    const newErrors: Record<string, string> = {};
    if (e1) newErrors.addressDetails = e1;
    if (e2) newErrors.recName = e2;
    if (e3) newErrors.recPhone = e3;

    setErrors(newErrors);
    setTouched({ addressDetails: true, recName: true, recPhone: true });

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setUser((prev: any) => ({ ...prev, locationCompleted: true, healthCompleted: true }));
    setToast("🎉 Delivery location saved successfully!");
    go('home');
  };

  const filteredContacts = deviceContacts.filter((c: any) => 
    c.name?.toLowerCase().includes(contactsSearchQuery.toLowerCase())
  );

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="onboarding">
      {/* Search Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: theme.spacing.xl, paddingTop: 12, gap: theme.spacing.sm }}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={20} color={theme.colors.light.text} />}
        />

        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => setToast("🔍 Search is simulated in this testing suite.")} 
          style={{ 
            flex: 1,
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: theme.colors.light.surface, 
            borderRadius: theme.radius.medium, 
            paddingHorizontal: theme.spacing.md, 
            height: 48, 
            borderWidth: 1.5,
            borderColor: theme.colors.light.border
          }}
        >
          <Search size={18} color={theme.colors.light.muted} />
          <Text variant="caption" color="muted" style={{ marginLeft: 10 }}>Search for area, street name...</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: theme.spacing.xxl }}>
        <StepIndicator currentStep={2} />
      </View>

      {/* Map simulator section */}
      <View 
        {...panResponder.panHandlers}
        style={{ flex: 1.2, backgroundColor: '#F0F4F8', position: 'relative', overflow: 'hidden', marginTop: 8 }}
      >
        <Animated.View style={{ 
          position: 'absolute', 
          width: 1000, 
          height: 1000, 
          left: -300, 
          top: -300,
          transform: [{ translateX: mapTranslateX }, { translateY: mapTranslateY }] 
        }}>
          <Svg width="100%" height="100%" style={{ opacity: 0.4 }}>
            <Path d="M 0 100 L 1000 300 M 100 0 L 300 1000 M 0 700 L 1000 400 M 500 0 L 500 1000 M 200 100 L 800 900 M 800 100 L 200 900" stroke="#475467" strokeWidth={4} />
            <Rect x={140} y={250} width={180} height={120} rx={16} fill="#81C784" opacity={0.6} />
            <Rect x={600} y={450} width={150} height={200} rx={16} fill="#64B5F6" opacity={0.6} />
            <Ellipse cx={500} cy={200} rx={90} ry={60} fill="#E57373" opacity={0.5} />
          </Svg>

          <View style={{ position: 'absolute', top: 220, left: 160, opacity: 0.6 }}>
            <Text variant="label" color="text" style={{ fontWeight: 'bold' }}>St.Peter's High School</Text>
          </View>
          <View style={{ position: 'absolute', top: 480, right: 280, opacity: 0.6 }}>
            <Text variant="label" color="text" style={{ fontWeight: 'bold' }}>Devashrey Hostel - Zeus</Text>
          </View>
          <View style={{ position: 'absolute', top: 620, left: 240, opacity: 0.6 }}>
            <Text variant="label" color="text" style={{ fontWeight: 'bold' }}>Ajith boys hostel</Text>
          </View>
          <View style={{ position: 'absolute', top: 380, right: 350, opacity: 0.6 }}>
            <Text variant="label" color="text" style={{ fontWeight: 'bold' }}>Tower 3 lobby entry</Text>
          </View>
        </Animated.View>

        {/* Pin overlay */}
        <View style={{ position: 'absolute', left: '50%', top: '45%', marginLeft: -18, marginTop: -36, alignItems: 'center', zIndex: 10 }}>
          <View style={{
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E4E7EC',
            position: 'absolute',
            bottom: 45,
            width: 230,
            alignItems: 'center',
          }}>
            <Text variant="label" color="text" style={{ fontWeight: '800', textAlign: 'center' }}>Move pin to your exact delivery location</Text>
            <View style={{ width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 6, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#FFFFFF', position: 'absolute', bottom: -6 }} />
          </View>

          <Animated.View style={{
            transform: [
              { translateY: isDraggingMap ? -12 : 0 },
              { scale: isDraggingMap ? 1.15 : 1.0 }
            ]
          }}>
            <MapPin size={38} color="#F04438" />
          </Animated.View>
          <View style={{ 
            width: 10, 
            height: 10, 
            borderRadius: 5, 
            backgroundColor: 'rgba(0,0,0,0.25)', 
            transform: [{ scaleX: isDraggingMap ? 0.6 : 2 }], 
            marginTop: -2,
            opacity: isDraggingMap ? 0.4 : 1
          }} />
        </View>

        {/* GPS tracking trigger */}
        <TouchableOpacity 
          onPress={() => {
            setMapTranslateX(0);
            setMapTranslateY(0);
            setMapOffsetList({ x: 0, y: 0 });
            detectCurrentLocation();
          }}
          style={{ 
            position: 'absolute', 
            bottom: 16, 
            alignSelf: 'center', 
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: theme.colors.light.surface, 
            borderWidth: 1.5, 
            borderColor: theme.colors.light.border, 
            borderRadius: 20, 
            paddingHorizontal: 16, 
            paddingVertical: 10,
            gap: 8,
          }}
        >
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#F04438" strokeWidth={2.5}>
            <Circle cx={12} cy={12} r={8} />
            <Circle cx={12} cy={12} r={3} />
            <Path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12" />
          </Svg>
          <Text variant="caption" style={{ fontWeight: '800', color: '#F04438' }}>Use current location</Text>
        </TouchableOpacity>
      </View>

      {/* Details Box */}
      <FlatList
        data={[]}
        renderItem={null}
        style={{ flex: 1.2, backgroundColor: theme.colors.light.surface, borderTopWidth: 1, borderTopColor: theme.colors.light.border }}
        ListEmptyComponent={
          <View style={{ padding: theme.spacing.xl, gap: theme.spacing.md }}>
            <Text variant="label" color="muted" style={{ fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5 }}>Delivery details</Text>

            <TouchableOpacity onPress={() => setToast("🔍 Search is simulated.")} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(201, 107, 60, 0.1)', justifyContent: 'center', alignItems: 'center' }}>
                <MapPin size={18} color={theme.colors.secondary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="body" color="text" style={{ fontWeight: '800' }}>
                  {selectedAddress.split(',')[0]}
                </Text>
                <Text variant="caption" color="sub" numberOfLines={1}>
                  {selectedAddress}
                </Text>
              </View>
              <ChevronRight size={16} color={theme.colors.light.muted} />
            </TouchableOpacity>

            {!locationPermissionEnabled && (
              <TouchableOpacity 
                onPress={() => setShowLocationDialog(true)}
                style={{
                  backgroundColor: '#FFFBEB',
                  borderWidth: 1,
                  borderColor: '#FDE68A',
                  borderRadius: 16,
                  padding: 14,
                }}
              >
                <Text variant="caption" color="warning" style={{ fontWeight: '700' }}>
                  Enable location access to get your delivery address
                </Text>
                <Text variant="caption" style={{ fontWeight: '900', color: '#F04438', marginTop: 4 }}>
                  Allow location access ‣
                </Text>
              </TouchableOpacity>
            )}

            <Input
              label="ADDRESS DETAILS"
              required
              value={addressDetails}
              onChangeText={val => handleFieldChange('addressDetails', val, setAddressDetails)}
              onBlur={() => handleFieldBlur('addressDetails', addressDetails)}
              placeholder="E.g. Floor, House no."
              error={errors.addressDetails}
              success={touched.addressDetails && !errors.addressDetails && addressDetails.trim().length > 0}
              shakeTrigger={!!errors.addressDetails}
            />

            <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="RECEIVER NAME"
                  required
                  value={receiverDetailsName}
                  onChangeText={val => handleFieldChange('recName', val, setReceiverDetailsName)}
                  onBlur={() => handleFieldBlur('recName', receiverDetailsName)}
                  placeholder="Receiver's name"
                  error={errors.recName}
                  success={touched.recName && !errors.recName && receiverDetailsName.trim().length >= 3}
                  shakeTrigger={!!errors.recName}
                />
              </View>
              <TouchableOpacity 
                onPress={() => setShowContactsModal(true)}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: theme.radius.control,
                  backgroundColor: theme.colors.light.surface,
                  borderWidth: 1.5,
                  borderColor: theme.colors.light.border,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 22,
                }}
              >
                <Contact size={20} color={theme.colors.secondary} />
              </TouchableOpacity>
            </View>

            <Input
              label="RECEIVER PHONE"
              required
              value={receiverDetailsPhone}
              onChangeText={val => handleFieldChange('recPhone', val, setReceiverDetailsPhone)}
              onBlur={() => handleFieldBlur('recPhone', receiverDetailsPhone)}
              placeholder="10-digit number"
              keyboardType="phone-pad"
              error={errors.recPhone}
              success={touched.recPhone && !errors.recPhone && receiverDetailsPhone.replace(/[^0-9]/g, '').length === 10}
              shakeTrigger={!!errors.recPhone}
            />

            <Button 
              title="Continue"
              onPress={handleNext}
              iconRight={<ChevronRight size={18} color="#FFFFFF" />}
              style={{ marginTop: theme.spacing.sm }}
            />
          </View>
        }
      />

      {/* Contacts Bottom Sheet */}
      <BottomSheet
        visible={showContactsModal}
        onClose={() => setShowContactsModal(false)}
        height={450}
      >
        <View style={{ paddingVertical: theme.spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md }}>
            <Text variant="title" color="text">Select Contact</Text>
            <Button
              onlyIcon
              variant="ghost"
              size="small"
              onPress={() => setShowContactsModal(false)}
              iconLeft={<X size={20} color={theme.colors.light.text} />}
            />
          </View>

          <Input
            label="Search Contacts"
            value={contactsSearchQuery}
            onChangeText={setContactsSearchQuery}
            placeholder="Search contacts..."
          />

          <FlatList
            data={filteredContacts}
            keyExtractor={(item, index) => item.id || String(index)}
            renderItem={({ item }) => {
              const phone = item.phoneNumbers?.[0]?.number || 'No number';
              return (
                <TouchableOpacity
                  onPress={() => {
                    setReceiverDetailsName(item.name || '');
                    setReceiverDetailsPhone(phone.replace(/[^0-9]/g, '').slice(-10));
                    setShowContactsModal(false);
                    setToast("Contact imported!");
                  }}
                  style={{
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.light.border,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <View>
                    <Text variant="body" color="text" style={{ fontWeight: '700' }}>{item.name}</Text>
                    <Text variant="caption" color="sub" style={{ marginTop: 2 }}>{phone}</Text>
                  </View>
                  <ChevronRight size={18} color={theme.colors.light.muted} />
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Text variant="caption" color="muted">No contacts found</Text>
              </View>
            }
          />
        </View>
      </BottomSheet>
    </PageLayout>
  );
}
