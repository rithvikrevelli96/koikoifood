import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Pressable,
  FlatList,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withSpring,
  withTiming,
  useAnimatedReaction,
  useDerivedValue,
  runOnJS,
  FadeInUp,
  FadeInDown,
  Layout,
  withSequence,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Design and Sizing Config ───────────────────────────────────────────────
const ITEM_WIDTH = SCREEN_WIDTH * 0.65;
const SPACER_WIDTH = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

const PLATES = [
  { id: 'p1', name: 'Fresh Avocado Bowl', emoji: '🥗', desc: 'Crisp seasonal greens with sliced avocado and vinaigrette.', cal: '320 kcal' },
  { id: 'p2', name: 'Rustic Vegetable Skewers', emoji: '🍢', desc: 'Marinated paneer and peppers grilled over charcoal.', cal: '280 kcal' },
  { id: 'p3', name: 'Fragrant Curry Rice', emoji: '🍛', desc: 'Mildly spiced chickpea curry served with steamed basmati.', cal: '410 kcal' },
  { id: 'p4', name: 'Handcrafted Ramen Bowl', emoji: '🍜', desc: 'Noodles in a rich vegetable broth with braised toppings.', cal: '460 kcal' },
  { id: 'p5', name: 'Golden Pancake Stack', emoji: '🥞', desc: 'Fluffy buttermilk pancakes topped with fresh organic berries.', cal: '390 kcal' },
];

const INGREDIENTS = [
  { id: 'i1', name: 'Cheese', emoji: '🧀' },
  { id: 'i2', name: 'Tomato', emoji: '🍅' },
  { id: 'i3', name: 'Mushroom', emoji: '🍄' },
  { id: 'i4', name: 'Onion', emoji: '🧅' },
  { id: 'i5', name: 'Avocado', emoji: '🥑' },
];

const STAGGER_ITEMS = [
  { id: 's1', label: 'Preparation Time', value: '15 mins', emoji: '⏱️' },
  { id: 's2', label: 'Chef Rating', value: '4.9 ★★★★★', emoji: '⭐' },
  { id: 's3', label: 'Serving Weight', value: '420g / standard portion', emoji: '⚖️' },
  { id: 's4', label: 'Allergens Info', value: 'Contains gluten, dairy-free option', emoji: '⚠️' },
  { id: 's5', label: 'Packaging Style', value: 'Eco-friendly biodegradable box', emoji: '📦' },
  { id: 's6', label: 'Sourcing Guarantee', value: '100% Organic & local farms', emoji: '🌾' },
];

interface Particle {
  id: string;
  emoji: string;
  startX: number;
  startY: number;
  progress: Animated.SharedValue<number>;
}

// ─── Carousel Item Component ────────────────────────────────────────────────
interface CarouselItemProps {
  item: typeof PLATES[0];
  index: number;
  scrollX: Animated.SharedValue<number>;
  platePulse: Animated.SharedValue<number>;
}

const CarouselItem = ({ item, index, scrollX, platePulse }: CarouselItemProps) => {
  const rStyle = useAnimatedStyle(() => {
    // Normalise distance from center of the carousel
    const input = (scrollX.value - index * ITEM_WIDTH) / ITEM_WIDTH;

    // Smooth interpolations for scale, rotation and elevation displacement
    const scale = interpolate(input, [-1, 0, 1], [0.65, 1.0, 0.65], Extrapolate.CLAMP);
    const rotateY = interpolate(input, [-1, 0, 1], [40, 0, -40], Extrapolate.CLAMP);
    const translateY = interpolate(input, [-1, 0, 1], [25, 0, 25], Extrapolate.CLAMP);
    const opacity = interpolate(input, [-1, 0, 1], [0.4, 1.0, 0.4], Extrapolate.CLAMP);

    // Apply the active landing pulse if this is the center item
    const baseScale = scale * (index === Math.round(scrollX.value / ITEM_WIDTH) ? platePulse.value : 1);

    return {
      transform: [
        { perspective: 800 },
        { scale: baseScale },
        { rotateY: `${rotateY}deg` },
        { translateY },
      ],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.carouselCard, rStyle]}>
      <View style={styles.plateShadow} />
      <View style={styles.plateContainer}>
        <Text style={styles.plateEmoji}>{item.emoji}</Text>
      </View>
    </Animated.View>
  );
};

