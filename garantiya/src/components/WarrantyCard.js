import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { getCategoryById } from '../constants/categories';
import CategoryIcon from './CategoryIcon';
import {
  getDaysLeft,
  getExpiryDate,
  getStatusColor,
  getStatusBgColor,
  formatDaysLeft,
  formatDate,
} from '../utils/warrantyHelpers';

export default function WarrantyCard({ item, onPress }) {
  const expiryDate = getExpiryDate(item.purchaseDate, item.warrantyMonths);
  const daysLeft = getDaysLeft(expiryDate);
  const statusColor = getStatusColor(daysLeft);
  const statusBgColor = getStatusBgColor(daysLeft);
  const cat = getCategoryById(item.category);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <CategoryIcon categoryId={item.category} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.category}>{cat.label}</Text>
        <Text style={styles.expiry}>До {formatDate(expiryDate)}</Text>
      </View>

      <View style={[styles.badge, { backgroundColor: statusBgColor }]}>
        <Text style={[styles.badgeText, { color: statusColor }]}>{formatDaysLeft(daysLeft)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  category: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  expiry: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 3,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 72,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});
