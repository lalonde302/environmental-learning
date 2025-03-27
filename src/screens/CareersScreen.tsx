import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { Career } from '../types';

const CareersScreen = () => {
  const { user } = useAppContext();
  
  const renderCareerItem = ({ item }: { item: Career }) => {
    return (
      <View style={[
        styles.careerCard,
        item.unlocked ? styles.unlockedCareer : styles.lockedCareer,
      ]}>
        <View style={styles.careerHeader}>
          <Text style={styles.careerTitle}>{item.title}</Text>
          {!item.unlocked && (
            <View style={styles.lockContainer}>
              <Text style={styles.lockText}>Locked</Text>
            </View>
          )}
          {item.unlocked && (
            <View style={styles.unlockContainer}>
              <Text style={styles.unlockText}>Unlocked</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.careerDescription}>{item.description}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements:</Text>
          <View style={styles.requirementsList}>
            {item.requirements.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.requirementText}>{requirement}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {!item.unlocked && (
          <View style={styles.pointsRequiredContainer}>
            <Text style={styles.pointsRequiredText}>
              Requires {item.pointsRequired} points to unlock
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min((user.points / item.pointsRequired) * 100, 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {user.points} / {item.pointsRequired} points
            </Text>
          </View>
        )}
      </View>
    );
  };

  // Separate unlocked and locked careers
  const unlockedCareers = user.careers.filter(career => career.unlocked);
  const lockedCareers = user.careers.filter(career => !career.unlocked);
  
  // Combine them to display unlocked careers first
  const sortedCareers = [...unlockedCareers, ...lockedCareers];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Environmental Careers</Text>
        <Text style={styles.subtitle}>
          {unlockedCareers.length} of {user.careers.length} careers unlocked
        </Text>
      </View>
      
      <FlatList
        data={sortedCareers}
        renderItem={renderCareerItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.careersList}
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
  careersList: {
    padding: 15,
    paddingBottom: 30,
  },
  careerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unlockedCareer: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  lockedCareer: {
    opacity: 0.8,
  },
  careerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  careerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  lockContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  lockText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: 'bold',
  },
  unlockContainer: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  unlockText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  careerDescription: {
    fontSize: 15,
    color: '#424242',
    marginBottom: 15,
    lineHeight: 22,
  },
  section: {
    marginTop: 5,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  requirementsList: {
    marginLeft: 5,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginTop: 6,
    marginRight: 10,
  },
  requirementText: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
  },
  pointsRequiredContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    marginTop: 5,
  },
  pointsRequiredText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#757575',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'right',
  },
});

export default CareersScreen; 