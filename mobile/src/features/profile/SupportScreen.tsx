import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Animated
} from 'react-native';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { theme, F, Button, Input } from '../../design-system';
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

export default function SupportScreen() {
  const {
    back,
    setToast,
    t
  } = useAppContext();

  // Local State
  const [issueText, setIssueText] = React.useState('');
  const [error, setError] = React.useState('');
  const [touched, setTouched] = React.useState(false);

  // Refs & Animation
  const inputRef = React.useRef<TextInput>(null);
  const shakeAnim = React.useRef(new Animated.Value(0)).current;

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const validate = (val: string): string => {
    if (!val.trim()) return '❌ Please describe the issue you are facing.';
    if (val.trim().length < 10) return '❌ Description must be at least 10 characters long.';
    return '';
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validate(issueText));
  };

  const handleChange = (val: string) => {
    setIssueText(val);
    if (touched) {
      setError(validate(val));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.headerBar, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={back} style={[styles.backIconCircle, { backgroundColor: t.surface }]}>
          <ArrowLeft size={16} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Support Helpdesk</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={[styles.sectionSubTitle, { color: t.text, marginBottom: 12 }]}>Submit Support Ticket</Text>

        <View style={[styles.supportForm, { backgroundColor: t.card, borderColor: t.border, padding: 20 }]}>
          <Input
            ref={inputRef}
            label="Describe Issue"
            required
            multiline
            numberOfLines={4}
            value={issueText}
            onChangeText={handleChange}
            onBlur={handleBlur}
            placeholder="Tell us what is wrong..."
            error={error}
            success={touched && !error && issueText.trim().length >= 10}
            shakeTrigger={!!error}
          />

          <View style={{ marginTop: 16 }}>
            <Button
              title="Submit Ticket"
              onPress={() => {
                const err = validate(issueText);
                setError(err);
                setTouched(true);

                if (err) {
                  triggerShake();
                  inputRef.current?.focus();
                  return;
                }

                setToast('Support Ticket Submitted!');
                back();
              }}
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
  sectionSubTitle: {
    fontSize: 14,
    fontWeight: '900',
  },
  supportForm: {
    borderRadius: 18,
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
