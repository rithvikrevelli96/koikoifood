import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import { ArrowLeft, ChevronRight, Play, Pause, SkipForward, Check } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F, Button } from '../../design-system';
import { Text as RNText } from 'react-native';

const B = {
  orange: theme.colors.secondary,
  orangeL: 'rgba(201, 107, 60, 0.08)',
  green: theme.colors.success,
  greenL: 'rgba(75, 93, 58, 0.08)',
  cream: theme.colors.light.surface,
  creamL: theme.colors.light.bg,
};

function Text({ style, ...props }: any) {
  const flatStyle = StyleSheet.flatten(style || {});
  let fontFamily = F.body;
  const content = String(props.children || '');
  const isNumeric = /[₹\d]/.test(content) && (
    /^[₹\d\s★%\-.:\+a-zA-Z\s]+$/.test(content) ||
    content.includes('kcal') ||
    content.includes('protein') ||
    content.includes('Carbs') ||
    content.includes('₹') ||
    content.includes('min') ||
    content.includes('km') ||
    content.includes('Day') ||
    content.includes('tier')
  );

  if (flatStyle.fontFamily) {
    fontFamily = flatStyle.fontFamily;
  } else if (flatStyle.fontSize >= 15 && (flatStyle.fontWeight === '900' || flatStyle.fontWeight === '800' || flatStyle.fontWeight === 'bold')) {
    fontFamily = isNumeric ? F.mono : F.heading;
  } else if (isNumeric) {
    fontFamily = F.mono;
  }
  return <RNText style={[{ fontFamily }, style]} {...props} />;
}
import { PLANS } from '../../core/constants/meals';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function PlansScreen() {
  const {
    selectedPlanId,
    setSelectedPlanId,
    paused,
    setPaused,
    showManageOptions,
    setShowManageOptions,
    setToast,
    back,
    go,
    t
  } = useAppContext();

  const currentPlanName = "Monthly Subscription";
  const currentPlanDetails = "Day 3 of 30 · Next: Tomorrow, 12:30 PM";
  const selectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[2];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.light.bg }}>
      {/* Top Header Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: t.border, backgroundColor: t.surface }}>
        <TouchableOpacity onPress={back} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, marginLeft: 16, letterSpacing: 0.5 }}>MY SUBSCRIPTION</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: selectedPlanId !== 'monthly' ? 220 : 110 }} showsVerticalScrollIndicator={false}>
        {/* Active subscription card section */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>Current Plan</Text>
            <View style={{ backgroundColor: paused ? '#F59E0B' : B.green, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
              <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF' }}>{paused ? 'PAUSED' : 'ACTIVE'}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 12, color: t.sub, marginTop: 4, marginBottom: 12 }}>
            Tap your current active subscription to manage, pause, or reschedule.
          </Text>

          <TouchableOpacity 
            activeOpacity={0.85}
            onPress={() => setShowManageOptions(!showManageOptions)}
            style={{
              backgroundColor: t.card,
              borderRadius: 24,
              borderWidth: 1.5,
              borderColor: t.border,
              padding: 18,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.02,
              shadowRadius: 10,
              elevation: 2
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>{currentPlanName}</Text>
                <Text style={{ fontSize: 12, color: t.sub, marginTop: 4 }}>{currentPlanDetails}</Text>
              </View>
              <ChevronRight size={18} color={t.muted} style={{ transform: [{ rotate: showManageOptions ? '90deg' : '0deg' }] }} />
            </View>

            <View style={[styles.progressBarBG, { backgroundColor: t.surface, marginTop: 14 }]}>
              <View style={[styles.progressBarFill, { backgroundColor: B.orange, width: '90%' }]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Manage Options collapsible panel */}
        {showManageOptions && (
          <View style={{ paddingHorizontal: 20, marginTop: 12, gap: 10 }}>
            <TouchableOpacity
              style={[styles.managePlanBtn, { backgroundColor: t.card, borderColor: t.border }]}
              onPress={() => {
                setPaused(!paused);
                setToast(paused ? 'Deliveries Resumed!' : 'Deliveries Paused Successfully');
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.settingsRowIcon, { backgroundColor: paused ? B.greenL : B.orangeL }]}>
                  {paused ? <Play size={16} color={B.green} /> : <Pause size={16} color={B.orange} />}
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }}>
                    {paused ? 'Resume Deliveries' : 'Pause Plan'}
                  </Text>
                  <Text style={{ fontSize: 10.5, color: t.sub, marginTop: 1 }}>
                    {paused ? 'Unpause to receive food' : 'Temporarily pause deliveries'}
                  </Text>
                </View>
              </View>
              <ChevronRight size={16} color={t.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.managePlanBtn, { backgroundColor: t.card, borderColor: t.border }]}
              onPress={() => {
                setToast("Tomorrow's delivery skipped! Day credited back.");
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.settingsRowIcon, { backgroundColor: '#EFF6FF' }]}>
                  <SkipForward size={16} color="#3B82F6" />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }}>Skip Tomorrow</Text>
                  <Text style={{ fontSize: 10.5, color: t.sub, marginTop: 1 }}>Skip next dabba, credit back cash</Text>
                </View>
              </View>
              <ChevronRight size={16} color={t.muted} />
            </TouchableOpacity>
          </View>
        )}

        {/* Select Other Plans Title */}
        <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>Select Other Plans</Text>
        </View>

        {/* List of other plans */}
        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          {PLANS.map(p => {
            const isSelected = selectedPlanId === p.id;
            return (
              <TouchableOpacity
                key={p.id}
                activeOpacity={0.85}
                style={{
                  backgroundColor: t.card,
                  borderRadius: 24,
                  borderWidth: 2,
                  borderColor: isSelected ? B.orange : t.border,
                  padding: 16,
                  position: 'relative',
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: isSelected ? 0.04 : 0.01,
                  shadowRadius: 10,
                  elevation: 2
                }}
                onPress={() => setSelectedPlanId(p.id)}
              >
                {p.badge ? (
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    right: 16,
                    backgroundColor: p.color,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                  }}>
                    <Text style={{ fontSize: 8.5, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 }}>{p.badge}</Text>
                  </View>
                ) : null}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: '900', color: t.text }}>{p.name}</Text>
                    <Text style={{ fontSize: 11, color: t.sub, marginTop: 4 }}>{p.sub}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: isSelected ? B.orange : t.text }}>{p.price}</Text>
                    <Text style={{ fontSize: 9.5, color: t.muted, marginTop: 2 }}>{p.unit}</Text>
                  </View>
                </View>

                <View style={{ height: 1, backgroundColor: t.border, marginVertical: 12 }} />

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, rowGap: 8 }}>
                  {p.perks.map((perk, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: '45%' }}>
                      <Check size={12} color={B.green} strokeWidth={2.5} />
                      <Text style={{ fontSize: 10.5, color: t.sub }} numberOfLines={1}>{perk}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Button */}
      {selectedPlanId !== 'monthly' && (
        <View style={{
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 90 : 80,
          left: 0,
          right: 0,
          backgroundColor: t.surface,
          borderTopWidth: 1.5,
          borderTopColor: t.border,
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? 28 : 16,
          zIndex: 10
        }}>
          <Button
            title={`Change to ${selectedPlan.name} tier · ${selectedPlan.price}`}
            onPress={() => go('subscribe_flow')}
          />
        </View>
      )}

      <BottomTabNav active="plans" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  progressBarBG: {
    height: 6,
    borderRadius: 3,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  managePlanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 18,
    borderWidth: 1.5,
  },
  settingsRowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
