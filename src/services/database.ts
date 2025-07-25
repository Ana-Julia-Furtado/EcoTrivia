interface UserDocument {
  _id: string;
  name: string;
  ra: string;
  email: string;
  level: number;
  totalScore: number;
  gamesPlayed: number;
  correctAnswers: number;
  createdAt: Date;
  updatedAt: Date;
}

interface GameDocument {
  _id: string;
  userId: string;
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
  gameDate: Date;
  duration: number;
  category: string[];
}

class Database {
  private dbName = 'EcoTriviaDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: '_id' });
          userStore.createIndex('ra', 'ra', { unique: true });
          userStore.createIndex('email', 'email', { unique: true });
          userStore.createIndex('totalScore', 'totalScore', { unique: false });
        }
        if (!db.objectStoreNames.contains('games')) {
          const gameStore = db.createObjectStore('games', { keyPath: '_id' });
          gameStore.createIndex('userId', 'userId', { unique: false });
          gameStore.createIndex('gameDate', 'gameDate', { unique: false });
          gameStore.createIndex('score', 'score', { unique: false });
        }
      };
    });
  }
  async createUser(userData: Omit<UserDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<UserDocument> {
    if (!this.db) throw new Error('Database not initialized');

    const user: UserDocument = {
      ...userData,
      _id: userData.ra, 
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.add(user);

      request.onsuccess = () => resolve(user);
      request.onerror = () => reject(request.error);
    });
  }

  async findUserByRA(ra: string): Promise<UserDocument | null> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.get(ra);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async updateUser(ra: string, updates: Partial<UserDocument>): Promise<UserDocument> {
    if (!this.db) throw new Error('Database not initialized');

    const user = await this.findUserByRA(ra);
    if (!user) throw new Error('User not found');

    const updatedUser: UserDocument = {
      ...user,
      ...updates,
      updatedAt: new Date()
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.put(updatedUser);

      request.onsuccess = () => resolve(updatedUser);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllUsers(): Promise<UserDocument[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getTopUsers(limit: number = 10): Promise<UserDocument[]> {
    const users = await this.getAllUsers();
    return users
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, limit);
  }


  async saveGame(gameData: Omit<GameDocument, '_id'>): Promise<GameDocument> {
    if (!this.db) throw new Error('Database not initialized');

    const game: GameDocument = {
      ...gameData,
      _id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };

    return new Promise(async (resolve, reject) => {
      try {
        const transaction = this.db!.transaction(['games'], 'readwrite');
        const store = transaction.objectStore('games');
        const request = store.add(game);

        request.onsuccess = async () => {
          try {
            await this.incrementUserGamesPlayed(gameData.userId);
            resolve(game);
          } catch (error) {
            console.error('Error incrementing games played:', error);
            resolve(game);
          }
        };
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }
  async incrementUserGamesPlayed(userId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.get(userId);

      request.onsuccess = () => {
        const user = request.result;
        if (user) {
          user.gamesPlayed = (user.gamesPlayed || 0) + 1;
          user.updatedAt = new Date();
          
          const updateRequest = store.put(user);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          reject(new Error('User not found'));
        }
      };
      
      request.onerror = () => reject(request.error);
    });
  }
  async syncUserWithFirebase(userId: string, firebaseData: { score: number; gamesPlayed: number; level: number }): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.get(userId);

      request.onsuccess = () => {
        const user = request.result;
        if (user) {
          user.totalScore = firebaseData.score;
          user.gamesPlayed = firebaseData.gamesPlayed;
          user.level = firebaseData.level;
          user.updatedAt = new Date();
          
          const updateRequest = store.put(user);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          reject(new Error('User not found'));
        }
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  async getUserGames(userId: string): Promise<GameDocument[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['games'], 'readonly');
      const store = transaction.objectStore('games');
      const index = store.index('userId');
      const request = index.getAll(userId);

      request.onsuccess = () => {
        const games = request.result.sort((a, b) => 
          new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime()
        );
        resolve(games);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getUserStats(userId: string): Promise<{
    totalGames: number;
    totalScore: number;
    averageScore: number;
    bestScore: number;
    totalCorrectAnswers: number;
    accuracy: number;
  }> {
    const games = await this.getUserGames(userId);
    
    if (games.length === 0) {
      return {
        totalGames: 0,
        totalScore: 0,
        averageScore: 0,
        bestScore: 0,
        totalCorrectAnswers: 0,
        accuracy: 0
      };
    }

    const totalScore = games.reduce((sum, game) => sum + game.score, 0);
    const totalCorrectAnswers = games.reduce((sum, game) => sum + game.correctAnswers, 0);
    const totalQuestions = games.reduce((sum, game) => sum + game.questionsAnswered, 0);
    const bestScore = Math.max(...games.map(game => game.score));

    return {
      totalGames: games.length,
      totalScore,
      averageScore: Math.round(totalScore / games.length),
      bestScore,
      totalCorrectAnswers,
      accuracy: totalQuestions > 0 ? Math.round((totalCorrectAnswers / totalQuestions) * 100) : 0
    };
  }
}
export const database = new Database();
database.init().catch(console.error);
export type { UserDocument, GameDocument };
