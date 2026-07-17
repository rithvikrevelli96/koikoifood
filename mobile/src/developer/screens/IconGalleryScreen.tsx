import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Clipboard } from 'react-native';
import { ArrowLeft, Search, Home, User, Wallet, ChefHat, MapPin, Bell, Settings, Award, Heart, HelpCircle, LogOut, Check, Sun, Moon, Laptop, ShieldAlert, Sparkles, Terminal, Trash2, Edit2 } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme } from '../../design-system';

interface IconGalleryScreenProps {
  onBack: () => void;
}

export default function IconGalleryScreen({ onBack }: IconGalleryScreenProps) {
  const { setToast, t } = useAppContext();
  const [search, setSearch] = useState('');

  const iconsList = [
    { name: 'Home', component: Home },
    { name: 'User', component: User },
    { name: 'Wallet', component: Wallet },
    { name: 'ChefHat', component: ChefHat },
    { name: 'MapPin', component: MapPin },
    { name: 'Bell', component: Bell },
    { name: 'Settings', component: Settings },
    { name: 'Award', component: Award },
    { name: 'Heart', component: Heart },
    { name: 'HelpCircle', component: HelpCircle },
    { name: 'LogOut', component: LogOut },
    { name: 'Check', component: Check },
    { name: 'Sun', component: Sun },
    { name: 'Moon', component: Moon },
    { name: 'Laptop', component: Laptop },
    { name: 'ShieldAlert', component: ShieldAlert },
    { name: 'Sparkles', component: Sparkles },
    { name: 'Terminal', component: Terminal },
    { name: 'Trash2', component: Trash2 },
    { name: 'Edit2', component: Edit2 },
  ];

  const handleCopyIcon = (name: string) => {
    const importStr = `import { ${name} } from 'lucide-react-native';`;
    Clipboard.setString(importStr);
    setToast(`📋 Copied: ${importStr}`);
  };

  const filteredIcons = iconsList.filter(icon =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Approved Icon Gallery</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={16} color={t.muted} style={styles.searchIcon} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search Lucide icons..."
          placeholderTextColor={t.muted}
          style={[styles.searchInput, { color: t.text, borderColor: t.border, backgroundColor: t.card }]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredIcons.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: t.muted }}>No matching icons found</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {filteredIcons.map(icon => {
              const IconComp = icon.component;
              return (
                <TouchableOpacity
                  key={icon.name}
                  onPress={() => handleCopyIcon(icon.name)}
                  style={[styles.iconCard, { backgroundColor: t.card, borderColor: t.border }]}
                >
                  <View style={styles.iconWrapper}>
                    <IconComp size={24} color={B.orange} />
                  </View>
                  <Text style={[styles.iconName, { color: t.text }]}>{icon.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 28,
    zIndex: 10,
  },
  searchInput: {
    height: 44,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  iconCard: {
    width: '31%',
    aspectRatio: 1,
    borderWidth: 1.5,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: B.orangeL,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconName: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});
