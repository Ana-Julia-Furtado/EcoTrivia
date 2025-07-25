import { database } from '../config/firebase';
import { ref, get, set, push, child, query, orderByChild, equalTo } from 'firebase/database';
import type { Question, QuestionCategory } from '../types/game';

export class FirebaseQuestionsService {
  private questionsRef = ref(database, 'questions');
  async addQuestion(question: Omit<Question, 'id'>): Promise<string> {
    try {
      const newQuestionRef = push(this.questionsRef);
      const questionWithId: Question = {
        ...question,
        id: newQuestionRef.key!
      };
      
      await set(newQuestionRef, questionWithId);
      return newQuestionRef.key!;
    } catch (error) {
      console.error('Error adding question:', error);
      throw new Error('Erro ao adicionar pergunta');
    }
  }
  async getAllQuestions(): Promise<Question[]> {
    try {
      const snapshot = await get(this.questionsRef);
      if (snapshot.exists()) {
        const questionsData = snapshot.val();
        return Object.values(questionsData) as Question[];
      }
      return [];
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Erro ao buscar perguntas');
    }
  }
  async getQuestionsByCategory(category: QuestionCategory): Promise<Question[]> {
    try {
      const categoryQuery = query(this.questionsRef, orderByChild('category'), equalTo(category));
      const snapshot = await get(categoryQuery);
      
      if (snapshot.exists()) {
        const questionsData = snapshot.val();
        return Object.values(questionsData) as Question[];
      }
      return [];
    } catch (error) {
      console.error('Error fetching questions by category:', error);
      throw new Error('Erro ao buscar perguntas por categoria');
    }
  }
  async getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Promise<Question[]> {
    try {
      const difficultyQuery = query(this.questionsRef, orderByChild('difficulty'), equalTo(difficulty));
      const snapshot = await get(difficultyQuery);
      
      if (snapshot.exists()) {
        const questionsData = snapshot.val();
        return Object.values(questionsData) as Question[];
      }
      return [];
    } catch (error) {
      console.error('Error fetching questions by difficulty:', error);
      throw new Error('Erro ao buscar perguntas por dificuldade');
    }
  }
  async getFilteredQuestions(
    categories: QuestionCategory[] = [],
    difficulty?: 'easy' | 'medium' | 'hard'
  ): Promise<Question[]> {
    try {
      const allQuestions = await this.getAllQuestions();
      
      let filteredQuestions = allQuestions;
      if (categories.length > 0) {
        filteredQuestions = filteredQuestions.filter(q => 
          categories.includes(q.category)
        );
      }
      if (difficulty) {
        filteredQuestions = filteredQuestions.filter(q => 
          q.difficulty === difficulty
        );
      }

      return filteredQuestions;
    } catch (error) {
      console.error('Error fetching filtered questions:', error);
      throw new Error('Erro ao buscar perguntas filtradas');
    }
  }
  async getQuestionById(id: string): Promise<Question | null> {
    try {
      const snapshot = await get(child(this.questionsRef, id));
      if (snapshot.exists()) {
        return snapshot.val() as Question;
      }
      return null;
    } catch (error) {
      console.error('Error fetching question by ID:', error);
      throw new Error('Erro ao buscar pergunta');
    }
  }
  async updateQuestion(id: string, updates: Partial<Question>): Promise<void> {
    try {
      const questionRef = child(this.questionsRef, id);
      const snapshot = await get(questionRef);
      
      if (snapshot.exists()) {
        const currentQuestion = snapshot.val();
        const updatedQuestion = { ...currentQuestion, ...updates, id };
        await set(questionRef, updatedQuestion);
      } else {
        throw new Error('Pergunta não encontrada');
      }
    } catch (error) {
      console.error('Error updating question:', error);
      throw new Error('Erro ao atualizar pergunta');
    }
  }
  async deleteQuestion(id: string): Promise<void> {
    try {
      const questionRef = child(this.questionsRef, id);
      await set(questionRef, null);
    } catch (error) {
      console.error('Error deleting question:', error);
      throw new Error('Erro ao deletar pergunta');
    }
  }

  async seedQuestions(questions: Omit<Question, 'id'>[]): Promise<void> {
    try {
      console.log('Iniciando seed de perguntas...');
      const existingQuestions = await this.getAllQuestions();
      if (existingQuestions.length > 0) {
        console.log('Perguntas já existem no banco. Seed cancelado.');
        return;
      }
      const promises = questions.map(question => this.addQuestion(question));
      await Promise.all(promises);
      
      console.log(`${questions.length} perguntas adicionadas com sucesso!`);
    } catch (error) {
      console.error('Error seeding questions:', error);
      throw new Error('Erro ao inicializar perguntas');
    }
  }
  async getRandomQuestions(
    count: number,
    categories: QuestionCategory[] = [],
    difficulty?: 'easy' | 'medium' | 'hard'
  ): Promise<Question[]> {
    try {
      const filteredQuestions = await this.getFilteredQuestions(categories, difficulty);
      
      if (filteredQuestions.length === 0) {
        throw new Error('Nenhuma pergunta encontrada com os filtros especificados');
      }
      const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
      const selectedQuestions: Question[] = [];
      
      for (let i = 0; i < count; i++) {
        selectedQuestions.push(shuffled[i % shuffled.length]);
      }

      return selectedQuestions;
    } catch (error) {
      console.error('Error getting random questions:', error);
      throw new Error('Erro ao selecionar perguntas aleatórias');
    }
  }
}
export const firebaseQuestions = new FirebaseQuestionsService();