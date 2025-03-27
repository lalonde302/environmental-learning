import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../types';

type LessonDetailRouteProp = RouteProp<RootStackParamList, 'LessonDetail'>;

const LessonDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<LessonDetailRouteProp>();
  const { lessonId } = route.params;
  const { allLessons, user } = useAppContext();
  
  // Find the lesson by ID
  const lesson = allLessons.find(l => l.id === lessonId);
  
  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lesson not found</Text>
      </View>
    );
  }
  
  const isCompleted = user.completedLessons.includes(lessonId);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{lesson.title}</Text>
        <View style={styles.topicContainer}>
          <Text style={styles.topicText}>{lesson.topic}</Text>
        </View>
      </View>
      
      <View style={styles.contentCard}>
        <Text style={styles.contentText}>{lesson.content}</Text>
        
        {isCompleted ? (
          <View style={styles.completedContainer}>
            <Text style={styles.completedText}>
              You have completed this lesson!
            </Text>
            <View style={styles.pointsEarned}>
              <Text style={styles.pointsText}>
                +{lesson.points} points earned
              </Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.startQuizButton}
            onPress={() => {
              // @ts-ignore - TypeScript doesn't know about navigation params
              navigation.navigate('Quiz', { lessonId });
            }}
          >
            <Text style={styles.startQuizButtonText}>Take Quiz</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Learning Objectives</Text>
        <View style={styles.objectivesList}>
          <View style={styles.objectiveItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.objectiveText}>
              Understand key concepts about {lesson.topic.toLowerCase()}
            </Text>
          </View>
          <View style={styles.objectiveItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.objectiveText}>
              Learn how {lesson.topic.toLowerCase()} affects our environment
            </Text>
          </View>
          <View style={styles.objectiveItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.objectiveText}>
              Explore solutions and actions related to {lesson.topic.toLowerCase()}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Quiz Preview</Text>
        <Text style={styles.quizPreviewText}>
          This lesson has {lesson.questions.length} questions to test your knowledge.
          Complete the quiz to earn {lesson.points} points!
        </Text>
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
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  topicContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  topicText: {
    color: 'white',
    fontWeight: '500',
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    marginTop: -15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#424242',
    marginBottom: 20,
  },
  startQuizButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startQuizButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  objectivesList: {
    marginTop: 5,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginTop: 6,
    marginRight: 10,
  },
  objectiveText: {
    flex: 1,
    fontSize: 15,
    color: '#424242',
  },
  quizPreviewText: {
    fontSize: 15,
    color: '#424242',
    lineHeight: 22,
  },
  completedContainer: {
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  completedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  pointsEarned: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 5,
  },
  pointsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#f44336',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default LessonDetailScreen; 