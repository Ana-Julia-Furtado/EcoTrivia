import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDUXs1qKWRpvOUNIPqva9rT7eeEPMGamJE",
  authDomain: "eco--trivia.firebaseapp.com",
  databaseURL: "https://eco--trivia-default-rtdb.firebaseio.com",
  projectId: "eco--trivia",
  storageBucket: "eco--trivia.firebasestorage.app",
  messagingSenderId: "936359839120",
  appId: "1:936359839120:web:637381e8aa1c9d36729f15",
  measurementId: "G-51MEQSKW4L"
};
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;
