import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { ArrowLeft, Search, Trash2, Copy, Edit2, RotateCw, AlertTriangle } from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import { B, F, theme, Button, Input, Modal, Card } from '../../design-system';
import { storage } from '../../core/utils/storage';

interface StorageScreenProps {
  onBack: () => void;
}

export default function StorageScreen({ onBack }: StorageScreenProps) {
  const { setToast, t } = useAppContext();
  const [keys, setKeys] = useState<{ name: string; value: string; category: string }[]>([]);
  const [search, setSearch] = useState('');
  
  // Edit key Modal State
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingVal, setEditingVal] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const loadKeys = async () => {
    try {
      const allKeys = await storage.getAllKeys();
      const list = await Promise.all(
        allKeys.map(async key => {
          const val = await storage.getItem(key);
          let category = 'Settings';
          if (key.includes('onboarding') || key.includes('setup')) category = 'Onboarding';
          else if (key.includes('user') || key.includes('auth')) category = 'Authentication';
          else if (key.includes('address')) category = 'User Data';
          else if (key.includes('theme') || key.includes('language')) category = 'Settings';
          return {
            name: key,
            value: val || '',
            category
          };
        })
      );
      setKeys(list);
    } catch (err) {
      setToast('Failed to load storage keys');
    }
  };

  useEffect(() => {
    loadKeys();
  }, []);

  const handleCopy = (val: string) => {
    try {
      // standard copying
      // In web fallback
      const textarea = document.createElement('textarea');
      textarea.value = val;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setToast('📋 Value copied to clipboard!');
    } catch {
      setToast('Copy failed');
    }
  };

  const handleDelete = async (key: string) => {
    await storage.removeItem(key);
    setToast(`Deleted key: ${key}`);
    loadKeys();
  };

  const handleClearAll = async () => {
    await storage.clear();
    setToast('🧹 Storage completely cleared!');
    loadKeys();
  };

  const startEdit = (key: string, val: string) => {
    setEditingKey(key);
    setEditingVal(val);
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    if (!editingKey) return;
    await storage.setItem(editingKey, editingVal);
    setToast(`Saved changes for key: ${editingKey}`);
    setShowEditModal(false);
    loadKeys();
  };

  const filteredKeys = keys.filter(
    k => k.name.toLowerCase().includes(search.toLowerCase()) || k.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text, fontFamily: F.heading }]}>Storage Inspector</Text>
        <TouchableOpacity onPress={loadKeys} style={styles.refreshButton}>
          <RotateCw size={18} color={t.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={16} color={t.muted} style={styles.searchIcon} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search storage keys or values..."
          placeholderTextColor={t.muted}
          style={[styles.searchInput, { color: t.text, borderColor: t.border, backgroundColor: t.card }]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Actions panel */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={handleClearAll}
            style={[styles.actionBtn, { flex: 1, backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' }]}
          >
            <AlertTriangle size={16} color="#EF4444" />
            <Text style={{ fontSize: 11, fontWeight: '800', color: '#EF4444' }}>WIPE STORAGE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={loadKeys}
            style={[styles.actionBtn, { flex: 1, backgroundColor: t.card, borderColor: t.border }]}
          >
            <RotateCw size={16} color={t.text} />
            <Text style={{ fontSize: 11, fontWeight: '800', color: t.text }}>REFRESH LIST</Text>
          </TouchableOpacity>
        </View>

        {/* Storage Keys list */}
        {filteredKeys.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: t.muted, fontSize: 13 }}>No storage keys match search query.</Text>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {filteredKeys.map(item => (
              <Card key={item.name} style={{ padding: 14 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <View style={[styles.categoryBadge, { backgroundColor: item.category === 'Onboarding' ? '#E0F2FE' : (item.category === 'Authentication' ? '#ECFDF5' : '#F5F5F5') }]}>
                      <Text style={{ fontSize: 9, fontWeight: '800', color: item.category === 'Onboarding' ? '#0369A1' : (item.category === 'Authentication' ? '#047857' : '#737373') }}>
                        {item.category.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: F.mono, fontSize: 12, fontWeight: '700', color: t.text }}>{item.name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity onPress={() => startEdit(item.name, item.value)}>
                      <Edit2 size={14} color={t.sub} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCopy(item.value)}>
                      <Copy size={14} color={t.sub} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.name)}>
                      <Trash2 size={14} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={{ fontFamily: F.mono, fontSize: 11, color: t.sub, marginTop: 8, padding: 8, backgroundColor: t.input, borderRadius: 8, overflow: 'hidden' }}>
                  {item.value || '(Empty value)'}
                </Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Edit Value Modal */}
      <Modal visible={showEditModal} onClose={() => setShowEditModal(false)}>
        <View style={{ padding: 4 }}>
          <Text style={{ fontFamily: F.heading, fontSize: 15, fontWeight: '800', color: t.text, marginBottom: 4 }}>Edit Key Value</Text>
          <Text style={{ fontSize: 11, fontFamily: F.mono, color: t.sub, marginBottom: 12 }}>{editingKey}</Text>
          
          <Input
            label="Storage Value"
            value={editingVal}
            onChangeText={setEditingVal}
            placeholder="Key value..."
            multiline
            numberOfLines={4}
          />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
            <Button title="Cancel" variant="ghost" style={{ flex: 1 }} onPress={() => setShowEditModal(false)} />
            <Button title="Save" style={{ flex: 1 }} onPress={saveEdit} />
          </View>
        </View>
      </Modal>
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
  refreshButton: {
    padding: 8,
    marginLeft: 'auto',
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
  actionBtn: {
    height: 42,
    borderWidth: 1.5,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  categoryBadge: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
});
