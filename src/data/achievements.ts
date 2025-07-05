export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: any) => boolean;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const achievements: Achievement[] = [
  {
    id: 'first-game',
    name: 'Getting Started',
    description: 'Complete your first game',
    icon: '🌱',
    condition: (stats) => stats.gamesPlayed >= 1,
    points: 50,
    rarity: 'common'
  },
  {
    id: 'eco-warrior',
    name: 'Eco Warrior',
    description: 'Answer 100 questions correctly',
    icon: '🛡️',
    condition: (stats) => stats.correctAnswers >= 100,
    points: 500,
    rarity: 'rare'
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Answer a question in under 5 seconds',
    icon: '⚡',
    condition: (stats) => stats.fastestAnswer <= 5,
    points: 200,
    rarity: 'epic'
  },
  {
    id: 'perfect-game',
    name: 'Perfect Game',
    description: 'Get all questions right in a single game',
    icon: '💎',
    condition: (stats) => stats.perfectGames >= 1,
    points: 1000,
    rarity: 'legendary'
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Play with 10 different players',
    icon: '🦋',
    condition: (stats) => stats.uniquePlayers >= 10,
    points: 300,
    rarity: 'rare'
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Play in all question categories',
    icon: '📚',
    condition: (stats) => stats.categoriesPlayed >= 7,
    points: 400,
    rarity: 'epic'
  }
];