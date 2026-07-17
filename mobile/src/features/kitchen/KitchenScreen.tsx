import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
import { Video, ShieldCheck, Play, Award, Check } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F, Button } from '../../design-system';
import { Text as RNText } from 'react-native';

const B = {
  orange: theme.colors.secondary,
  orangeL: 'rgba(201, 107, 60, 0.08)',
  green: theme.colors.success,
  greenL: 'rgba(75, 93, 58, 0.08)',
  cream: theme.colors.light.surface,
  creamL: theme.colors.light.bg,
};

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
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function KitchenScreen() {
  const {
    go,
    setToast,
    t
  } = useAppContext();

  const spaces = [
    { name: 'Vegetables Prepping', desc: 'Triple-washing in ozone water to remove pesticide residues.', icon: '🥗', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300' },
    { name: 'Stone-Ground Spices', desc: 'Slow cold-grinding to protect essential volatile oils.', icon: '🌶️', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300' },
    { name: 'Traditional Slow Cooking', desc: 'Gentle clay-pot heating maintaining glycemic properties.', icon: '🍲', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300' },
    { name: 'Zero-Contamination Packaging', desc: 'Automated sealing in medical-grade stainless steel dabbas.', icon: '🍱', image: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=300' }
  ];

  const standardLogs = [
    { label: 'Air filtration units checked', val: 'Every 4 hours' },
    { label: 'Floor & counters ozone sanitization', val: 'Hourly' },
    { label: 'Staff temperature & wellness audit', val: 'Every shift' },
    { label: 'Stainless-steel steam cleaning', val: 'Post-operation daily' }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.light.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '900', color: B.orange, textTransform: 'uppercase', letterSpacing: 1.2 }}>Our Premium Kitchen</Text>
          <Text style={{ fontSize: 26, fontWeight: '900', color: t.text, marginTop: 4 }}>The Heart of KOI KOI</Text>
          <Text style={{ fontSize: 12.5, color: t.sub, marginTop: 8, lineHeight: 18 }}>
            Experience complete culinary honesty. Track live preparation, review our hygiene certificates, and book a physical tour of our smart kitchen.
          </Text>
        </View>

        {/* 1. Kitchen Live Broadcast Card */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <TouchableOpacity 
            activeOpacity={0.9}
            style={{
              backgroundColor: t.card,
              borderRadius: 24,
              borderWidth: 1.5,
              borderColor: t.border,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.02,
              shadowRadius: 10,
              elevation: 2
            }}
            onPress={() => setToast("Connecting to Live Smart Kitchen Cams... Broadcast loaded.")}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600' }} 
              style={{ width: '100%', height: 160 }} 
            />
            <View style={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: '#EF4444',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4
            }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFFFFF' }} />
              <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 }}>LIVE BROADCAST</Text>
            </View>

            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 15, fontWeight: '900', color: t.text }}>Kitchen Live Broadcast</Text>
              <Text style={{ fontSize: 11.5, color: t.sub, marginTop: 4 }}>Tap here to review real-time raw feed from prep & packaging slots.</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 4 }}>
                <Text style={{ fontSize: 11, fontWeight: '800', color: B.orange }}>Access Live Stream →</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* 2. Vedic Cooking Documentary */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <TouchableOpacity 
            activeOpacity={0.9}
            style={{
              backgroundColor: t.card,
              borderRadius: 24,
              borderWidth: 1.5,
              borderColor: t.border,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.02,
              shadowRadius: 10,
              elevation: 2
            }}
            onPress={() => setToast("Playing Vedic Cooking Documentary...")}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600' }} 
              style={{ width: '100%', height: 140 }} 
            />
            <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)'
            }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 }}>
                <Play size={20} color={B.orange} fill={B.orange} style={{ marginLeft: 3 }} />
              </View>
            </View>

            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 15, fontWeight: '900', color: t.text }}>Cooking Philosophy Documentary</Text>
              <Text style={{ fontSize: 11.5, color: t.sub, marginTop: 4 }}>Discover the science, sourcing standards, and nutritional logic behind our warm steel dabbas.</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 3. Physical Tour booking */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <View style={{ backgroundColor: t.card, borderRadius: 28, borderWidth: 1.5, borderColor: t.border, padding: 20 }}>
            <Award size={32} color={B.orange} />
            <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, marginTop: 12 }}>Book a Physical Kitchen Tour</Text>
            <Text style={{ fontSize: 12, color: t.sub, marginTop: 6, lineHeight: 18 }}>
              We open our doors to families. Schedule a guided walk to verify ingredients quality, check our custom reverse osmosis units, and meet our chefs.
            </Text>
            <Button 
              title="Schedule Tour Appointment"
              onPress={() => go('tour_booking')}
              style={{ marginTop: 18, height: 46, borderRadius: 23 }}
            />
          </View>
        </View>

        {/* 4. Sourcing and Prep standard zones */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Premium Spaces & Standards</Text>
          <View style={{ gap: 16 }}>
            {spaces.map((space, i) => (
              <View 
                key={i}
                style={{
                  backgroundColor: t.card,
                  borderRadius: 24,
                  borderWidth: 1.5,
                  borderColor: t.border,
                  overflow: 'hidden',
                  flexDirection: 'row'
                }}
              >
                <Image source={{ uri: space.image }} style={{ width: 100, height: '100%' }} />
                <View style={{ flex: 1, padding: 14 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: 16 }}>{space.icon}</Text>
                    <Text style={{ fontSize: 13, fontWeight: '900', color: t.text, flex: 1 }}>{space.name}</Text>
                  </View>
                  <Text style={{ fontSize: 11, color: t.sub, marginTop: 4, lineHeight: 15 }}>{space.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 5. Logs list */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: t.text, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Hygiene & Safety Audit Log</Text>
          <View style={{ borderRadius: 20, overflow: 'hidden', borderWidth: 1.5, borderColor: t.border, backgroundColor: t.card }}>
            {standardLogs.map((log, idx) => (
              <View 
                key={idx} 
                style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  paddingVertical: 14, 
                  paddingHorizontal: 16, 
                  borderBottomWidth: idx < standardLogs.length - 1 ? 1 : 0, 
                  borderBottomColor: t.border,
                  alignItems: 'center'
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                  <Check size={14} color={B.green} strokeWidth={3} />
                  <Text style={{ fontSize: 12, fontWeight: '800', color: t.text }}>{log.label}</Text>
                </View>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: t.muted }}>{log.val}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomTabNav active="kitchen" />
    </SafeAreaView>
  );
}
