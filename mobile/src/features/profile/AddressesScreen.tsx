import React from 'react';
import { View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, MapPin, Trash2, Home, Building2 } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card
} from '../../design-system';

export default function AddressesScreen() {
  const {
    addressesList,
    setAddressesList,
    selectedAddress,
    setSelectedAddress,
    back,
    setToast,
  } = useAppContext();

  const handleDeleteAddress = (id: string) => {
    setAddressesList((prev: any[]) => prev.filter(item => item.id !== id));
    setToast('🗑️ Address deleted');
  };

  const handleSelectDefault = (addressStr: string) => {
    setSelectedAddress(addressStr);
    setToast('📍 Primary address updated');
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="clean">
      {/* Top Header Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: theme.colors.light.border, backgroundColor: theme.colors.light.surface }}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={theme.colors.light.text} />}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.light.surface }}
        />
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>MY ADDRESSES</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text variant="title" color="primary">Saved Locations</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 4 }}>
            Manage saved home, work and hostel delivery addresses.
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {addressesList.map((addr) => {
            const isSelected = selectedAddress.includes(addr.details) || selectedAddress.includes(addr.title);
            const Icon = addr.label === 'Home' ? Home : Building2;
            
            return (
              <TouchableOpacity
                key={addr.id}
                onPress={() => handleSelectDefault(`${addr.details}, ${addr.title}`)}
                style={{
                  backgroundColor: theme.colors.light.surface,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isSelected ? theme.colors.secondary : theme.colors.light.border,
                  padding: 16,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flexDirection: 'row', gap: 10, flex: 1, marginRight: 8 }}>
                    <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(201, 107, 60, 0.08)', justifyContent: 'center', alignItems: 'center' }}>
                      <Icon size={16} color={theme.colors.secondary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text variant="body" color="text" style={{ fontWeight: '800' }}>{addr.label}</Text>
                      <Text variant="caption" color="sub" style={{ marginTop: 2 }}>{addr.details}</Text>
                      <Text variant="caption" color="muted" style={{ marginTop: 1 }}>{addr.title}</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    {isSelected && (
                      <View style={{ backgroundColor: 'rgba(75, 93, 58, 0.08)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                        <Text variant="label" color="primary" style={{ fontWeight: '900', fontSize: 9 }}>PRIMARY</Text>
                      </View>
                    )}
                    <TouchableOpacity onPress={() => handleDeleteAddress(addr.id)} style={{ padding: 4 }}>
                      <Trash2 size={16} color={theme.colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button 
          title="+ Add New Address"
          variant="outline"
          size="medium"
          style={{ marginTop: 24, borderStyle: 'dashed', borderColor: theme.colors.secondary }}
          textStyle={{ color: theme.colors.secondary }}
          onPress={() => setToast('📍 Address adding is simulated inside the setup flow.')}
        />
      </ScrollView>
    </PageLayout>
  );
}
