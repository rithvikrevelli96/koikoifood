import React from 'react';
import { View, Platform, Animated } from 'react-native';
import Svg, { Path, Ellipse, Circle } from 'react-native-svg';
import { Calendar, Heart, ChefHat, ShieldCheck, Sparkles, Leaf, Pause, Lock } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F, Button, Text, PageLayout, InfoCard } from '../../design-system';
import {
  BoyIllustrationSvg,
  DabbasIllustrationSvg,
  FamilyIllustrationSvg
} from '../../core/components/SvgIcons';

export default function OnboardingScreen() {
  const {
    currentScreen,
    go,
    obFade,
    obSlideY,
    obScale,
    obIllusScale,
    obTitleSlideY,
    obTitleFade,
    obDescSlideY,
    obDescFade,
    obChipsFade,
    obBtnSlideY,
    obBtnFade,
    obFloatAnim,
    cardFloat1,
    cardFloat2,
    cardFloat3
  } = useAppContext();

  React.useEffect(() => {
    obFade.setValue(0);
    obSlideY.setValue(40);
    obScale.setValue(0.8);

    obIllusScale.setValue(0.5);
    obTitleSlideY.setValue(20);
    obTitleFade.setValue(0);
    obDescSlideY.setValue(20);
    obDescFade.setValue(0);
    obChipsFade.setValue(0);
    obBtnSlideY.setValue(20);
    obBtnFade.setValue(0);
    obFloatAnim.setValue(0);
    
    cardFloat1.setValue(0);
    cardFloat2.setValue(0);
    cardFloat3.setValue(0);

    Animated.parallel([
      Animated.timing(obFade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.spring(obSlideY, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(obScale, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),

      Animated.sequence([
        Animated.delay(100),
        Animated.spring(obIllusScale, {
          toValue: 1,
          friction: 5,
          tension: 45,
          useNativeDriver: true,
        }),
      ]),

      Animated.sequence([
        Animated.delay(200),
        Animated.parallel([
          Animated.timing(obTitleFade, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(obTitleSlideY, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
      ]),

      Animated.sequence([
        Animated.delay(300),
        Animated.parallel([
          Animated.timing(obDescFade, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(obDescSlideY, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
      ]),

      Animated.sequence([
        Animated.delay(400),
        Animated.timing(obChipsFade, { toValue: 1, duration: 350, useNativeDriver: true }),
      ]),

      Animated.sequence([
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(obBtnFade, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(obBtnSlideY, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
      ]),
    ]).start();

    // Trigger continuous float animation loops
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(obFloatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(obFloatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    floatLoop.start();

    const loop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(cardFloat1, { toValue: 1, duration: 2200, useNativeDriver: true }),
        Animated.timing(cardFloat1, { toValue: 0, duration: 2200, useNativeDriver: true }),
      ])
    );
    const loop2 = Animated.loop(
      Animated.sequence([
        Animated.timing(cardFloat2, { toValue: 1, duration: 2600, useNativeDriver: true }),
        Animated.timing(cardFloat2, { toValue: 0, duration: 2600, useNativeDriver: true }),
      ])
    );
    const loop3 = Animated.loop(
      Animated.sequence([
        Animated.timing(cardFloat3, { toValue: 1, duration: 2400, useNativeDriver: true }),
        Animated.timing(cardFloat3, { toValue: 0, duration: 2400, useNativeDriver: true }),
      ])
    );

    loop1.start();
    loop2.start();
    loop3.start();

    // Autoplay timer: auto-advance every 4.5 seconds
    let nextScreen: any = 'ob1';
    if (currentScreen === 'ob1') nextScreen = 'ob2';
    else if (currentScreen === 'ob2') nextScreen = 'ob3';
    else nextScreen = 'ob1';

    const timer = setTimeout(() => {
      go(nextScreen);
    }, 4500);

    return () => {
      clearTimeout(timer);
      floatLoop.stop();
      loop1.stop();
      loop2.stop();
      loop3.stop();
    };
  }, [currentScreen]);

  const step = currentScreen === 'ob1' ? 1 : currentScreen === 'ob2' ? 2 : 3;

  let title = '';
  let descComponent: React.ReactNode = null;
  let btnText = '';
  let SvgIllustration = BoyIllustrationSvg;

  if (step === 1) {
    title = "Healthy\nHome-Style Meals";
    descComponent = (
      <Text variant="bodyL" color="sub">
        Freshly prepared lunch and dinner cooked every day —{' '}
        <Text variant="bodyL" color="secondary" style={{ fontWeight: '800' }}>
          delivered warm
        </Text>{' '}
        to your doorstep.
      </Text>
    );
    btnText = "Get Started";
    SvgIllustration = BoyIllustrationSvg;
  } else if (step === 2) {
    title = "Fresh Food.\nSteel Dabbas.";
    descComponent = (
      <Text variant="bodyL" color="sub">
        Hygienic meals in reusable steel containers. Zero plastic, maximum freshness, right on time every day.
      </Text>
    );
    btnText = "Continue";
    SvgIllustration = DabbasIllustrationSvg;
  } else {
    title = "Subscribe Once.\nEat Every Day.";
    descComponent = (
      <Text variant="bodyL" color="sub">
        Choose your plan and relax. Pause, skip or resume anytime — complete flexibility, zero stress.
      </Text>
    );
    btnText = "Let's Begin";
    SvgIllustration = FamilyIllustrationSvg;
  }

  const handleNext = () => {
    if (step === 1) go('ob2');
    else if (step === 2) go('ob3');
    else go('auth');
  };

  const floatY = obFloatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12]
  });

  const cardY1 = cardFloat1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12]
  });
  const cardY2 = cardFloat2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8]
  });
  const cardY3 = cardFloat3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -14]
  });

  let card1Data = { label: '', icon: null as React.ReactNode, top: 0, left: -25 };
  let card2Data = { label: '', icon: null as React.ReactNode, top: 45, right: -25 };
  let card3Data = { label: '', icon: null as React.ReactNode, bottom: -10, left: 10 };

  if (step === 1) {
    card1Data.label = "Daily Rotation";
    card1Data.icon = <Calendar size={18} color={theme.colors.secondary} strokeWidth={2} />;
    
    card2Data.label = "Low Salt & Oil";
    card2Data.icon = <Heart size={18} color={theme.colors.secondary} strokeWidth={2} />;

    card3Data.label = "Homestyle Cooking";
    card3Data.icon = <ChefHat size={18} color={theme.colors.secondary} strokeWidth={2} />;
  } else if (step === 2) {
    card1Data.label = "Food-Grade Steel";
    card1Data.icon = <ShieldCheck size={18} color={theme.colors.secondary} strokeWidth={2} />;

    card2Data.label = "Thermal Sanitized";
    card2Data.icon = <Sparkles size={18} color={theme.colors.secondary} strokeWidth={2} />;

    card3Data.label = "Zero Plastic";
    card3Data.icon = <Leaf size={18} color={theme.colors.secondary} strokeWidth={2} />;
  } else {
    card1Data.label = "Pause Anytime";
    card1Data.icon = <Pause size={18} color={theme.colors.secondary} strokeWidth={2} />;

    card2Data.label = "Custom Portions";
    card2Data.icon = <Sparkles size={18} color={theme.colors.secondary} strokeWidth={2} />;

    card3Data.label = "No Lock-ins";
    card3Data.icon = <Lock size={18} color={theme.colors.secondary} strokeWidth={2} />;
  }

  return (
    <PageLayout style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: '100%', height: '100%', flex: 1 }}>
        {/* Floating Green Decorative Leaves */}
        <View style={{ 
          position: 'absolute', 
          top: 220, 
          right: 35, 
          opacity: 0.65, 
          transform: [{ rotate: '45deg' }],
          zIndex: 1
        }} pointerEvents="none">
          <Svg width={18} height={18} viewBox="0 0 20 20" fill="none">
            <Path d="M2 18 C6 10, 14 12, 18 2 C10 10, 10 14, 2 18 Z" fill="#7FA457" />
          </Svg>
        </View>

        <View style={{ 
          position: 'absolute', 
          top: 400, 
          right: 55, 
          opacity: 0.55, 
          transform: [{ rotate: '-30deg' }],
          zIndex: 1
        }} pointerEvents="none">
          <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
            <Path d="M2 18 C6 10, 14 12, 18 2 C10 10, 10 14, 2 18 Z" fill="#6A8E49" />
          </Svg>
        </View>

        <View style={{ 
          position: 'absolute', 
          top: 220, 
          left: 30, 
          opacity: 0.75,
          zIndex: 1
        }} pointerEvents="none">
          <Svg width={8} height={8} viewBox="0 0 10 10">
            <Ellipse cx={5} cy={5} rx={3} ry={4} fill="#C69E7C" transform="rotate(30 5 5)" />
          </Svg>
        </View>

        <View style={{ position: 'absolute', top: '35%', left: 12, opacity: 0.08 }} pointerEvents="none">
          <Svg width={40} height={120} viewBox="0 0 20 60" fill="none" stroke="#FD5F20" strokeWidth={1}>
            <Path d="M10 2 L10 10 M8 10 L12 10 L12 50 L8 50 Z M10 50 L10 58" />
          </Svg>
        </View>

        <View style={{ position: 'absolute', top: '30%', right: 12, opacity: 0.08 }} pointerEvents="none">
          <Svg width={65} height={65} viewBox="0 0 40 40" fill="none" stroke="#FD5F20" strokeWidth={1}>
            <Path d="M 6 18 L 34 18 L 32 32 C 32 34, 8 34, 8 32 Z" />
            <Path d="M 4 18 C 4 18, 20 12, 36 18" />
            <Path d="M 20 12 L 20 9" />
            <Circle cx={20} cy={8} r={1.5} />
            <Path d="M 4 22 L 2 22 C 1 22, 1 20, 2 20 L 4 20" />
            <Path d="M 36 22 L 38 22 C 39 22, 39 20, 38 20 L 36 20" />
          </Svg>
        </View>

        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: 105 }}>

          <Animated.View style={{ 
            flex: 1.5,
            justifyContent: 'center', 
            alignItems: 'center', 
            opacity: obFade,
            transform: [
              { translateY: floatY },
              { scale: obScale }
            ],
            marginVertical: 20,
            position: 'relative',
            width: 280,
            height: 280,
            alignSelf: 'center',
          }}>
            <SvgIllustration />

            <Animated.View style={{
              position: 'absolute',
              top: card1Data.top,
              left: card1Data.left,
              transform: [{ translateY: cardY1 }],
            }}>
              <InfoCard style={{ paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center', gap: 6 }}>
                <Text variant="label" color="text" style={{ letterSpacing: 0.2 }}>{card1Data.label}</Text>
                {card1Data.icon}
              </InfoCard>
            </Animated.View>

            <Animated.View style={{
              position: 'absolute',
              top: card2Data.top,
              right: card2Data.right,
              transform: [{ translateY: cardY2 }],
            }}>
              <InfoCard style={{ paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center', gap: 6 }}>
                <Text variant="label" color="text" style={{ letterSpacing: 0.2 }}>{card2Data.label}</Text>
                {card2Data.icon}
              </InfoCard>
            </Animated.View>

            <Animated.View style={{
              position: 'absolute',
              bottom: card3Data.bottom,
              left: card3Data.left,
              transform: [{ translateY: cardY3 }],
            }}>
              <InfoCard style={{ paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center', gap: 6 }}>
                <Text variant="label" color="text" style={{ letterSpacing: 0.2 }}>{card3Data.label}</Text>
                {card3Data.icon}
              </InfoCard>
            </Animated.View>
          </Animated.View>

          <View style={{ width: '100%', alignItems: 'flex-start', paddingHorizontal: 28, marginVertical: 15, gap: 12 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 4 }}>
              {[1, 2, 3].map(i => {
                const isActive = i === step;
                return (
                  <View
                    key={i}
                    style={{
                      width: isActive ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: isActive ? theme.colors.primary : '#BDB8AE',
                    }}
                  />
                );
              })}
            </View>

            <Animated.View style={{
              opacity: obTitleFade,
              transform: [{ translateY: obTitleSlideY }],
            }}>
              <Text variant="headingL" color="text" style={{ textAlign: 'left', lineHeight: Platform.OS === 'ios' ? 44 : 41 }}>
                {title}
              </Text>
            </Animated.View>
            
            <Animated.View style={{
              opacity: obDescFade,
              transform: [{ translateY: obDescSlideY }],
            }}>
              <View style={{ marginTop: 2 }}>
                {descComponent}
              </View>
            </Animated.View>
          </View>

          <View style={{ paddingHorizontal: 24, gap: 10, marginTop: 10, zIndex: 20 }}>
            <Button 
              title={btnText + (step === 1 ? '   →' : '')}
              onPress={handleNext}
            />
          </View>
        </View>
      </View>
    </PageLayout>
  );
}
