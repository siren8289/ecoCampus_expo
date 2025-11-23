import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MissionFilter } from '../../types';

interface FilterTabsProps {
  activeFilter: MissionFilter;
  onFilterChange: (filter: MissionFilter) => void;
}

const filters: { key: MissionFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'recycle', label: '재활용' },
  { key: 'quiz', label: '퀴즈' },
  { key: 'content', label: '콘텐츠' },
  { key: 'contest', label: '공모전' },
];

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.key;
        return (
          <TouchableOpacity
            key={filter.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onFilterChange(filter.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  container: {
    flexDirection: 'row',
    gap: 18,
    paddingRight: 16,
  },
  tab: {
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 13,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#81d18a',
    borderColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  activeTabText: {
    color: '#000',
  },
});

