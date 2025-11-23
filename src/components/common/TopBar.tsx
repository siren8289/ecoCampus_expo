import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TopBarProps {
  onNotificationPress?: () => void;
  onSettingsPress?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  onNotificationPress, 
  onSettingsPress 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ecocampus+</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onSettingsPress}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6bbf76',
    letterSpacing: 0.5,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

