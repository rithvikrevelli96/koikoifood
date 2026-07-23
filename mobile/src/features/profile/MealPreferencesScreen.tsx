import React, { useState } from 'react';
import { View, Platform, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, Check, Heart, Sparkles, Clock, Compass } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  InfoCard
} from '../../design-system';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function MealPreferencesScreen() {
  const {
    user,
    setUser,
    back,
    setToast,
    allergiesList,
    setAllergiesList,
    foodDislikes,
    setFoodDislikes,
    t,
  } = useAppContext();

  // Local Slot Preference State
  const [deliverySlot, setDeliverySlot] = useState(user.deliverySlot || '01:00 PM');
  const [favCuisines, setFavCuisines] = useState<string[]>(user.favCuisines || ['South Indian', 'North Indian']);

  const cuisinesList = ['South Indian', 'North Indian', 'Punjabi', 'Gujarati', 'Bengali', 'Mughlai', 'Chinese', 'Continental'];

  const toggleCuisine = (cuisine: string) => {
    setFavCuisines(prev => 
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const toggleAllergy = (allergy: string) => {
    setAllergiesList((prev: any) => 
      prev.includes(allergy) ? prev.filter((a: any) => a !== allergy) : [...prev, allergy]
    );
  };

  const toggleDislike = (dislike: string) => {
    setFoodDislikes((prev: any) => 
      prev.includes(dislike) ? prev.filter((d: any) => d !== dislike) : [...prev, dislike]
    );
  };

  const handleSave = () => {
    setUser((prev: any) => ({
      ...prev,
      deliverySlot: deliverySlot,
      favCuisines: favCuisines
    }));
    setToast('🎉 Meal preferences saved successfully!');
    back();
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      {/* HEADER */}
      <View style={[styles.headerContainer, { backgroundColor: t.surface, borderColor: t.border }]}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={t.text} />}
          style={[styles.backBtn, { backgroundColor: t.surface }] as any}
        />
        <Text style={[styles.headerTitle, { color: t.primary }]}>Meal Preferences</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroSubTitle, { color: t.secondary }]}>DIETARY PROFILE</Text>
          <Text style={[styles.heroMainTitle, { color: t.text }]}>Tailor Your Daily Dabba</Text>
          <Text style={[styles.heroDesc, { color: t.sub }]}>
            Our chefs custom prepare every meal according to your selected diet, spices, allergies, and delivery schedules.
          </Text>
        </View>

        {/* Veg / Non Veg Selection */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionLabel, { color: t.text }]}>Dietary Type</Text>
          <InfoCard style={[styles.infoCardWrapper, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={styles.preferenceRow}>
              {['Veg', 'Non-Veg', 'Eggetarian', 'Vegan'].map(pref => {
                const isSel = user.foodPref === pref || (pref === 'Veg' && user.foodPref === 'Vegetarian') || (pref === 'Non-Veg' && user.foodPref === 'Non-Vegetarian');
                return (
                  <TouchableOpacity
                    key={pref}
                    onPress={() => setUser((p: any) => ({ ...p, foodPref: pref }))}
                    style={[
                      styles.dietChip,
                      { backgroundColor: isSel ? t.primary : t.elevated, borderColor: isSel ? t.primary : t.border }
                    ]}
                  >
                    <Text style={{ fontFamily: theme.typography.bodyFamily, fontSize: 12.5, color: isSel ? '#FFFFFF' : t.text, fontWeight: '700' }}>
                      {pref}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </InfoCard>
        </View>

        {/* Preferred Cuisine */}
        <View style={styles.sectionContainer}>
          <View style={styles.titleRow}>
            <Compass size={16} color="#4B5D3A" />
            <Text style={styles.sectionLabel}>Preferred Cuisines</Text>
          </View>
          <InfoCard style={styles.infoCardWrapper}>
            <View style={styles.chipsContainer}>
              {cuisinesList.map(cuisine => {
                const isSel = favCuisines.includes(cuisine);
                return (
                  <TouchableOpacity
                    key={cuisine}
                    onPress={() => toggleCuisine(cuisine)}
                    style={[styles.chipItem, isSel ? styles.chipItemActive : undefined]}
                  >
                    <Text style={[styles.chipText, isSel ? styles.chipTextActive : undefined] as any}>{cuisine}</Text>
                    {isSel && <Check size={12} color="#FFFFFF" style={{ marginLeft: 4 }} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </InfoCard>
        </View>

        {/* Allergies */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Food Allergies (Multi-Select)</Text>
          <InfoCard style={styles.infoCardWrapper}>
            <View style={styles.chipsContainer}>
              {['Dairy', 'Eggs', 'Peanuts', 'Tree Nuts', 'Gluten', 'Soy', 'Seafood', 'Sesame'].map(allergy => {
                const isSel = allergiesList.includes(allergy);
                return (
                  <TouchableOpacity
                    key={allergy}
                    onPress={() => toggleAllergy(allergy)}
                    style={[styles.chipItem, isSel ? styles.chipItemActiveOrange : undefined]}
                  >
                    <Text style={[styles.chipText, isSel ? styles.chipTextActive : undefined] as any}>{allergy}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </InfoCard>
        </View>

        {/* Dislikes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Ingredients to Exclude (Dislikes)</Text>
          <InfoCard style={styles.infoCardWrapper}>
            <View style={styles.chipsContainer}>
              {['Onion', 'Garlic', 'Mushroom', 'Paneer', 'Bitter Gourd', 'Brinjal', 'Spicy Food'].map(dislike => {
                const isSel = foodDislikes.includes(dislike);
                return (
                  <TouchableOpacity
                    key={dislike}
                    onPress={() => toggleDislike(dislike)}
                    style={[styles.chipItem, isSel ? styles.chipItemActiveOrange : undefined]}
                  >
                    <Text style={[styles.chipText, isSel ? styles.chipTextActive : undefined] as any}>{dislike}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </InfoCard>
        </View>

        {/* Delivery Slot */}
        <View style={styles.sectionContainer}>
          <View style={styles.titleRow}>
            <Clock size={16} color="#4B5D3A" />
            <Text style={styles.sectionLabel}>Preferred Delivery Slot</Text>
          </View>
          <InfoCard style={styles.infoCardWrapper}>
            <View style={styles.slotsContainer}>
              {['12:00 PM', '01:00 PM', '01:30 PM', '07:30 PM', '08:30 PM'].map(slot => {
                const isSel = deliverySlot === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    onPress={() => setDeliverySlot(slot)}
                    style={[styles.slotItem, isSel ? styles.slotItemActive : undefined]}
                  >
                    <Text style={[styles.slotText, isSel ? styles.slotTextActive : undefined] as any}>{slot}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </InfoCard>
        </View>

        {/* Save Details button */}
        <View style={styles.btnContainer}>
          <Button
            title="Save Preferences ✓"
            variant="primary"
            onPress={handleSave}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  sectionLabel: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    color: '#1F1F1F',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  infoCardWrapper: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  preferenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dietChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    backgroundColor: '#FCFAF6',
  },
  dietChipActive: {
    backgroundColor: '#4B5D3A',
    borderColor: '#4B5D3A',
  },
  dietChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  dietChipTextActive: {
    color: '#FFFFFF',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    backgroundColor: '#FCFAF6',
  },
  chipItemActive: {
    backgroundColor: '#4B5D3A',
    borderColor: '#4B5D3A',
  },
  chipItemActiveOrange: {
    backgroundColor: '#C96B3C',
    borderColor: '#C96B3C',
  },
  chipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#1F1F1F',
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    backgroundColor: '#FCFAF6',
  },
  slotItemActive: {
    backgroundColor: '#4B5D3A',
    borderColor: '#4B5D3A',
  },
  slotText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  slotTextActive: {
    color: '#FFFFFF',
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
