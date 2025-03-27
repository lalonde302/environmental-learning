import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList, Question } from '../types';

type QuizRouteProp = RouteProp<RootStackParamList, 'Quiz'>;

const QuizScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<QuizRouteProp>();
  const { lessonId } = route.params;
  const { allLessons, completeLesson } = useAppContext();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    // Find the lesson and get its questions
    const lesson = allLessons.find(l => l.id === lessonId);
    if (lesson) {
      setQuestions(lesson.questions);
    }
  }, [lessonId, allLessons]);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
  
  const handleNext = () => {
    if (selectedOption === null) {
      Alert.alert('Please select an answer');
      return;
    }
    
    // Check if answer is correct
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question or complete quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Quiz completed
      setIsQuizCompleted(true);
      
      // Complete the lesson
      completeLesson(lessonId);
    }
  };
  
  const handleFinish = () => {
    // @ts-ignore - TypeScript doesn't know about going back to the root
    navigation.navigate('LessonDetail', { lessonId });
  };
  
  if (!currentQuestion && !isQuizCompleted) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {!isQuizCompleted ? (
        <>
          <View style={styles.header}>
            <Text style={styles.quizProgress}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.text}</Text>
            
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.optionCard,
                    selectedOption === option ? styles.selectedOption : {}
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text 
                    style={[
                      styles.optionText,
                      selectedOption === option ? styles.selectedOptionText : {}
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.nextButton,
              selectedOption === null ? styles.disabledButton : {}
            ]}
            onPress={handleNext}
            disabled={selectedOption === null}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.resultsContainer}>
          <View style={styles.scoreCard}>
            <Text style={styles.congratsText}>Quiz Completed!</Text>
            <Text style={styles.scoreText}>
              Your Score: {score} / {questions.length}
            </Text>
            <View style={styles.resultProgressBar}>
              <View 
                style={[
                  styles.resultProgressFill, 
                  { width: `${(score / questions.length) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.feedbackText}>
              {score === questions.length 
                ? 'Perfect! You mastered this lesson!' 
                : score >= questions.length / 2 
                  ? 'Great job! You learned a lot!' 
                  : 'Good try! Review the lesson and try again.'}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.finishButton}
            onPress={handleFinish}
          >
            <Text style={styles.finishButtonText}>Back to Lesson</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
  },
  quizProgress: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
  questionContainer: {
    padding: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  optionText: {
    fontSize: 16,
    color: '#424242',
  },
  selectedOptionText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  resultProgressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
    overflow: 'hidden',
  },
  resultProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#424242',
    lineHeight: 22,
  },
  finishButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 30,
    alignItems: 'center',
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
    color: '#757575',
  },
});

export default QuizScreen; 