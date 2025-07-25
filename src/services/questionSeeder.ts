import { firebaseQuestions } from './firebaseQuestions';
import { mockQuestions } from './questions';
export const seedFirebaseQuestions = async (): Promise<void> => {
  try {
    const questionsToSeed = mockQuestions.map(({ id, ...question }) => question);
    await firebaseQuestions.seedQuestions(questionsToSeed);
  } catch (error) {
    throw error;
  }
};
export const checkFirebaseQuestions = async (): Promise<boolean> => {
  try {
    const questions = await firebaseQuestions.getAllQuestions();
    return questions.length > 0;
  } catch (error) {
    return false;
  }
};