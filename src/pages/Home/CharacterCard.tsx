import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CharacterData } from '../../types';

interface CharacterCardProps {
  data: CharacterData;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lv.{data.level}</Text>
        </View>
        <Text style={styles.characterText}>나의 캐릭터</Text>
        <Text style={styles.growthText}>
          오늘의 성장률 +{data.growthRate}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 21,
    marginHorizontal: 16,
    marginTop: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  levelBadge: {
    backgroundColor: '#6bbf76',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 9,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  characterText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  growthText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginLeft: 'auto',
    letterSpacing: -0.31,
  },
});

