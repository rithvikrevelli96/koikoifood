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
    isDark
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
    const typeColor = item.type === 'veg' ? '#4B5D3A' : '#C96B3C';
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
          <View style={styles.plateShadow}>
            <View style={styles.plateRing}>
              <Image
                source={{ uri: item.img }}
                style={styles.plateImage}
                resizeMode="cover"
              />
            </View>
          </View>
          {/* Type badge on plate */}
          <View style={[styles.typeBadgeOnPlate, { backgroundColor: typeColor }]}>
            <Text style={styles.typeBadgeText}>{typeIcon}</Text>
          </View>
        </View>

        {/* Text Info Side */}
        <View style={[
          styles.menuTextContainer,
          isEven ? styles.menuTextRight : styles.menuTextLeft,
        ]}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDesc} numberOfLines={2}>{item.desc}</Text>
          
          {/* Macros Row */}
          <View style={styles.macrosRow}>
            <View style={styles.macroChip}>
              <Flame size={10} color="#C96B3C" />
              <Text style={styles.macroVal}>{item.cal}</Text>
            </View>
            <View style={styles.macroDot} />
            <Text style={styles.macroLabel}>{item.protein}g prot</Text>
          </View>

          {/* Price + Rating Row */}
          <View style={styles.priceRatingRow}>
            <Text style={styles.menuItemPrice}>{item.price}</Text>
            <View style={styles.ratingBadge}>
              <Star size={10} color="#D9B65A" fill="#D9B65A" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /* ─── Section Header ─── */
  const renderSectionHeader = (icon: React.ReactNode, label: string, color: string) => (
    <View style={styles.sectionHeaderRow}>
      <View style={[styles.sectionIconCircle, { backgroundColor: color + '14' }]}>
        {icon}
      </View>
      <Text style={[styles.sectionHeaderText, { color }]}>{label}</Text>
      <View style={[styles.sectionLine, { backgroundColor: color + '20' }]} />
    </View>
  );

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      
      {/* ── Header ── */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>Daily Menu</Text>
          <Text style={styles.headerSubtitle}>Fresh home-cooked meals, daily</Text>
        </View>
        <TouchableOpacity
          onPress={() => go('notifications')}
          style={styles.bellBtn}
          activeOpacity={0.7}
        >
          <Bell size={16} color="#1F1F1F" />
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
                isActive && styles.filterChipActive,
              ]}
            >
              <Text style={[
                styles.filterChipText,
                isActive && styles.filterChipTextActive,
              ] as any}>
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
                  isActive && styles.dayChipActive,
                ]}
              >
                <Text style={[
                  styles.dayChipText,
                  isActive && styles.dayChipTextActive,
                ] as any}>
                  {day === 'All Menu' ? 'All' : day.slice(0, 3)}
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
    paddingHorizontal: 16,
    marginTop: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    marginLeft: 8,
  },

  /* ── Menu Item (Alternating Plate Layout) ── */
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 14,
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
    width: PLATE_SIZE,
    height: PLATE_SIZE,
    borderRadius: PLATE_SIZE / 2,
    backgroundColor: '#1F1F1F',
    padding: 6,
    elevation: 8,
    shadowColor: '#1F1F1F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  plateRing: {
    flex: 1,
    borderRadius: PLATE_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E8E2D8',
  },
  plateImage: {
    width: '100%',
    height: '100%',
  },
  typeBadgeOnPlate: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FCFAF6',
  },
  typeBadgeText: {
    fontSize: 11,
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
    fontSize: 15,
    color: '#1F1F1F',
    fontWeight: '700',
    lineHeight: 20,
  },
  menuItemDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
    lineHeight: 16,
    marginTop: 3,
  },

  /* ── Macros ── */
  macrosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  macroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(201,107,60,0.08)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  macroVal: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 10.5,
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
