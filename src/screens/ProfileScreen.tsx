import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { Lesson } from '../types';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, resetProgress, allLessons } = useAppContext();
  
  // Calculate percentage of lessons completed
  const completionPercentage = Math.round((user.completedLessons.length / allLessons.length) * 100);
  
  // Calculate points needed for next level
  const pointsForNextLevel = (user.level) * 100;
  const pointsProgress = user.points % 100;
  const pointsProgressPercentage = (pointsProgress / 100) * 100;
  
  // Get count of unlocked badges and careers
  const unlockedBadges = user.badges.filter(badge => badge.unlocked).length;
  const unlockedCareers = user.careers.filter(career => career.unlocked).length;
  
  // Recently completed lessons
  const recentCompletedLessons = user.completedLessons
    .map(lessonId => allLessons.find(lesson => lesson.id === lessonId))
    .filter((lesson): lesson is Lesson => lesson !== undefined)
    .slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitial}>
              {user.username.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
        
        <Text style={styles.username}>{user.username}</Text>
        
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Level {user.level}</Text>
        </View>
      </View>
      
      <View style={styles.statsCard}>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completionPercentage}%</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{unlockedBadges}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>
        
        <View style={styles.levelProgressContainer}>
          <View style={styles.levelProgressLabels}>
            <Text style={styles.nextLevelText}>
              {pointsProgress} / 100 points to level {user.level + 1}
            </Text>
          </View>
          <View style={styles.levelProgressBar}>
            <View 
              style={[
                styles.levelProgressFill, 
                { width: `${pointsProgressPercentage}%` }
              ]} 
            />
          </View>
        </View>
      </View>
      
      <View style={styles.menuSection}>
        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => {
            // @ts-ignore - TypeScript doesn't know about nested navigation
            navigation.navigate('Achievements');
          }}
        >
          <View style={styles.menuContent}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>🏆</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Achievements</Text>
              <Text style={styles.menuSubtitle}>
                {unlockedBadges} of {user.badges.length} badges unlocked
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => {
            // @ts-ignore - TypeScript doesn't know about nested navigation
            navigation.navigate('Careers');
          }}
        >
          <View style={styles.menuContent}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>🌎</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Career Paths</Text>
              <Text style={styles.menuSubtitle}>
                {unlockedCareers} of {user.careers.length} careers unlocked
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
      {recentCompletedLessons.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Completed Lessons</Text>
          {recentCompletedLessons.map((lesson, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.recentLessonCard}
              onPress={() => {
                // @ts-ignore - TypeScript doesn't know about nested navigation
                navigation.navigate('LessonsTab', {
                  screen: 'LessonDetail',
                  params: { lessonId: lesson.id }
                });
              }}
            >
              <View style={styles.recentLessonInfo}>
                <Text style={styles.recentLessonTitle}>{lesson.title}</Text>
                <Text style={styles.recentLessonTopic}>{lesson.topic}</Text>
              </View>
              <View style={styles.recentLessonPoints}>
                <Text style={styles.recentLessonPointsText}>+{lesson.points}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.resetButton}
        onPress={() => {
          resetProgress();
        }}
      >
        <Text style={styles.resetButtonText}>Reset Progress</Text>
      </TouchableOpacity>
    </ScrollView>
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
    alignItems: 'center',
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  levelContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 5,
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
  },
  levelProgressContainer: {
    marginTop: 10,
  },
  levelProgressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nextLevelText: {
    fontSize: 14,
    color: '#757575',
  },
  levelProgressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  menuSection: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 24,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 3,
  },
  section: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentLessonCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentLessonInfo: {
    flex: 1,
  },
  recentLessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentLessonTopic: {
    fontSize: 14,
    color: '#757575',
    marginTop: 3,
  },
  recentLessonPoints: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  recentLessonPointsText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingVertical: 12,
    marginHorizontal: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#757575',
  },
});

export default ProfileScreen; 