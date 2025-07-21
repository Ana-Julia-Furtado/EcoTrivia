import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyArLLYKJHNhUyMCMtbsERwB4dW03YM43c8",
  authDomain: "ecotrivia-e28cb.firebaseapp.com",
  databaseURL: "https://ecotrivia-e28cb-default-rtdb.firebaseio.com/",
  projectId: "ecotrivia-e28cb",
  storageBucket: "ecotrivia-e28cb.firebasestorage.app",
  messagingSenderId: "425527307962",
  measurementId: "G-YH8MQL2HYH",
  appId: "1:425527307962:web:ce459334e5e2f14d9f5c83"
};
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;
