import React, { useState, useEffect, useRef } from 'react';
import { TextInput, ViewStyle, TextStyle, View, TouchableOpacity, Keyboard, Modal, ScrollView, Dimensions } from 'react-native';
import { Input } from './Input';
import { Text } from './Text';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react-native';
import { theme } from '../theme';

interface DateInputProps {
  value: string;
  onChangeText: (val: string) => void;
  label?: string;
  error?: string;
  success?: boolean;
  required?: boolean;
  placeholder?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  shakeTrigger?: boolean;
  onBlur?: () => void;
}

export const DateInput = React.forwardRef<TextInput, DateInputProps>(({
  value,
  onChangeText,
  label = 'Date of Birth',
  error,
  success,
  required,
  placeholder = 'DD-MM-YYYY',
  containerStyle,
  inputStyle,
  shakeTrigger,
  onBlur,
  ...props
}, ref) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(1996, 7, 15)); 
  const [pickerMode, setPickerMode] = useState<'day' | 'month' | 'year'>('day');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (value && value.length === 10) {
      const parts = value.split('-');
      if (parts.length === 3) {
        const d = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const y = parseInt(parts[2], 10);
        if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
          setViewDate(new Date(y, m, 1)); 
        }
      }
    }
  }, [value, showCalendar]);

  // Fix: Move useEffect to the top level of the component
  useEffect(() => {
    if (pickerMode === 'year' && scrollViewRef.current) {
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
      const index = years.findIndex(y => y === viewDate.getFullYear());
      if (index !== -1) {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ y: index * 50, animated: false });
        }, 100);
      }
    }
  }, [pickerMode, viewDate]);

  const handleDateChange = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    let formatted = clean;
    if (clean.length > 2 && clean.length <= 4) {
      formatted = `${clean.slice(0, 2)}-${clean.slice(2)}`;
    } else if (clean.length > 4) {
      formatted = `${clean.slice(0, 2)}-${clean.slice(2, 4)}-${clean.slice(4, 8)}`;
    }
    onChangeText(formatted);
  };

  const handleDayPress = (day: number) => {
    const dStr = day.toString().padStart(2, '0');
    const mStr = (viewDate.getMonth() + 1).toString().padStart(2, '0');
    const yStr = viewDate.getFullYear().toString();
    onChangeText(`${dStr}-${mStr}-${yStr}`);
    setShowCalendar(false);
  };

  const renderYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 120 }, (_, i) => currentYear - i);

    return (
      <View style={{ flex: 1 }}>
        <Text variant="title" color="text" style={{ textAlign: 'center', marginVertical: theme.spacing.md }}>Select Year</Text>
        <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
          {years.map(year => {
            const isSelected = viewDate.getFullYear() === year;
            return (
              <TouchableOpacity
                key={year}
                style={{ 
                  height: 50, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  backgroundColor: isSelected ? theme.colors.secondary : 'transparent',
                  marginHorizontal: theme.spacing.xl,
                  borderRadius: theme.radius.control,
                  marginBottom: 4
                }}
                onPress={() => {
                  setViewDate(new Date(year, viewDate.getMonth(), 1));
                  setPickerMode('month'); // auto-advance to month picker
                }}
              >
                <Text variant="body" color={isSelected ? 'inverse' : 'text'} style={{ fontWeight: isSelected ? 'bold' : 'normal', fontSize: 18 }}>
                  {year}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderMonthPicker = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <View style={{ flex: 1 }}>
        <Text variant="title" color="text" style={{ textAlign: 'center', marginVertical: theme.spacing.md }}>Select Month</Text>
        <ScrollView style={{ flex: 1, paddingHorizontal: theme.spacing.xl }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: theme.spacing.md }}>
            {monthNames.map((month, index) => {
              const isSelected = viewDate.getMonth() === index;
              return (
                <TouchableOpacity
                  key={month}
                  style={{ 
                    width: '48%',
                    height: 50, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: isSelected ? theme.colors.secondary : theme.colors.light.surface,
                    borderRadius: theme.radius.control,
                    marginBottom: theme.spacing.md
                  }}
                  onPress={() => {
                    setViewDate(new Date(viewDate.getFullYear(), index, 1));
                    setPickerMode('day');
                  }}
                >
                  <Text variant="body" color={isSelected ? 'inverse' : 'text'} style={{ fontWeight: isSelected ? 'bold' : 'normal', fontSize: 16 }}>
                    {month}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderCalendar = () => {
    if (pickerMode === 'year') return renderYearPicker();
    if (pickerMode === 'month') return renderMonthPicker();

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={{ width: '14.28%', aspectRatio: 1 }} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      let isSelected = false;
      if (value && value.length === 10) {
        const parts = value.split('-');
        if (parseInt(parts[0], 10) === i && parseInt(parts[1], 10) === month + 1 && parseInt(parts[2], 10) === year) {
          isSelected = true;
        }
      }

      days.push(
        <TouchableOpacity 
          key={`day-${i}`} 
          style={{ width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => handleDayPress(i)}
        >
          <View style={{ 
            width: 36, 
            height: 36, 
            borderRadius: 18, 
            backgroundColor: isSelected ? theme.colors.secondary : 'transparent',
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
             <Text variant="body" color={isSelected ? 'inverse' : 'text'} style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>{i}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
      <View style={{ padding: theme.spacing.lg }}>
        {/* Header Controls */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.xl }}>
          <TouchableOpacity 
            onPress={() => setViewDate(new Date(year, month - 1, 1))} 
            style={{ padding: 8, backgroundColor: theme.colors.light.surface, borderRadius: 20 }}
          >
            <ChevronLeft size={20} color={theme.colors.light.text} />
          </TouchableOpacity>
          
          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            <TouchableOpacity onPress={() => setPickerMode('month')} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Text variant="title" color="text">{monthNames[month]}</Text>
              <ChevronDown size={14} color={theme.colors.light.sub} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPickerMode('year')} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Text variant="title" color="text">{year}</Text>
              <ChevronDown size={14} color={theme.colors.light.sub} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            onPress={() => setViewDate(new Date(year, month + 1, 1))} 
            style={{ padding: 8, backgroundColor: theme.colors.light.surface, borderRadius: 20 }}
          >
            <ChevronRight size={20} color={theme.colors.light.text} />
          </TouchableOpacity>
        </View>
        
        {/* Days of Week Header */}
        <View style={{ flexDirection: 'row', marginBottom: theme.spacing.md }}>
          {dayNames.map((d, i) => (
            <View key={i} style={{ width: '14.28%', alignItems: 'center' }}>
              <Text variant="caption" color="sub" style={{ fontWeight: 'bold' }}>{d}</Text>
            </View>
          ))}
        </View>
        
        {/* Calendar Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {days}
        </View>
      </View>
    );
  };

  return (
    <>
      <Input
        ref={ref}
        value={value}
        onChangeText={handleDateChange}
        label={label}
        error={error}
        success={success}
        required={required}
        placeholder={placeholder}
        containerStyle={containerStyle}
        inputStyle={inputStyle}
        shakeTrigger={shakeTrigger}
        keyboardType="number-pad"
        maxLength={10}
        onBlur={onBlur}
        rightIcon={
          <TouchableOpacity onPress={() => {
            Keyboard.dismiss();
            setPickerMode('day'); // reset to day mode
            setShowCalendar(true);
          }}>
            <CalendarIcon size={20} color={theme.colors.light.sub} />
          </TouchableOpacity>
        }
        {...props}
      />
      
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPress={() => setShowCalendar(false)}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            style={{ 
              width: Dimensions.get('window').width - 40,
              height: pickerMode === 'year' ? 400 : undefined,
              backgroundColor: '#FCFAF6', // Brand Background Cream
              borderRadius: theme.radius.card,
              overflow: 'hidden',
              paddingBottom: pickerMode === 'year' ? 0 : theme.spacing.md,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.2,
              shadowRadius: 20,
              elevation: 12,
            }}
          >
            {renderCalendar()}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
});
