import React, { useState } from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ArrowLeft, Star, Heart, Flame, ShieldAlert, Award } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card
} from '../../design-system';

export default function MealDetailScreen() {
  const {
    mealsList,
    selectedMealId,
    back,
    setToast
  } = useAppContext();

  const meal = mealsList.find(m => m.id === selectedMealId) || mealsList[0];
  const [isFavorited, setIsFavorited] = useState(false);

  const ingredientsList = [
    { name: 'Toor dal', qty: '1 cup' },
    { name: 'Tomato & Onion', qty: '1 portion' },
    { name: 'Garlic & Cumin', qty: '4 cloves / 1 tsp' },
    { name: 'Pure Ghee', qty: '1 tbsp' }
  ];

  const nutritionList = [
    { label: 'Calories', val: `${meal.cal} kcal`, pct: 35 },
    { label: 'Protein', val: `${meal.protein}g`, pct: 58 },
    { label: 'Carbs', val: `${meal.carbs}g`, pct: 45 },
    { label: 'Fats', val: `${meal.fat}g`, pct: 28 },
  ];

  const benefitsList = [
    { title: 'Heart Healthy', desc: 'Low saturated fat, using cold-ground organic masalas.' },
    { title: 'Digestive Comfort', desc: 'Pre-soaked lentils and digestive spices ensure zero bloating.' },
    { title: 'Energy Sustenance', desc: 'Complex carbs provide a steady, clean release of energy.' }
  ];

  return (
    <PageLayout style={{ paddingHorizontal: 0, backgroundColor: theme.colors.light.bg }}>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        
        {/* 1. Large Food Photo */}
        <View style={{ width: '100%', height: 340, position: 'relative' }}>
          <Image source={{ uri: meal.img }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
          
          <TouchableOpacity
            onPress={back}
            style={{
              position: 'absolute',
              left: 20,
              top: Platform.OS === 'ios' ? 50 : 24,
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4
            }}
          >
            <ArrowLeft size={18} color={theme.colors.light.text} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsFavorited(!isFavorited);
              setToast(isFavorited ? 'Removed from favorites' : 'Added to favorites!');
            }}
            style={{
              position: 'absolute',
              right: 20,
              top: Platform.OS === 'ios' ? 50 : 24,
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4
            }}
          >
            <Heart size={18} color={isFavorited ? theme.colors.secondary : theme.colors.light.text} fill={isFavorited ? theme.colors.secondary : 'transparent'} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* Content Panel (Overlaps the image) */}
        <View style={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          marginTop: -36,
          paddingHorizontal: 24,
          paddingTop: 32,
        }}>
          
          {/* 2. Meal Name */}
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            <Text variant="display" color="primary" style={{ fontSize: 28, fontWeight: '800', letterSpacing: -0.5 }}>
              {meal.name.split(' + ')[0]}
            </Text>
            <Text variant="display" style={{ fontSize: 24 }}>🌿</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }}>
            <View style={{ flexDirection: 'row' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={13} color={theme.colors.accent} fill={theme.colors.accent} />
              ))}
            </View>
            <Text variant="body" color="text" style={{ fontWeight: '800', marginLeft: 4, fontSize: 13.5 }}>
              {meal.rating || '4.8'} <Text variant="body" color="muted" style={{ fontWeight: 'normal' }}>(320 reviews)</Text>
            </Text>
          </View>

          <Text variant="body" color="sub" style={{ marginTop: 12, lineHeight: 22, fontSize: 14 }}>
            {meal.desc}
          </Text>

          {/* 3. Calories & 4. Protein (Stats Card) */}
          <View style={{
            flexDirection: 'row',
            marginTop: 24,
            backgroundColor: theme.colors.light.surface,
            borderRadius: 20,
            padding: 16,
            borderWidth: 1.5,
            borderColor: theme.colors.light.border,
            gap: 16
          }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Flame size={20} color={theme.colors.secondary} />
              <Text variant="mono" color="text" style={{ fontSize: 18, fontWeight: '800', marginTop: 4 }}>{meal.cal} kcal</Text>
              <Text variant="label" color="muted" style={{ marginTop: 2 }}>Calories</Text>
            </View>
            <View style={{ width: 1.5, backgroundColor: theme.colors.light.border }} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Award size={20} color={theme.colors.secondary} />
              <Text variant="mono" color="text" style={{ fontSize: 18, fontWeight: '800', marginTop: 4 }}>{meal.protein}g</Text>
              <Text variant="label" color="muted" style={{ marginTop: 2 }}>Protein</Text>
            </View>
          </View>

          {/* 5. Ingredients list */}
          <Text variant="body" color="primary" style={{ marginTop: 32, fontWeight: '800', fontSize: 15, textTransform: 'uppercase', letterSpacing: 0.5 }}>Ingredients Used</Text>
          <View style={{ gap: 12, marginTop: 12 }}>
            {ingredientsList.map((ing, idx) => (
              <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
                <Text variant="body" color="text" style={{ fontWeight: '700' }}>• {ing.name}</Text>
                <Text variant="caption" color="sub">{ing.qty}</Text>
              </View>
            ))}
          </View>

          {/* 6. Nutrition Details */}
          <Text variant="body" color="primary" style={{ marginTop: 32, fontWeight: '800', fontSize: 15, textTransform: 'uppercase', letterSpacing: 0.5 }}>Macro Breakdown</Text>
          <View style={{ gap: 14, marginTop: 14 }}>
            {nutritionList.map((item, idx) => (
              <View key={idx} style={{ gap: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text variant="caption" color="text" style={{ fontWeight: '700' }}>{item.label}</Text>
                  <Text variant="mono" color="secondary" style={{ fontWeight: '800' }}>{item.val}</Text>
                </View>
                <View style={{ height: 6, backgroundColor: theme.colors.light.surface, borderRadius: 3, overflow: 'hidden' }}>
                  <View style={{ height: '100%', width: `${item.pct}%`, backgroundColor: theme.colors.primary }} />
                </View>
              </View>
            ))}
          </View>

          {/* 7. Health Benefits */}
          <Text variant="body" color="primary" style={{ marginTop: 32, fontWeight: '800', fontSize: 15, textTransform: 'uppercase', letterSpacing: 0.5 }}>Meal Benefits</Text>
          <View style={{ gap: 16, marginTop: 14, marginBottom: 20 }}>
            {benefitsList.map((item, idx) => (
              <View key={idx} style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: 'rgba(75, 93, 58, 0.08)', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                  <Text style={{ fontSize: 10 }}>🌿</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="caption" color="text" style={{ fontWeight: '800' }}>{item.title}</Text>
                  <Text variant="caption" color="sub" style={{ marginTop: 2, lineHeight: 14 }}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* 8. Subscribe CTA Button */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderTopWidth: 1,
        borderColor: theme.colors.light.border
      }}>
        <Button
          title="Add to Today's Plan ✓"
          variant="primary"
          size="large"
          onPress={() => {
            setToast("Meal schedule updated successfully!");
            back();
          }}
        />
      </View>
    </PageLayout>
  );
}
