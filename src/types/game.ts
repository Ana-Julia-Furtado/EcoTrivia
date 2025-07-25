export interface User {
  id: string; 
  name: string;
  avatar?: string;
  level: number;
  totalScore: number;
  gamesPlayed: number;
  correctAnswers: number;
  ra?: string; 
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: QuestionCategory;
  explanation: string;
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
