import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Share
} from 'react-native';
import { ArrowLeft, Gift, Share2 } from 'lucide-react-native';
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

export default function ReferScreen() {
  const {
    back,
    setToast,
    t
  } = useAppContext();

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Get ₹100 wallet cashback on your first Koi Koi home-style steel dabba with my referral code KOIKOI100! Download now.',
      });
    } catch (error) {
      setToast('Sharing Failed');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.headerBar, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Refer & Earn</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={[styles.loyaltyProgressBox, { backgroundColor: t.card, borderColor: t.border }]}>
          <Gift size={36} color={B.orange} />
          <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, marginTop: 10 }}>Invite Your Friends</Text>
          <Text style={{ fontSize: 12, color: t.muted, textAlign: 'center', marginTop: 4 }}>
            Get ₹100 wallet cashback immediately when they start a monthly tier plan.
          </Text>

          <View style={[styles.shareCodeBox, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Text style={{ fontSize: 16, fontWeight: '900', color: t.text, letterSpacing: 1.5 }}>KOIKOI100</Text>
          </View>

          <View style={{ width: '100%', marginTop: 12 }}>
            <Button
              title="Share Code"
              onPress={handleShare}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  loyaltyProgressBox: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  shareCodeBox: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 12,
    borderWidth: 1,
  },
  obBtnGradient: {
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  obBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});