// ─── Main Demo Component ──────────────────────────────────────────────────
interface FluidAnimationsDemoProps {
  onBack?: () => void;
}

export default function FluidAnimationsDemo({ onBack }: FluidAnimationsDemoProps) {
  const scrollX = useSharedValue(0);
  
  // Bottom sheet animated states
  const sheetY = useSharedValue(0);
  const sheetOpacity = useSharedValue(1);

  // Plate feedback pulse on ingredient landing
  const platePulse = useSharedValue(1);

  // Shared Element layout transition state
  const [isDetailListOpen, setIsDetailListOpen] = useState(false);
  const listExpandProgress = useSharedValue(0);

  // Particles state for customized ingredient animations
  const [particles, setParticles] = useState<Particle[]>([]);

  // Derived current center item index
  const activeIndex = useDerivedValue(() => {
    return Math.round(scrollX.value / ITEM_WIDTH);
  });

  const activePlate = useDerivedValue(() => {
    const idx = activeIndex.value;
    if (idx >= 0 && idx < PLATES.length) {
      return PLATES[idx];
    }
    return PLATES[0];
  });

  // Track scroll and drive sheet displacement dynamically
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      
      // Calculate how far away we are from a snapped index
      const exactIndex = scrollX.value / ITEM_WIDTH;
      const diff = Math.abs(exactIndex - Math.round(exactIndex));

      // As we scroll, slide bottom panel down slightly and fade out to redirect focus to carousel
      const targetY = interpolate(diff, [0, 0.25], [0, 110], Extrapolate.CLAMP);
      const targetOpacity = interpolate(diff, [0, 0.25], [1.0, 0.45], Extrapolate.CLAMP);

      sheetY.value = withSpring(targetY, { damping: 15, stiffness: 120 });
      sheetOpacity.value = withSpring(targetOpacity, { damping: 15, stiffness: 120 });
    },
  });

  const rSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: sheetY.value }],
      opacity: sheetOpacity.value,
    };
  });

  // Toggle full list screen expansion using spring layout simulation
  const toggleDetailList = (open: boolean) => {
    setIsDetailListOpen(open);
    listExpandProgress.value = withSpring(open ? 1 : 0, {
      damping: 18,
      stiffness: 85,
    });
  };

  const rOverlayStyle = useAnimatedStyle(() => {
    // Morph between collapsed preview card frame and fullscreen bounds
    const width = interpolate(listExpandProgress.value, [0, 1], [SCREEN_WIDTH - 48, SCREEN_WIDTH]);
    const height = interpolate(listExpandProgress.value, [0, 1], [80, SCREEN_HEIGHT]);
    const left = interpolate(listExpandProgress.value, [0, 1], [24, 0]);
    const bottom = interpolate(listExpandProgress.value, [0, 1], [30, 0]);
    const borderRadius = interpolate(listExpandProgress.value, [0, 1], [16, 0]);
    const opacity = interpolate(listExpandProgress.value, [0, 0.01], [0, 1], Extrapolate.CLAMP);

    return {
      width,
      height,
      left,
      bottom,
      borderRadius,
      opacity,
      position: 'absolute',
    };
  });

  // Dynamic customization particle cleanup helper
  const removeParticle = (id: string) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  const triggerPlatePulse = () => {
    platePulse.value = withSequence(
      withSpring(1.15, { damping: 6, stiffness: 150 }),
      withSpring(1.0, { damping: 8 })
    );
  };

  // Spawn an arcing particle from pressed ingredient button to center plate
  const handleIngredientPress = (i: number) => {
    // Approximate coordinate calculation relative to the window
    const btnWidth = (SCREEN_WIDTH - 48) / 5;
    const startX = 24 + i * btnWidth + btnWidth / 2;
    // Position of button layer within the bottom sheet detail panel
    const startY = SCREEN_HEIGHT - 215;

    const progress = useSharedValue(0);
    const particleId = Math.random().toString(36).substring(7);

    const newParticle: Particle = {
      id: particleId,
      emoji: INGREDIENTS[i].emoji,
      startX,
      startY,
      progress,
    };

    setParticles((prev) => [...prev, newParticle]);

    // Animate particle progress with spring-like timing
    progress.value = withTiming(1, { duration: 800 }, (isFinished) => {
      if (isFinished) {
        runOnJS(triggerPlatePulse)();
        runOnJS(removeParticle)(particleId);
      }
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* ─── Carousel Header ─── */}
        <View style={styles.header}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backBtnWrapper} activeOpacity={0.7}>
              <Text style={styles.backBtnText}>← Back to App</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>Select Your Plate</Text>
          <Text style={styles.headerSubtitle}>Swipe to spin and configure details</Text>
        </View>

        {/* ─── 1. Horizontal Carousel with 3D Rotation & Scale ─── */}
        <View style={styles.carouselWrapper}>
          <Animated.FlatList
            horizontal
            data={PLATES}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: SPACER_WIDTH }}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => (
              <CarouselItem
                item={item}
                index={index}
                scrollX={scrollX}
                platePulse={platePulse}
              />
            )}
          />
        </View>

        {/* ─── 2. Expandable Bottom Detail Panel ─── */}
        <Animated.View style={[styles.detailSheet, rSheetStyle]}>
          <View style={styles.sheetHandle} />

          {/* Active Plate Info Header */}
          <Animated.View entering={FadeInDown.duration(300)} style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>
              {PLATES[activeIndex.value]?.name || PLATES[0].name}
            </Text>
            <Text style={styles.sheetCalories}>
              {PLATES[activeIndex.value]?.cal || PLATES[0].cal} • Healthy Choice
            </Text>
            <Text style={styles.sheetDesc} numberOfLines={2}>
              {PLATES[activeIndex.value]?.desc || PLATES[0].desc}
            </Text>
          </Animated.View>

          {/* ─── 4. Dynamic Item Customization (Ingredients Row) ─── */}
          <View style={styles.customizeSection}>
            <Text style={styles.sectionTitle}>Add Extra Ingredients</Text>
            <View style={styles.ingredientsRow}>
              {INGREDIENTS.map((ing, i) => (
                <TouchableOpacity
                  key={ing.id}
                  style={styles.ingredientBtn}
                  activeOpacity={0.7}
                  onPress={() => handleIngredientPress(i)}
                >
                  <View style={styles.ingredientIconContainer}>
                    <Text style={styles.ingredientEmoji}>{ing.emoji}</Text>
                  </View>
                  <Text style={styles.ingredientName}>{ing.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ─── 3. Shared Element Preview Card ─── */}
          <Pressable
            style={styles.previewCard}
            onPress={() => toggleDetailList(true)}
          >
            <View style={styles.previewIconContainer}>
              <Text style={styles.previewIcon}>📋</Text>
            </View>
            <View style={styles.previewTextContainer}>
              <Text style={styles.previewCardTitle}>Full Nutrition & Prep Details</Text>
              <Text style={styles.previewCardSubtitle}>Tap card to expand details list</Text>
            </View>
            <Text style={styles.previewArrow}>→</Text>
          </Pressable>
        </Animated.View>

        {/* ─── Floating Particles Layer ─── */}
        {particles.map((p) => {
          // Inner hook representing each customizer particle trajectory
          const particleAnimatedStyle = useAnimatedStyle(() => {
            const progress = p.progress.value;
            
            // Central coordinates of landing plate center
            const targetX = SCREEN_WIDTH / 2;
            const targetY = 230; 

            // Bezier/Dual-axis curve calculation
            const currentX = p.startX + (targetX - p.startX) * progress;
            const arcHeight = 150;
            const currentY =
              p.startY +
              (targetY - p.startY) * progress -
              arcHeight * Math.sin(Math.PI * progress);

            // Interpolate scaling and fades
            const scale = interpolate(progress, [0, 0.2, 0.8, 1], [0.6, 1.4, 1.0, 0]);
            const opacity = interpolate(progress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

            return {
              position: 'absolute',
              left: currentX - 18,
              top: currentY - 18,
              transform: [{ scale }],
              opacity,
            };
          });

          return (
            <Animated.View
              key={p.id}
              style={[styles.particle, particleAnimatedStyle]}
              pointerEvents="none"
            >
              <Text style={styles.particleEmoji}>{p.emoji}</Text>
            </Animated.View>
          );
        })}

        {/* ─── 3. Full List Overlay Screen (Shared Element Expanded state) ─── */}
        <Animated.View style={[styles.overlayFullscreen, rOverlayStyle]} pointerEvents={isDetailListOpen ? 'auto' : 'none'}>
          {isDetailListOpen && (
            <SafeAreaView style={styles.overlayContent}>
              <View style={styles.overlayHeader}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => toggleDetailList(false)}
                >
                  <Text style={styles.closeBtnText}>← Back to Plates</Text>
                </TouchableOpacity>
                <Text style={styles.overlayMainTitle}>Macro & Prep Report</Text>
              </View>

              <Animated.View entering={FadeInDown.duration(400)} style={styles.overviewCard}>
                <Text style={styles.overlayPlateHeader}>
                  {PLATES[activeIndex.value]?.emoji} {PLATES[activeIndex.value]?.name}
                </Text>
                <Text style={styles.overviewCardText}>
                  Freshly cooked upon order by regional kitchen chefs. Double inspected for standard portion control and premium packaging safety.
                </Text>
              </Animated.View>

              <Text style={styles.expandedSectionHeader}>Staggered Fact Sheet</Text>

              {/* Staggered Vertical List */}
              <FlatList
                data={STAGGER_ITEMS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.expandedListContent}
                renderItem={({ item, index }) => (
                  <Animated.View
                    entering={FadeInUp.delay(index * 100)
                      .springify()
                      .damping(13)
                      .stiffness(90)}
                    style={styles.staggeredItem}
                  >
                    <View style={styles.staggerIconBg}>
                      <Text style={styles.staggerIcon}>{item.emoji}</Text>
                    </View>
                    <View style={styles.staggerTextFrame}>
                      <Text style={styles.staggerLabel}>{item.label}</Text>
                      <Text style={styles.staggerValue}>{item.value}</Text>
                    </View>
                  </Animated.View>
                )}
              />
            </SafeAreaView>
          )}
        </Animated.View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// ─── Styles Config ──────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtnWrapper: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingRight: 16,
    marginBottom: 8,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  carouselWrapper: {
    height: SCREEN_HEIGHT * 0.32,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  carouselCard: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plateShadow: {
    position: 'absolute',
    bottom: 12,
    width: ITEM_WIDTH * 0.75,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    transform: [{ scaleX: 1.2 }],
  },
  plateContainer: {
    width: ITEM_WIDTH * 0.85,
    height: ITEM_WIDTH * 0.85,
    borderRadius: (ITEM_WIDTH * 0.85) / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    // Premium soft elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  plateEmoji: {
    fontSize: ITEM_WIDTH * 0.42,
  },
  detailSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingHorizontal: 24,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 8,
  },
  sheetHandle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#D1D1D6',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    textAlign: 'center',
  },
  sheetCalories: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  sheetDesc: {
    fontSize: 13,
    color: '#636366',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  customizeSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ingredientsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredientBtn: {
    flex: 1,
    alignItems: 'center',
  },
  ingredientIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  ingredientEmoji: {
    fontSize: 20,
  },
  ingredientName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#3A3A3C',
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    position: 'absolute',
    bottom: 30,
    left: 24,
    right: 24,
  },
  previewIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  previewIcon: {
    fontSize: 20,
  },
  previewTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  previewCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  previewCardSubtitle: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
  },
  previewArrow: {
    fontSize: 18,
    color: '#8E8E93',
    fontWeight: '600',
  },
  particle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  particleEmoji: {
    fontSize: 18,
  },
  overlayFullscreen: {
    top: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 9999,
  },
  overlayContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  overlayHeader: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#F2F2F7',
  },
  closeBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingRight: 12,
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
  },
  overlayMainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1C1C1E',
    marginTop: 12,
    letterSpacing: -0.5,
  },
  overviewCard: {
    margin: 24,
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  overlayPlateHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  overviewCardText: {
    fontSize: 12,
    color: '#636366',
    lineHeight: 18,
  },
  expandedSectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8E93',
    paddingHorizontal: 24,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  expandedListContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  staggeredItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F2F2F7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  staggerIconBg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  staggerIcon: {
    fontSize: 18,
  },
  staggerTextFrame: {
    marginLeft: 12,
  },
  staggerLabel: {
    fontSize: 11,
    color: '#8E8E93',
  },
  staggerValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 2,
  },
});
