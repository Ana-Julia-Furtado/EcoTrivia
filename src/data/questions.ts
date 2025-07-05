import { Question, QuestionCategory } from '../types/game';

export const questionCategories: Record<QuestionCategory, { name: string; icon: string; color: string }> = {
  'recycling': { name: 'Recycling', icon: '♻️', color: 'bg-primary-500' },
  'biodiversity': { name: 'Biodiversity', icon: '🌿', color: 'bg-primary-600' },
  'energy': { name: 'Energy', icon: '⚡', color: 'bg-earth-500' },
  'climate-change': { name: 'Climate Change', icon: '🌡️', color: 'bg-red-500' },
  'sustainable-consumption': { name: 'Sustainable Consumption', icon: '🛒', color: 'bg-secondary-500' },
  'pollution': { name: 'Pollution', icon: '🏭', color: 'bg-gray-600' },
  'conservation': { name: 'Conservation', icon: '🌍', color: 'bg-primary-700' }
};

export const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'What percentage of plastic bottles are actually recycled globally?',
    options: ['Less than 30%', 'Around 50%', 'About 70%', 'Over 90%'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'recycling',
    explanation: 'Only about 9% of all plastic ever produced has been recycled, with most ending up in landfills or the environment.',
    points: 200
  },
  {
    id: '2',
    question: 'Which gas is the primary contributor to the greenhouse effect?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'climate-change',
    explanation: 'Carbon dioxide (CO2) is the most significant greenhouse gas contributing to climate change.',
    points: 100
  },
  {
    id: '3',
    question: 'How much water does it take to produce one cotton t-shirt?',
    options: ['100 liters', '700 liters', '2,700 liters', '5,000 liters'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'sustainable-consumption',
    explanation: 'It takes approximately 2,700 liters of water to produce the cotton needed for one t-shirt.',
    points: 300
  },
  {
    id: '4',
    question: 'What is the most abundant renewable energy source on Earth?',
    options: ['Wind', 'Solar', 'Hydroelectric', 'Geothermal'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'energy',
    explanation: 'Solar energy is the most abundant renewable energy source, with the sun providing more energy to Earth in one hour than the world uses in a year.',
    points: 200
  },
  {
    id: '5',
    question: 'Which ecosystem is known as the "lungs of the Earth"?',
    options: ['Sahara Desert', 'Amazon Rainforest', 'Arctic Tundra', 'Great Barrier Reef'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'biodiversity',
    explanation: 'The Amazon Rainforest produces about 20% of the world\'s oxygen and absorbs large amounts of carbon dioxide.',
    points: 100
  },
  {
    id: '6',
    question: 'What is the main cause of ocean acidification?',
    options: ['Plastic pollution', 'Oil spills', 'CO2 absorption', 'Industrial waste'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'pollution',
    explanation: 'Ocean acidification occurs when seawater absorbs CO2 from the atmosphere, forming carbonic acid.',
    points: 200
  },
  {
    id: '7',
    question: 'How long does it take for a plastic bottle to decompose in nature?',
    options: ['50 years', '150 years', '450 years', '1000+ years'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'pollution',
    explanation: 'Plastic bottles can take 450-1000 years to decompose completely in the environment.',
    points: 200
  },
  {
    id: '8',
    question: 'What percentage of the world\'s freshwater is available for human use?',
    options: ['Less than 1%', 'About 5%', 'Around 15%', 'Nearly 30%'],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'conservation',
    explanation: 'Less than 1% of the world\'s freshwater is accessible for human use, making water conservation crucial.',
    points: 300
  },
  {
    id: '9',
    question: 'Which transportation method has the lowest carbon footprint per passenger?',
    options: ['Electric car', 'Bus', 'Train', 'Bicycle'],
    correctAnswer: 3,
    difficulty: 'easy',
    category: 'sustainable-consumption',
    explanation: 'Bicycles have virtually zero carbon emissions and are the most environmentally friendly transportation option.',
    points: 100
  },
  {
    id: '10',
    question: 'What is the largest source of plastic pollution in the ocean?',
    options: ['Plastic bottles', 'Food packaging', 'Fishing gear', 'Shopping bags'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'pollution',
    explanation: 'Abandoned fishing gear, also known as "ghost nets," makes up about 46% of the Great Pacific Garbage Patch.',
    points: 200
  }
];