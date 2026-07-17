import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Clipboard } from 'react-native';
import { ArrowLeft, Play, Terminal, Copy, Trash2, Send } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme, Button, Card, Divider } from '../../design-system';

interface ApiPlaygroundScreenProps {
  onBack: () => void;
}

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT';
  path: string;
  headers: Record<string, string>;
  body?: string;
  mockResponse: Record<string, any>;
}

export default function ApiPlaygroundScreen({ onBack }: ApiPlaygroundScreenProps) {
  const { setToast, t } = useAppContext();
  const [selectedEndpointIdx, setSelectedEndpointIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [resTime, setResTime] = useState<number | null>(null);
  const [resStatus, setResStatus] = useState<number | null>(null);

  const endpoints: ApiEndpoint[] = [
    {
      method: 'POST',
      path: '/api/v1/auth/otp/send',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '+91 98765 43210' }, null, 2),
      mockResponse: { success: true, message: 'OTP code sent successfully to +91 98765 43210', expires_in_sec: 60 }
    },
    {
      method: 'GET',
      path: '/api/v1/meals/list?category=veg',
      headers: { 'Authorization': 'Bearer (mock_jwt_token)' },
      mockResponse: {
        success: true,
        meals: [
          { id: 1, name: 'Premium Muji Dal Khichdi', category: 'veg', calories: 420 },
          { id: 2, name: 'Handcrafted Paneer Thali', category: 'veg', calories: 650 }
        ]
      }
    },
    {
      method: 'POST',
      path: '/api/v1/subscriptions/subscribe',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer (mock_jwt_token)' },
      body: JSON.stringify({ plan_id: 'koi_daily_lunch', start_date: '2026-07-18' }, null, 2),
      mockResponse: { success: true, subscription_id: 'sub_8392019a', start_date: '2026-07-18', next_billing: '2026-08-18' }
    }
  ];

  const selectedEndpoint = endpoints[selectedEndpointIdx];

  const fireRequest = async () => {
    setLoading(true);
    setResponse(null);
    const start = Date.now();
    try {
      // Simulate real api delay
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 200));
      const end = Date.now();
      setResTime(end - start);
      setResStatus(200);
      setResponse(selectedEndpoint.mockResponse);
      setToast('API Call Executed successfully!');
    } catch {
      setResStatus(500);
      setResponse({ error: 'Internal Server Error' });
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (!response) return;
    Clipboard.setString(JSON.stringify(response, null, 2));
    setToast('📋 Response copied to clipboard!');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>API Sandbox Bench</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Endpoint selector */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>SELECT ENDPOINT</Text>
        <View style={{ gap: 8, marginBottom: 20 }}>
          {endpoints.map((ep, idx) => (
            <TouchableOpacity
              key={ep.path}
              onPress={() => {
                setSelectedEndpointIdx(idx);
                setResponse(null);
                setResTime(null);
                setResStatus(null);
              }}
              style={[
                styles.endpointBtn,
                { backgroundColor: t.card, borderColor: selectedEndpointIdx === idx ? B.orange : t.border }
              ]}
            >
              <View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#ECFDF5' : '#EFF6FF' }]}>
                <Text style={{ fontSize: 9, fontWeight: '900', color: ep.method === 'GET' ? '#047857' : '#1D4ED8' }}>
                  {ep.method}
                </Text>
              </View>
              <Text style={{ fontFamily: F.mono, fontSize: 11, fontWeight: '700', color: t.text, flex: 1 }}>{ep.path}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Request details */}
        <Text style={[styles.sectionTitle, { color: t.sub }]}>REQUEST CONFIG</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
          <Text style={styles.payloadLabel}>Headers</Text>
          <View style={[styles.codeBlock, { backgroundColor: t.input }]}>
            <Text style={{ fontFamily: F.mono, fontSize: 10.5, color: t.text }}>
              {JSON.stringify(selectedEndpoint.headers, null, 2)}
            </Text>
          </View>

          {selectedEndpoint.body && (
            <>
              <Text style={[styles.payloadLabel, { marginTop: 12 }]}>Request Body</Text>
              <View style={[styles.codeBlock, { backgroundColor: t.input }]}>
                <Text style={{ fontFamily: F.mono, fontSize: 10.5, color: t.text }}>
                  {selectedEndpoint.body}
                </Text>
              </View>
            </>
          )}

          <Button
            title="Execute Mock Call"
            onPress={fireRequest}
            loading={loading}
            style={{ marginTop: 16 }}
          />
        </View>

        {/* Response */}
        <Text style={[styles.sectionTitle, { color: t.sub, marginTop: 24 }]}>API RESPONSE</Text>
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border, padding: 16 }]}>
          {loading ? (
            <View style={{ height: 120, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="small" color={B.orange} />
            </View>
          ) : response ? (
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <View style={{ paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6, backgroundColor: resStatus === 200 ? '#ECFDF5' : '#FEF2F2' }}>
                    <Text style={{ fontSize: 10, fontWeight: '800', color: resStatus === 200 ? '#047857' : '#EF4444' }}>
                      Status {resStatus}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: F.mono, fontSize: 11, fontWeight: '700', color: t.sub }}>{resTime} ms</Text>
                </View>

                <TouchableOpacity onPress={copyResponse} style={styles.copyBtn}>
                  <Copy size={12} color={B.orange} />
                  <Text style={{ fontSize: 10.5, color: B.orange, fontWeight: '700' }}>Copy</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.codeBlock, { backgroundColor: t.input }]}>
                <Text style={{ fontFamily: F.mono, fontSize: 10.5, color: t.text }}>
                  {JSON.stringify(response, null, 2)}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
              <Terminal size={24} color={t.muted} />
              <Text style={{ fontSize: 11, color: t.muted, marginTop: 8 }}>Execute request to view response</Text>
            </View>
          )}
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
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginLeft: 12,
    marginBottom: 8,
  },
  endpointBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1.5,
    borderRadius: 14,
    gap: 10,
  },
  methodBadge: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  payloadLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8A857B',
    marginBottom: 6,
  },
  codeBlock: {
    padding: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
