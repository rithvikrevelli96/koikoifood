import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { ArrowLeft, Check } from 'lucide-react-native';
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
    content.includes('Due') ||
    content.includes('Deposit')
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

export default function SubscribeFlowScreen() {
  const {
    selectedPlanId,
    checkoutMealPref,
    setCheckoutMealPref,
    checkoutFreq,
    setCheckoutFreq,
    checkoutCustomPrefs,
    setCheckoutCustomPrefs,
    checkoutStartDate,
    setCheckoutStartDate,
    getNumericPrice,
    setSubscribed,
    setToast,
    go,
    back,
    t
  } = useAppContext();

  const selectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[2];
  const planRateNum = getNumericPrice(selectedPlan.price);
  const depositNum = 299;
  const discountNum = 100;
  const totalDueNum = planRateNum + depositNum - discountNum;

  const toggleCustomPref = (pref: string) => {
    setCheckoutCustomPrefs((prev: string[]) => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.light.bg }}>
      {/* Top Header Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: t.border, backgroundColor: t.surface }}>
        <TouchableOpacity onPress={back} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, marginLeft: 16, letterSpacing: 0.5 }}>SUBSCRIBE CHECKOUT</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 220 }} showsVerticalScrollIndicator={false}>
        {/* Plan Header Card */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={{ backgroundColor: t.card, borderRadius: 24, padding: 20, borderWidth: 1.5, borderColor: t.border }}>
            <Text style={{ fontSize: 11, fontWeight: '900', color: B.orange, textTransform: 'uppercase', letterSpacing: 1 }}>Selected Plan</Text>
            <Text style={{ fontSize: 20, fontWeight: '900', color: t.text, marginTop: 4 }}>{selectedPlan.name} Subscription</Text>
            <Text style={{ fontSize: 12.5, color: t.sub, marginTop: 2 }}>{selectedPlan.sub}</Text>
          </View>
        </View>

        {/* 1. Meal Preference */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Meal Preference</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {['Veg', 'Non-Veg'].map(pref => {
              const isSelected = checkoutMealPref === pref;
              return (
                <TouchableOpacity
                  key={pref}
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    height: 50,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: isSelected ? B.orange : t.border,
                    backgroundColor: isSelected ? B.orangeL : t.card,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 6
                  }}
                  onPress={() => setCheckoutMealPref(pref as 'Veg' | 'Non-Veg')}
                >
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: pref === 'Veg' ? B.green : '#EF4444' }} />
                  <Text style={{ fontSize: 14, fontWeight: '800', color: isSelected ? B.orange : t.text }}>{pref}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2. Dabba Frequency */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Dabba Frequency</Text>
          <View style={{ gap: 10 }}>
            {[
              { id: 'lunch', label: '☀️ Lunch Only' },
              { id: 'dinner', label: '🌙 Dinner Only' },
              { id: 'both', label: '☀️🌙 Lunch + Dinner' }
            ].map(freq => {
              const isSelected = checkoutFreq === freq.id;
              return (
                <TouchableOpacity
                  key={freq.id}
                  activeOpacity={0.8}
                  style={{
                    height: 52,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: isSelected ? B.orange : t.border,
                    backgroundColor: isSelected ? B.orangeL : t.card,
                    paddingHorizontal: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onPress={() => setCheckoutFreq(freq.id as any)}
                >
                  <Text style={{ fontSize: 14, fontWeight: '800', color: isSelected ? B.orange : t.text }}>{freq.label}</Text>
                  <View style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    borderWidth: 2,
                    borderColor: isSelected ? B.orange : t.muted,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {isSelected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: B.orange }} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 3. Custom Preferences */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Custom Preferences</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Mild Spicy', 'Medium Spicy', 'Low Carb', 'High Protein', 'No Dairy'].map(pref => {
              const isSelected = checkoutCustomPrefs.includes(pref);
              return (
                <TouchableOpacity
                  key={pref}
                  activeOpacity={0.8}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor: isSelected ? B.orange : t.border,
                    backgroundColor: isSelected ? B.orangeL : t.card,
                  }}
                  onPress={() => toggleCustomPref(pref)}
                >
                  <Text style={{ fontSize: 12, fontWeight: '800', color: isSelected ? B.orange : t.text }}>{pref}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 4. Delivery Start Date */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Delivery Start Date</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: checkoutStartDate === 'tomorrow' ? B.orange : t.border,
                backgroundColor: checkoutStartDate === 'tomorrow' ? B.orangeL : t.card,
              }}
              onPress={() => setCheckoutStartDate('tomorrow')}
            >
              <Text style={{ fontSize: 14, fontWeight: '900', color: checkoutStartDate === 'tomorrow' ? B.orange : t.text }}>Tomorrow</Text>
              <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>Starts at 12:30 PM</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: checkoutStartDate === 'custom' ? B.orange : t.border,
                backgroundColor: checkoutStartDate === 'custom' ? B.orangeL : t.card,
              }}
              onPress={() => setCheckoutStartDate('custom')}
            >
              <Text style={{ fontSize: 14, fontWeight: '900', color: checkoutStartDate === 'custom' ? B.orange : t.text }}>Custom Date</Text>
              <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>Select calendar slot</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Pricing Details Card */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <View style={{ backgroundColor: t.card, borderRadius: 24, borderWidth: 1.5, borderColor: t.border, padding: 18 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.sub }}>Plan Rate ({selectedPlan.name})</Text>
              <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>{selectedPlan.price}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.sub }}>Steel Dabba Deposit (Refundable)</Text>
              <Text style={{ fontSize: 14, fontWeight: '900', color: t.text }}>₹299</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.sub }}>Monsoon Discount</Text>
              <Text style={{ fontSize: 14, fontWeight: '900', color: B.green }}>−₹100</Text>
            </View>

            <View style={{ height: 1, backgroundColor: t.border, marginVertical: 14 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 15, fontWeight: '900', color: t.text }}>Total Due</Text>
              <Text style={{ fontSize: 20, fontWeight: '900', color: B.orange }}>₹{totalDueNum.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        </View>

        {/* Pay & Activate Subscription button */}
        <View style={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 40,
          marginTop: 20
        }}>
          <Button
            title="Pay & Activate Subscription"
            onPress={() => {
              setSubscribed(true);
              setToast(`${selectedPlan.name} Subscription Activated Successfully!`);
              go('home');
            }}
          />
          <Text style={{ fontSize: 9.5, color: t.muted, textAlign: 'center', marginTop: 8 }}>
            Security SSL Encrypted · Refund of Deposit is instant on cancellation
          </Text>
        </View>
      </ScrollView>

      <BottomTabNav active="plans" />
    </SafeAreaView>
  );
}
