import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F } from '../../design-system';
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

export default function AddressesScreen() {
  const {
    addressesList,
    back,
    t
  } = useAppContext();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.headerBar, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>My Addresses</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ gap: 12 }}>
          {addressesList.map((addr: any) => (
            <View 
              key={addr.id}
              style={[
                styles.addressCard, 
                { 
                  backgroundColor: t.card, 
                  borderColor: t.border,
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  gap: 10,
                  padding: 16
                }
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <MapPin size={18} color={B.orange} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: t.text }}>{addr.label} Address</Text>
                  <Text style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{addr.address}</Text>
                </View>
              </View>

              {/* Receiver Info */}
              <View style={{ borderTopWidth: 1, borderTopColor: t.border, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: t.sub }}>Receiver: <Text style={{ fontWeight: 'bold', color: t.text }}>{addr.name}</Text></Text>
                <Text style={{ fontSize: 12, color: t.sub }}>Phone: <Text style={{ fontWeight: 'bold', color: t.text }}>{addr.phone}</Text></Text>
              </View>

              {/* Building/Door image preview if exists */}
              {addr.image ? (
                <View style={{ height: 80, borderRadius: 10, overflow: 'hidden', marginTop: 4 }}>
                  <Image source={{ uri: addr.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                </View>
              ) : null}
            </View>
          ))}
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
  addressCard: {
    borderRadius: 18,
    borderWidth: 1,
  },
});
