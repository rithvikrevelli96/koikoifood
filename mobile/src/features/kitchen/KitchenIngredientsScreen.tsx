import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  X,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Filter,
  Award,
  Info,
  Package,
  Calendar,
  Droplet,
  Leaf,
  Flame,
} from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  Badge,
} from '../../design-system';

interface IngredientItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  badges: string[];
}

const INGREDIENTS_DATA: IngredientItem[] = [
  // Oils
  { id: '1', name: 'Freedom Sunflower Oil', brand: 'Freedom', category: 'Oils', description: 'Primary cooking oil for everyday thalis & stir frying.', badges: ['FSSAI Approved', 'Zero Trans Fat'] },
  { id: '2', name: 'Freedom Groundnut Oil', brand: 'Freedom', category: 'Oils', description: 'Used for traditional Andhra tempering & roasted curries.', badges: ['Farm Fresh', '100% Pure'] },
  { id: '3', name: 'Freedom Rice Bran Oil', brand: 'Freedom', category: 'Oils', description: 'Heart-healthy oil used for light sautéing & gravies.', badges: ['Heart Healthy', 'Low Absorption'] },
  { id: '4', name: 'Cold Pressed Sesame Oil', brand: 'Idhayam / Organic', category: 'Oils', description: 'Authentic stone-pressed Chekku sesame oil for South Indian recipes.', badges: ['Cold Pressed', 'Traditional'] },

  // Rice
  { id: '5', name: 'India Gate Basmati Rice', brand: 'India Gate', category: 'Rice', description: 'Long-grain aged basmati rice for special pulaos & biryanis.', badges: ['Aged 2 Years', 'Premium'] },
  { id: '6', name: 'Premium Sona Masoori Rice', brand: 'Heritage Organic', category: 'Rice', description: 'Lightweight unpolished daily rice for lunchtime meals.', badges: ['Low GI', 'Farm Fresh'] },
  { id: '7', name: 'Heritage Brown Rice', brand: 'Heritage', category: 'Rice', description: 'Fiber-rich unpolished whole grain brown rice for diabetic options.', badges: ['High Fiber', 'Non GMO'] },

  // Wheat & Atta
  { id: '8', name: 'Aashirvaad Whole Wheat Atta', brand: 'ITC Aashirvaad', category: 'Wheat', description: '100% pure MP Sharbati whole wheat flour for soft chapatis.', badges: ['100% Whole Wheat', 'Zero Maida'] },
  { id: '9', name: 'Organic Multigrain Flour', brand: 'Organic Tattva', category: 'Wheat', description: 'High-protein blend of Chana, Oats, Soybean & Maize flour.', badges: ['Multigrain', 'High Protein'] },

  // Pulses & Dal
  { id: '10', name: 'Organic Toor Dal', brand: 'Tata Sampann', category: 'Pulses', description: 'Unpolished yellow pigeon peas for Sambar & Dal Tadka.', badges: ['Unpolished', 'Organic'] },
  { id: '11', name: 'Yellow Moong Dal', brand: 'Tata Sampann', category: 'Pulses', description: 'Easy-to-digest split yellow moong for khichdi & dal fry.', badges: ['Easy Digest', 'Unpolished'] },
  { id: '12', name: 'Urad Dal & Chana Dal', brand: 'Tata Sampann', category: 'Pulses', description: 'Stone-cleaned premium whole pulses for chutneys & tadkas.', badges: ['Protein Rich'] },

  // Masalas & Spices
  { id: '13', name: 'Everest Spices & Masalas', brand: 'Everest', category: 'Masalas', description: 'Garam Masala, Kitchen King & Kasuri Methi spice blends.', badges: ['Pure Spices', 'No Added Color'] },
  { id: '14', name: 'MDH Deggi Mirch & Chana Masala', brand: 'MDH', category: 'Masalas', description: 'Natural red pepper & chickpeas spice mix.', badges: ['Authentic Flavor'] },
  { id: '15', name: 'MTR & Aachi Sambar & Rasam Powder', brand: 'MTR / Aachi', category: 'Masalas', description: 'Traditional South Indian roasted spice powders.', badges: ['Heritage Recipe'] },
  { id: '16', name: 'Cold-Ground Stone Spices', brand: 'In-House Ground', category: 'Masalas', description: 'Whole spices ground in slow stone mortars at low speeds.', badges: ['Cold Ground', 'Essential Oils Retained'] },

  // Salt & Sweeteners
  { id: '17', name: 'Tata Salt (Iodized)', brand: 'Tata', category: 'Salt & Sweeteners', description: 'Vacuum-evaporated iodized salt for everyday cooking.', badges: ['Iodized', 'Purity Tested'] },
  { id: '18', name: 'Himalayan Pink Rock Salt', brand: 'Organic India', category: 'Salt & Sweeteners', description: 'Unrefined mineral-rich rock salt for salads & raita.', badges: ['Mineral Rich', 'Unrefined'] },
  { id: '19', name: 'Madhur Sugar & Organic Jaggery', brand: 'Madhur / Organic', category: 'Salt & Sweeteners', description: 'Sulphur-free sugar & natural sugarcane jaggery.', badges: ['Sulphur Free', 'Chemical Free'] },

  // Dairy & Ghee
  { id: '20', name: 'Amul Taza Milk & Amul Butter', brand: 'Amul', category: 'Dairy & Ghee', description: 'Pasteurised A-grade milk & salted butter.', badges: ['Grade A Dairy', 'Pasteurised'] },
  { id: '21', name: 'Amul Fresh Paneer', brand: 'Amul', category: 'Dairy & Ghee', description: 'Soft cottage cheese made daily for paneer dishes.', badges: ['Fresh Daily', 'High Protein'] },
  { id: '22', name: 'Nandini Pure A2 Desi Cow Ghee', brand: 'Nandini', category: 'Dairy & Ghee', description: 'Pure A2 Cow Ghee brushed hot over fresh chapatis.', badges: ['Pure A2 Ghee', 'Vedic Method'] },

  // Fresh Produce
  { id: '23', name: 'Local Certified Farm Vegetables', brand: 'Direct Farmers', category: 'Produce & Meat', description: 'Sourced daily at 4:30 AM from certified pesticide-free farms.', badges: ['Farm Sourced', 'Ozone Sterilized'] },
  { id: '24', name: 'Antibiotic-Free Fresh Chicken', brand: 'Licious / FreshToHome', category: 'Produce & Meat', description: 'Daily procured antibiotic-free chicken for non-veg meals.', badges: ['Antibiotic Free', '100% Fresh'] },

  // Water & Hygiene
  { id: '25', name: '7-Stage RO + UV Purified Water', brand: 'In-House RO System', category: 'Hygiene & Packaging', description: 'RO + UV + UF purified water used for all cooking & dishwashing.', badges: ['RO + UV Purified', '100% Safe'] },

  // Packaging
  { id: '26', name: '304 Stainless Steel Dabbas', brand: 'Food Grade 304', category: 'Hygiene & Packaging', description: 'Heavy gauge food-grade steel containers with zero plastic contact.', badges: ['100% Stainless Steel', 'Zero Plastic Contact'] },
  { id: '27', name: 'Hermetic Silicone Seals', brand: 'Food Grade Silicone', category: 'Hygiene & Packaging', description: 'Spill-proof food-safe silicone rings for leakproof transit.', badges: ['BPA Free', 'Leakproof'] },
];

