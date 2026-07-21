import React, { useState } from 'react';
import { View, Platform, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ArrowLeft, MessageSquare, Phone, Mail } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  Input,
  PageLayout,
  Card
} from '../../design-system';

export default function SupportScreen() {
  const {
    back,
    setToast,
  } = useAppContext();

  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSendTicket = () => {
    if (!subject.trim()) {
      setErrors(prev => ({ ...prev, subject: '❌ Please enter support subject.' }));
      return;
    }
    if (!message.trim()) {
      setErrors(prev => ({ ...prev, message: '❌ Please enter support message details.' }));
      return;
    }

    setToast('📨 Support ticket created successfully!');
    setSubject('');
    setMessage('');
    setErrors({});
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }}>
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
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>SUPPORT & HELP DESK</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text variant="title" color="primary">We are here to help</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 4, lineHeight: 18 }}>
            Reach out to our customer care executives for any issues with deliveries, cancellations or refund claims.
          </Text>
        </View>

        {/* Contact links cards */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
          <Card style={{ flex: 1, alignItems: 'center', padding: 12 }}>
            <Phone size={20} color={theme.colors.secondary} />
            <Text variant="caption" color="text" style={{ fontWeight: 'bold', marginTop: 8 }}>Call Hotline</Text>
            <Text variant="label" color="sub" style={{ marginTop: 2 }}>+91 9988776655</Text>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center', padding: 12 }}>
            <Mail size={20} color={theme.colors.secondary} />
            <Text variant="caption" color="text" style={{ fontWeight: 'bold', marginTop: 8 }}>Write Email</Text>
            <Text variant="label" color="sub" style={{ marginTop: 2 }}>support@koikoi.in</Text>
          </Card>
        </View>

        {/* Form */}
        <Text variant="label" color="text" style={{ fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Create Support Ticket</Text>
        
        <Card style={{ gap: theme.spacing.md }}>
          <Input
            label="SUBJECT"
            required
            value={subject}
            onChangeText={val => { setSubject(val); setErrors(prev => ({ ...prev, subject: '' })); }}
            placeholder="E.g. Lunch delivery delay slot"
            error={errors.subject}
          />

          <View>
            <Text variant="label" color="muted" style={{ fontWeight: '900', letterSpacing: 1.2, marginBottom: theme.spacing.xs }}>MESSAGE DETAILS *</Text>
            <View style={{
              height: 120,
              borderRadius: 14,
              borderWidth: 1.5,
              borderColor: errors.message ? theme.colors.error : theme.colors.light.border,
              backgroundColor: theme.colors.light.surface,
              padding: 12,
            }}>
              <TextInput
                style={{ flex: 1, fontSize: 13.5, color: theme.colors.light.text, textAlignVertical: 'top' }}
                placeholder="Describe your query or complaint in details here..."
                placeholderTextColor={theme.colors.light.muted}
                value={message}
                onChangeText={val => { setMessage(val); setErrors(prev => ({ ...prev, message: '' })); }}
                multiline
              />
            </View>
            {errors.message ? (
              <Text variant="label" color="error" style={{ marginTop: 4, fontWeight: '600' }}>{errors.message}</Text>
            ) : null}
          </View>

          <Button 
            title="Submit Support Query ‣"
            onPress={handleSendTicket}
            style={{ marginTop: 12 }}
          />
        </Card>
      </ScrollView>
    </PageLayout>
  );
}
