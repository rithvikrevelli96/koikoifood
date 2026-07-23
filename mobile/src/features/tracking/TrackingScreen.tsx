import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Linking, Modal, ActivityIndicator } from 'react-native';
import { ArrowLeft, MapPin, Bike, Check, PhoneCall, ShieldCheck, DoorOpen, Bell, Mic, X, Play } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  Badge
} from '../../design-system';

export default function TrackingScreen() {
  const {
    back,
    t,
    isDark,
    setToast
  } = useAppContext();

  // Delivery quick instructions state
  const [activeInstruction, setActiveInstruction] = useState<string>('Hand to Me');
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceRecorded, setVoiceRecorded] = useState<boolean>(false);
  const [voiceDuration, setVoiceDuration] = useState<number>(0);

  const handleCallArjun = () => {
    const phoneUrl = 'tel:+919876543210';
    Linking.openURL(phoneUrl).catch(() => {
      setToast('📞 Calling Arjun (+91 98765 43210)...');
    });
    setToast('📞 Dialing delivery partner Arjun Dev...');
  };

  const handleSelectInstruction = (title: string, msg: string) => {
    setActiveInstruction(title);
    setToast(`💬 Delivery Note: "${msg}" sent to rider.`);
  };

  const handleStartVoiceRecording = () => {
    setIsRecording(true);
    setVoiceDuration(0);
    setTimeout(() => {
      setIsRecording(false);
      setVoiceRecorded(true);
      setVoiceDuration(5);
      setToast('🎙️ 5s Voice instruction recorded!');
    }, 2500);
  };

  const handleSendVoiceNote = () => {
    setShowVoiceModal(false);
    setActiveInstruction('Voice Instruction Recorded 🎙️');
    setToast('✈️ Voice instruction sent to Arjun!');
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }}>
      {/* Top Header Bar */}
      <View style={[styles.headerBar, { backgroundColor: t.card, borderColor: t.border }]}>
        <Button
          onlyIcon
          variant="ghost"
          size="medium"
          onPress={back}
          iconLeft={<ArrowLeft size={16} color={t.text} />}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.surface }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        />
        <Text variant="title" color="primary" style={{ marginLeft: 16 }}>LIVE TRACKING</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        {/* Simulated Map Visual */}
        <View style={[styles.mapMock, { backgroundColor: t.surface, borderColor: t.border }]}>
          <MapPin size={44} color={t.secondary} />
          <Text variant="body" color="text" style={{ fontWeight: 'bold', marginTop: 8 }}>Villas 45, Green Glen Layout</Text>
          <Text variant="caption" color="sub" style={{ marginTop: 2 }}>
            Arjun is <Text variant="mono" color="secondary" style={{ fontSize: 13, fontWeight: '700' }}>2.4 km</Text> away from your villa
          </Text>
        </View>

        {/* Delivery Agent Card */}
        <Card style={{ padding: 16, marginTop: 20, backgroundColor: t.card, borderColor: t.border }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.agentAvatar, { backgroundColor: isDark ? 'rgba(201, 107, 60, 0.2)' : 'rgba(201, 107, 60, 0.08)' }]}>
                <Text variant="body" style={{ fontSize: 16 }}>🚴</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text variant="body" color="text" style={{ fontWeight: '900' }}>Arjun Dev</Text>
                <Text variant="caption" color="sub" style={{ marginTop: 2 }}>
                  Delivery Executive · <Text variant="mono" color="accent" style={{ fontWeight: '700' }}>4.9</Text> ★
                </Text>
              </View>
            </View>

            <Button
              title="Call Arjun"
              variant="primary"
              size="small"
              fullWidth={false}
              style={{ paddingHorizontal: 12, height: 34, backgroundColor: t.primary, borderColor: t.primary }}
              iconLeft={<PhoneCall size={12} color="#FFFFFF" />}
              onPress={handleCallArjun}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Call Arjun"
              accessibilityHint="Places a phone call to delivery partner Arjun Dev"
            />
          </View>
        </Card>

        {/* FEATURE 5 — DELIVERY QUICK ACTIONS */}
        <Text variant="label" color="text" style={{ fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 24, marginBottom: 12 }}>
          Delivery Quick Instructions
        </Text>
        <Card style={{ padding: 14, backgroundColor: t.card, borderColor: t.border, borderRadius: 20 }}>
          <Text variant="caption" color="sub" style={{ marginBottom: 10 }}>
            Active Note: <Text variant="caption" color="primary" style={{ fontWeight: '800' }}>{activeInstruction}</Text>
          </Text>

          <View style={styles.quickActionChipsGrid}>
            {[
              { id: 'sec', title: 'Leave at Security', msg: 'Please leave dabba at security gate.', icon: ShieldCheck },
              { id: 'door', title: 'Leave at Door', msg: 'Leave on door hook outside.', icon: DoorOpen },
              { id: 'bell', title: 'Ring Bell & Leave', msg: 'Ring bell once and leave dabba.', icon: Bell },
            ].map(opt => {
              const IconComp = opt.icon;
              const isSel = activeInstruction === opt.title;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.actionChipItem,
                    {
                      backgroundColor: isSel ? (isDark ? 'rgba(122,147,104,0.2)' : 'rgba(75,93,58,0.1)') : t.surface,
                      borderColor: isSel ? t.primary : t.border,
                    }
                  ]}
                  onPress={() => handleSelectInstruction(opt.title, opt.msg)}
                >
                  <IconComp size={14} color={isSel ? t.primary : t.sub} style={{ marginRight: 6 }} />
                  <Text style={{ fontSize: 11, fontWeight: isSel ? '800' : '600', color: isSel ? t.primary : t.text }}>
                    {opt.title}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* Voice Note Quick Action */}
            <TouchableOpacity
              style={[
                styles.actionChipItem,
                {
                  backgroundColor: activeInstruction.includes('Voice') ? (isDark ? 'rgba(201,107,60,0.2)' : 'rgba(201,107,60,0.1)') : t.surface,
                  borderColor: activeInstruction.includes('Voice') ? t.secondary : t.border,
                }
              ]}
              onPress={() => setShowVoiceModal(true)}
            >
              <Mic size={14} color={activeInstruction.includes('Voice') ? t.secondary : t.sub} style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 11, fontWeight: activeInstruction.includes('Voice') ? '800' : '600', color: activeInstruction.includes('Voice') ? t.secondary : t.text }}>
                Voice Note 🎙️
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Delivery Steps timeline logs */}
        <Text variant="label" color="text" style={{ fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 24, marginBottom: 16 }}>
          Delivery Status Timeline
        </Text>
        
        <View style={styles.timelineBlock}>
          {[
            { t: 'Order Received', desc: '11:00 AM · Kitchen acknowledged slot', done: true },
            { t: 'Food Preparation Complete', desc: '11:20 AM · Chef packed in insulated steel box', done: true },
            { t: 'Dispatched from Hub', desc: '11:25 AM · Handed over to Arjun', done: true },
            { t: 'Arrived at Gate', desc: 'Awaiting arrival at security gate', active: true }
          ].map((step, i) => (
            <View key={i} style={styles.timelineRow}>
              <View style={styles.timelineIndicatorColumn}>
                <View style={[styles.timelineNodeLarge, { backgroundColor: step.done ? t.primary : step.active ? t.secondary : t.border }]}>
                  {step.done && <Check size={10} color="#FFFFFF" strokeWidth={3} />}
                </View>
                {i < 3 && <View style={[styles.timelineConnector, { backgroundColor: step.done ? t.primary : t.border }]} />}
              </View>
              <View style={{ flex: 1, marginLeft: 12, paddingBottom: 24 }}>
                <Text variant="body" color={step.done || step.active ? 'text' : 'muted'} style={{ fontWeight: 'bold' }}>{step.t}</Text>
                <Text variant="caption" color="sub" style={{ marginTop: 2 }}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Voice Note Recorder Modal */}
      <Modal
        visible={showVoiceModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowVoiceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.voiceModalBox, { backgroundColor: t.card, borderColor: t.border }]}>
            <View style={styles.modalHeaderRow}>
              <Text variant="title" color="text">Send Voice Instruction</Text>
              <TouchableOpacity onPress={() => setShowVoiceModal(false)} style={[styles.closeBtn, { backgroundColor: t.surface }]}>
                <X size={18} color={t.text} />
              </TouchableOpacity>
            </View>

            <Text variant="caption" color="sub" style={{ textAlign: 'center', marginVertical: 12 }}>
              Record a 5-second audio clip for rider Arjun.
            </Text>

            <View style={{ alignItems: 'center', paddingVertical: 20 }}>
              <TouchableOpacity
                style={[
                  styles.micRecordCircle,
                  { backgroundColor: isRecording ? t.secondary : t.primary }
                ]}
                onPress={handleStartVoiceRecording}
                disabled={isRecording}
              >
                {isRecording ? (
                  <ActivityIndicator size="large" color="#FFFFFF" />
                ) : (
                  <Mic size={32} color="#FFFFFF" />
                )}
              </TouchableOpacity>
              <Text variant="label" color="text" style={{ marginTop: 12, fontWeight: '800' }}>
                {isRecording ? 'Recording audio…' : voiceRecorded ? '✓ 5s Audio Recorded' : 'Tap mic to record'}
              </Text>
            </View>

            {voiceRecorded && (
              <Button
                title="Send Voice Note to Arjun ✈️"
                variant="primary"
                size="medium"
                style={{ marginTop: 12, backgroundColor: t.secondary, borderColor: t.secondary }}
                onPress={handleSendVoiceNote}
              />
            )}
          </View>
        </View>
      </Modal>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  mapMock: {
    height: 200,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  agentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionChipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionChipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  timelineBlock: {
    paddingLeft: 4,
  },
  timelineRow: {
    flexDirection: 'row',
  },
  timelineIndicatorColumn: {
    alignItems: 'center',
    width: 24,
  },
  timelineNodeLarge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    marginVertical: -2,
    zIndex: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  voiceModalBox: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micRecordCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
