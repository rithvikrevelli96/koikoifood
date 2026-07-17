import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { ArrowLeft, Star } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F } from '../../design-system';
import { Text as RNText } from 'react-native';

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
    content.includes('km')
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
import { VegPill, ProgressRing } from '../../core/components/Common';

export default function MealDetailScreen() {
  const {
    mealsList,
    selectedMealId,
    back,
    t,
    isDark
  } = useAppContext();

  const meal = mealsList.find(m => m.id === selectedMealId) || mealsList[0];

  const ingredientsTable = [
    { category: 'Cooking Base Oil', item: meal.ingredients.oil, quantity: '12 ml' },
    meal.ingredients.rice ? { category: 'Primary Grain (Rice)', item: meal.ingredients.rice, quantity: '180g cooked' } : null,
    meal.ingredients.flour ? { category: 'Primary Grain (Wheat)', item: meal.ingredients.flour, quantity: '3 Rotis (120g)' } : null,
    meal.ingredients.dal ? { category: 'Lentils / Grains', item: meal.ingredients.dal, quantity: '120g portion' } : null,
    meal.ingredients.meat ? { category: 'Protein (Halal Meat)', item: meal.ingredients.meat, quantity: '150g portion' } : null,
    meal.ingredients.dairy ? { category: 'Dairy / Cream', item: meal.ingredients.dairy.join(', '), quantity: '40g portion' } : null,
    { category: 'Fresh Vegetables', item: meal.ingredients.veg.join(', '), quantity: '150g fresh' },
    { category: 'Sourced Masala Spices', item: meal.ingredients.spices.join(', '), quantity: '8g authentic' },
  ].filter(Boolean) as { category: string; item: string; quantity: string }[];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={t.bg} />
      
      <View style={[styles.headerBar, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Meal Details</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: meal.img }} style={styles.detailImg} />

        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <VegPill veg={meal.type === 'veg'} />
            <View style={[styles.mealCardRating, { backgroundColor: isDark ? '#2D281E' : '#FFFDF0', borderColor: isDark ? '#4C3F24' : '#FEF3C7' }]}>
              <Star size={10} color="#F59E0B" fill="#F59E0B" />
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#F59E0B', marginLeft: 2 }}>{meal.rating}</Text>
            </View>
          </View>

          <Text style={[styles.detailMealName, { color: t.text }]}>{meal.name}</Text>
          <Text style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>Chef: {meal.chef}</Text>
          <Text style={[styles.detailMealDesc, { color: t.sub }]}>{meal.desc}</Text>

          {/* Nutrition Progress Rings */}
          <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 12 }]}>Macros Breakdowns</Text>
          <View style={styles.macroRow}>
            <ProgressRing pct={(meal.cal / 1000) * 100} label={`${meal.cal}`} sub="Kcal" color={theme.colors.secondary} theme={t} />
            <ProgressRing pct={(meal.protein / 60) * 100} label={`${meal.protein}g`} sub="Protein" color="#6366F1" theme={t} />
            <ProgressRing pct={(meal.carbs / 100) * 100} label={`${meal.carbs}g`} sub="Carbs" color="#22C55E" theme={t} />
            <ProgressRing pct={(meal.fat / 40) * 100} label={`${meal.fat}g`} sub="Fat" color="#EC4899" theme={t} />
          </View>

          {/* Ingredients table with quantities */}
          <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 12 }]}>Ingredients Used & Quantity</Text>
          <View style={{ borderRadius: 16, overflow: 'hidden', borderWidth: 1.5, borderColor: t.border, backgroundColor: t.card }}>
            {/* Header row */}
            <View style={{ flexDirection: 'row', backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F5F5F5', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1.5, borderBottomColor: t.border }}>
              <Text style={{ flex: 1.2, fontSize: 11, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>Ingredient</Text>
              <Text style={{ flex: 2, fontSize: 11, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, paddingHorizontal: 8 }}>Details</Text>
              <Text style={{ flex: 1, fontSize: 11, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'right' }}>Serving Qty</Text>
            </View>

            {/* Data rows */}
            {ingredientsTable.map((ing, idx) => (
              <View 
                key={idx} 
                style={{ 
                  flexDirection: 'row', 
                  paddingVertical: 14, 
                  paddingHorizontal: 16, 
                  borderBottomWidth: idx < ingredientsTable.length - 1 ? 1 : 0, 
                  borderBottomColor: t.border,
                  alignItems: 'center'
                }}
              >
                <Text style={{ flex: 1.2, fontSize: 12, fontWeight: '800', color: t.text }}>{ing.category}</Text>
                <Text style={{ flex: 2, fontSize: 12, color: t.sub, paddingHorizontal: 8 }} numberOfLines={2}>{ing.item}</Text>
                <Text style={{ flex: 1, fontSize: 12, fontWeight: '900', color: theme.colors.secondary, textAlign: 'right' }}>{ing.quantity}</Text>
              </View>
            ))}
          </View>

          {/* Reviews */}
          <Text style={[styles.sectionSubTitle, { color: t.text, marginTop: 24, marginBottom: 8 }]}>Customer Reviews</Text>
          <View style={{ gap: 10 }}>
            {meal.reviews.map(r => (
              <View key={r.id} style={[styles.reviewCard, { backgroundColor: t.card, borderColor: t.border }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: t.text }}>{r.user}</Text>
                  <Text style={{ fontSize: 10, color: t.muted }}>{r.date}</Text>
                </View>
                <Text style={{ fontSize: 12, color: t.sub, marginTop: 4 }}>{r.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerBar: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 12,
  },
  detailImg: {
    width: '100%',
    height: 220,
  },
  detailMealName: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 10,
  },
  detailMealDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
    opacity: 0.8,
  },
  sectionSubTitle: {
    fontSize: 14,
    fontWeight: '900',
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  reviewCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 10,
  },
});
