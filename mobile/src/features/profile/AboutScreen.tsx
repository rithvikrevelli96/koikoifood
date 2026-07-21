import React from 'react';
import { View, Platform, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { ArrowLeft, BookOpen, ShieldCheck, Heart, Info, Smartphone } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  InfoCard,
  organicBackgroundAssets
} from '../../design-system';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function AboutScreen() {
  const {
    back,
    setToast,
  } = useAppContext();

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={theme.colors.light.text} />}
          style={styles.backBtn}
        />
        <Text style={styles.headerTitle}>About Koi Koi Dabba</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Image
            source={organicBackgroundAssets.dabba}
            style={styles.heroImage as any}
          />
          <Text style={styles.heroTitle}>KOI KOI DABBA</Text>
          <Text style={styles.heroTagline}>Purely Home-Cooked, Zero Preservatives</Text>
        </View>

        {/* Editorial Brand Values */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Our Culinary Promise</Text>
          <InfoCard style={styles.cardWrapper}>
            <View style={styles.valueRow}>
              <Heart size={20} color="#C96B3C" style={{ marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.valueTitle}>Healthy & Home-Cooked</Text>
                <Text style={styles.valueDesc}>
                  Meals prepared by professional home chefs using traditional, local recipes with minimal oils.
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.valueRow}>
              <ShieldCheck size={20} color="#4B5D3A" style={{ marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.valueTitle}>Steel Dabba Delivery</Text>
                <Text style={styles.valueDesc}>
                  Zero plastic waste. Delivered warm in traditional insulated stainless steel dabbas.
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.valueRow}>
              <Info size={20} color="#D9B65A" style={{ marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.valueTitle}>Absolute Transparency</Text>
                <Text style={styles.valueDesc}>
                  Open access to live kitchen video streams, daily sanitization scores, and physical kitchen walk-in booking.
                </Text>
              </View>
            </View>
          </InfoCard>
        </View>

        {/* Application details */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>App Specifications</Text>
          <Card style={styles.specCard}>
            <View style={styles.specRow}>
              <Smartphone size={18} color="#8A857B" />
              <View>
                <Text style={styles.specMain}>Version 4.0.0 (Production)</Text>
                <Text style={styles.specSub}>Design System v1.0 · Build 240718</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Legal & Policy actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Legal Policies</Text>
          <Card style={{ padding: 0, overflow: 'hidden', borderWidth: 1, borderColor: '#E8E2D8' }}>
            <TouchableOpacity
              onPress={() => setToast('Terms of Service loaded.')}
              style={styles.legalItem}
            >
              <Text style={styles.legalText}>Terms of Service</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: '#E8E2D8', marginLeft: 16 }} />
            <TouchableOpacity
              onPress={() => setToast('Privacy Policy loaded.')}
              style={styles.legalItem}
            >
              <Text style={styles.legalText}>Privacy Policy</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: '#E8E2D8', marginLeft: 16 }} />
            <TouchableOpacity
              onPress={() => setToast('FSSAI Guidelines & Disclaimers loaded.')}
              style={styles.legalItem}
            >
              <Text style={styles.legalText}>FSSAI License & Disclaimers</Text>
            </TouchableOpacity>
          </Card>
        </View>

        <Text style={styles.footerText}>© 2026 KOIKOIFOOD Technologies Pvt Ltd</Text>

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
    borderColor: theme.colors.light.border,
    backgroundColor: theme.colors.light.surface,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.light.surface,
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
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: '#F4EFE6',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D8',
  },
  heroImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 24,
    color: '#1F1F1F',
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroTagline: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#8A857B',
    marginTop: 4,
    fontWeight: '600',
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    color: '#1F1F1F',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  cardWrapper: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    gap: 12,
  },
  valueRow: {
    flexDirection: 'row',
    gap: 12,
  },
  valueTitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 14,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  valueDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
    lineHeight: 16,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E2D8',
  },
  specCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  specMain: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  specSub: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
    marginTop: 2,
  },
  legalItem: {
    padding: 16,
    backgroundColor: '#F4EFE6',
  },
  legalText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  footerText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#8A857B',
    textAlign: 'center',
    marginTop: 24,
  },
});
