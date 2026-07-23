import React, { useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react-native';
import { useAppContext } from '../../../app/context';
import { ProgressRing } from '../../../core/components/Common';
import {
  theme,
  Text,
  Button,
  Input,
  PageLayout,
  ScrollableLayout,
  Modal,
  Card
} from '../../../design-system';
import { validateField } from '../utils/validation';
import { StepIndicator } from './StepIndicator';

export function SetupStep3() {
  const {
    user,
    setUser,
    go,
    back,
    setToast,
    setup3SubPage,
    setSetup3SubPage,
    goalWeight,
    setGoalWeight,
    workoutFrequency,
    setWorkoutFrequency,
    workoutTypes,
    setWorkoutTypes,
    primaryGoal,
    setPrimaryGoal,
    goalSpeed,
    setGoalSpeed,
    motivation,
    setMotivation,
    allergiesList,
    setAllergiesList,
    healthConditions,
    setHealthConditions,
    foodDislikes,
    setFoodDislikes,
    waterIntakeGoal,
    setWaterIntakeGoal,
    customWaterIntake,
    setCustomWaterIntake,
    bedtime,
    setBedtime,
    wakeupTime,
    setWakeupTime,
    smartNotifications,
    setSmartNotifications,
    connectedHealthApps,
    setConnectedHealthApps,
    selectedAddress,
    addressDetails,
  } = useAppContext();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleFieldChange = (field: string, val: string, updateState: (v: string) => void) => {
    updateState(val);
    if (touched[field]) {
      const errMsg = validateField(field, val);
      if (errMsg) {
        setErrors(prev => ({ ...prev, [field]: errMsg }));
      } else {
        setErrors(prev => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    }
  };

  const handleFieldBlur = (field: string, val: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errMsg = validateField(field, val);
    if (errMsg) {
      setErrors(prev => ({ ...prev, [field]: errMsg }));
    }
  };

  const calculateSleepHours = (bed: string, wake: string) => {
    try {
      const [bedH, bedM] = bed.split(':').map(Number);
      const [wakeH, wakeM] = wake.split(':').map(Number);
      if (isNaN(bedH) || isNaN(bedM) || isNaN(wakeH) || isNaN(wakeM)) return "8 hours";
      
      let diffMins = (wakeH * 60 + wakeM) - (bedH * 60 + bedM);
      if (diffMins < 0) diffMins += 24 * 60;
      const hrs = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return mins > 0 ? `${hrs}h ${mins}m` : `${hrs} hours`;
    } catch {
      return "8 hours";
    }
  };

  const handleSetup3Back = () => {
    if (setup3SubPage > 1) {
      setSetup3SubPage(setup3SubPage - 1);
    } else {
      setShowDiscardModal(true);
    }
  };

  const handleSetup3Next = () => {
    if (setup3SubPage === 1) {
      const e1 = validateField('height', user.height);
      const e2 = validateField('weight', user.weight);
      const e3 = validateField('goalWeight', goalWeight);

      const newErrors: Record<string, string> = {};
      if (e1) newErrors.height = e1;
      if (e2) newErrors.weight = e2;
      if (e3) newErrors.goalWeight = e3;

      setErrors(newErrors);
      setTouched({ height: true, weight: true, goalWeight: true });

      if (Object.keys(newErrors).length > 0) {
        return;
      }
      setErrors({});
      setTouched({});
      setSetup3SubPage(2);
    } else if (setup3SubPage === 2) {
      setSetup3SubPage(3);
    } else if (setup3SubPage === 3) {
      setSetup3SubPage(4);
    } else if (setup3SubPage === 4) {
      const e1 = validateField('bedtime', bedtime);
      const e2 = validateField('wakeupTime', wakeupTime);
      const showCustomWater = waterIntakeGoal === 'Custom';
      const e3 = showCustomWater ? validateField('customWater', customWaterIntake) : '';

      const newErrors: Record<string, string> = {};
      if (e1) newErrors.bedtime = e1;
      if (e2) newErrors.wakeupTime = e2;
      if (e3) newErrors.customWater = e3;

      setErrors(newErrors);
      setTouched({ bedtime: true, wakeupTime: true, customWater: showCustomWater });

      if (Object.keys(newErrors).length > 0) {
        return;
      }

      setUser((prev: any) => ({
        ...prev,
        goalWeight: goalWeight,
        activityLevel: user.activityLevel,
        workoutFrequency: workoutFrequency,
        workoutTypes: workoutTypes,
        healthGoal: primaryGoal,
        goalSpeed: goalSpeed,
        motivation: motivation,
        allergies: allergiesList.length > 0 ? allergiesList.join(', ') : 'None',
        healthConditions: healthConditions,
        foodDislikes: foodDislikes,
        waterIntakeGoal: waterIntakeGoal === 'Custom' ? customWaterIntake + ' L' : waterIntakeGoal,
        bedtime: bedtime,
        wakeupTime: wakeupTime,
        sleepHours: calculateSleepHours(bedtime, wakeupTime),
        smartNotifications: smartNotifications,
        connectedHealthApps: connectedHealthApps
      }));
      setErrors({});
      setTouched({});
      setSetup3SubPage(5);
    } else {
      setUser((prev: any) => ({ ...prev, healthCompleted: true }));
      setToast("🎉 Health & meal preferences onboarding completed successfully!");
      setErrors({});
      setTouched({});
      go('plans');
    }
  };

  const toggleWorkoutType = (type: string) => {
    setWorkoutTypes((prev: any) => 
      prev.includes(type) ? prev.filter((t: any) => t !== type) : [...prev, type]
    );
  };

  const toggleAllergy = (allergy: string) => {
    setAllergiesList((prev: any) => 
      prev.includes(allergy) ? prev.filter((a: any) => a !== allergy) : [...prev, allergy]
    );
  };

  const toggleCondition = (cond: string) => {
    if (cond === 'None') {
      setHealthConditions(['None']);
      return;
    }
    setHealthConditions((prev: any) => {
      const filtered = prev.filter((x: any) => x !== 'None');
      return filtered.includes(cond) ? filtered.filter((x: any) => x !== cond) : [...filtered, cond];
    });
  };

  const toggleDislike = (dislike: string) => {
    setFoodDislikes((prev: any) => 
      prev.includes(dislike) ? prev.filter((d: any) => d !== dislike) : [...prev, dislike]
    );
  };

  const toggleHealthApp = (app: string) => {
    setConnectedHealthApps((prev: any) => 
      prev.includes(app) ? prev.filter((a: any) => a !== app) : [...prev, app]
    );
  };

  // BMI calculations
  const w = parseFloat(user.weight) || 74;
  const h = (parseFloat(user.height) || 178) / 100;
  const bmiVal = Math.round((w / (h * h)) * 10) / 10;

  let bmiStatus = 'Normal Weight';
  let bmiColor = theme.colors.success;
  
  if (bmiVal < 18.5) {
    bmiStatus = 'Underweight';
    bmiColor = theme.colors.warning;
  } else if (bmiVal >= 25 && bmiVal < 30) {
    bmiStatus = 'Overweight';
    bmiColor = theme.colors.error;
  } else if (bmiVal >= 30) {
    bmiStatus = 'Obese';
    bmiColor = theme.colors.error;
  }

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="onboarding">
      <ScrollableLayout contentContainerStyle={{ paddingHorizontal: theme.spacing.xxl, paddingVertical: theme.spacing.xl }}>
        
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md }}>
          <Button
            onlyIcon
            variant="ghost"
            size="medium"
            onPress={handleSetup3Back}
            iconLeft={<ArrowLeft size={16} color={theme.colors.light.text} />}
          />
          <View style={{ alignItems: 'flex-end' }}>
            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 0.5 }}>STEP 3 OF 3</Text>
            <Text variant="label" color="muted" style={{ fontWeight: 'bold' }}>Page {setup3SubPage} of 5</Text>
          </View>
        </View>

        <StepIndicator currentStep={3} />

        <View style={{ marginTop: 8 }} />

        {/* SUBPAGE 1 */}
        {setup3SubPage === 1 && (
          <View style={{ gap: theme.spacing.lg }}>
            <View>
              <Text variant="title" color="primary">Body & Fitness Profile</Text>
              <Text variant="caption" color="sub" style={{ marginTop: 4 }}>Understand your physical measurements and daily activity.</Text>
            </View>

            <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2 }}>PHYSICAL MEASUREMENTS</Text>

            <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
              <Input
                label="HEIGHT (CM)"
                required
                value={user.height}
                onChangeText={val => setUser((prev: any) => ({ ...prev, height: val.replace(/[^0-9.]/g, '') }))}
                onBlur={() => handleFieldBlur('height', user.height)}
                placeholder="e.g. 172"
                error={errors.height}
                keyboardType="numeric"
                containerStyle={{ flex: 1 }}
              />

              <Input
                label="WEIGHT (KG)"
                required
                value={user.weight}
                onChangeText={val => setUser((prev: any) => ({ ...prev, weight: val.replace(/[^0-9.]/g, '') }))}
                onBlur={() => handleFieldBlur('weight', user.weight)}
                placeholder="e.g. 68"
                error={errors.weight}
                keyboardType="numeric"
                containerStyle={{ flex: 1 }}
              />

              <Input
                label="GOAL WEIGHT"
                required
                value={goalWeight}
                onChangeText={val => setGoalWeight(val.replace(/[^0-9.]/g, ''))}
                onBlur={() => handleFieldBlur('goalWeight', goalWeight)}
                placeholder="e.g. 65"
                error={errors.goalWeight}
                keyboardType="numeric"
                containerStyle={{ flex: 1 }}
              />
            </View>

            {/* BMI Banner */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.colors.light.surface,
              borderWidth: 1.5,
              borderColor: theme.colors.light.border,
              borderRadius: theme.radius.medium,
              padding: theme.spacing.md,
              gap: theme.spacing.md,
            }}>
              <ProgressRing pct={70} size={60} strokeW={5} color={bmiColor} label={String(bmiVal)} theme={theme.colors.light} />
              <View style={{ flex: 1 }}>
                <Text variant="body" color="primary" style={{ fontWeight: 'bold' }}>{bmiStatus} (BMI: {bmiVal})</Text>
                <Text variant="caption" color="sub" style={{ marginTop: 2 }}>Your recommended daily calorie intake dynamically adapts to this target.</Text>
              </View>
            </View>

            {/* Activity Level */}
            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>DAILY ACTIVITY LEVEL</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Athlete'].map(level => {
                  const isSel = user.activityLevel === level;
                  return (
                    <Button
                      key={level}
                      title={level}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => setUser((prev: any) => ({ ...prev, activityLevel: level }))}
                    />
                  );
                })}
              </View>
            </View>

            {/* Exercise Frequency */}
            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>WORKOUT FREQUENCY</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Never', '1–2 days/week', '3–4 days/week', '5–6 days/week', 'Daily'].map(freq => {
                  const isSel = workoutFrequency === freq;
                  return (
                    <Button
                      key={freq}
                      title={freq}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => setWorkoutFrequency(freq)}
                    />
                  );
                })}
              </View>
            </View>

            {/* Workout Type */}
            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>WORKOUT TYPE (MULTI-SELECT)</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Walking', 'Running', 'Gym', 'Yoga', 'Cycling', 'Swimming', 'Home Workout', 'Strength Training', 'Sports', 'Other'].map(type => {
                  const isSel = workoutTypes.includes(type);
                  return (
                    <Button
                      key={type}
                      title={type}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => toggleWorkoutType(type)}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {/* SUBPAGE 2 */}
        {setup3SubPage === 2 && (
          <View style={{ gap: theme.spacing.lg }}>
            <View>
              <Text variant="title" color="primary">Health Goals</Text>
              <Text variant="caption" color="sub" style={{ marginTop: 4 }}>Select your primary targets and motivations.</Text>
            </View>

            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>PRIMARY FITNESS GOAL</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Lose Weight', 'Gain Weight', 'Build Muscle', 'Maintain Weight', 'Eat Healthy', 'Improve Energy', 'Improve Fitness'].map(goal => {
                  const isSel = primaryGoal === goal;
                  return (
                    <Button
                      key={goal}
                      title={goal}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => setPrimaryGoal(goal)}
                    />
                  );
                })}
              </View>
            </View>

            {(primaryGoal === 'Lose Weight' || primaryGoal === 'Gain Weight') && (
              <View>
                <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>GOAL SPEED (WEIGHT CHANGE / WEEK)</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {['Slow (0.25 kg/week)', 'Moderate (0.5 kg/week)', 'Fast (0.75 kg/week)', 'Extreme (1 kg/week)'].map(speed => {
                    const isSel = goalSpeed === speed || (speed.includes(goalSpeed) && goalSpeed.length > 0);
                    return (
                      <Button
                        key={speed}
                        title={speed}
                        variant={isSel ? 'primary' : 'outline'}
                        size="small"
                        fullWidth={false}
                        onPress={() => setGoalSpeed(speed)}
                      />
                    );
                  })}
                </View>
              </View>
            )}

            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>WHAT MOTIVATES YOU?</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {[
                  'Live a Healthier Lifestyle',
                  "Doctor's Recommendation",
                  'Build Muscle',
                  'Weight Loss',
                  'Better Energy',
                  'Improve Sports Performance',
                  'Wedding/Event',
                  'Other'
                ].map(mote => {
                  const isSel = motivation === mote;
                  return (
                    <Button
                      key={mote}
                      title={mote}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => setMotivation(mote)}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {/* SUBPAGE 3 */}
        {setup3SubPage === 3 && (
          <View style={{ gap: theme.spacing.lg }}>
            <View>
              <Text variant="title" color="primary">Food & Health Preferences</Text>
              <Text variant="caption" color="sub" style={{ marginTop: 4 }}>Personalize your meals and list safety/allergen rules.</Text>
            </View>

            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>DIETARY PREFERENCE</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan'].map(pref => {
                  const isSel = user.foodPref === pref || (pref === 'Vegetarian' && user.foodPref === 'Veg') || (pref === 'Non-Vegetarian' && user.foodPref === 'Non-Veg');
                  return (
                    <Button
                      key={pref}
                      title={pref}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => setUser((prev: any) => ({ ...prev, foodPref: pref }))}
                    />
                  );
                })}
              </View>
            </View>

            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>FOOD ALLERGIES (MULTI-SELECT)</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Dairy', 'Eggs', 'Peanuts', 'Tree Nuts', 'Gluten', 'Soy', 'Seafood', 'Shellfish', 'Sesame', 'Other'].map(allergy => {
                  const isSel = allergiesList.includes(allergy);
                  return (
                    <Button
                      key={allergy}
                      title={allergy}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => toggleAllergy(allergy)}
                    />
                  );
                })}
              </View>
            </View>

            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>HEALTH CONDITIONS (OPTIONAL / MULTI-SELECT)</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Diabetes', 'High Blood Pressure', 'Thyroid', 'PCOS', 'High Cholesterol', 'Kidney Disease', 'Fatty Liver', 'Heart Disease', 'None'].map(cond => {
                  const isSel = healthConditions.includes(cond);
                  return (
                    <Button
                      key={cond}
                      title={cond}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => toggleCondition(cond)}
                    />
                  );
                })}
              </View>
            </View>

            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>FOOD DISLIKES (MULTI-SELECT)</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Onion', 'Garlic', 'Mushroom', 'Paneer', 'Fish', 'Chicken', 'Spicy Food', 'Bitter Foods', 'Other'].map(dislike => {
                  const isSel = foodDislikes.includes(dislike);
                  return (
                    <Button
                      key={dislike}
                      title={dislike}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => toggleDislike(dislike)}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {/* SUBPAGE 4 */}
        {setup3SubPage === 4 && (
          <View style={{ gap: theme.spacing.lg }}>
            <View>
              <Text variant="title" color="primary">Healthy Lifestyle</Text>
              <Text variant="caption" color="sub" style={{ marginTop: 4 }}>Habit configuration and tracking integrations.</Text>
            </View>

            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>DAILY WATER INTAKE GOAL</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['2 L', '2.5 L', '3 L', 'Custom'].map(goal => {
                  const isSel = waterIntakeGoal === goal;
                  return (
                    <Button
                      key={goal}
                      title={goal}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => setWaterIntakeGoal(goal)}
                    />
                  );
                })}
              </View>

              {waterIntakeGoal === 'Custom' && (
                <View style={{ marginTop: theme.spacing.md }}>
                  <Input
                    label="CUSTOM WATER INTAKE (L)"
                    required
                    value={customWaterIntake}
                    onChangeText={val => setCustomWaterIntake(val.replace(/[^0-9.]/g, ''))}
                    onBlur={() => handleFieldBlur('customWater', customWaterIntake)}
                    placeholder="E.g. 3.5"
                    keyboardType="numeric"
                    error={errors.customWater}
                  />
                </View>
              )}
            </View>

            <View style={{ gap: theme.spacing.md }}>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2 }}>SLEEP SCHEDULE</Text>
              <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                <Input
                  label="BEDTIME"
                  required
                  value={bedtime}
                  onChangeText={setBedtime}
                  onBlur={() => handleFieldBlur('bedtime', bedtime)}
                  placeholder="22:00"
                  error={errors.bedtime}
                  containerStyle={{ flex: 1 }}
                />

                <Input
                  label="WAKE-UP TIME"
                  required
                  value={wakeupTime}
                  onChangeText={setWakeupTime}
                  onBlur={() => handleFieldBlur('wakeupTime', wakeupTime)}
                  placeholder="06:00"
                  error={errors.wakeupTime}
                  containerStyle={{ flex: 1 }}
                />
              </View>

              <View style={{ backgroundColor: theme.colors.light.surface, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.light.border, alignItems: 'center' }}>
                <Text variant="caption" color="text" style={{ fontWeight: '700' }}>
                  Auto-calculated Average Sleep: <Text variant="caption" color="secondary" style={{ fontWeight: '900' }}>{calculateSleepHours(bedtime, wakeupTime)}</Text>
                </Text>
              </View>
            </View>

            {/* Smart Reminders */}
            <View>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>SMART NOTIFICATIONS (REMINDERS)</Text>
              <View style={{ gap: 8 }}>
                {[
                  { key: 'meal', label: 'Meal Reminder' },
                  { key: 'water', label: 'Water Reminder' },
                  { key: 'workout', label: 'Workout Reminder' },
                  { key: 'sleep', label: 'Sleep Reminder' },
                  { key: 'orderUpdates', label: 'Order & Delivery Updates (default enabled)' }
                ].map(item => {
                  const isVal = (smartNotifications as any)[item.key];
                  return (
                    <TouchableOpacity
                      key={item.key}
                      onPress={() => setSmartNotifications((prev: any) => ({ ...prev, [item.key]: !isVal }))}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 14,
                        borderRadius: 14,
                        borderWidth: 1.5,
                        borderColor: isVal ? theme.colors.secondary : theme.colors.light.border,
                        backgroundColor: isVal ? 'rgba(201, 107, 60, 0.05)' : theme.colors.light.surface
                      }}
                    >
                      <Text variant="body" color="text" style={{ fontWeight: 'bold' }}>{item.label}</Text>
                      <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: isVal ? theme.colors.secondary : theme.colors.light.muted,
                        backgroundColor: isVal ? theme.colors.secondary : 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        {isVal ? <Check size={12} color="#FFFFFF" strokeWidth={3} /> : null}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Health Sync */}
            <View style={{ marginBottom: theme.spacing.lg }}>
              <Text variant="label" color="secondary" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.sm }}>CONNECT HEALTH APPS (OPTIONAL)</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {['Apple Health', 'Google Fit', 'Fitbit', 'Garmin', 'Samsung Health'].map(app => {
                  const isSel = connectedHealthApps.includes(app);
                  return (
                    <Button
                      key={app}
                      title={app}
                      variant={isSel ? 'primary' : 'outline'}
                      size="small"
                      fullWidth={false}
                      onPress={() => toggleHealthApp(app)}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {/* SUBPAGE 5: Setup Summary */}
        {setup3SubPage === 5 && (
          <View style={{ gap: theme.spacing.lg }}>
            <View>
              <Text variant="title" color="primary">Setup Summary</Text>
              <Text variant="caption" color="sub" style={{ marginTop: 4 }}>Review your profile, location, and dietary preferences before proceeding.</Text>
            </View>

            {/* Profile Summary Card */}
            <Card style={{ padding: 16 }}>
              <Text variant="caption" color="secondary" style={{ fontWeight: '900', letterSpacing: 0.5, marginBottom: 8 }}>PROFILE INFORMATION</Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold' }}>Name: <Text variant="body" color="sub">{user.name}</Text></Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold', marginTop: 4 }}>Email: <Text variant="body" color="sub">{user.email}</Text></Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold', marginTop: 4 }}>DOB: <Text variant="body" color="sub">{user.dob}</Text>  ·  Gender: <Text variant="body" color="sub">{user.gender}</Text></Text>
            </Card>

            {/* Location Summary Card */}
            <Card style={{ padding: 16 }}>
              <Text variant="caption" color="secondary" style={{ fontWeight: '900', letterSpacing: 0.5, marginBottom: 8 }}>DELIVERY ADDRESS</Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold' }}>Address: <Text variant="body" color="sub">{selectedAddress}</Text></Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold', marginTop: 4 }}>Flat/House details: <Text variant="body" color="sub">{addressDetails || 'None'}</Text></Text>
            </Card>

            {/* Health & Preferences Summary Card */}
            <Card style={{ padding: 16 }}>
              <Text variant="caption" color="secondary" style={{ fontWeight: '900', letterSpacing: 0.5, marginBottom: 8 }}>DIETARY & FITNESS</Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold' }}>Height/Weight: <Text variant="body" color="sub">{user.height} cm / {user.weight} kg</Text></Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold', marginTop: 4 }}>Primary Goal: <Text variant="body" color="sub">{primaryGoal}</Text></Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold', marginTop: 4 }}>Food Preference: <Text variant="body" color="sub">{user.foodPref}</Text></Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold', marginTop: 4 }}>Allergies: <Text variant="body" color="sub">{allergiesList.join(', ') || 'None'}</Text></Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold', marginTop: 4 }}>Dislikes: <Text variant="body" color="sub">{foodDislikes.join(', ') || 'None'}</Text></Text>
            </Card>

            {/* Habits Summary Card */}
            <Card style={{ padding: 16 }}>
              <Text variant="caption" color="secondary" style={{ fontWeight: '900', letterSpacing: 0.5, marginBottom: 8 }}>HABITS & REMINDERS</Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold' }}>Sleep Schedule: <Text variant="body" color="sub">{bedtime} – {wakeupTime} ({calculateSleepHours(bedtime, wakeupTime)})</Text></Text>
              <Text variant="body" color="text" style={{ fontWeight: 'bold', marginTop: 4 }}>Water Goal: <Text variant="body" color="sub">{waterIntakeGoal === 'Custom' ? customWaterIntake + ' L' : waterIntakeGoal}</Text></Text>
            </Card>
          </View>
        )}

        <Button 
          title={setup3SubPage === 5 ? 'Select Subscription Plan ‣' : (setup3SubPage === 4 ? 'Review Summary ‣' : 'Continue')}
          onPress={handleSetup3Next}
          style={{ marginTop: theme.spacing.xl, marginBottom: theme.spacing.lg }}
        />
      </ScrollableLayout>

      {/* Discard changes modal */}
      <Modal
        visible={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
      >
        <View style={{ alignItems: 'center' }}>
          <Text variant="title" color="text" style={{ textAlign: 'center', marginBottom: theme.spacing.sm }}>Discard Health Settings?</Text>
          <Text variant="caption" color="sub" style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
            Are you sure you want to go back? Any setup information entered on this step will be lost.
          </Text>
          <View style={{ flexDirection: 'row', gap: theme.spacing.md, width: '100%' }}>
            <Button
              title="Keep Editing"
              variant="outline"
              size="medium"
              style={{ flex: 1 }}
              onPress={() => setShowDiscardModal(false)}
            />
            <Button
              title="Discard"
              variant="destructive"
              size="medium"
              style={{ flex: 1 }}
              onPress={() => {
                setShowDiscardModal(false);
                back();
              }}
            />
          </View>
        </View>
      </Modal>
    </PageLayout>
  );
}
