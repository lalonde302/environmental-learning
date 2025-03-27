import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, allLessons } = useAppContext();

  // Calculate completion percentage
  const completionPercentage = 
    user.completedLessons.length > 0 
      ? Math.round((user.completedLessons.length / allLessons.length) * 100) 
      : 0;
  
  // Get top topics based on completed lessons
  const getTopics = () => {
    const uniqueTopics = Array.from(new Set(allLessons.map(lesson => lesson.topic)));
    return uniqueTopics.slice(0, 3);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
          style={styles.logo} 
        />
        <Text style={styles.appTitle}>EcoLearn</Text>
      </View>
      
      <View style={styles.userCard}>
        <Text style={styles.welcomeText}>Welcome, {user.username}!</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completionPercentage}%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <TouchableOpacity 
          style={styles.continueCard}
          onPress={() => {
            // @ts-ignore - TypeScript doesn't know about tab navigation
            navigation.navigate('LessonsTab');
          }}
        >
          <View style={styles.continueContent}>
            <Text style={styles.continueTitle}>
              {user.completedLessons.length === 0 
                ? 'Start your first lesson!' 
                : 'Continue your lessons'}
            </Text>
            <Text style={styles.continueSubtitle}>
              {completionPercentage}% completed
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${completionPercentage}%` }
              ]} 
            />
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore Topics</Text>
        <View style={styles.topicsContainer}>
          {getTopics().map((topic, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.topicCard}
              onPress={() => {
                // @ts-ignore - TypeScript doesn't know about tab navigation
                navigation.navigate('LessonsTab');
              }}
            >
              <Text style={styles.topicText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Achievements</Text>
        <TouchableOpacity 
          style={styles.achievementsCard}
          onPress={() => {
            // @ts-ignore - TypeScript doesn't know about nested navigation
            navigation.navigate('ProfileTab', {
              screen: 'Achievements',
            });
          }}
        >
          <Text style={styles.achievementsText}>
            View your badges and achievements
          </Text>
          <Text style={styles.achievementsStat}>
            {user.badges.filter(b => b.unlocked).length} / {user.badges.length} Unlocked
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Career Paths</Text>
        <TouchableOpacity 
          style={styles.careersCard}
          onPress={() => {
            // @ts-ignore - TypeScript doesn't know about nested navigation
            navigation.navigate('ProfileTab', {
              screen: 'Careers',
            });
          }}
        >
          <Text style={styles.careersText}>
            Discover environmental careers
          </Text>
          <Text style={styles.careersStat}>
            {user.careers.filter(c => c.unlocked).length} / {user.careers.length} Unlocked
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userCard: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  continueCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  continueContent: {
    marginBottom: 10,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topicCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  achievementsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementsStat: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
  },
  careersCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 30,
  },
  careersText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  careersStat: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
  }
});

export default HomeScreen; 