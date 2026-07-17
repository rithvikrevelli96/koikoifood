import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal as RNModal,
  FlatList,
  Image,
  Animated,
  BackHandler
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, Rect, Ellipse } from 'react-native-svg';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';
import {
  ArrowLeft,
  ChevronRight,
  Calendar,
  Camera,
  Lock,
  Search,
  Sparkles,
  Leaf,
  Pause,
  ShieldCheck,
  Building2,
  Home as HomeIcon,
  MapPin,
  X,
  Contact,
  Check,
  ChefHat,
  Heart
} from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { ProgressRing } from '../../core/components/Common';
import {
  theme,
  LIGHT,
  DARK,
  B,
  F,
  PageLayout,
  ScrollableLayout,
  Button,
  Input,
  PhoneInput,
  DateInput,
  Dropdown,
  Checkbox,
  Modal
} from '../../design-system';

export default function SetupScreen() {
  const {
    currentScreen,
    go,
    back,
    user,
    setUser,
    isDark,
    t,
    toast,
    setToast,
    
    // Setup 2 Address states
    selectedAddress,
    setSelectedAddress,
    addressDetails,
    setAddressDetails,
    locationPermissionEnabled,
    setLocationPermissionEnabled,
    searchQuery,
    setSearchQuery,
    receiverDetailsName,
    setReceiverDetailsName,
    receiverDetailsPhone,
    setReceiverDetailsPhone,
    showPhotoPicker,
    setShowPhotoPicker,
    showSearchModal,
    setShowSearchModal,
    showLocationDialog,
    setShowLocationDialog,
    addressesList,
    setAddressesList,
    addressLabel,
    setAddressLabel,
    doorImageUri,
    setDoorImageUri,
    mapTranslateX,
    setMapTranslateX,
    mapTranslateY,
    setMapTranslateY,
    mapOffsetList,
    setMapOffsetList,
    isDraggingMap,
    setIsDraggingMap,
    showContactsModal,
    setShowContactsModal,
    deviceContacts,
    setDeviceContacts,
    contactsSearchQuery,
    setContactsSearchQuery,
    
    // Setup 3 Health states
    setup3SubPage,
    setSetup3SubPage,
    goalWeight,
    setGoalWeight,
    workoutFrequency,
    setWorkoutFrequency,
    workoutTypes,
    setWorkoutTypes,
    primaryGoal,
    setPrimaryGoal,
    goalSpeed,
    setGoalSpeed,
    motivation,
    setMotivation,
    allergiesList,
    setAllergiesList,
    healthConditions,
    setHealthConditions,
    foodDislikes,
    setFoodDislikes,
    waterIntakeGoal,
    setWaterIntakeGoal,
    customWaterIntake,
    setCustomWaterIntake,
    bedtime,
    setBedtime,
    wakeupTime,
    setWakeupTime,
    smartNotifications,
    setSmartNotifications,
    connectedHealthApps,
    setConnectedHealthApps,

    detectCurrentLocation,
    panResponder
  } = useAppContext();

  // Exit Guard / Unsaved Changes Modal State
  const [showDiscardModal, setShowDiscardModal] = React.useState(false);

  const handleHeaderBack = React.useCallback(() => {
    const isDirty = (
      user.name !== '' ||
      user.email !== '' ||
      user.dob !== '' ||
      receiverDetailsName !== '' ||
      receiverDetailsPhone !== '' ||
      addressDetails !== ''
    );
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      back();
    }
  }, [user, receiverDetailsName, receiverDetailsPhone, addressDetails, back]);

  React.useEffect(() => {
    const onBackPress = () => {
      handleHeaderBack();
      return true;
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [handleHeaderBack]);

  const renderDiscardModal = () => {
    return (
      <Modal visible={showDiscardModal} onClose={() => setShowDiscardModal(false)}>
        <View style={{ alignItems: 'center', padding: 8 }}>
          <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#FBE8E0', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
            <X size={28} color="#C96B3C" />
          </View>
          <Text style={{ fontFamily: F.heading, fontSize: 18, fontWeight: '700', color: '#1F1F1F', marginBottom: 8, textAlign: 'center' }}>Discard changes?</Text>
          <Text style={{ fontFamily: F.body, fontSize: 13, color: '#8A857B', textAlign: 'center', marginBottom: 24, lineHeight: 18 }}>
            You have unsaved changes in your profile setup. If you go back now, you will lose your progress.
          </Text>
          <View style={{ width: '100%', gap: 10 }}>
            <Button
              title="Continue Editing"
              onPress={() => setShowDiscardModal(false)}
              variant="primary"
            />
            <Button
              title="Discard"
              onPress={() => {
                setShowDiscardModal(false);
                setUser((prev: any) => ({
                  ...prev,
                  name: '',
                  email: '',
                  dob: '',
                }));
                setReceiverDetailsName('');
                setReceiverDetailsPhone('');
                setAddressDetails('');
                back();
              }}
              variant="secondary"
            />
          </View>
        </View>
      </Modal>
    );
  };

  // Onboarding Validations Local State
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  // Input refs for scrolling and auto-focusing
  const nameRef = React.useRef<TextInput>(null);
  const emailRef = React.useRef<TextInput>(null);
  const dobRef = React.useRef<TextInput>(null);
  const addressDetailsRef = React.useRef<TextInput>(null);
  const recNameRef = React.useRef<TextInput>(null);
  const recPhoneRef = React.useRef<TextInput>(null);
  const heightRef = React.useRef<TextInput>(null);
  const weightRef = React.useRef<TextInput>(null);
  const goalWeightRef = React.useRef<TextInput>(null);
  const bedtimeRef = React.useRef<TextInput>(null);
  const wakeupTimeRef = React.useRef<TextInput>(null);
  const customWaterRef = React.useRef<TextInput>(null);

  // ScrollView Ref
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Input wrappers shake animation states
  const nameShake = React.useRef(new Animated.Value(0)).current;
  const emailShake = React.useRef(new Animated.Value(0)).current;
  const dobShake = React.useRef(new Animated.Value(0)).current;
  const addressDetailsShake = React.useRef(new Animated.Value(0)).current;
  const recNameShake = React.useRef(new Animated.Value(0)).current;
  const recPhoneShake = React.useRef(new Animated.Value(0)).current;
  const heightShake = React.useRef(new Animated.Value(0)).current;
  const weightShake = React.useRef(new Animated.Value(0)).current;
  const goalWeightShake = React.useRef(new Animated.Value(0)).current;
  const bedtimeShake = React.useRef(new Animated.Value(0)).current;
  const wakeupTimeShake = React.useRef(new Animated.Value(0)).current;
  const customWaterShake = React.useRef(new Animated.Value(0)).current;

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
      case 'addressDetails':
        if (!val.trim()) return '❌ Please enter address details (house/floor number).';
        return '';
      case 'recName':
        if (!val.trim()) return "❌ Please enter receiver's name.";
        if (val.trim().length < 3) return "❌ Name must contain at least 3 characters.";
        return '';
      case 'recPhone':
        const cleanPhone = val.replace(/[^0-9]/g, '');
        if (cleanPhone.length !== 10) return "❌ Please enter a valid 10-digit number.";
        return '';
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
      case 'goalWeight':
        const gw = parseFloat(val);
        if (isNaN(gw) || gw <= 0) return '❌ Goal weight must be a positive number.';
        if (gw < 20 || gw > 300) return '❌ Please enter a valid goal weight (20 - 300 kg).';
        return '';
      case 'bedtime':
        if (!val.trim()) return '❌ Please enter a bedtime (HH:MM).';
        return '';
      case 'wakeupTime':
        if (!val.trim()) return '❌ Please enter a wake-up time (HH:MM).';
        return '';
      case 'customWater':
        if (!val.trim()) return '❌ Please enter custom water goal.';
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

  const renderStepIndicator = (activeStep: number) => {
    return (
      <View style={{ marginBottom: 20, marginTop: 10, paddingHorizontal: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <View style={{ position: 'absolute', top: 14, left: 16, right: 16, height: 4, backgroundColor: isDark ? '#2E241E' : '#F0E8E1', zIndex: 0 }} />
          <View style={{
            position: 'absolute',
            top: 14,
            left: 16,
            width: activeStep === 1 ? '16%' : (activeStep === 2 ? '50%' : '100%'),
            height: 4,
            backgroundColor: B.orange,
            zIndex: 0
          }} />

          {/* Node 1 */}
          <View style={{ alignItems: 'center', zIndex: 1 }}>
            <View style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: activeStep >= 1 ? B.orange : (isDark ? '#1E1814' : '#FFFFFF'),
              borderWidth: 2,
              borderColor: activeStep >= 1 ? B.orange : (isDark ? '#2E241E' : '#F0E8E1'),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {activeStep > 1 ? (
                <Check size={14} color="#FFFFFF" strokeWidth={3} />
              ) : (
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: activeStep >= 1 ? '#FFFFFF' : (isDark ? '#B2A296' : '#7A7A7A') }}>1</Text>
              )}
            </View>
            <Text style={{ fontSize: 9, fontWeight: '900', color: activeStep >= 1 ? B.orange : (isDark ? '#7A6D63' : '#A8A099'), marginTop: 4, letterSpacing: 0.5 }}>PROFILE</Text>
          </View>

          {/* Node 2 */}
          <View style={{ alignItems: 'center', zIndex: 1 }}>
            <View style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: activeStep >= 2 ? B.orange : (isDark ? '#1E1814' : '#FFFFFF'),
              borderWidth: 2,
              borderColor: activeStep >= 2 ? B.orange : (isDark ? '#2E241E' : '#F0E8E1'),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {activeStep > 2 ? (
                <Check size={14} color="#FFFFFF" strokeWidth={3} />
              ) : (
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: activeStep >= 2 ? '#FFFFFF' : (isDark ? '#B2A296' : '#7A7A7A') }}>2</Text>
              )}
            </View>
            <Text style={{ fontSize: 9, fontWeight: '900', color: activeStep >= 2 ? B.orange : (isDark ? '#7A6D63' : '#A8A099'), marginTop: 4, letterSpacing: 0.5 }}>ADDRESS</Text>
          </View>

          {/* Node 3 */}
          <View style={{ alignItems: 'center', zIndex: 1 }}>
            <View style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: activeStep >= 3 ? B.orange : (isDark ? '#1E1814' : '#FFFFFF'),
              borderWidth: 2,
              borderColor: activeStep >= 3 ? B.orange : (isDark ? '#2E241E' : '#F0E8E1'),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: activeStep >= 3 ? '#FFFFFF' : (isDark ? '#B2A296' : '#7A7A7A') }}>3</Text>
            </View>
            <Text style={{ fontSize: 9, fontWeight: '900', color: activeStep >= 3 ? B.orange : (isDark ? '#7A6D63' : '#A8A099'), marginTop: 4, letterSpacing: 0.5 }}>HEALTH</Text>
          </View>
        </View>
      </View>
    );
  };

  // Location auto-detection
  const handleDetectLocation = async (silent = false) => {
    await detectCurrentLocation(silent);
  };

  // Contacts permissions & Picker
  const handlePickContact = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        setToast("Contacts permission denied. Please enable it in settings.");
        return;
      }

      if (Platform.OS !== 'web' && typeof Contacts.presentContactPickerAsync === 'function') {
        const contact = await Contacts.presentContactPickerAsync();
        if (contact) {
          setReceiverDetailsName(contact.name || '');
          if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            setReceiverDetailsPhone(contact.phoneNumbers[0].number || '');
          }
          setToast("Contact selected!");
          return;
        }
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data && data.length > 0) {
        setDeviceContacts(data);
      } else {
        setDeviceContacts([
          { id: '1', name: 'Rithvik Revelli', phoneNumbers: [{ number: '+91 7075420121' }] },
          { id: '2', name: 'Amrita Sen', phoneNumbers: [{ number: '+91 9876543210' }] },
          { id: '3', name: 'Nani', phoneNumbers: [{ number: '+91 8185998010' }] },
          { id: '4', name: 'Srinivas Reddy', phoneNumbers: [{ number: '+91 9988776655' }] }
        ]);
      }
      setShowContactsModal(true);
    } catch (error) {
      console.warn("Contact pick failed, showing mocks", error);
      setDeviceContacts([
        { id: '1', name: 'Rithvik Revelli', phoneNumbers: [{ number: '+91 7075420121' }] },
        { id: '2', name: 'Amrita Sen', phoneNumbers: [{ number: '+91 9876543210' }] },
        { id: '3', name: 'Nani', phoneNumbers: [{ number: '+91 8185998010' }] },
        { id: '4', name: 'Srinivas Reddy', phoneNumbers: [{ number: '+91 9988776655' }] }
      ]);
      setShowContactsModal(true);
    }
  };

  const handlePickImage = () => {
    setShowPhotoPicker(true);
  };

  const handleTakePhoto = async () => {
    setShowPhotoPicker(false);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setToast("Camera permission is required to take photos.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setDoorImageUri(result.assets[0].uri);
        setToast("Image captured successfully!");
      }
    } catch (error) {
      console.warn("Failed to launch camera", error);
      setToast("Failed to open camera");
    }
  };

  const handleChooseFromLibrary = async () => {
    setShowPhotoPicker(false);
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setToast("Gallery permission is required to choose photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setDoorImageUri(result.assets[0].uri);
        setToast("Image selected successfully!");
      }
    } catch (error) {
      console.warn("Failed to launch gallery", error);
      setToast("Failed to open gallery");
    }
  };

  const calculateSleepHours = (bed: string, wake: string) => {
    try {
      const [bedH, bedM] = bed.split(':').map(Number);
      const [wakeH, wakeM] = wake.split(':').map(Number);
      if (isNaN(bedH) || isNaN(bedM) || isNaN(wakeH) || isNaN(wakeM)) return "8 hours";
      
      let diffMins = (wakeH * 60 + wakeM) - (bedH * 60 + bedM);
      if (diffMins < 0) {
        diffMins += 24 * 60;
      }
      const hrs = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return mins > 0 ? `${hrs}h ${mins}m` : `${hrs} hours`;
    } catch {
      return "8 hours";
    }
  };

  if (currentScreen === 'setup1') {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFDF9', alignItems: 'center', justifyContent: 'center' }}>
        <LinearGradient
          colors={['#FED6B3', '#FFFDF9', '#FFF1E5']}
          locations={[0, 0.45, 1.0]}
          style={{ width: '100%', height: '100%', flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 24 }}>
              <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <TouchableOpacity onPress={handleHeaderBack} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#FFEEDB', justifyContent: 'center', alignItems: 'center' }}>
                    <ArrowLeft size={16} color="#13352C" />
                  </TouchableOpacity>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 10, fontWeight: '900', color: '#DF7E2C', letterSpacing: 0.5 }}>STEP 1 OF 3</Text>
                  </View>
                </View>

                {renderStepIndicator(1)}

                <Text style={{ fontSize: 24, fontWeight: '900', color: '#13352C', marginTop: 8 }}>Create Your Profile</Text>
                <Text style={{ fontSize: 13, color: '#5A6A64', marginTop: 4, lineHeight: 18 }}>
                  Help us personalize your Koi Koi dabba experience.
                </Text>

                <View style={{ alignItems: 'center', marginVertical: 16 }}>
                  <TouchableOpacity 
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 45,
                      backgroundColor: '#FFF1E5',
                      borderWidth: 2,
                      borderColor: '#FFEEDB',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      shadowColor: '#A05020',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 3
                    }}
                    onPress={() => {
                      const avatars = ['👩‍🍳', '👨‍🍳', '🥗', '🍲', '🥑', '🥦', '🥕', '🍎', '🥘'];
                      const curIdx = avatars.indexOf(user.avatar);
                      const nextIdx = (curIdx + 1) % avatars.length;
                      setUser((prev: any) => ({ ...prev, avatar: avatars[nextIdx] }));
                      setToast('Profile Photo updated!');
                    }}
                  >
                    <Text style={{ fontSize: 44 }}>{user.avatar}</Text>
                    <View style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: '#DF7E2C',
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
                  <Text style={{ fontSize: 11, color: '#7A8A83', marginTop: 8, fontWeight: '700', letterSpacing: 0.5 }}>
                    TAP TO CHANGE PHOTO
                  </Text>
                </View>

                <View style={{ gap: 16 }}>
                  <Input
                    ref={nameRef}
                    label="FULL NAME"
                    required
                    value={user.name}
                    onChangeText={val => handleFieldChange('name', val.replace(/[^a-zA-Z\s]/g, ''), text => setUser((prev: any) => ({ ...prev, name: text })))}
                    onBlur={() => handleFieldBlur('name', user.name)}
                    placeholder="Bhargav"
                    error={errors.name}
                    success={touched.name && !errors.name && user.name.trim().length >= 3}
                    shakeTrigger={!!errors.name}
                  />

                  <Input
                    label="MOBILE NUMBER (READ ONLY)"
                    value={user.phone}
                    editable={false}
                  />

                  <Input
                    ref={emailRef}
                    label="EMAIL ADDRESS"
                    required
                    value={user.email}
                    onChangeText={val => handleFieldChange('email', val.replace(/[^a-zA-Z0-9@._+-]/g, ''), text => setUser((prev: any) => ({ ...prev, email: text })))}
                    onBlur={() => handleFieldBlur('email', user.email)}
                    placeholder="bhargav@koikoi.in"
                    keyboardType="email-address"
                    error={errors.email}
                    success={touched.email && !errors.email && user.email.trim().length > 0}
                    shakeTrigger={!!errors.email}
                  />

                  <DateInput
                    ref={dobRef}
                    label="DATE OF BIRTH"
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
                    <Text style={{ fontSize: 10, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 8 }}>GENDER</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      {['Male', 'Female', 'Other'].map(g => {
                        const isSelected = user.gender === g;
                        return (
                          <TouchableOpacity
                            key={g}
                            style={{
                              flex: 1,
                              height: 48,
                              borderRadius: 14,
                              borderWidth: 1.5,
                              borderColor: isSelected ? '#DF7E2C' : '#FFEEDB',
                              backgroundColor: isSelected ? '#FFF4EC' : '#FFFFFF',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                            onPress={() => setUser((prev: any) => ({ ...prev, gender: g }))}
                          >
                            <Text style={{ fontSize: 13, fontWeight: '800', color: isSelected ? '#DF7E2C' : '#13352C' }}>
                              {g}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>

                <TouchableOpacity 
                  style={{
                    width: '100%',
                    height: 56,
                    borderRadius: 28,
                    marginTop: 28,
                    overflow: 'hidden',
                    shadowColor: '#DF7E2C',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 5,
                  }} 
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
                        scrollAndShake('name', nameRef, nameShake, 150);
                      } else if (newErrors.email) {
                        scrollAndShake('email', emailRef, emailShake, 250);
                      } else if (newErrors.dob) {
                        scrollAndShake('dob', dobRef, dobShake, 350);
                      }
                      return;
                    }
                    go('setup2');
                  }}
                >
                  <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>Continue</Text>
                    <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.5} />
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </SafeAreaView>
        </LinearGradient>
        {renderDiscardModal()}
      </View>
    );
  }

  if (currentScreen === 'setup2') {
    const isMaisammaguda = selectedAddress.includes("Maisammaguda");

    const renderContactsModal = () => {
      const filteredContacts = deviceContacts.filter((c: any) => 
        c.name?.toLowerCase().includes(contactsSearchQuery.toLowerCase())
      );

      return (
        <RNModal visible={showContactsModal} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
            <View style={{ height: '70%', backgroundColor: t.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '800', color: t.text }}>Select Contact</Text>
                <TouchableOpacity onPress={() => setShowContactsModal(false)} style={{ padding: 4 }}>
                  <X size={24} color={t.text} />
                </TouchableOpacity>
              </View>

              <TextInput
                style={{
                  height: 48,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: t.border,
                  backgroundColor: t.input,
                  color: t.text,
                  paddingHorizontal: 16,
                  marginBottom: 16
                }}
                placeholder="Search contacts..."
                placeholderTextColor={t.muted}
                value={contactsSearchQuery}
                onChangeText={setContactsSearchQuery}
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
                        borderBottomColor: t.border,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: t.text }}>{item.name}</Text>
                        <Text style={{ fontSize: 13, color: t.muted, marginTop: 2 }}>{phone}</Text>
                      </View>
                      <ChevronRight size={18} color={t.muted} />
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={
                  <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Text style={{ color: t.muted }}>No contacts found</Text>
                  </View>
                }
              />
            </View>
          </View>
        </RNModal>
      );
    };

    const renderPhotoPickerModal = () => {
      if (!showPhotoPicker) return null;
      return (
        <RNModal transparent visible={showPhotoPicker} animationType="fade">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <View style={{ width: '100%', maxWidth: 300, backgroundColor: t.card, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: t.border }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color: t.text, textAlign: 'center', marginBottom: 20 }}>Upload Door/Building Image</Text>
              
              <TouchableOpacity
                onPress={handleTakePhoto}
                style={{
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: B.orange,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12
                }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>Take Photo (Camera)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleChooseFromLibrary}
                style={{
                  height: 48,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: B.orange,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16
                }}
              >
                <Text style={{ color: B.orange, fontWeight: 'bold', fontSize: 14 }}>Choose from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowPhotoPicker(false)}
                style={{
                  alignSelf: 'center',
                  padding: 8
                }}
              >
                <Text style={{ color: t.muted, fontWeight: '700', fontSize: 13 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RNModal>
      );
    };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={t.bg} />
        
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, gap: 10 }}>
          <TouchableOpacity onPress={handleHeaderBack} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <ArrowLeft size={24} color={t.text} />
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => setShowSearchModal(true)} 
            style={{ 
              flex: 1,
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: t.input, 
              borderRadius: 16, 
              paddingHorizontal: 16, 
              height: 50, 
              borderWidth: 1.5,
              borderColor: t.border
            }}
          >
            <Search size={18} color={t.muted} />
            <Text style={{ color: t.muted, marginLeft: 10, fontSize: 14 }}>Search for area, street name...</Text>
          </TouchableOpacity>
        </View>

        {renderStepIndicator(2)}

        <View 
          {...panResponder.panHandlers}
          style={{ flex: 1, backgroundColor: isDark ? '#1C1F22' : '#F0F4F8', position: 'relative', overflow: 'hidden', marginTop: 8 }}
        >
          <View style={{ 
            position: 'absolute', 
            width: 1000, 
            height: 1000, 
            left: -300, 
            top: -300,
            transform: [{ translateX: mapTranslateX }, { translateY: mapTranslateY }] 
          }}>
            <Svg width="100%" height="100%" style={{ opacity: isDark ? 0.15 : 0.4 }}>
              <Path d="M 0 100 L 1000 300 M 100 0 L 300 1000 M 0 700 L 1000 400 M 500 0 L 500 1000 M 200 100 L 800 900 M 800 100 L 200 900" stroke={isDark ? "#FFFFFF" : "#475467"} strokeWidth={4} />
              <Rect x={140} y={250} width={180} height={120} rx={16} fill={isDark ? "#2E7D32" : "#81C784"} opacity={0.6} />
              <Rect x={600} y={450} width={150} height={200} rx={16} fill={isDark ? "#1565C0" : "#64B5F6"} opacity={0.6} />
              <Ellipse cx={500} cy={200} rx={90} ry={60} fill={isDark ? "#C62828" : "#E57373"} opacity={0.5} />
            </Svg>

            <View style={{ position: 'absolute', top: 220, left: 160, opacity: 0.6 }}>
              <Text style={{ fontSize: 11, color: t.text, fontWeight: 'bold' }}>St.Peter's High School</Text>
            </View>
            <View style={{ position: 'absolute', top: 480, right: 280, opacity: 0.6 }}>
              <Text style={{ fontSize: 11, color: t.text, fontWeight: 'bold' }}>Devashrey Hostel - Zeus</Text>
            </View>
            <View style={{ position: 'absolute', top: 620, left: 240, opacity: 0.6 }}>
              <Text style={{ fontSize: 11, color: t.text, fontWeight: 'bold' }}>Ajith boys hostel</Text>
            </View>
            <View style={{ position: 'absolute', top: 380, right: 350, opacity: 0.6 }}>
              <Text style={{ fontSize: 11, color: t.text, fontWeight: 'bold' }}>Tower 3 lobby entry</Text>
            </View>
          </View>

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
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 5
            }}>
              <Text style={{ fontSize: 11, color: '#101828', fontWeight: '800', textAlign: 'center' }}>Move pin to your exact delivery location</Text>
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

          <TouchableOpacity 
            onPress={() => {
              setMapTranslateX(0);
              setMapTranslateY(0);
              setMapOffsetList({ x: 0, y: 0 });
              handleDetectLocation();
            }}
            style={{ 
              position: 'absolute', 
              bottom: 16, 
              alignSelf: 'center', 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: t.card, 
              borderWidth: 1.5, 
              borderColor: t.border, 
              borderRadius: 20, 
              paddingHorizontal: 16, 
              paddingVertical: 10,
              gap: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#F04438" strokeWidth={2.5}>
              <Circle cx={12} cy={12} r={8} />
              <Circle cx={12} cy={12} r={3} />
              <Path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12" />
            </Svg>
            <Text style={{ fontSize: 13, fontWeight: '800', color: '#F04438' }}>Use current location</Text>
          </TouchableOpacity>
        </View>

        <View style={{ maxHeight: '55%', backgroundColor: t.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, borderTopColor: t.border }}>
          <ScrollView ref={scrollViewRef} contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 13, fontWeight: '900', color: t.sub, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Delivery details</Text>

            <TouchableOpacity onPress={() => setShowSearchModal(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(240, 68, 56, 0.1)', justifyContent: 'center', alignItems: 'center' }}>
                <MapPin size={18} color="#F04438" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '800', color: t.text, lineHeight: 20 }}>
                  {selectedAddress.split(',')[0]}
                </Text>
                <Text style={{ fontSize: 12, color: t.muted, marginTop: 2 }} numberOfLines={1}>
                  {selectedAddress}
                </Text>
              </View>
              <ChevronRight size={16} color={t.muted} />
            </TouchableOpacity>

            {!locationPermissionEnabled ? (
              <TouchableOpacity 
                onPress={() => setShowLocationDialog(true)}
                style={{
                  backgroundColor: isDark ? 'rgba(234, 179, 8, 0.05)' : '#FFFBEB',
                  borderWidth: 1,
                  borderColor: isDark ? 'rgba(234, 179, 8, 0.25)' : '#FDE68A',
                  borderRadius: 16,
                  padding: 14,
                  marginBottom: 16
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#EAB308' }}>
                  Enable location access to get your delivery address
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '900', color: '#F04438', marginTop: 4 }}>
                  Allow location access ‣
                </Text>
              </TouchableOpacity>
            ) : isMaisammaguda ? (
              <View style={{
                backgroundColor: isDark ? 'rgba(234, 179, 8, 0.05)' : '#FFFBEB',
                borderWidth: 1,
                borderColor: isDark ? 'rgba(234, 179, 8, 0.25)' : '#FDE68A',
                borderRadius: 16,
                padding: 14,
                marginBottom: 16
              }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#EAB308', lineHeight: 18 }}>
                  The selected restaurant is not available for delivery at your location.
                </Text>
              </View>
            ) : null}

            <Input
              ref={addressDetailsRef}
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

            <View style={{ borderTopWidth: 1, borderTopColor: t.border, paddingTop: 16, marginBottom: 16 }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: t.sub, letterSpacing: 0.5, marginBottom: 14 }}>RECEIVER DETAILS FOR THIS ADDRESS</Text>
              
              <Input
                ref={recNameRef}
                label="Receiver's Name"
                required
                value={receiverDetailsName}
                onChangeText={val => handleFieldChange('recName', val, setReceiverDetailsName)}
                onBlur={() => handleFieldBlur('recName', receiverDetailsName)}
                placeholder="Enter name"
                error={errors.recName}
                success={touched.recName && !errors.recName && receiverDetailsName.trim().length >= 3}
                shakeTrigger={!!errors.recName}
                rightIcon={
                  <TouchableOpacity onPress={handlePickContact} style={{ padding: 4 }}>
                    <Contact size={20} color={B.orange} />
                  </TouchableOpacity>
                }
              />

              <PhoneInput
                ref={recPhoneRef}
                label="Receiver's Phone"
                required
                value={receiverDetailsPhone}
                onChangeText={val => handleFieldChange('recPhone', val, setReceiverDetailsPhone)}
                onBlur={() => handleFieldBlur('recPhone', receiverDetailsPhone)}
                placeholder="Enter phone number"
                error={errors.recPhone}
                success={touched.recPhone && !errors.recPhone && receiverDetailsPhone.replace(/[^0-9]/g, '').length === 10}
                shakeTrigger={!!errors.recPhone}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: t.sub, letterSpacing: 0.5, marginBottom: 10 }}>SAVE ADDRESS AS</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity 
                  onPress={() => setAddressLabel('Home')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: addressLabel === 'Home' ? B.orange : t.border,
                    backgroundColor: addressLabel === 'Home' ? (isDark ? 'rgba(233, 106, 46, 0.1)' : 'rgba(233, 106, 46, 0.05)') : t.input,
                    gap: 6
                  }}
                >
                  <HomeIcon size={16} color={addressLabel === 'Home' ? B.orange : t.muted} />
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: addressLabel === 'Home' ? B.orange : t.text }}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => setAddressLabel('Work')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: addressLabel === 'Work' ? B.orange : t.border,
                    backgroundColor: addressLabel === 'Work' ? (isDark ? 'rgba(233, 106, 46, 0.1)' : 'rgba(233, 106, 46, 0.05)') : t.input,
                    gap: 6
                  }}
                >
                  <Building2 size={16} color={addressLabel === 'Work' ? B.orange : t.muted} />
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: addressLabel === 'Work' ? B.orange : t.text }}>Work</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => setAddressLabel('Other')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: addressLabel === 'Other' ? B.orange : t.border,
                    backgroundColor: addressLabel === 'Other' ? (isDark ? 'rgba(233, 106, 46, 0.1)' : 'rgba(233, 106, 46, 0.05)') : t.input,
                    gap: 6
                  }}
                >
                  <MapPin size={16} color={addressLabel === 'Other' ? B.orange : t.muted} />
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: addressLabel === 'Other' ? B.orange : t.text }}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 11, fontWeight: '900', color: t.sub, letterSpacing: 0.5, marginBottom: 8 }}>DOOR/BUILDING IMAGE (OPTIONAL)</Text>
              
              {doorImageUri ? (
                <View style={{ height: 120, borderRadius: 14, overflow: 'hidden', borderWidth: 1.5, borderColor: t.border, position: 'relative' }}>
                  <Image source={{ uri: doorImageUri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  <TouchableOpacity 
                    onPress={() => setDoorImageUri(null)}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <X size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  onPress={handlePickImage}
                  style={{
                    borderWidth: 1.5,
                    borderStyle: 'dashed',
                    borderColor: B.orange,
                    borderRadius: 14,
                    height: 52,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 8,
                    backgroundColor: t.input
                  }}
                >
                  <Camera size={18} color={B.orange} />
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: B.orange }}>Add an image</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={{
                height: 52,
                borderRadius: 26,
                overflow: 'hidden',
                backgroundColor: B.orange,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                const e1 = validateField('addressDetails', addressDetails);
                const e2 = validateField('recName', receiverDetailsName);
                const e3 = validateField('recPhone', receiverDetailsPhone);

                const newErrors: Record<string, string> = {};
                if (isMaisammaguda) newErrors.selectedAddress = "Sorry, we do not deliver to Maisammaguda yet. Please pick another area.";
                if (e1) newErrors.addressDetails = e1;
                if (e2) newErrors.recName = e2;
                if (e3) newErrors.recPhone = e3;

                setErrors(newErrors);
                setTouched({ addressDetails: true, recName: true, recPhone: true });

                if (Object.keys(newErrors).length > 0) {
                  if (newErrors.addressDetails) {
                    scrollAndShake('addressDetails', addressDetailsRef, addressDetailsShake, 50);
                  } else if (newErrors.recName) {
                    scrollAndShake('recName', recNameRef, recNameShake, 150);
                  } else if (newErrors.recPhone) {
                    scrollAndShake('recPhone', recPhoneRef, recPhoneShake, 250);
                  }
                  return;
                }
                
                const fullAddressString = addressDetails + ", " + selectedAddress;
                const newAddr = {
                  id: Date.now().toString(),
                  label: addressLabel,
                  address: fullAddressString,
                  name: receiverDetailsName,
                  phone: receiverDetailsPhone,
                  image: doorImageUri || undefined
                };

                setAddressesList((prev: any) => [newAddr, ...prev]);
                setUser((prev: any) => ({
                  ...prev,
                  houseNo: addressDetails,
                  street: selectedAddress.split(',')[0],
                  address: fullAddressString,
                  addressLabel: addressLabel
                }));

                setToast("Address saved successfully!");
                setErrors({});
                setTouched({});
                go('setup3');
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800' }}>Save address</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {renderContactsModal()}
        {renderPhotoPickerModal()}
        {renderDiscardModal()}
      </SafeAreaView>
    );
  }

  // STEP 3: Health info & Preferences
  const w = parseFloat(user.weight) || 74;
  const h = (parseFloat(user.height) || 178) / 100;
  const bmiVal = Math.round((w / (h * h)) * 10) / 10;

  let bmiStatus = 'Normal Weight';
  let bmiColor = '#2E7D32'; 
  let bmiBg = isDark ? 'rgba(46, 125, 50, 0.1)' : 'rgba(46, 125, 50, 0.05)'; 
  let bmiBorder = isDark ? 'rgba(46, 125, 50, 0.3)' : 'rgba(46, 125, 50, 0.15)';
  
  if (bmiVal < 18.5) {
    bmiStatus = 'Underweight';
    bmiColor = '#F59E0B'; 
    bmiBg = isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)';
    bmiBorder = isDark ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.15)';
  } else if (bmiVal >= 25 && bmiVal < 30) {
    bmiStatus = 'Overweight';
    bmiColor = '#EF4444'; 
    bmiBg = isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)';
    bmiBorder = isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.15)';
  } else if (bmiVal >= 30) {
    bmiStatus = 'Obese';
    bmiColor = '#B91C1C'; 
    bmiBg = isDark ? 'rgba(185, 28, 28, 0.1)' : 'rgba(185, 28, 28, 0.05)';
    bmiBorder = isDark ? 'rgba(185, 28, 28, 0.3)' : 'rgba(185, 28, 28, 0.15)';
  }

  const progressPct = 75 + (setup3SubPage - 1) * 6.25; 
  const displayedPercent = Math.round(75 + (setup3SubPage - 1) * 8.33); 
  
  const handleSetup3Back = () => {
    if (setup3SubPage > 1) {
      setSetup3SubPage(setup3SubPage - 1);
    } else {
      back();
    }
  };

  const handleSetup3Next = () => {
    if (setup3SubPage === 1) {
      const e1 = validateField('height', user.height);
      const e2 = validateField('weight', user.weight);
      const e3 = validateField('goalWeight', goalWeight);

      const newErrors: Record<string, string> = {};
      if (e1) newErrors.height = e1;
      if (e2) newErrors.weight = e2;
      if (e3) newErrors.goalWeight = e3;

      setErrors(newErrors);
      setTouched({ height: true, weight: true, goalWeight: true });

      if (Object.keys(newErrors).length > 0) {
        if (newErrors.height) {
          scrollAndShake('height', heightRef, heightShake, 100);
        } else if (newErrors.weight) {
          scrollAndShake('weight', weightRef, weightShake, 100);
        } else if (newErrors.goalWeight) {
          scrollAndShake('goalWeight', goalWeightRef, goalWeightShake, 100);
        }
        return;
      }
      setErrors({});
      setTouched({});
      setSetup3SubPage(2);
    } else if (setup3SubPage === 2) {
      setSetup3SubPage(3);
    } else if (setup3SubPage === 3) {
      setSetup3SubPage(4);
    } else {
      const e1 = validateField('bedtime', bedtime);
      const e2 = validateField('wakeupTime', wakeupTime);
      const showCustomWater = waterIntakeGoal === 'Custom';
      const e3 = showCustomWater ? validateField('customWater', customWaterIntake) : '';

      const newErrors: Record<string, string> = {};
      if (e1) newErrors.bedtime = e1;
      if (e2) newErrors.wakeupTime = e2;
      if (e3) newErrors.customWater = e3;

      setErrors(newErrors);
      setTouched({ bedtime: true, wakeupTime: true, customWater: showCustomWater });

      if (Object.keys(newErrors).length > 0) {
        if (newErrors.customWater) {
          scrollAndShake('customWater', customWaterRef, customWaterShake, 100);
        } else if (newErrors.bedtime) {
          scrollAndShake('bedtime', bedtimeRef, bedtimeShake, 180);
        } else if (newErrors.wakeupTime) {
          scrollAndShake('wakeupTime', wakeupTimeRef, wakeupTimeShake, 180);
        }
        return;
      }

      setUser((prev: any) => ({
        ...prev,
        height: user.height,
        weight: user.weight,
        goalWeight: goalWeight,
        activityLevel: user.activityLevel,
        workoutFrequency: workoutFrequency,
        workoutTypes: workoutTypes,
        healthGoal: primaryGoal,
        goalSpeed: goalSpeed,
        motivation: motivation,
        foodPref: user.foodPref,
        allergies: allergiesList.length > 0 ? allergiesList.join(', ') : 'None',
        healthConditions: healthConditions,
        foodDislikes: foodDislikes,
        waterIntakeGoal: waterIntakeGoal === 'Custom' ? customWaterIntake + ' L' : waterIntakeGoal,
        bedtime: bedtime,
        wakeupTime: wakeupTime,
        sleepHours: calculateSleepHours(bedtime, wakeupTime),
        smartNotifications: smartNotifications,
        connectedHealthApps: connectedHealthApps
      }));
      setToast("Profile onboarding completed successfully!");
      setErrors({});
      setTouched({});
      go('home');
    }
  };

  const toggleWorkoutType = (type: string) => {
    setWorkoutTypes((prev: any) => 
      prev.includes(type) ? prev.filter((t: any) => t !== type) : [...prev, type]
    );
  };

  const toggleAllergy = (allergy: string) => {
    setAllergiesList((prev: any) => 
      prev.includes(allergy) ? prev.filter((a: any) => a !== allergy) : [...prev, allergy]
    );
  };

  const toggleCondition = (cond: string) => {
    if (cond === 'None') {
      setHealthConditions(['None']);
      return;
    }
    setHealthConditions((prev: any) => {
      const filtered = prev.filter((x: any) => x !== 'None');
      return filtered.includes(cond) ? filtered.filter((x: any) => x !== cond) : [...filtered, cond];
    });
  };

  const toggleDislike = (dislike: string) => {
    setFoodDislikes((prev: any) => 
      prev.includes(dislike) ? prev.filter((d: any) => d !== dislike) : [...prev, dislike]
    );
  };

  const toggleHealthApp = (app: string) => {
    setConnectedHealthApps((prev: any) => 
      prev.includes(app) ? prev.filter((a: any) => a !== app) : [...prev, app]
    );
  };

  const renderPage1 = () => (
    <View style={{ gap: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>Page 1 — Body & Fitness Profile</Text>
      <Text style={{ fontSize: 13, color: t.sub, lineHeight: 18 }}>Understand your physical measurements and daily activity.</Text>
      
      <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2 }}>PHYSICAL MEASUREMENTS</Text>
      
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Input
          ref={heightRef}
          label="HEIGHT (CM)"
          required
          value={user.height}
          onChangeText={val => handleFieldChange('height', val.replace(/[^0-9.]/g, ''), text => setUser((prev: any) => ({ ...prev, height: text })))}
          onBlur={() => handleFieldBlur('height', user.height)}
          placeholder="178"
          error={errors.height}
          success={touched.height && !errors.height && user.height.trim().length > 0}
          shakeTrigger={!!errors.height}
          keyboardType="numeric"
          containerStyle={{ flex: 1 }}
        />

        <Input
          ref={weightRef}
          label="WEIGHT (KG)"
          required
          value={user.weight}
          onChangeText={val => handleFieldChange('weight', val.replace(/[^0-9.]/g, ''), text => setUser((prev: any) => ({ ...prev, weight: text })))}
          onBlur={() => handleFieldBlur('weight', user.weight)}
          placeholder="74"
          error={errors.weight}
          success={touched.weight && !errors.weight && user.weight.trim().length > 0}
          shakeTrigger={!!errors.weight}
          keyboardType="numeric"
          containerStyle={{ flex: 1 }}
        />

        <Input
          ref={goalWeightRef}
          label="GOAL WEIGHT"
          required
          value={goalWeight}
          onChangeText={val => handleFieldChange('goalWeight', val.replace(/[^0-9.]/g, ''), setGoalWeight)}
          onBlur={() => handleFieldBlur('goalWeight', goalWeight)}
          placeholder="70"
          error={errors.goalWeight}
          success={touched.goalWeight && !errors.goalWeight && goalWeight.trim().length > 0}
          shakeTrigger={!!errors.goalWeight}
          keyboardType="numeric"
          containerStyle={{ flex: 1 }}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: bmiBg, borderWidth: 1.5, borderColor: bmiBorder, borderRadius: 18, padding: 14, gap: 16 }}>
        <ProgressRing pct={70} size={60} strokeW={5} color={bmiColor} label={String(bmiVal)} theme={t} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: bmiColor }}>{bmiStatus} (BMI: {bmiVal})</Text>
          <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>Your recommended daily calorie intake dynamically adapts to this target.</Text>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>DAILY ACTIVITY LEVEL</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Athlete'].map(level => {
            const isSel = user.activityLevel === level;
            return (
              <TouchableOpacity
                key={level}
                onPress={() => setUser((prev: any) => ({ ...prev, activityLevel: level }))}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: isSel ? B.orange : t.border,
                  backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{level}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>WORKOUT FREQUENCY</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['Never', '1–2 days/week', '3–4 days/week', '5–6 days/week', 'Daily'].map(freq => {
            const isSel = workoutFrequency === freq;
            return (
              <TouchableOpacity
                key={freq}
                onPress={() => setWorkoutFrequency(freq)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: isSel ? B.orange : t.border,
                  backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{freq}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>WORKOUT TYPE (MULTI-SELECT)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['Walking', 'Running', 'Gym', 'Yoga', 'Cycling', 'Swimming', 'Home Workout', 'Strength Training', 'Sports', 'Other'].map(type => {
            const isSel = workoutTypes.includes(type);
            return (
              <TouchableOpacity
                key={type}
                onPress={() => toggleWorkoutType(type)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: isSel ? B.orange : t.border,
                  backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{type}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );

  const renderPage2 = () => {
    const showSpeed = primaryGoal === 'Lose Weight' || primaryGoal === 'Gain Weight';
    return (
      <View style={{ gap: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>Page 2 — Health Goals</Text>
        <Text style={{ fontSize: 13, color: t.sub, lineHeight: 18 }}>Select your primary targets and motivations.</Text>

        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>PRIMARY FITNESS GOAL</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Lose Weight', 'Gain Weight', 'Build Muscle', 'Maintain Weight', 'Eat Healthy', 'Improve Energy', 'Improve Fitness'].map(goal => {
              const isSel = primaryGoal === goal;
              return (
                <TouchableOpacity
                  key={goal}
                  onPress={() => setPrimaryGoal(goal)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{goal}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {showSpeed ? (
          <View>
            <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>GOAL SPEED (WEIGHT CHANGE / WEEK)</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {['Slow (0.25 kg/week)', 'Moderate (0.5 kg/week)', 'Fast (0.75 kg/week)', 'Extreme (1 kg/week)'].map(speed => {
                const isSel = goalSpeed === speed || (speed.includes(goalSpeed) && goalSpeed.length > 0);
                return (
                  <TouchableOpacity
                    key={speed}
                    onPress={() => setGoalSpeed(speed)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: isSel ? B.orange : t.border,
                      backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{speed}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : null}

        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>WHAT MOTIVATES YOU?</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {[
              'Live a Healthier Lifestyle',
              "Doctor's Recommendation",
              'Build Muscle',
              'Weight Loss',
              'Better Energy',
              'Improve Sports Performance',
              'Wedding/Event',
              'Other'
            ].map(mote => {
              const isSel = motivation === mote;
              return (
                <TouchableOpacity
                  key={mote}
                  onPress={() => setMotivation(mote)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{mote}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderPage3 = () => (
    <View style={{ gap: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>Page 3 — Food & Health Preferences</Text>
      <Text style={{ fontSize: 13, color: t.sub, lineHeight: 18 }}>Personalize your meals and list safety/allergen rules.</Text>

      <View>
        <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>DIETARY PREFERENCE</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan'].map(pref => {
            const isSel = user.foodPref === pref || (pref === 'Vegetarian' && user.foodPref === 'Veg') || (pref === 'Non-Vegetarian' && user.foodPref === 'Non-Veg');
            return (
              <TouchableOpacity
                key={pref}
                onPress={() => setUser((prev: any) => ({ ...prev, foodPref: pref }))}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: isSel ? B.orange : t.border,
                  backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{pref}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>FOOD ALLERGIES (MULTI-SELECT)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['Dairy', 'Eggs', 'Peanuts', 'Tree Nuts', 'Gluten', 'Soy', 'Seafood', 'Shellfish', 'Sesame', 'Other'].map(allergy => {
            const isSel = allergiesList.includes(allergy);
            return (
              <TouchableOpacity
                key={allergy}
                onPress={() => toggleAllergy(allergy)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: isSel ? B.orange : t.border,
                  backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{allergy}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>HEALTH CONDITIONS (OPTIONAL / MULTI-SELECT)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['Diabetes', 'High Blood Pressure', 'Thyroid', 'PCOS', 'High Cholesterol', 'Kidney Disease', 'Fatty Liver', 'Heart Disease', 'None'].map(cond => {
            const isSel = healthConditions.includes(cond);
            return (
              <TouchableOpacity
                key={cond}
                onPress={() => toggleCondition(cond)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: isSel ? B.orange : t.border,
                  backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{cond}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>FOOD DISLIKES (MULTI-SELECT)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['Onion', 'Garlic', 'Mushroom', 'Paneer', 'Fish', 'Chicken', 'Spicy Food', 'Bitter Foods', 'Other'].map(dislike => {
            const isSel = foodDislikes.includes(dislike);
            return (
              <TouchableOpacity
                key={dislike}
                onPress={() => toggleDislike(dislike)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: isSel ? B.orange : t.border,
                  backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{dislike}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );

  const renderPage4 = () => {
    const showCustomWater = waterIntakeGoal === 'Custom';
    const sleepHoursText = calculateSleepHours(bedtime, wakeupTime);
    return (
      <View style={{ gap: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '900', color: t.text }}>Page 4 — Healthy Lifestyle</Text>
        <Text style={{ fontSize: 13, color: t.sub, lineHeight: 18 }}>Habit configuration and tracking integrations.</Text>

        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>DAILY WATER INTAKE GOAL</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: showCustomWater ? 10 : 0 }}>
            {['2 L', '2.5 L', '3 L', 'Custom'].map(goal => {
              const isSel = waterIntakeGoal === goal;
              return (
                <TouchableOpacity
                  key={goal}
                  onPress={() => setWaterIntakeGoal(goal)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{goal}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {showCustomWater ? (
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: t.sub, marginBottom: 6 }}>CUSTOM WATER INTAKE (L) *</Text>
              <Animated.View style={{
                flexDirection: 'row',
                height: 50,
                borderRadius: 14,
                borderWidth: 1.5,
                borderColor: errors.customWater ? '#EF4444' : (touched.customWater && !errors.customWater ? '#10B981' : t.border),
                backgroundColor: t.input,
                alignItems: 'center',
                paddingHorizontal: 16,
                transform: [{ translateX: customWaterShake }]
              }}>
                <TextInput
                  ref={customWaterRef}
                  style={{ flex: 1, fontSize: 14, color: t.text, fontWeight: '600', height: '100%' }}
                  value={customWaterIntake}
                  onChangeText={val => handleFieldChange('customWater', val.replace(/[^0-9.]/g, ''), setCustomWaterIntake)}
                  onBlur={() => handleFieldBlur('customWater', customWaterIntake)}
                  placeholder="E.g. 3.5"
                  placeholderTextColor={t.muted}
                  keyboardType="numeric"
                />
                {touched.customWater && !errors.customWater && customWaterIntake.trim().length > 0 && (
                  <Check size={14} color="#10B981" strokeWidth={3} />
                )}
              </Animated.View>
              {errors.customWater ? (
                <Text style={{ color: '#DC2626', fontSize: 12, marginTop: 4, marginLeft: 4, fontWeight: '600' }}>{errors.customWater}</Text>
              ) : null}
            </View>
          ) : null}
        </View>

        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>SLEEP SCHEDULE</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
            <Input
              ref={bedtimeRef}
              label="BEDTIME"
              required
              value={bedtime}
              onChangeText={val => handleFieldChange('bedtime', val, setBedtime)}
              onBlur={() => handleFieldBlur('bedtime', bedtime)}
              placeholder="22:00"
              error={errors.bedtime}
              success={touched.bedtime && !errors.bedtime && bedtime.trim().length > 0}
              shakeTrigger={!!errors.bedtime}
              containerStyle={{ flex: 1 }}
            />

            <Input
              ref={wakeupTimeRef}
              label="WAKE-UP TIME"
              required
              value={wakeupTime}
              onChangeText={val => handleFieldChange('wakeupTime', val, setWakeupTime)}
              onBlur={() => handleFieldBlur('wakeupTime', wakeupTime)}
              placeholder="06:00"
              error={errors.wakeupTime}
              success={touched.wakeupTime && !errors.wakeupTime && wakeupTime.trim().length > 0}
              shakeTrigger={!!errors.wakeupTime}
              containerStyle={{ flex: 1 }}
            />
          </View>

          <View style={{ backgroundColor: isDark ? 'rgba(233,106,46,0.1)' : '#FFF4EC', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: t.border, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: t.text, fontWeight: '700' }}>
              Auto-calculated Average Sleep: <Text style={{ color: B.orange, fontWeight: '900' }}>{sleepHoursText}</Text>
            </Text>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>SMART NOTIFICATIONS (REMINDERS)</Text>
          <View style={{ gap: 8 }}>
            {[
              { key: 'meal', label: 'Meal Reminder' },
              { key: 'water', label: 'Water Reminder' },
              { key: 'workout', label: 'Workout Reminder' },
              { key: 'sleep', label: 'Sleep Reminder' },
              { key: 'orderUpdates', label: 'Order & Delivery Updates (default enabled)' }
            ].map(item => {
              const isVal = (smartNotifications as any)[item.key];
              return (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setSmartNotifications((prev: any) => ({ ...prev, [item.key]: !isVal }))}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 14,
                    borderRadius: 14,
                    borderWidth: 1.5,
                    borderColor: isVal ? B.orange : t.border,
                    backgroundColor: isVal ? (isDark ? 'rgba(233, 106, 46, 0.1)' : 'rgba(233, 106, 46, 0.05)') : t.input
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }}>{item.label}</Text>
                  <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: isVal ? B.orange : t.muted,
                    backgroundColor: isVal ? B.orange : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {isVal ? <Check size={12} color="#FFFFFF" strokeWidth={3} /> : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2, marginBottom: 10 }}>CONNECT HEALTH APPS (OPTIONAL)</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Apple Health', 'Google Fit', 'Fitbit', 'Garmin', 'Samsung Health'].map(app => {
              const isSel = connectedHealthApps.includes(app);
              return (
                <TouchableOpacity
                  key={app}
                  onPress={() => toggleHealthApp(app)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: isSel ? B.orange : t.border,
                    backgroundColor: isSel ? (isDark ? 'rgba(233, 106, 46, 0.15)' : '#FFF4EC') : t.input
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: '800', color: isSel ? B.orange : t.text }}>{app}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <TouchableOpacity onPress={handleSetup3Back} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.surface, borderWidth: 1.5, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}>
              <ArrowLeft size={16} color={t.text} />
            </TouchableOpacity>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 10, fontWeight: '900', color: B.orange, letterSpacing: 0.5 }}>STEP 3 OF 3</Text>
              <Text style={{ fontSize: 10, color: t.muted, fontWeight: 'bold', marginTop: 1 }}>Page {setup3SubPage} of 4</Text>
            </View>
          </View>

          {renderStepIndicator(3)}

          <View style={{ marginTop: 8 }} />

          {setup3SubPage === 1 && renderPage1()}
          {setup3SubPage === 2 && renderPage2()}
          {setup3SubPage === 3 && renderPage3()}
          {setup3SubPage === 4 && renderPage4()}

          <TouchableOpacity 
            style={{
              width: '100%',
              height: 56,
              borderRadius: 28,
              marginTop: 28,
              overflow: 'hidden',
              shadowColor: B.orange,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 5,
              marginBottom: 16
            }} 
            onPress={handleSetup3Next}
          >
            <LinearGradient colors={['#FF852C', '#FD4F1B']} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 16.5, fontWeight: '800' }}>
                {setup3SubPage === 4 ? 'Complete Onboarding ✓' : 'Continue'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {renderDiscardModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  }
});
