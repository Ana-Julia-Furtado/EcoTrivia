import { firebaseQuestions } from './firebaseQuestions';
import { mockQuestions } from './questions';
export const seedFirebaseQuestions = async (): Promise<void> => {
  try {
    console.log('Iniciando população do Firebase com perguntas...');
    const questionsToSeed = mockQuestions.map(({ id, ...question }) => question);
    
    await firebaseQuestions.seedQuestions(questionsToSeed);
    
    console.log('Firebase populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular Firebase:', error);
    throw error;
  }
};
export const checkFirebaseQuestions = async (): Promise<boolean> => {
  try {
    const questions = await firebaseQuestions.getAllQuestions();
    return questions.length > 0;
  } catch (error) {
    console.error('Erro ao verificar perguntas no Firebase:', error);
    return false;
  }
};
