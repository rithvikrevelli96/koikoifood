import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { Bell, Sun, Moon, Star, ChevronRight, Flame, Leaf } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  PageLayout,
} from '../../design-system';
import { Meal } from '../../core/constants/types';
import { BottomTabNav } from '../../core/components/BottomTabNav';

const { width: SCREEN_W } = Dimensions.get('window');
const PLATE_SIZE = SCREEN_W * 0.38;

export default function MealsScreen() {
  const {
    mealsList,
    selectedFilter,
    setSelectedFilter,
    selectedCategory,
    setSelectedCategory,
    setActiveMealIndex,
    setSelectedMealId,
    go,
    isDark,
    t,
  } = useAppContext();

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredMeals = mealsList.filter(m => {
    let matchesType = true;
    if (selectedFilter === 'Veg') matchesType = m.type === 'veg';
    else if (selectedFilter === 'Non-Veg') matchesType = m.type === 'non-veg' || m.type === 'egg';

    let matchesDay = true;
    if (selectedCategory !== 'All Categories' && selectedCategory !== 'All Menu') {
      matchesDay = m.day === selectedCategory;
    }

    return matchesType && matchesDay;
  });

  const handleSelectDay = (day: string) => {
    setSelectedCategory(day);
    setActiveMealIndex(0);
  };

  const handleSelectFilter = (f: string) => {
    setSelectedFilter(f);
    setActiveMealIndex(0);
  };

  const lunchMeals = filteredMeals.filter(m => m.when === 'lunch');
  const dinnerMeals = filteredMeals.filter(m => m.when === 'dinner');

  /* ─── Premium Menu Card (alternating layout) ─── */
  const renderMenuItem = (item: Meal, index: number) => {
    const isEven = index % 2 === 0;
    const typeColor = item.type === 'veg' ? t.veg.bg : t.nonVeg.bg;
    const typeTextColor = item.type === 'veg' ? t.veg.text : t.nonVeg.text;
    const typeIcon = item.type === 'veg' ? '🌱' : '🍗';

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.85}
        onPress={() => {
          setSelectedMealId(item.id);
          go('meal_detail');
        }}
        style={[
          styles.menuItem,
          isEven ? styles.menuItemLeft : styles.menuItemRight,
        ]}
      >
        {/* Plate Image Side */}
        <View style={[
          styles.plateContainer,
          isEven ? styles.plateLeft : styles.plateRight,
        ]}>
          <View style={[styles.plateShadow, { backgroundColor: isDark ? '#12100E' : '#1F1F1F' }]}>
            <View style={[styles.plateRing, { borderColor: t.border }]}>
              <Image
                source={{ uri: item.img }}
                style={styles.plateImage}
                resizeMode="cover"
              />
            </View>
          </View>
          {/* Type badge on plate */}
          <View style={[styles.typeBadgeOnPlate, { backgroundColor: typeColor, borderColor: t.card }]}>
            <Text style={{ fontSize: 11, color: typeTextColor }}>{typeIcon}</Text>
          </View>
        </View>

        {/* Text Info Side */}
        <View style={[
          styles.menuTextContainer,
          isEven ? styles.menuTextRight : styles.menuTextLeft,
        ]}>
          <Text style={[styles.menuItemName, { color: t.text }]}>{item.name}</Text>
          <Text style={[styles.menuItemDesc, { color: t.sub }]} numberOfLines={2}>{item.desc}</Text>
          
          {/* Macros Row */}
          <View style={styles.macrosRow}>
            <View style={[styles.macroChip, { backgroundColor: isDark ? 'rgba(122, 147, 104, 0.2)' : 'rgba(75, 93, 58, 0.08)' }]}>
              <Flame size={10} color={t.primary} />
              <Text style={[styles.macroVal, { color: t.primary }]}>{item.cal}</Text>
            </View>
            <View style={[styles.macroDot, { backgroundColor: t.border }]} />
            <Text style={[styles.macroLabel, { color: t.sub }]}>{item.protein}g prot</Text>
          </View>

          {/* Price + Rating Row */}
          <View style={styles.priceRatingRow}>
            <Text style={[styles.menuItemPrice, { color: t.secondary }]}>{item.price}</Text>
            <View style={[styles.ratingBadge, { backgroundColor: isDark ? 'rgba(224, 194, 106, 0.18)' : 'rgba(217, 182, 90, 0.12)' }]}>
              <Star size={10} color={t.accent} fill={t.accent} />
              <Text style={[styles.ratingText, { color: t.accent }]}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /* ─── Section Header ─── */
  const renderSectionHeader = (icon: React.ReactNode, label: string, color: string) => (
    <View style={styles.sectionHeaderRow}>
      <View style={[styles.sectionIconCircle, { backgroundColor: isDark ? 'rgba(122, 147, 104, 0.2)' : color + '14' }]}>
        {icon}
      </View>
      <Text style={[styles.sectionHeaderText, { color: isDark ? t.text : color }]}>{label}</Text>
      <View style={[styles.sectionLine, { backgroundColor: t.border }]} />
    </View>
  );

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      
      {/* ── Header ── */}
      <View style={[styles.headerContainer, { backgroundColor: t.bg }]}>
        <View>
          <Text style={[styles.headerTitle, { color: t.text }]}>Daily Menu</Text>
          <Text style={[styles.headerSubtitle, { color: t.sub }]}>Fresh home-cooked meals, daily</Text>
        </View>
        <TouchableOpacity
          onPress={() => go('notifications')}
          style={[styles.bellBtn, { backgroundColor: t.surface, borderColor: t.border }]}
          activeOpacity={0.7}
        >
          <Bell size={16} color={t.text} />
        </TouchableOpacity>
      </View>

      {/* ── Type Filter Pills ── */}
      <View style={styles.filterRow}>
        {['Both', 'Veg', 'Non-Veg'].map(f => {
          const isActive = selectedFilter === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => handleSelectFilter(f)}
              activeOpacity={0.7}
              style={[
                styles.filterChip,
                {
                  backgroundColor: isActive ? t.primary : t.surface,
                  borderColor: isActive ? t.primary : t.border,
                }
              ]}
            >
              <Text style={{
                fontFamily: theme.typography.bodyFamily,
                fontSize: 12.5,
                color: isActive ? '#F8F6F2' : t.text,
                fontWeight: '700',
              }}>
                {f === 'Veg' ? '🌱 Veg' : f === 'Non-Veg' ? '🍗 Non-Veg' : '🍱 All'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Day Selector ── */}
      <View style={styles.dayRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayScrollContent}
        >
          {['All Menu', ...weekdays].map(day => {
            const isActive = selectedCategory === day || (day === 'All Menu' && selectedCategory === 'All Categories');
            return (
              <TouchableOpacity
                key={day}
                onPress={() => handleSelectDay(day === 'All Menu' ? 'All Menu' : day)}
                activeOpacity={0.7}
                style={[
                  styles.dayChip,
                  {
                    backgroundColor: isActive ? t.primary : t.card,
                    borderColor: isActive ? t.primary : t.border,
                  }
                ]}
              >
                <Text style={{
                  fontFamily: theme.typography.bodyFamily,
                  fontSize: 12,
                  color: isActive ? '#F8F6F2' : t.text,
                  fontWeight: isActive ? '700' : '500',
                }}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Menu Content ── */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lunch Section */}
        {lunchMeals.length > 0 && (
          <View style={styles.sectionContainer}>
            {renderSectionHeader(
              <Sun size={14} color="#C96B3C" />,
              'LUNCH',
              '#C96B3C'
            )}
            {lunchMeals.map((meal, i) => renderMenuItem(meal, i))}
          </View>
        )}

        {/* Dinner Section */}
        {dinnerMeals.length > 0 && (
          <View style={styles.sectionContainer}>
            {renderSectionHeader(
              <Moon size={14} color="#4B5D3A" />,
              'DINNER',
              '#4B5D3A'
            )}
            {dinnerMeals.map((meal, i) => renderMenuItem(meal, i + 1))}
          </View>
        )}

        {/* Empty State */}
        {filteredMeals.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No meals match your filters</Text>
            <Text style={styles.emptySubtext}>Try adjusting your selection</Text>
          </View>
        )}
      </ScrollView>

      <BottomTabNav active="meals" />
    </PageLayout>
  );
}

/* ═══════════════════════════════════════════ */
/*                  STYLES                     */
/* ═══════════════════════════════════════════ */
const styles = StyleSheet.create({
  /* ── Header ── */
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D8',
    backgroundColor: '#F4EFE6',
  },
  headerTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 20,
    color: '#4B5D3A',
    fontWeight: '700',
  },
  headerSubtitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
    marginTop: 1,
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FCFAF6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ── Filter Row ── */
  filterRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: '#FCFAF6',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D8',
  },
  filterChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#E8E2D8',
    backgroundColor: '#F4EFE6',
  },
  filterChipActive: {
    backgroundColor: '#4B5D3A',
    borderColor: '#4B5D3A',
  },
  filterChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },

  /* ── Day Selector ── */
  dayRow: {
    backgroundColor: '#F4EFE6',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D8',
  },
  dayScrollContent: {
    paddingHorizontal: 16,
    gap: 6,
  },
  dayChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    backgroundColor: '#FCFAF6',
  },
  dayChipActive: {
    backgroundColor: '#4B5D3A',
    borderColor: '#4B5D3A',
  },
  dayChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#1F1F1F',
    fontWeight: '600',
  },
  dayChipTextActive: {
    color: '#FFFFFF',
  },

  /* ── Scroll ── */
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: 8,
  },

  /* ── Section ── */
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
    paddingHorizontal: 4,
  },
  sectionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    marginLeft: 10,
  },

  /* ── Menu Item (Alternating Plate Layout) ── */
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 18,
    padding: 18,
    borderRadius: 28,
  },
  menuItemLeft: {
    flexDirection: 'row',
  },
  menuItemRight: {
    flexDirection: 'row-reverse',
  },

  /* ── Plate ── */
  plateContainer: {
    position: 'relative',
  },
  plateLeft: {},
  plateRight: {},
  plateShadow: {
    width: PLATE_SIZE + 10,
    height: PLATE_SIZE + 10,
    borderRadius: (PLATE_SIZE + 10) / 2,
    backgroundColor: '#000000',
    padding: 6,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
  },
  plateRing: {
    flex: 1,
    borderRadius: (PLATE_SIZE + 10) / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3C362F',
  },
  plateImage: {
    width: '100%',
    height: '100%',
  },
  typeBadgeOnPlate: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#24201C',
  },
  typeBadgeText: {
    fontSize: 12,
  },

  /* ── Menu Text ── */
  menuTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  menuTextRight: {
    alignItems: 'flex-start',
  },
  menuTextLeft: {
    alignItems: 'flex-end',
  },
  menuItemName: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#1F1F1F',
    fontWeight: '800',
    lineHeight: 24,
  },
  menuItemDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#8A857B',
    lineHeight: 19,
    marginTop: 4,
  },

  /* ── Macros ── */
  macrosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  macroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(201,107,60,0.12)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  macroVal: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 11.5,
    color: '#C96B3C',
    fontWeight: '700',
  },
  macroDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#E8E2D8',
  },
  macroLabel: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 10.5,
    color: '#8A857B',
    fontWeight: '600',
  },

  /* ── Price + Rating ── */
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },
  menuItemPrice: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 16,
    color: '#1F1F1F',
    fontWeight: '800',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(217,182,90,0.12)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 11,
    color: '#D9B65A',
    fontWeight: '700',
  },

  /* ── Empty State ── */
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 16,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  emptySubtext: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#8A857B',
    marginTop: 4,
  },
});
