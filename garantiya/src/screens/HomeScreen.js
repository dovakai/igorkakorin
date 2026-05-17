import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import WarrantyCard from '../components/WarrantyCard';
import { loadItems } from '../utils/storage';
import { getDaysLeft, getExpiryDate } from '../utils/warrantyHelpers';

const SAMPLE_ITEMS = [
  {
    id: '1',
    name: 'MacBook Pro 14"',
    category: 'electronics',
    purchaseDate: '2024-01-15',
    warrantyMonths: 24,
    store: 're:Store',
    notes: 'Серийный номер: C02XL0XXMD6N',
    photos: [],
  },
  {
    id: '2',
    name: 'Холодильник Samsung',
    category: 'appliances',
    purchaseDate: '2023-08-20',
    warrantyMonths: 36,
    store: 'М.Видео',
    notes: '',
    photos: [],
  },
  {
    id: '3',
    name: 'Дрель Bosch',
    category: 'tools',
    purchaseDate: '2025-04-01',
    warrantyMonths: 2,
    store: 'Леруа Мерлен',
    notes: '',
    photos: [],
  },
  {
    id: '4',
    name: 'Toyota Camry — ТО',
    category: 'auto',
    purchaseDate: '2025-02-10',
    warrantyMonths: 12,
    store: 'Официальный дилер',
    notes: 'Пробег при обслуживании: 87 000 км',
    photos: [],
  },
  {
    id: '5',
    name: 'Пылесос Dyson V15',
    category: 'appliances',
    purchaseDate: '2022-11-01',
    warrantyMonths: 24,
    store: 'DNS',
    notes: '',
    photos: [],
  },
];

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadItems().then((stored) => {
        setItems(stored.length > 0 ? stored : SAMPLE_ITEMS);
      });
    }, [])
  );

  const sorted = [...items].sort((a, b) => {
    const da = getDaysLeft(getExpiryDate(a.purchaseDate, a.warrantyMonths));
    const db = getDaysLeft(getExpiryDate(b.purchaseDate, b.warrantyMonths));
    return da - db;
  });

  const active = sorted.filter(
    (i) => getDaysLeft(getExpiryDate(i.purchaseDate, i.warrantyMonths)) >= 0
  );
  const expired = sorted.filter(
    (i) => getDaysLeft(getExpiryDate(i.purchaseDate, i.warrantyMonths)) < 0
  );

  const sections = [];
  if (active.length > 0) sections.push({ title: 'Активные', data: active });
  if (expired.length > 0) sections.push({ title: 'Истекшие', data: expired });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ГарантиЯ</Text>
          <Text style={styles.subtitle}>{items.length} {itemsLabel(items.length)}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddItem')}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WarrantyCard
            item={item}
            onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState onAdd={() => navigation.navigate('AddItem')} />}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}

function EmptyState({ onAdd }) {
  return (
    <View style={styles.empty}>
      <Ionicons name="shield-checkmark-outline" size={64} color={Colors.textTertiary} />
      <Text style={styles.emptyTitle}>Нет гарантий</Text>
      <Text style={styles.emptyText}>Добавьте первое устройство, чтобы отслеживать гарантию</Text>
      <TouchableOpacity style={styles.emptyButton} onPress={onAdd} activeOpacity={0.8}>
        <Text style={styles.emptyButtonText}>Добавить</Text>
      </TouchableOpacity>
    </View>
  );
}

function itemsLabel(count) {
  if (count % 10 === 1 && count % 100 !== 11) return 'устройство';
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'устройства';
  return 'устройств';
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  list: {
    paddingBottom: 32,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyButton: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  emptyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
