import React from 'react';
import { View, Platform, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, Flame, Award, GlassWater, Activity, Scale, Compass, CheckCircle2, Moon } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { ProgressRing } from '../../core/components/Common';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  InfoCard,
  HeroCard
} from '../../design-system';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function HealthInfoScreen() {
  const { user, back, setToast, t, calorieCalc } = useAppContext();

  // Metric Calculation Logic
  const weight = user.weight || 72;
  const height = user.height || 178;
  const heightM = height / 100;
  const bmiVal = parseFloat((weight / (heightM * heightM)).toFixed(1));
  
  let bmiStatus = 'Optimal';
  let bmiColor = t.primary;
  if (bmiVal < 18.5) {
    bmiStatus = 'Underweight';
    bmiColor = t.accent;
  } else if (bmiVal >= 25 && bmiVal < 30) {
    bmiStatus = 'Overweight';
    bmiColor = t.secondary;
  } else if (bmiVal >= 30) {
    bmiStatus = 'Obese';
    bmiColor = t.secondary;
  }

  const recommendations = [
    { title: 'Increase Hydration', text: 'You need 0.6 L more water to hit your daily cellular hydration goal. Sip slowly between meals.' },
    { title: 'Optimal Protein Synthesis', text: 'With 82g consumed out of 120g, try adding the high-protein paneer side-dish in dinner.' },
    { title: 'Pre-bed Winddown', text: 'To achieve your sleep target, disconnect screen displays 45 minutes prior to your 10:00 PM sleep slot.' }
  ];

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
        <Text style={[styles.headerTitle, { color: t.primary }]}>Today's Health</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION - HEALTH SCORE */}
        <View style={styles.heroSection}>
          <HeroCard style={[styles.scoreHeroCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={styles.scoreHeaderRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.scoreSubLabel, { color: t.secondary }]}>METRIC INDEX</Text>
                <Text style={[styles.scoreTitle, { color: t.text }]}>Health Score</Text>
                <Text style={[styles.scoreDesc, { color: t.sub }]}>Your overall metabolic & activity wellness score is calculated daily.</Text>
              </View>
              <ProgressRing pct={84} size={88} strokeW={7} color={t.primary} label="84" theme={t} />
            </View>

            <View style={styles.scoreBadgeRow}>
              <View style={[styles.onTrackChip, { backgroundColor: t.elevated, borderColor: t.border }]}>
                <CheckCircle2 size={12} color={t.primary} style={{ marginRight: 4 }} />
                <Text style={[styles.onTrackText, { color: t.primary }]}>88% Goals Completed</Text>

              </View>
              <Text style={styles.tierText}>⭐ Gold Level Tracker</Text>
            </View>
          </HeroCard>
        </View>

        {/* NUTRITION METRICS (CALORIES & PROTEIN) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Nutrition Status</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            {/* Calories Card */}
            <Card style={[styles.metricCard, { flex: 1 }]}>
              <View style={styles.metricCardHeader}>
                <Flame size={16} color="#C96B3C" />
                <Text style={styles.metricCardTitle}>Calories</Text>
              </View>
              <Text style={styles.metricCardVal}>1,450</Text>
              <Text style={styles.metricCardLimit}>/ {calorieCalc?.target || 2100} kcal</Text>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: '69%', backgroundColor: '#C96B3C' }]} />
              </View>
            </Card>

            {/* Protein Card */}
            <Card style={[styles.metricCard, { flex: 1 }]}>
              <View style={styles.metricCardHeader}>
                <Award size={16} color="#4B5D3A" />
                <Text style={styles.metricCardTitle}>Protein</Text>
              </View>
              <Text style={styles.metricCardVal}>82g</Text>
              <Text style={styles.metricCardLimit}>/ {calorieCalc?.protein || 120} g</Text>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: '68%', backgroundColor: '#4B5D3A' }]} />
              </View>
            </Card>
          </View>
        </View>

        {/* WATER & SLEEP CARDS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Vitals & Habits</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            {/* Water Hydration */}
            <Card style={[styles.metricCard, { flex: 1 }]}>
              <View style={styles.metricCardHeader}>
                <GlassWater size={16} color="#4B5D3A" />
                <Text style={styles.metricCardTitle}>Water</Text>
              </View>
              <Text style={styles.metricCardVal}>2.4L</Text>
              <Text style={styles.metricCardLimit}>/ 3.0 Liters</Text>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: '80%', backgroundColor: '#4B5D3A' }]} />
              </View>
            </Card>

            {/* Sleep Target */}
            <Card style={[styles.metricCard, { flex: 1 }]}>
              <View style={styles.metricCardHeader}>
                <Moon size={16} color="#C96B3C" />
                <Text style={styles.metricCardTitle}>Sleep</Text>
              </View>
              <Text style={styles.metricCardVal}>8.0 hrs</Text>
              <Text style={styles.metricCardLimit}>10:00 PM – 6:00 AM</Text>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: '100%', backgroundColor: '#C96B3C' }]} />
              </View>
            </Card>
          </View>
        </View>

        {/* BMI & WEIGHT PROGRESS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Body Mass Index & Weight</Text>
          <InfoCard style={styles.bmiCard}>
            <View style={styles.bmiHeader}>
              <View>
                <Text style={styles.bmiTitle}>BMI Score: {bmiVal}</Text>
                <Text style={[styles.bmiStatusText, { color: bmiColor }]}>{bmiStatus}</Text>
              </View>
              <View style={styles.bmiScaleCircle}>
                <Text style={styles.scaleCircleText}>{bmiVal}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />

            <View style={styles.weightProgressRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.weightLabel}>Current Weight</Text>
                <Text style={styles.weightValue}>{user.weight || 74} kg</Text>
              </View>
              <View style={styles.verticalDivider} />
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.weightLabel}>Goal Weight</Text>
                <Text style={styles.weightValue}>{user.goalWeight || 70} kg</Text>
              </View>
            </View>

            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: '92%', backgroundColor: '#4B5D3A' }]} />
            </View>
            <Text style={styles.progressSubText}>92% towards goal (4 kg remaining)</Text>
          </InfoCard>
        </View>

        {/* RECOMMENDATIONS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <View style={{ gap: 12 }}>
            {recommendations.map((rec, index) => (
              <Card key={index} style={styles.recCard}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <Compass size={16} color="#C96B3C" />
                  <Text style={styles.recTitle}>{rec.title}</Text>
                </View>
                <Text style={styles.recText}>{rec.text}</Text>
              </Card>
            ))}
          </View>
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
  },
  scoreHeroCard: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  scoreHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreSubLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#8A857B',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scoreTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 24,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 2,
  },
  scoreDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#8A857B',
    marginTop: 6,
    lineHeight: 16,
    paddingRight: 12,
  },
  scoreBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E2D8',
    paddingTop: 14,
  },
  onTrackChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(75, 93, 58, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  onTrackText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#4B5D3A',
    fontWeight: '700',
  },
  tierText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#8A857B',
    fontWeight: '700',
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.screenHorizontal,
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    color: '#1F1F1F',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  metricCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  metricCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricCardTitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#8A857B',
    fontWeight: '700',
  },
  metricCardVal: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 26,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 10,
  },
  metricCardLimit: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
    marginTop: 2,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E8E2D8',
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  bmiCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  bmiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bmiTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 16,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  bmiStatusText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 2,
  },
  bmiScaleCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FCFAF6',
    borderWidth: 1.5,
    borderColor: '#E8E2D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scaleCircleText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '800',
  },
  weightProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 14,
  },
  weightLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
  },
  weightValue: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 16,
    color: '#1F1F1F',
    fontWeight: '700',
    marginTop: 4,
  },
  verticalDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E8E2D8',
  },
  progressSubText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#8A857B',
    marginTop: 6,
    textAlign: 'center',
  },
  recCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  recTitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  recText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E2D8',
    marginVertical: 12,
  },
});
