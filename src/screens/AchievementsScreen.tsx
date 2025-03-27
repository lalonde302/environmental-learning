import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { Badge } from '../types';

const AchievementsScreen = () => {
  const { user } = useAppContext();
  
  const renderBadgeItem = ({ item }: { item: Badge }) => {
    return (
      <View style={[
        styles.badgeCard,
        item.unlocked ? styles.unlockedBadge : styles.lockedBadge,
      ]}>
        <View style={styles.badgeIconContainer}>
          <Text style={styles.badgeIcon}>{item.image}</Text>
        </View>
        <View style={styles.badgeContent}>
          <Text style={styles.badgeName}>{item.name}</Text>
          <Text style={styles.badgeDescription}>{item.description}</Text>
          {!item.unlocked && (
            <View style={styles.requirementContainer}>
              <Text style={styles.requirementText}>
                {item.requirementType === 'points' 
                  ? `Requires ${item.requirementValue} points` 
                  : item.requirementType === 'lessons'
                    ? `Complete ${item.requirementValue} lessons`
                    : `Complete ${item.requirementValue} quizzes`
                }
              </Text>
            </View>
          )}
        </View>
        {item.unlocked && (
          <View style={styles.unlockedTag}>
            <Text style={styles.unlockedText}>Unlocked</Text>
          </View>
        )}
      </View>
    );
  };

  // Separate unlocked and locked badges
  const unlockedBadges = user.badges.filter(badge => badge.unlocked);
  const lockedBadges = user.badges.filter(badge => !badge.unlocked);
  
  // Combine them to display unlocked badges first
  const sortedBadges = [...unlockedBadges, ...lockedBadges];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.subtitle}>
          {unlockedBadges.length} of {user.badges.length} badges unlocked
        </Text>
      </View>
      
      <FlatList
        data={sortedBadges}
        renderItem={renderBadgeItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.badgesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  badgesList: {
    padding: 15,
    paddingBottom: 30,
  },
  badgeCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unlockedBadge: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  lockedBadge: {
    opacity: 0.7,
  },
  badgeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  badgeIcon: {
    fontSize: 30,
  },
  badgeContent: {
    flex: 1,
  },
  badgeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  badgeDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5,
  },
  requirementContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  requirementText: {
    fontSize: 12,
    color: '#757575',
  },
  unlockedTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  unlockedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default AchievementsScreen; 