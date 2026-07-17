import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft, Play, ShieldAlert, Sparkles, Layers } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme, Button, Input, PhoneInput, DateInput, OTPInput, BottomSheet, Modal, Checkbox, Badge, Chip, Card, Divider } from '../../design-system';

interface ComponentsScreenProps {
  onBack: () => void;
}

export default function ComponentsScreen({ onBack }: ComponentsScreenProps) {
  const { setToast, t } = useAppContext();

  // Button Sandbox States
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'ghost'>('primary');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnRadius, setBtnRadius] = useState<number>(28);

  // Input Sandbox States
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');
  const [inputSuccess, setInputSuccess] = useState(false);

  // Phone & Date States
  const [phoneVal, setPhoneVal] = useState('');
  const [dateVal, setDateVal] = useState('');
  const [otpVal, setOtpVal] = useState('');

  // Checkbox State
  const [checked, setChecked] = useState(false);

  // Overlays States
  const [sheetVisible, setSheetVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Component Library Playground</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Button Sandbox */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>BUTTON LIVE SANDBOX</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
          <View style={{ marginBottom: 20 }}>
            <Button
              title="Live Sandbox Button"
              variant={btnVariant}
              loading={btnLoading}
              disabled={btnDisabled}
              style={{ borderRadius: btnRadius }}
              onPress={() => setToast('Button tapped!')}
            />
          </View>

          <Divider style={{ marginVertical: 12 }} />

          {/* Variant Selector */}
          <Text style={styles.sandboxLabel}>Variant</Text>
          <View style={styles.optionsRow}>
            {(['primary', 'secondary', 'ghost'] as const).map(v => (
              <TouchableOpacity
                key={v}
                onPress={() => setBtnVariant(v)}
                style={[styles.optionBtn, btnVariant === v && styles.optionBtnActive]}
              >
                <Text style={[styles.optionText, btnVariant === v && styles.optionTextActive]}>{v}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* State Toggles */}
          <Text style={styles.sandboxLabel}>State</Text>
          <View style={styles.optionsRow}>
            {[
              { label: 'Normal', active: !btnLoading && !btnDisabled, onPress: () => { setBtnLoading(false); setBtnDisabled(false); } },
              { label: 'Loading', active: btnLoading, onPress: () => { setBtnLoading(true); setBtnDisabled(false); } },
              { label: 'Disabled', active: btnDisabled, onPress: () => { setBtnLoading(false); setBtnDisabled(true); } },
            ].map(item => (
              <TouchableOpacity
                key={item.label}
                onPress={item.onPress}
                style={[styles.optionBtn, item.active && styles.optionBtnActive]}
              >
                <Text style={[styles.optionText, item.active && styles.optionTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Radius Selector */}
          <Text style={styles.sandboxLabel}>Corner Radius</Text>
          <View style={styles.optionsRow}>
            {[12, 16, 24, 28, 9999].map(r => (
              <TouchableOpacity
                key={r}
                onPress={() => setBtnRadius(r)}
                style={[styles.optionBtn, btnRadius === r && styles.optionBtnActive]}
              >
                <Text style={[styles.optionText, btnRadius === r && styles.optionTextActive]}>
                  {r === 9999 ? 'Max' : `${r}px`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form Inputs Sandbox */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 24 }]}>INPUT CONTROLS</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
          <Input
            label="Base Input Text Field"
            required
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type some text..."
            error={inputError}
            success={inputSuccess}
          />

          <View style={[styles.optionsRow, { marginBottom: 12 }]}>
            <TouchableOpacity
              onPress={() => { setInputError(''); setInputSuccess(false); }}
              style={styles.optionBtn}
            >
              <Text style={styles.optionText}>Reset States</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setInputError('❌ This value contains a typing error.'); setInputSuccess(false); }}
              style={[styles.optionBtn, { borderColor: theme.colors.error }]}
            >
              <Text style={[styles.optionText, { color: theme.colors.error }]}>Trigger Error</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setInputError(''); setInputSuccess(true); }}
              style={[styles.optionBtn, { borderColor: theme.colors.success }]}
            >
              <Text style={[styles.optionText, { color: theme.colors.success }]}>Trigger Success</Text>
            </TouchableOpacity>
          </View>

          <PhoneInput
            label="PhoneInput Field"
            value={phoneVal}
            onChangeText={setPhoneVal}
            placeholder="98765 43210"
            success={phoneVal.replace(/[^0-9]/g, '').length === 10}
          />

          <DateInput
            label="DateInput Field"
            value={dateVal}
            onChangeText={setDateVal}
            placeholder="DD-MM-YYYY"
            success={dateVal.trim().length === 10}
          />

          <Text style={styles.sandboxLabel}>OTPInput (6 Split Boxes)</Text>
          <OTPInput
            value={otpVal}
            onChangeText={setOtpVal}
            containerStyle={{ alignSelf: 'center', marginVertical: 8 }}
          />
        </View>

        {/* Checkbox, Badges, & Custom Cards */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 24 }]}>UTILITIES & CHIPS</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16, gap: 14 }]}>
          <Checkbox
            label="Interactable Form Checkbox"
            checked={checked}
            onPress={() => setChecked(!checked)}
          />

          <Divider />

          <View>
            <Text style={styles.sandboxLabel}>Semantic Badges & Chips</Text>
            <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
              <Chip label="VEG" type="veg" />
              <Chip label="NON-VEG" type="nonveg" />
              <Chip label="PREMIUM" type="premium" />
              <Chip label="HEALTHY" type="healthy" />
              <Badge label="STABLE" variant="primary" />
              <Badge label="PLANNED" variant="secondary" />
            </View>
          </View>

          <Divider />

          <Card style={{ padding: 14, flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: B.orangeL, justifyContent: 'center', alignItems: 'center' }}>
              <Sparkles size={20} color={B.orange} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: F.heading, fontSize: 14, fontWeight: '700', color: t.text }}>Premium Meal Card</Text>
              <Text style={{ fontFamily: F.body, fontSize: 11, color: t.sub }}>Card container wraps other components.</Text>
            </View>
          </Card>
        </View>

        {/* Overlays Sandbox */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 24 }]}>MODALS & OVERLAYS</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            onPress={() => setSheetVisible(true)}
            style={[styles.overlayTrigger, { flex: 1, backgroundColor: t.card, borderColor: t.border }]}
          >
            <Layers size={20} color={B.orange} />
            <Text style={[styles.overlayTriggerText, { color: t.text }]}>Open BottomSheet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[styles.overlayTrigger, { flex: 1, backgroundColor: t.card, borderColor: t.border }]}
          >
            <ShieldAlert size={20} color={B.orange} />
            <Text style={[styles.overlayTriggerText, { color: t.text }]}>Open Modal</Text>
          </TouchableOpacity>
        </View>

        {/* BottomSheet Instance */}
        <BottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)} height={260}>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontFamily: F.heading, fontSize: 16, fontWeight: '800', color: t.text }}>Test BottomSheet</Text>
            <Text style={{ fontFamily: F.body, fontSize: 12, color: t.sub, textAlign: 'center', marginTop: 8, lineHeight: 18, marginBottom: 20 }}>
              This is a premium Apple-inspired modal bottom drawer. Drag down to dismiss it.
            </Text>
            <Button title="Dismiss Sheet" onPress={() => setSheetVisible(false)} />
          </View>
        </BottomSheet>

        {/* Modal Instance */}
        <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <View style={{ alignItems: 'center', padding: 8 }}>
            <Text style={{ fontFamily: F.heading, fontSize: 16, fontWeight: '800', color: t.text, marginBottom: 8 }}>Sandbox Modal</Text>
            <Text style={{ fontFamily: F.body, fontSize: 12, color: t.sub, textAlign: 'center', marginBottom: 20, lineHeight: 18 }}>
              This standard confirmation dialog features overlay touch locks and standard center focus points.
            </Text>
            <Button title="Dismiss Modal" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginLeft: 12,
    marginBottom: 8,
  },
  sandboxLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8A857B',
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  optionBtn: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  optionBtnActive: {
    borderColor: B.orange,
    backgroundColor: B.orangeL,
  },
  optionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  optionTextActive: {
    color: B.orange,
  },
  overlayTrigger: {
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  overlayTriggerText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
