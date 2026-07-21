import React, { useState } from 'react';
import { View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Check, Clock, RefreshCw, AlertCircle, Lock } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  HeroCard,
  InfoCard
} from '../../design-system';
import { PLANS } from '../../core/constants/meals';

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
    switchTab,
    back,
  } = useAppContext();

  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleCheckoutComplete = () => {
    setSubscribed(true);
    setToast("🎉 Payment successful!");
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="celebration">
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 40, justifyContent: 'center', minHeight: '90%' }} showsVerticalScrollIndicator={false}>
          
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(75, 93, 58, 0.08)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
              <Check size={32} color="#4B5D3A" />
            </View>
            <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12, color: '#C96B3C', fontWeight: '800', letterSpacing: 1 }}>SUCCESS</Text>
            <Text style={{ fontFamily: theme.typography.headingFamily, fontSize: 26, color: '#1F1F1F', fontWeight: '800', marginTop: 4, textAlign: 'center' }}>Subscription Activated</Text>
            <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 13.5, color: '#8A857B', marginTop: 6, textAlign: 'center' }}>Your plan details are now live in your account.</Text>
          </View>

          <HeroCard style={{ padding: 24, borderWidth: 1, borderColor: '#E8E2D8', backgroundColor: '#FCFAF6', borderRadius: 24 }}>
            <Text style={{ fontFamily: theme.typography.headingFamily, fontSize: 18, color: '#4B5D3A', fontWeight: '700' }}>{selectedPlan.name} Subscription</Text>
            <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 13, color: '#8A857B', marginTop: 2 }}>{selectedPlan.sub}</Text>
            
            <View style={{ height: 1, backgroundColor: '#E8E2D8', marginVertical: 16 }} />

            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 13, color: '#8A857B' }}>Plan Status</Text>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 13, color: '#4B5D3A', fontWeight: '700' }}>Active 🟢</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 13, color: '#8A857B' }}>Start Date</Text>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 13, color: '#1F1F1F', fontWeight: '700' }}>Starts Tomorrow</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 13, color: '#8A857B' }}>Billing Amount</Text>
                <Text style={{ fontFamily: theme.typography.monoFamily, fontSize: 13, color: '#1F1F1F', fontWeight: '700' }}>₹{totalDueNum}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 13, color: '#8A857B' }}>Meals Included</Text>
                <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 13, color: '#1F1F1F', fontWeight: '700', textAlign: 'right', flex: 1, marginLeft: 12 }}>{selectedPlan.perks.slice(0, 2).join(', ')}</Text>
              </View>
            </View>
          </HeroCard>

          <View style={{ marginTop: 32, gap: 12 }}>
            <Button
              title="Go to Dashboard"
              variant="primary"
              onPress={() => switchTab('home')}
            />
            <Button
              title="View Subscription"
              variant="outline"
              onPress={() => {
                setShowSuccess(false);
                switchTab('plans');
              }}
            />
          </View>
        </ScrollView>
      </PageLayout>
    );
  }

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
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
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>SUBSCRIBE CHECKOUT</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Selected Plan Details */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Card>
            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1 }}>Selected Plan</Text>
            <Text variant="title" color="primary" style={{ marginTop: 4 }}>{selectedPlan.name} Subscription</Text>
            <Text variant="caption" color="sub" style={{ marginTop: 2 }}>{selectedPlan.sub}</Text>
          </Card>
        </View>

        {/* Configurations */}
        <View style={{ paddingHorizontal: 20, marginTop: 24, gap: 20 }}>
          
          {/* Meal Preference */}
          <View>
            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1, marginBottom: theme.spacing.sm }}>MEAL PREFERENCE</Text>
            <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
              {['Veg 🌱', 'Non-Veg 🍗'].map(pref => {
                const cleanPref = pref.split(' ')[0] as 'Veg' | 'Non-Veg';
                const isSelected = checkoutMealPref === cleanPref;
                return (
                  <Button
                    key={pref}
                    title={pref}
                    variant={isSelected ? 'primary' : 'outline'}
                    size="medium"
                    fullWidth={false}
                    style={{ flex: 1 }}
                    onPress={() => setCheckoutMealPref(cleanPref)}
                  />
                );
              })}
            </View>
          </View>

          {/* Delivery Schedule Frequencies */}
          <View>
            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1, marginBottom: theme.spacing.sm }}>DELIVERY FREQUENCY</Text>
            <View style={{ gap: theme.spacing.sm }}>
              {[
                { id: 'lunch', label: '☀️ Lunch Only' },
                { id: 'dinner', label: '🌙 Dinner Only' },
                { id: 'both', label: '☀️🌙 Lunch + Dinner' }
              ].map(freq => {
                const isSelected = checkoutFreq === freq.id;
                return (
                  <TouchableOpacity
                    key={freq.id}
                    onPress={() => setCheckoutFreq(freq.id as 'lunch' | 'dinner' | 'both')}
                    style={{
                      height: 52,
                      borderRadius: 16,
                      borderWidth: 2,
                      borderColor: isSelected ? theme.colors.secondary : theme.colors.light.border,
                      backgroundColor: isSelected ? 'rgba(201, 107, 60, 0.05)' : theme.colors.light.surface,
                      paddingHorizontal: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text variant="body" color="text" style={{ fontWeight: '800' }}>{freq.label}</Text>
                    <View style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      borderWidth: 2,
                      borderColor: isSelected ? theme.colors.secondary : theme.colors.light.muted,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {isSelected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.secondary }} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Meal Customizations */}
          <View>
            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1, marginBottom: theme.spacing.sm }}>CUSTOM PREFERENCES (MULTI-SELECT)</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {['Mild Spicy', 'Medium Spicy', 'Low Carb', 'High Protein', 'No Dairy'].map(pref => {
                const isSelected = checkoutCustomPrefs.includes(pref);
                return (
                  <TouchableOpacity
                    key={pref}
                    onPress={() => toggleCustomPref(pref)}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 16,
                      borderWidth: 1.5,
                      borderColor: isSelected ? theme.colors.secondary : theme.colors.light.border,
                      backgroundColor: isSelected ? 'rgba(201, 107, 60, 0.05)' : theme.colors.light.surface,
                    }}
                  >
                    <Text variant="caption" color={isSelected ? 'secondary' : 'text'} style={{ fontWeight: '800' }}>{pref}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Subscription Start Date Slider */}
          <View>
            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1, marginBottom: theme.spacing.sm }}>START DATE</Text>
            <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
              {['tomorrow', 'custom'].map(date => {
                const isSelected = checkoutStartDate === date;
                return (
                  <Button
                    key={date}
                    title={date === 'tomorrow' ? 'Tomorrow' : 'Custom Date'}
                    variant={isSelected ? 'primary' : 'outline'}
                    size="medium"
                    fullWidth={false}
                    style={{ flex: 1 }}
                    onPress={() => setCheckoutStartDate(date as 'tomorrow' | 'custom')}
                  />
                );
              })}
            </View>
          </View>

          {/* Bill Breakdowns details */}
          <View>
            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1, marginBottom: theme.spacing.sm }}>BILL DETAILS</Text>
            <Card style={{ padding: theme.spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
                <Text variant="caption" color="sub">Sub Plan Rate ({selectedPlan.name})</Text>
                <Text variant="mono" color="text">₹{planRateNum}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
                <Text variant="caption" color="sub">Refundable Dabba Deposit</Text>
                <Text variant="mono" color="text">₹{depositNum}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
                <Text variant="caption" color="success">First Order Coupon Discount</Text>
                <Text variant="mono" color="success">-₹{discountNum}</Text>
              </View>
              
              <View style={{ height: 1, backgroundColor: theme.colors.light.border, marginVertical: 10 }} />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
                <Text variant="body" color="text" style={{ fontWeight: 'bold' }}>Total Due Amount</Text>
                <Text variant="mono" color="secondary" style={{ fontWeight: '900', fontSize: 16 }}>₹{totalDueNum}</Text>
              </View>
            </Card>
          </View>
        </View>

        {/* Action Button */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Button 
            title={`Subscribe & Pay ₹${totalDueNum} ‣`}
            onPress={handleCheckoutComplete}
          />
        </View>
      </ScrollView>
    </PageLayout>
  );
}
