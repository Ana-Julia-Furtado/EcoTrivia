import { database } from "../config/firebase" 
import { ref, get, set, child } from "firebase/database"

export interface FirebaseUser {
  username: string
  ra: string
  score: number
  gamesPlayed: number
  level: number
}
export class FirebaseAuthService {
  private usersRef = ref(database, "users")
  async checkRAExists(ra: string): Promise<boolean> {
    try {
      const snapshot = await get(child(this.usersRef, ra))
      return snapshot.exists()
    } catch (error) {
      console.error("Error checking RA:", error)
      throw new Error("Erro ao verificar RA no banco de dados")
    }
  }
  async registerUser(username: string, ra: string): Promise<FirebaseUser> {
    try {
      if (!/^\d{6}$/.test(ra)) {
        throw new Error("RA deve conter exatamente 6 dígitos")
      }
      const raExists = await this.checkRAExists(ra)
      if (raExists) {
        throw new Error("Este RA já está cadastrado")
      }
      const newUser: FirebaseUser = {
        username: username.trim(),
        ra,
        score: 0,
        gamesPlayed: 0,
        level: 1,
      }
      await set(child(this.usersRef, ra), newUser)
      return newUser
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  async loginUser(ra: string): Promise<FirebaseUser> {
    try {
      if (!/^\d{6}$/.test(ra)) {
        throw new Error("RA deve conter exatamente 6 dígitos")
      }

      const snapshot = await get(child(this.usersRef, ra))

      if (!snapshot.exists()) {
        throw new Error("RA não encontrado. Verifique o número ou registre-se primeiro.")
      }

      const userData = snapshot.val() as FirebaseUser

      if (userData.gamesPlayed === undefined) {
        userData.gamesPlayed = 0
        await this.updateUser(ra, userData)
      }

      return userData
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  async updateUserScore(ra: string, newScore: number): Promise<void> {
    try {
      const userRef = child(this.usersRef, ra)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        await set(userRef, {
          ...userData,
          score: newScore,
        })
      }
    } catch (error) {
      console.error("Error updating score:", error)
      throw new Error("Erro ao atualizar pontuação")
    }
  }
  async incrementGamesPlayed(ra: string): Promise<void> {
    try {
      const userRef = child(this.usersRef, ra)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        const currentGamesPlayed = userData.gamesPlayed || 0

        await set(userRef, {
          ...userData,
          gamesPlayed: currentGamesPlayed + 1,
        })
      }
    } catch (error) {
      console.error("Error incrementing games played:", error)
      throw new Error("Erro ao atualizar número de jogos")
    }
  }
  async updateUserStats(ra: string, newScore: number, incrementGames = false): Promise<void> {
    try {
      const userRef = child(this.usersRef, ra)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        const currentGamesPlayed = userData.gamesPlayed || 0

        await set(userRef, {
          ...userData,
          score: newScore,
          gamesPlayed: incrementGames ? currentGamesPlayed + 1 : currentGamesPlayed,
        })
      }
    } catch (error) {
      console.error("Error updating user stats:", error)
      throw new Error("Erro ao atualizar estatísticas do usuário")
    }
  }
  private calculateLevel(score: number): number {
    if (score < 100) return 1
    if (score < 250) return 2
    if (score < 500) return 3
    if (score < 750) return 4
    if (score < 1000) return 5
    if (score < 1500) return 6
    if (score < 2000) return 7
    if (score < 2500) return 8
    if (score < 3000) return 9
    return 10
  }
  async updateUserLevel(ra: string): Promise<void> {
    try {
      const userRef = child(this.usersRef, ra)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        const newLevel = this.calculateLevel(userData.score || 0)

        await set(userRef, {
          ...userData,
          level: newLevel,
        })
      }
    } catch (error) {
      console.error("Error updating user level:", error)
      throw new Error("Erro ao atualizar nível do usuário")
    }
  }

  async incrementUserGamesCount(ra: string): Promise<FirebaseUser | null> {
    try {
      const userRef = child(this.usersRef, ra)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        const currentGamesPlayed = userData.gamesPlayed || 0

        const updatedUserData = {
          ...userData,
          gamesPlayed: currentGamesPlayed + 1,
        }

        await set(userRef, updatedUserData)
        return updatedUserData
      }

      return null
    } catch (error) {
      console.error("Error incrementing games count:", error)
      throw new Error("Erro ao incrementar contador de jogos")
    }
  }

  async updateScoreAndIncrementGames(ra: string, newScore: number): Promise<FirebaseUser | null> {
    try {
      const userRef = child(this.usersRef, ra)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        const currentGamesPlayed = userData.gamesPlayed || 0
        const newLevel = this.calculateLevel(newScore)

        const updatedUserData = {
          ...userData,
          score: newScore,
          gamesPlayed: currentGamesPlayed + 1,
          level: newLevel,
        }

        await set(userRef, updatedUserData)
        return updatedUserData
      }

      return null
    } catch (error) {
      console.error("Error updating score and games count:", error)
      throw new Error("Erro ao atualizar pontuação e contador de jogos")
    }
  }

  private async updateUser(ra: string, userData: FirebaseUser): Promise<void> {
    try {
      const userRef = child(this.usersRef, ra)
      await set(userRef, userData)
    } catch (error) {
      console.error("Error updating user:", error)
      throw new Error("Erro ao atualizar usuário")
    }
  }

  async getUserByRA(ra: string): Promise<FirebaseUser | null> {
    try {
      const snapshot = await get(child(this.usersRef, ra))
      if (snapshot.exists()) {
        const userData = snapshot.val() as FirebaseUser

        if (userData.gamesPlayed === undefined) {
          userData.gamesPlayed = 0
          await this.updateUser(ra, userData)
        }

        return userData
      }
      return null
    } catch (error) {
      console.error("Error getting user:", error)
      return null
    }
  }
  async getAllUsers(): Promise<FirebaseUser[]> {
    try {
      const snapshot = await get(this.usersRef)
      if (snapshot.exists()) {
        const usersData = snapshot.val()
        return Object.values(usersData) as FirebaseUser[]
      }
      return []
    } catch (error) {
      console.error("Error getting all users:", error)
      return []
    }
  }
  async getUserStats(ra: string): Promise<{ score: number; gamesPlayed: number; level: number } | null> {
    try {
      const user = await this.getUserByRA(ra)
      if (user) {
        return {
          score: user.score,
          gamesPlayed: user.gamesPlayed,
          level: user.level,
        }
      }
      return null
    } catch (error) {
      console.error("Error getting user stats:", error)
      return null
    }
  }
}

export const firebaseAuth = new FirebaseAuthService()
