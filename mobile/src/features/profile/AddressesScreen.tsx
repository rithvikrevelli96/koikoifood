import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Plus,
  Home,
  Building2,
  MapPin,
  Edit3,
  Trash2,
  X,
  Check,
} from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, Text, Button, PageLayout } from '../../design-system';

// Address type matching AppProvider state
interface AddressItem {
  id: string;
  label: 'Home' | 'Work' | 'Other';
  address: string;
  name: string;
  phone: string;
  flat?: string;
  landmark?: string;
  pincode?: string;
  image?: string;
}

// Blank form template
const BLANK_FORM: Omit<AddressItem, 'id'> = {
  label: 'Home',
  address: '',
  name: '',
  phone: '',
  flat: '',
  landmark: '',
  pincode: '',
};

type FormErrors = Partial<Record<keyof Omit<AddressItem, 'id' | 'image'>, string>>;

function validateForm(form: Omit<AddressItem, 'id'>): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = 'Receiver name must be at least 2 characters.';
  const phoneDigits = form.phone.replace(/\D/g, '');
  if (!phoneDigits || phoneDigits.length !== 10)
    errors.phone = 'Enter a valid 10-digit phone number.';
  if (!form.address.trim() || form.address.trim().length < 5)
    errors.address = 'Address must be at least 5 characters.';
  const pin = (form.pincode || '').replace(/\D/g, '');
  if (!pin || pin.length !== 6)
    errors.pincode = 'Enter a valid 6-digit pincode.';
  return errors;
}

