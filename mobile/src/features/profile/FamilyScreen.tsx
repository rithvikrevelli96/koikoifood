import React, { useState } from 'react';
import { View, Platform, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, Users, Plus, Phone, Trash2, ShieldAlert } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  InfoCard,
  Input
} from '../../design-system';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function FamilyScreen() {
  const {
    back,
    setToast,
    t,
    isDark,
  } = useAppContext();

  const [familyMembers, setFamilyMembers] = useState([
    { id: '1', name: 'Ananya Revelli', relation: 'Spouse', plan: 'Monthly Veg Active' },
    { id: '2', name: 'Krishna Revelli', relation: 'Parent', plan: 'None' }
  ]);

  const [emergencyName, setEmergencyName] = useState('Pranav Revelli');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 9988776655');

  const handleDeleteMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
    setToast('🗑️ Family member unlinked');
  };

  const handleSaveEmergency = () => {
    setToast('🎉 Emergency contacts updated successfully!');
    back();
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      {/* HEADER */}
      <View style={[styles.headerContainer, { borderColor: t.border, backgroundColor: t.card }]}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={t.text} />}
          style={[styles.backBtn, { backgroundColor: t.surface }] as any}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        />
        <Text style={styles.headerTitle}>Family Members</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={styles.heroSubTitle}>FAMILY HUB</Text>
          <Text style={styles.heroMainTitle}>Shared Subscriptions</Text>
          <Text style={styles.heroDesc}>
            Manage linked subscription accounts for your spouse, parents, or kids. Deliver multiple dabbas in a single slot.
          </Text>
        </View>

        {/* Members List */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Linked Family Members</Text>
            <TouchableOpacity onPress={() => setToast('➕ Add member modal simulated')} style={styles.addBtn}>
              <Plus size={14} color="#C96B3C" style={{ marginRight: 2 }} />
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 12, marginTop: 8 }}>
            {familyMembers.map((member) => (
              <Card key={member.id} style={styles.memberCard}>
                <View style={styles.memberLeft}>
                  <View style={styles.iconWrapper}>
                    <Users size={18} color="#4B5D3A" />
                  </View>
                  <View>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberRelation}>{member.relation} · Plan: {member.plan}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleDeleteMember(member.id)} style={{ padding: 4 }}>
                  <Trash2 size={16} color={theme.colors.error} />
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        </View>

        {/* Emergency Contact Form */}
        <View style={styles.sectionContainer}>
          <View style={styles.titleRow}>
            <ShieldAlert size={16} color="#C96B3C" />
            <Text style={styles.sectionTitle}>Emergency Backup Contact</Text>
          </View>
          <Text style={styles.sectionDesc}>
            If we are unable to reach you during delivery, our riders will call this backup contact.
          </Text>

          <InfoCard style={styles.formCard}>
            <Input
              label="BACKUP CONTACT NAME"
              value={emergencyName}
              onChangeText={setEmergencyName}
              placeholder="e.g. Pranav Revelli"
            />
            <View style={{ height: 12 }} />
            <Input
              label="BACKUP CONTACT MOBILE"
              value={emergencyPhone}
              onChangeText={setEmergencyPhone}
              placeholder="e.g. +91 9988776655"
              keyboardType="phone-pad"
            />
          </InfoCard>
        </View>

        {/* Save button */}
        <View style={styles.btnContainer}>
          <Button
            title="Save Details ✓"
            variant="primary"
            onPress={handleSaveEmergency}
            style={styles.saveBtn}
          />
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabNav active="profile" />
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
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
  headerTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#4B5D3A',
    fontWeight: '700',
    marginLeft: 16,
    textTransform: 'uppercase',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: theme.spacing.screenVertical,
    marginBottom: 10,
  },
  heroSubTitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#C96B3C',
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroMainTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 26,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 4,
  },
  heroDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#8A857B',
    lineHeight: 19,
    marginTop: 8,
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    color: '#1F1F1F',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  sectionDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#8A857B',
    lineHeight: 16,
    marginBottom: 12,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 107, 60, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C96B3C',
  },
  addBtnText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#C96B3C',
    fontWeight: '800',
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  memberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FCFAF6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberName: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 14,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  memberRelation: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
    marginTop: 2,
  },
  formCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  btnContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: 24,
  },
  saveBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
  },
});
