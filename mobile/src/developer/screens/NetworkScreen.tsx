import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { ArrowLeft, Wifi, RefreshCw, Activity, AlertTriangle, ShieldCheck } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme, Button, Card, Divider } from '../../design-system';

interface NetworkScreenProps {
  onBack: () => void;
}

export default function NetworkScreen({ onBack }: NetworkScreenProps) {
  const { setToast, t } = useAppContext();
  const [loadingPing, setLoadingPing] = useState(false);
  const [latency, setLatency] = useState<number | null>(42);
  const [connType, setConnType] = useState<'WiFi' | 'Cellular' | 'Offline'>('WiFi');

  const pingTest = async () => {
    setLoadingPing(true);
    const start = Date.now();
    try {
      // Simulate real ping fetch time
      await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 100));
      const end = Date.now();
      setLatency(end - start - 150);
      setToast('⚡ Ping successful!');
    } catch {
      setLatency(null);
      setToast('❌ Ping failed');
    } finally {
      setLoadingPing(false);
    }
  };

  const failedRequests = [
    { endpoint: '/api/v1/auth/google', time: '10:42:15 AM', status: 503, reason: 'Service Unavailable' },
    { endpoint: '/api/v1/kitchens/tour-book', time: '11:15:32 AM', status: 400, reason: 'Validation: Invalid visitor count' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Network & Latency</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Connection status card */}
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: connType === 'Offline' ? '#FEE2E2' : '#E8F5E9', justifyContent: 'center', alignItems: 'center' }}>
              <Wifi size={22} color={connType === 'Offline' ? '#EF4444' : '#2E7D32'} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '800', color: t.text }}>Network State</Text>
              <Text style={{ fontSize: 11, color: t.sub }}>
                {connType === 'Offline' ? 'Device is offline' : `Connected via ${connType}`}
              </Text>
            </View>
            <View style={[styles.onlineIndicator, { backgroundColor: connType === 'Offline' ? '#EF4444' : '#4CAF50' }]} />
          </View>

          <Divider style={{ marginVertical: 12 }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
            <TouchableOpacity
              onPress={() => setConnType('WiFi')}
              style={[styles.toggleBtn, connType === 'WiFi' && { borderColor: B.orange, backgroundColor: B.orangeL }]}
            >
              <Text style={[styles.toggleText, { color: connType === 'WiFi' ? B.orange : t.text }]}>WiFi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setConnType('Cellular')}
              style={[styles.toggleBtn, connType === 'Cellular' && { borderColor: B.orange, backgroundColor: B.orangeL }]}
            >
              <Text style={[styles.toggleText, { color: connType === 'Cellular' ? B.orange : t.text }]}>Cellular</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setConnType('Offline')}
              style={[styles.toggleBtn, connType === 'Offline' && { borderColor: '#EF4444', backgroundColor: '#FEE2E2' }]}
            >
              <Text style={[styles.toggleText, { color: connType === 'Offline' ? '#EF4444' : t.text }]}>Offline</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Latency checker */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>API ENVIRONMENT DIAGNOSTICS</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16, gap: 12 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13, color: t.sub, fontWeight: '700' }}>Active Environment</Text>
            <Text style={{ fontSize: 13, color: t.text, fontWeight: '800' }}>Staging (Mocked)</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13, color: t.sub, fontWeight: '700' }}>Backend Base URL</Text>
            <Text style={{ fontSize: 12, fontFamily: F.mono, color: t.text, fontWeight: '700' }}>
              https://staging.koikoi.in
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: t.sub, fontWeight: '700' }}>API Latency</Text>
            {loadingPing ? (
              <ActivityIndicator size="small" color={B.orange} />
            ) : (
              <Text style={{ fontSize: 14, fontFamily: F.mono, color: latency ? '#2E7D32' : '#EF4444', fontWeight: '800' }}>
                {latency ? `${latency} ms` : 'Disconnected'}
              </Text>
            )}
          </View>

          <Button
            title="Measure Latency"
            variant="ghost"
            loading={loadingPing}
            onPress={pingTest}
            style={{ marginTop: 6 }}
          />
        </View>

        {/* Failed Requests Queue */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 12 }]}>FAILED REQUESTS LOGS</Text>
        <View style={{ gap: 12 }}>
          {failedRequests.map((req, idx) => (
            <Card key={idx} style={{ padding: 14 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <View style={{ paddingVertical: 3, paddingHorizontal: 6, borderRadius: 6, backgroundColor: '#FEE2E2' }}>
                    <Text style={{ fontSize: 9, fontWeight: '800', color: '#EF4444' }}>{req.status}</Text>
                  </View>
                  <Text style={{ fontFamily: F.mono, fontSize: 12, fontWeight: '700', color: t.text }}>{req.endpoint}</Text>
                </View>
                <Text style={{ fontSize: 10, color: t.muted, fontWeight: '600' }}>{req.time}</Text>
              </View>
              <Text style={{ fontSize: 11, color: t.sub, marginTop: 8, fontStyle: 'italic' }}>
                Reason: {req.reason}
              </Text>
            </Card>
          ))}
        </View>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginLeft: 12,
    marginBottom: 8,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  toggleBtn: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