export default function AddressesScreen() {
  const {
    addressesList,
    setAddressesList,
    selectedAddress,
    setSelectedAddress,
    back,
    setToast,
    t,
    isDark,
  } = useAppContext();

  // Sheet state
  const [sheetVisible, setSheetVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<AddressItem, 'id'>>(BLANK_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Open Add sheet
  const handleOpenAdd = () => {
    if (sheetVisible) return; // Navigation guard: prevent duplicate sheets
    setEditingId(null);
    setForm(BLANK_FORM);
    setErrors({});
    setTouched({});
    setSheetVisible(true);
  };

  // Open Edit sheet
  const handleOpenEdit = (addr: AddressItem) => {
    if (sheetVisible) return;
    setEditingId(addr.id);
    setForm({
      label: addr.label,
      address: addr.address,
      name: addr.name,
      phone: addr.phone,
      flat: addr.flat || '',
      landmark: addr.landmark || '',
      pincode: addr.pincode || '',
    });
    setErrors({});
    setTouched({});
    setSheetVisible(true);
  };

  const handleCloseSheet = () => {
    if (isSubmitting) return;
    setSheetVisible(false);
  };

  // Field change with live validation on touched fields
  const handleChange = (field: keyof Omit<AddressItem, 'id'>, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      const newErrors = validateForm(updated);
      setErrors(prev => ({
        ...prev,
        [field]: newErrors[field as keyof FormErrors] ?? undefined,
      }));
    }
  };

  const handleBlur = (field: keyof Omit<AddressItem, 'id'>) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const newErrors = validateForm(form);
    if (newErrors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: newErrors[field as keyof FormErrors] }));
    }
  };

  // Save (Add or Edit)
  const handleSave = async () => {
    if (isSubmitting) return; // Double-tap guard
    // Touch all validated fields
    setTouched({ name: true, phone: true, address: true, pincode: true });
    const newErrors = validateForm(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setToast('⚠️ Please fix the errors before saving.');
      return;
    }

    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 500)); // Simulated async save

    if (editingId) {
      setAddressesList((prev: AddressItem[]) =>
        prev.map(a =>
          a.id === editingId ? { ...a, ...form } : a
        )
      );
      setToast('✅ Address updated successfully!');
    } else {
      const newAddr: AddressItem = {
        id: Date.now().toString(),
        ...form,
      };
      setAddressesList((prev: AddressItem[]) => [...prev, newAddr]);
      setToast('📍 New address added!');
    }

    setIsSubmitting(false);
    setSheetVisible(false);
  };

  // Trigger delete confirmation
  const handleDeletePress = (id: string) => {
    if (isDeleting) return;
    setDeleteTarget(id);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deleteTarget || isDeleting) return;
    setIsDeleting(true);
    await new Promise(r => setTimeout(r, 400));

    // If deleting the selected default, clear it
    const target = (addressesList as AddressItem[]).find(a => a.id === deleteTarget);
    if (target && selectedAddress.includes(target.address)) {
      setSelectedAddress('');
    }

    setAddressesList((prev: AddressItem[]) => prev.filter(a => a.id !== deleteTarget));
    setToast('🗑️ Address deleted.');
    setDeleteTarget(null);
    setIsDeleting(false);
  };

  const handleSetDefault = (addr: AddressItem) => {
    setSelectedAddress(addr.address);
    setToast('📍 Primary delivery address updated.');
  };

  const LABELS: Array<'Home' | 'Work' | 'Other'> = ['Home', 'Work', 'Other'];

  const InputField = ({
    label,
    field,
    placeholder,
    keyboardType = 'default',
    optional = false,
    maxLength,
  }: {
    label: string;
    field: keyof Omit<AddressItem, 'id'>;
    placeholder: string;
    keyboardType?: any;
    optional?: boolean;
    maxLength?: number;
  }) => {
    const hasError = !!errors[field as keyof FormErrors];
    return (
      <View style={styles.fieldWrapper}>
        <Text style={[styles.fieldLabel, { color: t.sub }]}>
          {label}{optional ? ' (Optional)' : ' *'}
        </Text>
        <TextInput
          style={[
            styles.fieldInput,
            {
              backgroundColor: t.surface,
              borderColor: hasError ? theme.colors.error : t.border,
              color: t.text,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={t.muted}
          value={form[field] as string}
          onChangeText={v => handleChange(field, v)}
          onBlur={() => handleBlur(field)}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={!isSubmitting}
        />
        {hasError ? (
          <Text style={[styles.fieldError, { color: theme.colors.error }]}>
            {errors[field as keyof FormErrors]}
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="clean">
      {/* Header */}
      <View style={[styles.header, { backgroundColor: t.card, borderBottomColor: t.border }]}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={t.text} />}
          style={{ ...styles.backBtn, backgroundColor: t.surface }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        />
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>SAVED ADDRESSES</Text>
        <TouchableOpacity
          onPress={handleOpenAdd}
          style={[styles.addBtn, { backgroundColor: isDark ? 'rgba(201,107,60,0.18)' : 'rgba(201,107,60,0.10)' }]}
          activeOpacity={0.8}
          accessibilityLabel="Add new address"
          accessibilityRole="button"
        >
          <Plus size={18} color={t.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="caption" color="sub" style={{ marginBottom: 16 }}>
          Tap an address to set it as your default delivery location.
        </Text>

        {/* Empty state */}
        {addressesList.length === 0 ? (
          <View style={[styles.emptyState, { borderColor: t.border }]}>
            <MapPin size={40} color={t.muted} />
            <Text variant="body" color="sub" style={styles.emptyTitle}>No saved addresses yet</Text>
            <Text variant="caption" color="muted" style={styles.emptyDesc}>
              Add your first delivery address to get started.
            </Text>
            <Button
              title="+ Add Address"
              variant="outline"
              size="medium"
              style={{ marginTop: 16 }}
              onPress={handleOpenAdd}
            />
          </View>
        ) : (
          <View style={styles.listGap}>
            {(addressesList as AddressItem[]).map(addr => {
              const isDefault = selectedAddress.includes(addr.address);
              const Icon = addr.label === 'Home' ? Home : addr.label === 'Work' ? Building2 : MapPin;

              return (
                <TouchableOpacity
                  key={addr.id}
                  onPress={() => handleSetDefault(addr)}
                  style={[
                    styles.card,
                    {
                      backgroundColor: t.card,
                      borderColor: isDefault ? t.secondary : t.border,
                    },
                  ]}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel={`${addr.label} address: ${addr.address}. ${isDefault ? 'Default.' : 'Tap to set as default.'}`}
                >
                  <View style={styles.cardTopRow}>
                    <View style={styles.cardLeft}>
                      <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(201,107,60,0.18)' : 'rgba(201,107,60,0.08)' }]}>
                        <Icon size={16} color={t.secondary} />
                      </View>
                      <View style={styles.cardTexts}>
                        <View style={styles.labelRow}>
                          <Text variant="body" color="text" style={styles.cardLabel}>{addr.label}</Text>
                          {isDefault && (
                            <View style={[styles.defaultBadge, { backgroundColor: isDark ? 'rgba(75,93,58,0.25)' : 'rgba(75,93,58,0.10)' }]}>
                              <Check size={10} color={t.primary} />
                              <Text style={[styles.defaultBadgeText, { color: t.primary }]}>DEFAULT</Text>
                            </View>
                          )}
                        </View>
                        <Text variant="caption" color="sub" style={{ marginTop: 2 }}>
                          {addr.flat ? `${addr.flat}, ` : ''}{addr.address}
                        </Text>
                        {addr.landmark ? (
                          <Text variant="caption" color="muted" style={{ marginTop: 1 }}>
                            Near: {addr.landmark}
                          </Text>
                        ) : null}
                        {addr.pincode ? (
                          <Text variant="caption" color="muted" style={{ marginTop: 1 }}>
                            Pincode: {addr.pincode}
                          </Text>
                        ) : null}
                        <Text variant="caption" color="sub" style={{ marginTop: 4 }}>
                          {addr.name} · {addr.phone}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.cardActions}>
                      <TouchableOpacity
                        onPress={() => handleOpenEdit(addr)}
                        style={[styles.actionBtn, { backgroundColor: isDark ? 'rgba(122,147,104,0.15)' : 'rgba(75,93,58,0.07)' }]}
                        activeOpacity={0.8}
                        accessibilityLabel={`Edit ${addr.label} address`}
                        accessibilityRole="button"
                      >
                        <Edit3 size={14} color={t.primary} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeletePress(addr.id)}
                        style={[styles.actionBtn, { backgroundColor: isDark ? 'rgba(201,60,60,0.15)' : 'rgba(201,60,60,0.07)' }]}
                        activeOpacity={0.8}
                        accessibilityLabel={`Delete ${addr.label} address`}
                        accessibilityRole="button"
                      >
                        <Trash2 size={14} color={theme.colors.error} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <Button
          title="+ Add New Address"
          variant="outline"
          size="medium"
          style={{ ...styles.addNewBtn, borderColor: t.secondary }}
          textStyle={{ color: t.secondary }}
          onPress={handleOpenAdd}
        />
      </ScrollView>

      {/* ── Add / Edit Bottom Sheet Modal ── */}
      <Modal
        visible={sheetVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseSheet}
      >
        <KeyboardAvoidingView
          style={styles.sheetOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableOpacity style={styles.sheetBackdrop} onPress={handleCloseSheet} activeOpacity={1} />
          <View style={[styles.sheet, { backgroundColor: t.card, borderTopColor: t.border }]}>
            {/* Sheet Header */}
            <View style={[styles.sheetHeader, { borderBottomColor: t.border }]}>
              <Text variant="title" color="primary">
                {editingId ? 'Edit Address' : 'Add New Address'}
              </Text>
              <TouchableOpacity
                onPress={handleCloseSheet}
                style={[styles.sheetCloseBtn, { backgroundColor: t.surface }]}
                disabled={isSubmitting}
                accessibilityLabel="Close"
                accessibilityRole="button"
              >
                <X size={16} color={t.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={styles.sheetScroll}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Label Selector */}
              <View style={styles.fieldWrapper}>
                <Text style={[styles.fieldLabel, { color: t.sub }]}>ADDRESS LABEL *</Text>
                <View style={styles.labelChips}>
                  {LABELS.map(lbl => {
                    const selected = form.label === lbl;
                    return (
                      <TouchableOpacity
                        key={lbl}
                        onPress={() => handleChange('label', lbl)}
                        style={[
                          styles.labelChip,
                          {
                            backgroundColor: selected
                              ? t.primary
                              : isDark ? 'rgba(122,147,104,0.12)' : 'rgba(75,93,58,0.06)',
                            borderColor: selected ? t.primary : t.border,
                          },
                        ]}
                        accessibilityRole="radio"
                        accessibilityState={{ selected }}
                      >
                        <Text style={[styles.labelChipText, { color: selected ? '#FFFFFF' : t.text }]}>
                          {lbl}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <InputField
                label="RECEIVER NAME"
                field="name"
                placeholder="e.g. Rithvik Revelli"
              />

              <InputField
                label="PHONE NUMBER"
                field="phone"
                placeholder="10-digit mobile number"
                keyboardType="phone-pad"
                maxLength={10}
              />

              <InputField
                label="AREA / STREET ADDRESS"
                field="address"
                placeholder="e.g. Bollaram Industrial Area, Hyderabad"
              />

              <InputField
                label="FLAT / APARTMENT NO."
                field="flat"
                placeholder="e.g. Flat 4B, Tower 2"
                optional
              />

              <InputField
                label="LANDMARK"
                field="landmark"
                placeholder="e.g. Near SBI ATM"
                optional
              />

              <InputField
                label="PINCODE"
                field="pincode"
                placeholder="6-digit pincode"
                keyboardType="numeric"
                maxLength={6}
              />

              <Button
                title={isSubmitting ? 'Saving…' : editingId ? 'Update Address ✓' : 'Save Address ✓'}
                onPress={handleSave}
                style={{ marginTop: 8 }}
                disabled={isSubmitting}
                iconRight={isSubmitting ? <ActivityIndicator size="small" color="#FFFFFF" style={{ marginLeft: 8 }} /> : undefined}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ── Delete Confirmation Modal ── */}
      <Modal
        visible={deleteTarget !== null}
        transparent
        animationType="fade"
        onRequestClose={() => !isDeleting && setDeleteTarget(null)}
      >
        <View style={styles.confirmOverlay}>
          <View style={[styles.confirmBox, { backgroundColor: t.card, borderColor: t.border }]}>
            <Trash2 size={28} color={theme.colors.error} style={{ alignSelf: 'center', marginBottom: 12 }} />
            <Text variant="title" color="text" style={{ textAlign: 'center', marginBottom: 8 }}>
              Delete Address?
            </Text>
            <Text variant="caption" color="sub" style={{ textAlign: 'center', marginBottom: 20, lineHeight: 18 }}>
              This address will be permanently removed from your saved locations.
            </Text>
            <View style={styles.confirmBtns}>
              <Button
                title="Cancel"
                variant="outline"
                size="medium"
                style={{ flex: 1 }}
                onPress={() => setDeleteTarget(null)}
                disabled={isDeleting}
              />
              <Button
                title={isDeleting ? 'Deleting…' : 'Delete'}
                variant="primary"
                size="medium"
                style={{ flex: 1, backgroundColor: theme.colors.error, borderColor: theme.colors.error }}
                onPress={handleDeleteConfirm}
                disabled={isDeleting}
                iconRight={isDeleting ? <ActivityIndicator size="small" color="#FFFFFF" style={{ marginLeft: 8 }} /> : undefined}
              />
            </View>
          </View>
        </View>
      </Modal>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 80,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginTop: 8,
  },
  emptyTitle: {
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyDesc: {
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 18,
  },
  listGap: {
    gap: 12,
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLeft: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
    marginRight: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTexts: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardLabel: {
    fontWeight: '800',
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  defaultBadgeText: {
    fontFamily: 'Inter',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewBtn: {
    borderStyle: 'dashed',
    marginTop: 8,
  },
  // Sheet styles
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    maxHeight: '90%',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  sheetCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetScroll: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    gap: 0,
  },
  fieldWrapper: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  fieldInput: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  fieldError: {
    fontSize: 12,
    fontFamily: 'Inter',
    marginTop: 4,
    fontWeight: '600',
  },
  labelChips: {
    flexDirection: 'row',
    gap: 10,
  },
  labelChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  labelChipText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '700',
  },
  // Delete confirm
  confirmOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  confirmBox: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
  },
  confirmBtns: {
    flexDirection: 'row',
    gap: 12,
  },
});
