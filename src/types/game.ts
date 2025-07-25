export interface User {
<<<<<<< HEAD
  id: string; 
=======
  id: string; // Now using RA as ID
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
  name: string;
  avatar?: string;
  level: number;
  totalScore: number;
  gamesPlayed: number;
  correctAnswers: number;
<<<<<<< HEAD
  ra?: string; 
=======
  ra?: string; // Optional RA field for display
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: QuestionCategory;
<<<<<<< HEAD
  explanation: string;
=======
  explanation?: string;
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
  points: number;
}

export type QuestionCategory =
  'reciclagem' |
  'biodiversidade' |
  'energia' |
  'mudancas_climaticas' | 
  'consumo' |
  'poluicao' |
  'conservacao' |
  'sustentabilidade' |
  'ecossistemas' |
  'residuos' |
  'recursos_hidricos' |
  'politica_ambiental' |
  'oceanos' |
  'solo' |
  'urbanizacao' |
  'conscientizacao' |
  'poluicao_da_agua' |
  'alimentacao_sustentavel' |
  'atmosfera' |
  'poluicao_plastica' |
  'poluicao_do_ar' |
  'energias_renovaveis';

export interface GameRoom {
  id: string;
  name: string;
  players: User[];
  maxPlayers: number;
  isPrivate: boolean;
  gameState: GameState;
  currentQuestion?: Question;
  questionIndex: number;
  timeRemaining: number;
  scores: Record<string, number>;
}

export type GameState = 'waiting' | 'playing' | 'question' | 'results' | 'finished';

export interface PlayerAnswer {
  playerId: string;
  answerIndex: number;
  timeSpent: number;
  isCorrect: boolean;
  points: number;
}

export interface GameSettings {
  questionsPerGame: number;
  timePerQuestion: number;
  difficulty: 'mixed' | 'easy' | 'medium' | 'hard';
  categories: QuestionCategory[];
}
