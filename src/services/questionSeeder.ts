import { firebaseQuestions } from './firebaseQuestions';
import { mockQuestions } from './questions';

/**
 * Função para popular o Firebase com as perguntas iniciais
 * Execute apenas uma vez para inicializar o banco de dados
 */
export const seedFirebaseQuestions = async (): Promise<void> => {
  try {
    console.log('Iniciando população do Firebase com perguntas...');
    
    // Converter mockQuestions para o formato sem ID
    const questionsToSeed = mockQuestions.map(({ id, ...question }) => question);
    
    await firebaseQuestions.seedQuestions(questionsToSeed);
    
    console.log('Firebase populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular Firebase:', error);
    throw error;
  }
};

/**
 * Função para verificar se existem perguntas no Firebase
 */
export const checkFirebaseQuestions = async (): Promise<boolean> => {
  try {
    const questions = await firebaseQuestions.getAllQuestions();
    return questions.length > 0;
  } catch (error) {
    console.error('Erro ao verificar perguntas no Firebase:', error);
    return false;
  }
};