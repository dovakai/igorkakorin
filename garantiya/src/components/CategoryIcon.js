import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCategoryById } from '../constants/categories';

export default function CategoryIcon({ categoryId, size = 22, containerSize = 44 }) {
  const cat = getCategoryById(categoryId);
  return (
    <View
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 4,
          backgroundColor: cat.color + '1A',
        },
      ]}
    >
      <Ionicons name={cat.icon} size={size} color={cat.color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
