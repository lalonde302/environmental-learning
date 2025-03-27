import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { Lesson } from '../types';

const LessonsScreen = () => {
  const navigation = useNavigation();
  const { allLessons, user } = useAppContext();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Get unique topics
  const topics = Array.from(new Set(allLessons.map(lesson => lesson.topic)));

  // Filter lessons by selected topic
  const filteredLessons = selectedTopic 
    ? allLessons.filter(lesson => lesson.topic === selectedTopic)
    : allLessons;

  const renderLessonItem = ({ item }: { item: Lesson }) => {
    const isCompleted = user.completedLessons.includes(item.id);
    
    return (
      <TouchableOpacity 
        style={[
          styles.lessonCard,
          isCompleted ? styles.completedLesson : {}
        ]}
        onPress={() => {
          // @ts-ignore - TypeScript doesn't know about navigation params
          navigation.navigate('LessonDetail', { lessonId: item.id });
        }}
      >
        <View style={styles.lessonHeader}>
          <View>
            <Text style={styles.lessonTitle}>{item.title}</Text>
            <Text style={styles.lessonTopic}>{item.topic}</Text>
          </View>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{item.points} pts</Text>
          </View>
        </View>
        <Text style={styles.lessonDescription}>{item.description}</Text>
        {isCompleted && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Environmental Lessons</Text>
      </View>
      
      <View style={styles.topicsContainer}>
        <ScrollableTopics 
          topics={topics} 
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />
      </View>
      
      <FlatList
        data={filteredLessons}
        renderItem={renderLessonItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lessonsList}
      />
    </View>
  );
};

// Horizontal scrollable topics component
const ScrollableTopics = ({ 
  topics, 
  selectedTopic, 
  onSelectTopic 
}: { 
  topics: string[], 
  selectedTopic: string | null, 
  onSelectTopic: (topic: string | null) => void 
}) => {
  return (
    <FlatList
      horizontal
      data={['All', ...topics]}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.topicChip,
            (selectedTopic === item || (item === 'All' && selectedTopic === null)) 
              ? styles.selectedTopicChip 
              : {}
          ]}
          onPress={() => onSelectTopic(item === 'All' ? null : item)}
        >
          <Text 
            style={[
              styles.topicChipText,
              (selectedTopic === item || (item === 'All' && selectedTopic === null)) 
                ? styles.selectedTopicChipText 
                : {}
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.topicChipsContainer}
    />
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
  },
  topicsContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  topicChipsContainer: {
    paddingHorizontal: 15,
  },
  topicChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedTopicChip: {
    backgroundColor: '#4CAF50',
  },
  topicChipText: {
    color: '#757575',
    fontWeight: '500',
  },
  selectedTopicChipText: {
    color: 'white',
  },
  lessonsList: {
    padding: 15,
    paddingBottom: 30,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  completedLesson: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonTopic: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#424242',
  },
  pointsBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  pointsText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 12,
  },
  completedBadge: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E8F5E9',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  completedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default LessonsScreen; 