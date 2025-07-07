import { database } from '../config/firebase';
import { ref, get, set, child } from 'firebase/database';

export interface FirebaseUser {
  username: string;
  ra: string;
  score: number;
}

export class FirebaseAuthService {
  private usersRef = ref(database, 'users');

  async checkRAExists(ra: string): Promise<boolean> {
    try {
      const snapshot = await get(child(this.usersRef, ra));
      return snapshot.exists();
    } catch (error) {
      console.error('Error checking RA:', error);
      throw new Error('Erro ao verificar RA no banco de dados');
    }
  }

  async registerUser(username: string, ra: string): Promise<FirebaseUser> {
    try {
      // Validate RA format (6 digits)
      if (!/^\d{6}$/.test(ra)) {
        throw new Error('RA deve conter exatamente 6 dígitos');
      }

      // Check if RA already exists
      const raExists = await this.checkRAExists(ra);
      if (raExists) {
        throw new Error('Este RA já está cadastrado');
      }

      // Create new user
      const newUser: FirebaseUser = {
        username: username.trim(),
        ra,
        score: 0
      };

      // Save to Firebase
      await set(child(this.usersRef, ra), newUser);
      
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async loginUser(ra: string): Promise<FirebaseUser> {
    try {
      // Validate RA format
      if (!/^\d{6}$/.test(ra)) {
        throw new Error('RA deve conter exatamente 6 dígitos');
      }

      // Get user from Firebase
      const snapshot = await get(child(this.usersRef, ra));
      
      if (!snapshot.exists()) {
        throw new Error('RA não encontrado. Verifique o número ou registre-se primeiro.');
      }

      return snapshot.val() as FirebaseUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async updateUserScore(ra: string, newScore: number): Promise<void> {
    try {
      const userRef = child(this.usersRef, ra);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        await set(userRef, {
          ...userData,
          score: newScore
        });
      }
    } catch (error) {
      console.error('Error updating score:', error);
      throw new Error('Erro ao atualizar pontuação');
    }
  }

  async getUserByRA(ra: string): Promise<FirebaseUser | null> {
    try {
      const snapshot = await get(child(this.usersRef, ra));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }
}

export const firebaseAuth = new FirebaseAuthService();