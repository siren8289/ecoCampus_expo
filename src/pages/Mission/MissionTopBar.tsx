import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MissionTopBarProps {
  onBackPress?: () => void;
  onFilterPress?: () => void;
}

export const MissionTopBar: React.FC<MissionTopBarProps> = ({
  onBackPress,
  onFilterPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onBackPress}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>미션</Text>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onFilterPress}
        activeOpacity={0.7}
      >
        <Ionicons name="filter-outline" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#fffbf0',
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    letterSpacing: -0.44,
  },
});
