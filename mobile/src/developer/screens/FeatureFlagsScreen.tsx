import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft, Flag, Check, X, Shield, Info } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme, Button, Checkbox, Card, Divider } from '../../design-system';

interface FeatureFlagsScreenProps {
  onBack: () => void;
}

interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  owner: string;
  build: string;
  dependencies: string[];
  desc: string;
}

export default function FeatureFlagsScreen({ onBack }: FeatureFlagsScreenProps) {
  const { setToast, t } = useAppContext();

  const [flags, setFlags] = useState<FeatureFlag[]>([
    {
      id: 'ai_meals',
      name: 'AI Meal Recommendations',
      enabled: false,
      owner: 'Core AI / ML Team',
      build: '1.2.0',
      dependencies: ['Profile Preferences', 'Nutrition Intake API'],
      desc: 'Suggests personalized meals using client-side weight history and profile goals.'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet Payments',
      enabled: true,
      owner: 'Payments & Checkout Team',
      build: '1.0.0',
      dependencies: ['RazorPay SDK', 'Auth API Session'],
      desc: 'Allows loading currency into local wallets for automated weekly payments.'
    },
    {
      id: 'kitchen_live',
      name: 'Kitchen Live Stream',
      enabled: false,
      owner: 'Operations & Media Team',
      build: '1.4.0',
      dependencies: ['HLS Live Streaming Service', 'AWS IVS Client'],
      desc: 'Enables realtime camera inspection feeds directly inside chef profile subviews.'
    },
    {
      id: 'referrals',
      name: 'Referral Rewards System',
      enabled: true,
      owner: 'Growth / Marketing Team',
      build: '1.0.0',
      dependencies: ['Expo Contacts', 'DeepLinking Routing'],
      desc: 'Enforces cash credit awards for inviting family and phone contacts.'
    }
  ]);

  const toggleFlag = (id: string) => {
    setFlags(prev =>
      prev.map(f => {
        if (f.id === id) {
          const nextState = !f.enabled;
          setToast(`Feature Flag: ${f.name} is now ${nextState ? 'ON' : 'OFF'}`);
          return { ...f, enabled: nextState };
        }
        return f;
      })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Feature Flags Console</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Info card */}
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16, flexDirection: 'row', gap: 12, alignItems: 'flex-start' }]}>
          <Info size={18} color={B.orange} style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: F.heading, fontSize: 13, fontWeight: '700', color: t.text }}>Internal Rollout Controls</Text>
            <Text style={{ fontFamily: F.body, fontSize: 11, color: t.sub, marginTop: 4, lineHeight: 16 }}>
              Enable or disable incomplete system services locally. Feature flags gate modules across the application package structure.
            </Text>
          </View>
        </View>

        {/* List of flags */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 16 }]}>ACTIVE ROLLOUT FEATURE FLAGS</Text>
        <View style={{ gap: 14 }}>
          {flags.map(flag => (
            <Card key={flag.id} style={{ padding: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1, marginRight: 16 }}>
                  <Text style={{ fontFamily: F.heading, fontSize: 14, fontWeight: '800', color: t.text }}>{flag.name}</Text>
                  <Text style={{ fontSize: 10, color: t.muted, marginTop: 2, fontWeight: '700' }}>
                    Owner: {flag.owner} • Build: {flag.build}
                  </Text>
                </View>
                <Checkbox label="" checked={flag.enabled} onPress={() => toggleFlag(flag.id)} />
              </View>

              <Text style={{ fontSize: 11, color: t.sub, marginTop: 8, lineHeight: 15 }}>
                {flag.desc}
              </Text>

              {flag.dependencies.length > 0 && (
                <>
                  <Divider style={{ marginVertical: 10 }} />
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: 9.5, fontWeight: '800', color: t.muted }}>DEPENDS ON:</Text>
                    {flag.dependencies.map(dep => (
                      <View key={dep} style={{ paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6, backgroundColor: t.input, borderWidth: 1, borderColor: t.border }}>
                        <Text style={{ fontSize: 9, color: t.sub, fontWeight: '700' }}>{dep}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </Card>
          ))}
        </View>
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
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginLeft: 12,
    marginBottom: 8,
  },
});
