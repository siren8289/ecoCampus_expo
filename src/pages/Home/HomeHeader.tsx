import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HomeHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>당신의 실천이</Text>
        <View style={styles.titleRow}>
          <Text style={styles.title}>우리 캠퍼스를 푸르게 합니다</Text>
          <Text style={styles.emoji}>🍀</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  textContainer: {
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
    letterSpacing: -0.45,
    lineHeight: 30,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  emoji: {
    fontSize: 24,
    lineHeight: 32,
  },
});

