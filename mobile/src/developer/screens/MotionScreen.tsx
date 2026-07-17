import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Animated, Easing } from 'react-native';
import { ArrowLeft, Play } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme, Button, Card, Checkbox } from '../../design-system';

interface MotionScreenProps {
  onBack: () => void;
}

export default function MotionScreen({ onBack }: MotionScreenProps) {
  const { setToast, t } = useAppContext();
  const [slowMo, setSlowMo] = useState(false);

  // Animated Values
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const fadeScaleAnim = useRef(new Animated.Value(0)).current;
  const cardLiftAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const durationMult = slowMo ? 4 : 1;

  const playBounce = () => {
    bounceAnim.setValue(1);
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 0.85,
        duration: 100 * durationMult,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const playTransition = () => {
    fadeScaleAnim.setValue(0);
    Animated.parallel([
      Animated.timing(fadeScaleAnim, {
        toValue: 1,
        duration: 350 * durationMult,
        easing: Easing.out(Easing.back(1)),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const playCardLift = () => {
    const isLifted = (cardLiftAnim as any)._value === 1;
    Animated.timing(cardLiftAnim, {
      toValue: isLifted ? 0 : 1,
      duration: 200 * durationMult,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => setToast(isLifted ? 'Card Lowered' : 'Card Lifted'));
  };

  const playShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60 * durationMult, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60 * durationMult, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 60 * durationMult, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60 * durationMult, useNativeDriver: true }),
    ]).start();
  };

  // Card Lift Styles
  const liftScale = cardLiftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.04],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Motion & Durations</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Slow Motion Control */}
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <View style={{ flex: 1, marginRight: 16 }}>
            <Text style={{ fontFamily: F.heading, fontSize: 14, fontWeight: '700', color: t.text }}>Slow Motion Mode</Text>
            <Text style={{ fontFamily: F.body, fontSize: 11, color: t.sub, marginTop: 2 }}>
              Slows down animations by 4x to audit timings, ease-outs, and springs.
            </Text>
          </View>
          <Checkbox label="" checked={slowMo} onPress={() => setSlowMo(!slowMo)} />
        </View>

        {/* Timeline Specs */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>ANIMATION DURATIONS SPEC</Text>
        <View style={[styles.listContainer, { borderColor: t.border, backgroundColor: t.card }]}>
          {[
            { name: 'Card Lift Spring', val: '200ms', desc: 'Spring config (friction: 4, tension: 40)' },
            { name: 'Page Transition', val: '350ms', desc: 'Easing out back curve' },
            { name: 'Shake Animation', val: '240ms', desc: 'Linear sequence of offset timings' },
            { name: 'Feedback Alerts', val: '3000ms', desc: 'Auto-dismissing toast fade-out' },
          ].map((item, idx) => (
            <View key={item.name} style={[styles.listItem, idx > 0 && { borderTopWidth: 1, borderTopColor: t.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: t.text }}>{item.name}</Text>
                <Text style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>{item.desc}</Text>
              </View>
              <Text style={{ fontFamily: F.mono, fontSize: 12, fontWeight: '700', color: B.orange }}>{item.val}</Text>
            </View>
          ))}
        </View>

        {/* Interactive Playgrounds */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 24 }]}>MOTION PLAYGROUNDS</Text>
        <View style={{ gap: 16 }}>
          {/* Button Bounce */}
          <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontFamily: F.heading, fontSize: 14, fontWeight: '700', color: t.text }}>Button Press Bounce</Text>
              <TouchableOpacity onPress={playBounce} style={styles.playBtn}>
                <Play size={14} color="#FFFFFF" />
                <Text style={styles.playBtnText}>Play</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', paddingVertical: 10 }}>
              <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
                <Button title="Mock Press Target" onPress={playBounce} />
              </Animated.View>
            </View>
          </View>

          {/* Page Transition */}
          <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontFamily: F.heading, fontSize: 14, fontWeight: '700', color: t.text }}>Page Transition Scale</Text>
              <TouchableOpacity onPress={playTransition} style={styles.playBtn}>
                <Play size={14} color="#FFFFFF" />
                <Text style={styles.playBtnText}>Play</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 120, justifyContent: 'center', alignItems: 'center', backgroundColor: t.input, borderRadius: 16, overflow: 'hidden' }}>
              <Animated.View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 14,
                  backgroundColor: B.orange,
                  opacity: fadeScaleAnim,
                  transform: [
                    {
                      scale: fadeScaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                }}
              />
            </View>
          </View>

          {/* Card Lift */}
          <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontFamily: F.heading, fontSize: 14, fontWeight: '700', color: t.text }}>Card Spring Lift</Text>
              <TouchableOpacity onPress={playCardLift} style={styles.playBtn}>
                <Play size={14} color="#FFFFFF" />
                <Text style={styles.playBtnText}>Toggle</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', paddingVertical: 14 }}>
              <Animated.View style={{ width: '90%', transform: [{ scale: liftScale }] }}>
                <Card style={{ padding: 16, borderWidth: 1.5, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15 }}>
                  <Text style={{ fontFamily: F.heading, fontSize: 14, fontWeight: '700', color: t.text }}>Card Target</Text>
                  <Text style={{ fontFamily: F.body, fontSize: 11, color: t.sub, marginTop: 4 }}>
                    Spring scaling animation mimics elevation cards lift.
                  </Text>
                </Card>
              </Animated.View>
            </View>
          </View>

          {/* Error Shake */}
          <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontFamily: F.heading, fontSize: 14, fontWeight: '700', color: t.text }}>Error Shaking</Text>
              <TouchableOpacity onPress={playShake} style={styles.playBtn}>
                <Play size={14} color="#FFFFFF" />
                <Text style={styles.playBtnText}>Play</Text>
              </TouchableOpacity>
            </View>
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
              <View style={{ height: 50, borderWidth: 1.5, borderColor: theme.colors.error, borderRadius: 12, backgroundColor: '#FEF2F2', paddingHorizontal: 16, justifyContent: 'center' }}>
                <Text style={{ color: theme.colors.error, fontWeight: '700', fontSize: 13 }}>❌ Validation Error State</Text>
              </View>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginLeft: 12,
    marginBottom: 8,
  },
  listContainer: {
    borderWidth: 1.5,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: B.orange,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  playBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
});
