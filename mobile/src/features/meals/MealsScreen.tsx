import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { Bell, Sun, Moon, UtensilsCrossed } from 'lucide-react-native';
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
import { Meal } from '../../core/constants/types';
import { BottomTabNav } from '../../core/components/BottomTabNav';

export default function MealsScreen() {
  const {
    mealsList,
    selectedFilter,
    setSelectedFilter,
    selectedCategory,
    setSelectedCategory,
    setActiveMealIndex,
    setSelectedMealId,
    go,
    t,
    isDark
  } = useAppContext();

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Filter logic
  const filteredMeals = mealsList.filter(m => {
    let matchesType = true;
    if (selectedFilter === 'Veg') matchesType = m.type === 'veg';
    else if (selectedFilter === 'Non-Veg') matchesType = m.type === 'non-veg' || m.type === 'egg';

    let matchesDay = true;
    if (selectedCategory !== 'All Categories' && selectedCategory !== 'All Menu') {
      matchesDay = m.day === selectedCategory;
    }

    return matchesType && matchesDay;
  });

  const handleSelectDay = (day: string) => {
    setSelectedCategory(day);
    setActiveMealIndex(0);
  };

  const handleSelectFilter = (f: string) => {
    setSelectedFilter(f);
    setActiveMealIndex(0);
  };

  const lunchMeals = filteredMeals.filter(m => m.when === 'lunch');
  const dinnerMeals = filteredMeals.filter(m => m.when === 'dinner');

  const renderMealCard = (item: Meal) => {
    const typeColor = item.type === 'veg' ? '#4B5D3A' : item.type === 'non-veg' ? '#C96B3C' : '#D9B65A';
    const typeBg = item.type === 'veg' ? '#E8F3E6' : item.type === 'non-veg' ? '#FBE8E0' : '#F7F0D8';
    return (
      <View 
        key={item.id}
        style={{
          backgroundColor: t.card,
          borderRadius: 20,
          borderWidth: 1.5,
          borderColor: t.border,
          marginBottom: 16,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3
        }}
      >
        <View style={{ height: 160, position: 'relative', width: '100%' }}>
          <Image source={{ uri: item.img }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          
          <View style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: typeBg,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4
          }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: typeColor }} />
            <Text style={{ fontSize: 9, fontWeight: '900', color: typeColor, textTransform: 'uppercase' }}>
              {item.type}
            </Text>
          </View>

          <View style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            backgroundColor: 'rgba(0,0,0,0.6)',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6
          }}>
            <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF', textTransform: 'uppercase' }}>
              {item.day} {item.when}
            </Text>
          </View>

          <View style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: 'rgba(0,0,0,0.6)',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4
          }}>
            <Text style={{ fontSize: 9, fontWeight: '900', color: '#F59E0B' }}>★</Text>
            <Text style={{ fontSize: 9, fontWeight: '900', color: '#FFFFFF' }}>{item.rating}</Text>
          </View>
        </View>

        <View style={{ padding: 14 }}>
          <Text style={{ fontSize: 15, fontWeight: '900', color: t.text }}>{item.name}</Text>
          <Text style={{ fontSize: 11.5, color: t.muted, marginTop: 4, lineHeight: 16 }} numberOfLines={2}>
            {item.desc}
          </Text>

          <View style={{
            flexDirection: 'row',
            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#FFFDF9',
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: 12,
            paddingVertical: 8,
            paddingHorizontal: 10,
            marginTop: 12,
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '900', color: '#DF7E2C' }}>{item.cal}</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: t.muted, marginTop: 2 }}>KCAL</Text>
            </View>
            <View style={{ width: 1, height: 20, backgroundColor: t.border }} />
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '900', color: '#3B82F6' }}>{item.protein}g</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: t.muted, marginTop: 2 }}>PROT</Text>
            </View>
            <View style={{ width: 1, height: 20, backgroundColor: t.border }} />
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '900', color: '#10B981' }}>{item.carbs}g</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: t.muted, marginTop: 2 }}>CARB</Text>
            </View>
            <View style={{ width: 1, height: 20, backgroundColor: t.border }} />
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '900', color: '#EF4444' }}>{item.fat}g</Text>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: t.muted, marginTop: 2 }}>FAT</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
            <Text style={{ fontSize: 16, fontWeight: '900', color: B.orange }}>{item.price}</Text>
            
            <TouchableOpacity
              onPress={() => {
                setSelectedMealId(item.id);
                go('meal_detail');
              }}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 14,
                backgroundColor: theme.colors.secondary
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: '900', color: '#FFFFFF' }}>DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0 }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={t.bg} />

      {/* Top Header Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: t.border, backgroundColor: t.surface }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: '900', color: t.text, letterSpacing: -0.5 }}>Daily Menu</Text>
          <Text style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>Subscribe or order single dabbas</Text>
        </View>
        <TouchableOpacity onPress={() => go('notifications')} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.card, borderWidth: 1, borderColor: t.border, justifyContent: 'center', alignItems: 'center' }}>
          <Bell size={16} color={t.text} />
        </TouchableOpacity>
      </View>

      {/* Top Type Filter Pills Row (Both, Veg, Non-Veg) */}
      <View style={{ 
        flexDirection: 'row', 
        paddingVertical: 12, 
        paddingHorizontal: 16, 
        gap: 10, 
        justifyContent: 'center', 
        backgroundColor: t.surface,
        borderBottomWidth: 1,
        borderBottomColor: t.border
      }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 22,
            borderWidth: 1.5,
            borderColor: selectedFilter === 'Both' ? t.text : t.border,
            backgroundColor: selectedFilter === 'Both' ? (isDark ? '#333' : '#F5F5F5') : t.card,
            height: 40
          }}
          onPress={() => handleSelectFilter('Both')}
        >
          <Text style={{ fontSize: 11, fontWeight: '900', color: t.text }}>BOTH</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 22,
            borderWidth: 1.5,
            borderColor: selectedFilter === 'Veg' ? '#4B5D3A' : t.border,
            backgroundColor: selectedFilter === 'Veg' ? '#E8F3E6' : t.card,
            gap: 6,
            height: 40
          }}
          onPress={() => handleSelectFilter('Veg')}
        >
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4B5D3A' }} />
          <Text style={{ fontSize: 11, fontWeight: '900', color: selectedFilter === 'Veg' ? '#4B5D3A' : t.text }}>VEG</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 22,
            borderWidth: 1.5,
            borderColor: selectedFilter === 'Non-Veg' ? '#C96B3C' : t.border,
            backgroundColor: selectedFilter === 'Non-Veg' ? '#FBE8E0' : t.card,
            gap: 6,
            height: 40
          }}
          onPress={() => handleSelectFilter('Non-Veg')}
        >
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#C96B3C' }} />
          <Text style={{ fontSize: 11, fontWeight: '900', color: selectedFilter === 'Non-Veg' ? '#C96B3C' : t.text }}>NON-VEG</Text>
        </TouchableOpacity>
      </View>

      {/* Main Split Screen Area */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Left Vertical Sidebar */}
        <View style={{ 
          width: 100, 
          borderRightWidth: 1, 
          borderRightColor: t.border, 
          backgroundColor: t.surface,
          paddingVertical: 10 
        }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
            <TouchableOpacity
              onPress={() => handleSelectDay('All Menu')}
              style={{
                paddingVertical: 14,
                paddingHorizontal: 12,
                marginVertical: 4,
                borderLeftWidth: 3,
                borderLeftColor: (selectedCategory === 'All Menu' || selectedCategory === 'All Categories') ? B.orange : 'transparent',
                backgroundColor: (selectedCategory === 'All Menu' || selectedCategory === 'All Categories') ? (isDark ? 'rgba(233, 106, 46, 0.1)' : '#FFF4EC') : 'transparent'
              }}
            >
              <Text style={{ 
                fontSize: 12, 
                fontWeight: (selectedCategory === 'All Menu' || selectedCategory === 'All Categories') ? '900' : '600', 
                color: (selectedCategory === 'All Menu' || selectedCategory === 'All Categories') ? B.orange : t.text 
              }}>
                All Menu
              </Text>
            </TouchableOpacity>

            {weekdays.map(day => {
              const isSelected = selectedCategory === day;
              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => handleSelectDay(day)}
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 12,
                    marginVertical: 4,
                    borderLeftWidth: 3,
                    borderLeftColor: isSelected ? B.orange : 'transparent',
                    backgroundColor: isSelected ? (isDark ? 'rgba(233, 106, 46, 0.1)' : '#FFF4EC') : 'transparent'
                  }}
                >
                  <Text style={{ 
                    fontSize: 12, 
                    fontWeight: isSelected ? '900' : '600', 
                    color: isSelected ? B.orange : t.sub 
                  }}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Right Vertical Meals List */}
        <View style={{ flex: 1, backgroundColor: t.bg }}>
          <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
            {lunchMeals.length > 0 && (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, gap: 8 }}>
                  <Sun size={14} color="#DF7E2C" />
                  <Text style={{ fontSize: 11, fontWeight: '900', color: '#DF7E2C', letterSpacing: 1.2 }}>LUNCH MENU</Text>
                </View>
                {lunchMeals.map(item => renderMealCard(item))}
              </View>
            )}

            {dinnerMeals.length > 0 && (
              <View style={{ marginTop: lunchMeals.length > 0 ? 16 : 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, gap: 8 }}>
                  <Moon size={14} color="#6366F1" />
                  <Text style={{ fontSize: 11, fontWeight: '900', color: '#6366F1', letterSpacing: 1.2 }}>DINNER MENU</Text>
                </View>
                {dinnerMeals.map(item => renderMealCard(item))}
              </View>
            )}

            {filteredMeals.length === 0 && (
              <View style={{ alignItems: 'center', marginTop: 60, paddingHorizontal: 20 }}>
                <Text style={{ color: t.muted, fontSize: 14, fontWeight: '700', textAlign: 'center' }}>
                  No meals found for this selection
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      <BottomTabNav active="meals" />
    </SafeAreaView>
  );
}
