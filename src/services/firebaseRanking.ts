import { database } from '../config/firebase';
import { ref, onValue, off, query, orderByChild } from 'firebase/database';

export interface RankingUser {
  ra: string;
  username: string;
  score: number;
}

export class FirebaseRankingService {
  private rankingRef = ref(database, 'users');

  /**
   * Subscribe to real-time ranking updates
   * @param onUpdate Callback function called when ranking data changes
   * @param onError Callback function called when an error occurs
   * @returns Unsubscribe function
   */
  subscribeToRanking(
    onUpdate: (users: RankingUser[]) => void,
    onError?: (error: Error) => void
  ): () => void {
    // Create a query to order users by score in descending order
    const rankingQuery = query(this.rankingRef, orderByChild('score'));

    const handleValue = (snapshot: any) => {
      try {
        const users: RankingUser[] = [];
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          // Convert Firebase data to array and sort by score (descending)
          Object.entries(data).forEach(([ra, userData]: [string, any]) => {
            if (userData && typeof userData === 'object') {
              users.push({
                ra,
                username: userData.username || 'Usuário Anônimo',
                score: userData.score || 0
              });
            }
          });
          
          // Sort by score in descending order (Firebase orderByChild sorts ascending)
          users.sort((a, b) => b.score - a.score);
        }
        
        onUpdate(users);
      } catch (error) {
        console.error('Error processing ranking data:', error);
        if (onError) {
          onError(new Error('Erro ao processar dados do ranking'));
        }
      }
    };

    const handleError = (error: any) => {
      console.error('Firebase ranking subscription error:', error);
      if (onError) {
        onError(new Error('Erro de conexão com o Firebase'));
      }
    };

    // Set up the real-time listener
    onValue(rankingQuery, handleValue, handleError);

    // Return unsubscribe function
    return () => {
      off(rankingQuery, 'value', handleValue);
    };
  }

  /**
   * Get current ranking (one-time fetch)
   * @param limit Maximum number of users to return
   * @returns Promise with ranking data
   */
  async getCurrentRanking(limit: number = 50): Promise<RankingUser[]> {
    return new Promise((resolve, reject) => {
      const rankingQuery = query(this.rankingRef, orderByChild('score'));
      
      onValue(rankingQuery, (snapshot) => {
        try {
          const users: RankingUser[] = [];
          
          if (snapshot.exists()) {
            const data = snapshot.val();
            
            Object.entries(data).forEach(([ra, userData]: [string, any]) => {
              if (userData && typeof userData === 'object') {
                users.push({
                  ra,
                  username: userData.username || 'Usuário Anônimo',
                  score: userData.score || 0
                });
              }
            });
            
            // Sort by score in descending order and limit results
            users.sort((a, b) => b.score - a.score);
            resolve(users.slice(0, limit));
          } else {
            resolve([]);
          }
        } catch (error) {
          console.error('Error fetching ranking:', error);
          reject(new Error('Erro ao buscar ranking'));
        }
      }, (error) => {
        console.error('Firebase ranking fetch error:', error);
        reject(new Error('Erro de conexão com o Firebase'));
      }, { onlyOnce: true });
    });
  }

  /**
   * Get user's current rank position
   * @param ra User's RA
   * @returns Promise with user's rank (1-based) or null if not found
   */
  async getUserRank(ra: string): Promise<number | null> {
    try {
      const allUsers = await this.getCurrentRanking();
      const userIndex = allUsers.findIndex(user => user.ra === ra);
      return userIndex >= 0 ? userIndex + 1 : null;
    } catch (error) {
      console.error('Error getting user rank:', error);
      return null;
    }
  }

  /**
   * Get users around a specific user's rank
   * @param ra User's RA
   * @param range Number of users to show above and below
   * @returns Promise with users around the specified user
   */
  async getUsersAroundRank(ra: string, range: number = 2): Promise<{
    users: RankingUser[];
    userRank: number | null;
  }> {
    try {
      const allUsers = await this.getCurrentRanking();
      const userIndex = allUsers.findIndex(user => user.ra === ra);
      
      if (userIndex === -1) {
        return { users: [], userRank: null };
      }
      
      const startIndex = Math.max(0, userIndex - range);
      const endIndex = Math.min(allUsers.length - 1, userIndex + range);
      
      return {
        users: allUsers.slice(startIndex, endIndex + 1),
        userRank: userIndex + 1
      };
    } catch (error) {
      console.error('Error getting users around rank:', error);
      return { users: [], userRank: null };
    }
  }
}

// Singleton instance
export const firebaseRanking = new FirebaseRankingService();