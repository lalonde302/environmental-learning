import { Lesson, Badge, Career } from '../types';

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Climate Change',
    description: 'Learn the basics of climate change and its impacts on our planet.',
    topic: 'Climate',
    points: 50,
    content: 'Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil, and gas, which produces heat-trapping gases.',
    questions: [
      {
        id: '1-1',
        text: 'What is the main driver of climate change since the 1800s?',
        options: ['Solar activity', 'Human activities', 'Natural cycles', 'Volcanic eruptions'],
        correctAnswer: 'Human activities'
      },
      {
        id: '1-2',
        text: 'Which of the following produces heat-trapping gases?',
        options: ['Planting trees', 'Solar energy', 'Burning fossil fuels', 'Wind power'],
        correctAnswer: 'Burning fossil fuels'
      }
    ],
    completed: false
  },
  {
    id: '2',
    title: 'Renewable Energy Basics',
    description: 'Discover the various types of renewable energy and their benefits.',
    topic: 'Energy',
    points: 50,
    content: 'Renewable energy comes from natural sources that are constantly replenished, such as sunlight, wind, water, and geothermal heat. Unlike fossil fuels, renewable energy sources won\'t run out and generally don\'t produce greenhouse gases or pollutants when generating electricity.',
    questions: [
      {
        id: '2-1',
        text: 'Which of the following is NOT a renewable energy source?',
        options: ['Solar', 'Wind', 'Natural gas', 'Hydroelectric'],
        correctAnswer: 'Natural gas'
      },
      {
        id: '2-2',
        text: 'What is a key benefit of renewable energy sources?',
        options: ['They are cheaper to build', 'They don\'t produce greenhouse gases', 'They work in all weather conditions', 'They require less space'],
        correctAnswer: 'They don\'t produce greenhouse gases'
      }
    ],
    completed: false
  },
  {
    id: '3',
    title: 'Ocean Conservation',
    description: 'Explore the importance of protecting our oceans and marine life.',
    topic: 'Oceans',
    points: 75,
    content: 'Oceans cover more than 70% of Earth\'s surface and contain 97% of Earth\'s water. They generate over half of the oxygen we breathe, absorb carbon dioxide, and regulate our climate. Marine biodiversity is essential for maintaining the health and stability of ocean ecosystems.',
    questions: [
      {
        id: '3-1',
        text: 'What percentage of Earth\'s surface is covered by oceans?',
        options: ['50%', '60%', '70%', '80%'],
        correctAnswer: '70%'
      },
      {
        id: '3-2',
        text: 'Which of the following is NOT a function of oceans?',
        options: ['Generating oxygen', 'Absorbing carbon dioxide', 'Regulating climate', 'Producing fossil fuels'],
        correctAnswer: 'Producing fossil fuels'
      }
    ],
    completed: false
  },
  {
    id: '4',
    title: 'Sustainable Agriculture',
    description: 'Learn about sustainable farming practices that protect the environment.',
    topic: 'Agriculture',
    points: 75,
    content: 'Sustainable agriculture refers to farming practices that protect the environment, public health, and animal welfare while ensuring economic viability. It focuses on soil health, water conservation, biodiversity, and reduced use of synthetic inputs.',
    questions: [
      {
        id: '4-1',
        text: 'What is a key focus of sustainable agriculture?',
        options: ['Maximizing yield at any cost', 'Soil health', 'Using more pesticides', 'Monoculture farming'],
        correctAnswer: 'Soil health'
      },
      {
        id: '4-2',
        text: 'Which practice is most associated with sustainable agriculture?',
        options: ['Heavy use of synthetic fertilizers', 'Crop rotation', 'Clear-cutting forests for farmland', 'Intensive irrigation'],
        correctAnswer: 'Crop rotation'
      }
    ],
    completed: false
  }
];

export const badges: Badge[] = [
  {
    id: 'b1',
    name: 'Climate Novice',
    description: 'Complete your first climate-related lesson',
    image: '🌡️',
    unlocked: false,
    requirementType: 'lessons',
    requirementValue: 1
  },
  {
    id: 'b2',
    name: 'Eco Explorer',
    description: 'Earn 100 points',
    image: '🔍',
    unlocked: false,
    requirementType: 'points',
    requirementValue: 100
  },
  {
    id: 'b3',
    name: 'Environmental Enthusiast',
    description: 'Complete 3 different lessons',
    image: '🌱',
    unlocked: false,
    requirementType: 'lessons',
    requirementValue: 3
  },
  {
    id: 'b4',
    name: 'Green Guardian',
    description: 'Earn 250 points',
    image: '🛡️',
    unlocked: false,
    requirementType: 'points',
    requirementValue: 250
  }
];

export const careers: Career[] = [
  {
    id: 'c1',
    title: 'Environmental Scientist',
    description: 'Research and analyze environmental problems to develop solutions.',
    requirements: ['Strong background in science', 'Analytical skills', 'Fieldwork experience'],
    unlocked: false,
    pointsRequired: 100
  },
  {
    id: 'c2',
    title: 'Renewable Energy Engineer',
    description: 'Design and develop renewable energy systems and technologies.',
    requirements: ['Engineering knowledge', 'Problem-solving skills', 'Understanding of energy systems'],
    unlocked: false,
    pointsRequired: 150
  },
  {
    id: 'c3',
    title: 'Conservation Biologist',
    description: 'Study and protect biodiversity and ecosystems.',
    requirements: ['Biology background', 'Passion for wildlife', 'Research skills'],
    unlocked: false,
    pointsRequired: 200
  },
  {
    id: 'c4',
    title: 'Sustainable Agriculture Specialist',
    description: 'Develop and implement sustainable farming practices.',
    requirements: ['Knowledge of agricultural systems', 'Environmental awareness', 'Problem-solving abilities'],
    unlocked: false,
    pointsRequired: 250
  }
]; 