const CATEGORIES = ['All', 'Oils', 'Rice', 'Wheat', 'Pulses', 'Masalas', 'Salt & Sweeteners', 'Dairy & Ghee', 'Produce & Meat', 'Hygiene & Packaging'];

export default function KitchenIngredientsScreen() {
  const { back, t, isDark } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIngredients = INGREDIENTS_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="clean">
      
      {/* 1. TOP HEADER BAR */}
      <View style={[styles.headerBar, { backgroundColor: t.card, borderColor: t.border }]}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={t.text} />}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.surface }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text variant="title" color="primary" style={{ fontSize: 16 }}>KITCHEN INGREDIENTS</Text>
          <Text variant="caption" color="sub" style={{ fontSize: 11 }}>100% Brand & Sourcing Transparency</Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. HERO TRANSPARENCY BANNER */}
        <View style={styles.sectionContainer}>
          <Card style={[styles.heroCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <ShieldCheck size={18} color={t.primary} />
              <Text variant="body" color="primary" style={{ fontWeight: '800', fontSize: 13 }}>
                ZERO SECRETS POLICY
              </Text>
            </View>
            <Text variant="headingM" color="text" style={{ fontWeight: '800', fontSize: 18 }}>
              Know Exactly What Goes Into Every Dabba
            </Text>
            <Text variant="caption" color="sub" style={{ lineHeight: 18, marginTop: 4 }}>
              We believe you deserve to know the exact brands, cold-pressed oils, unpolished dals, and food-grade packaging used in our kitchen.
            </Text>
            
            <View style={[styles.lastUpdatedBadge, { backgroundColor: t.surface, borderColor: t.border }]}>
              <Calendar size={12} color={t.sub} style={{ marginRight: 6 }} />
              <Text variant="caption" color="sub" style={{ fontSize: 11, fontWeight: '700' }}>
                Registry Updated: 18 July 2026
              </Text>
            </View>
          </Card>
        </View>

        {/* 3. SEARCH INPUT BOX */}
        <View style={styles.sectionContainer}>
          <View style={[styles.searchBoxRow, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Search size={18} color={t.sub} style={{ marginRight: 10 }} />
            <TextInput
              style={[styles.searchInput, { color: t.text }]}
              placeholder="Search by brand (e.g. Freedom, Amul, Everest) or ingredient..."
              placeholderTextColor={t.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={16} color={t.sub} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 4. CATEGORY FILTER CHIPS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryChipRow}
        >
          {CATEGORIES.map(cat => {
            const isSel = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: isSel ? t.primary : t.surface,
                    borderColor: isSel ? t.primary : t.border,
                  }
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 12, fontWeight: '800', color: isSel ? '#FFFFFF' : t.text }}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 5. INGREDIENTS LIST */}
        <View style={styles.sectionContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text variant="label" color="sub" style={{ fontWeight: '900', letterSpacing: 0.8 }}>
              INGREDIENT REGISTRY ({filteredIngredients.length})
            </Text>
            {selectedCategory !== 'All' && (
              <TouchableOpacity onPress={() => setSelectedCategory('All')}>
                <Text variant="caption" color="secondary" style={{ fontWeight: '800' }}>Reset Filter</Text>
              </TouchableOpacity>
            )}
          </View>

          {filteredIngredients.length === 0 ? (
            <Card style={{ alignItems: 'center', paddingVertical: 40, backgroundColor: t.card, borderColor: t.border }}>
              <Search size={36} color={t.muted} />
              <Text variant="body" color="sub" style={{ fontWeight: '700', marginTop: 12 }}>No ingredients found</Text>
              <Text variant="caption" color="muted" style={{ marginTop: 4 }}>Try searching for another brand or reset filters.</Text>
            </Card>
          ) : (
            <View style={{ gap: 12 }}>
              {filteredIngredients.map(item => (
                <Card key={item.id} style={[styles.ingredientCard, { backgroundColor: t.card, borderColor: t.border }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                      <Text variant="body" color="text" style={{ fontWeight: '800', fontSize: 15 }}>
                        {item.name}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, gap: 6 }}>
                        <Text variant="caption" color="secondary" style={{ fontWeight: '800' }}>
                          Brand: {item.brand}
                        </Text>
                        <Text variant="caption" color="sub">•</Text>
                        <Text variant="caption" color="sub">{item.category}</Text>
                      </View>
                    </View>

                    <View style={[styles.brandBadgePill, { backgroundColor: isDark ? 'rgba(122,147,104,0.2)' : 'rgba(75,93,58,0.08)' }]}>
                      <CheckCircle2 size={12} color={t.primary} style={{ marginRight: 4 }} />
                      <Text style={{ fontSize: 10, fontWeight: '800', color: t.primary }}>Verified</Text>
                    </View>
                  </View>

                  <Text variant="caption" color="sub" style={{ lineHeight: 17, marginTop: 8 }}>
                    {item.description}
                  </Text>

                  {/* Badges Row */}
                  <View style={styles.badgesRow}>
                    {item.badges.map((b, idx) => (
                      <View key={idx} style={[styles.itemBadge, { backgroundColor: t.surface, borderColor: t.border }]}>
                        <Text style={{ fontSize: 10, fontWeight: '700', color: t.text }}>✦ {b}</Text>
                      </View>
                    ))}
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>

        {/* 6. TRANSPARENCY PROMISE CARD (Footer) */}
        <View style={styles.sectionContainer}>
          <Card style={[styles.promiseCard, { backgroundColor: isDark ? 'rgba(75,93,58,0.18)' : 'rgba(75,93,58,0.06)', borderColor: t.primary }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <ShieldCheck size={20} color={t.primary} />
              <Text variant="title" color="primary" style={{ fontSize: 15 }}>OUR TRANSPARENCY PROMISE</Text>
            </View>
            <Text variant="caption" color="text" style={{ lineHeight: 18, fontWeight: '600' }}>
              "If we ever change any ingredient brand, cooking oil, or sourcing standard, it will be updated in this registry before being used in your meals."
            </Text>
            <View style={{ height: 1, backgroundColor: t.border, marginVertical: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text variant="caption" color="sub" style={{ fontSize: 11 }}>Verified by Head Chef & Quality Desk</Text>
              <Text variant="caption" color="primary" style={{ fontWeight: '800', fontSize: 11 }}>18 July 2026</Text>
            </View>
          </Card>
        </View>

      </ScrollView>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: 16,
  },
  heroCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  lastUpdatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 12,
  },
  searchBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    height: '100%',
  },
  categoryChipRow: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  ingredientCard: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  brandBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  itemBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  promiseCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
  },
});
