<<<<<<< HEAD
import { database } from "../config/firebase" // Updated import path
=======
import { database } from "../config/firebase"
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
import { ref, get, set, child } from "firebase/database"

export interface FirebaseUser {
  username: string
  ra: string
  score: number
  gamesPlayed: number
  level: number
}
<<<<<<< HEAD
export class FirebaseAuthService {
  private usersRef = ref(database, "users")
=======

export class FirebaseAuthService {
  private usersRef = ref(database, "users")

>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
  async checkRAExists(ra: string): Promise<boolean> {
    try {
      const snapshot = await get(child(this.usersRef, ra))
      return snapshot.exists()
    } catch (error) {
      console.error("Error checking RA:", error)
      throw new Error("Erro ao verificar RA no banco de dados")
    }
  }
<<<<<<< HEAD
=======

>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
  async registerUser(username: string, ra: string): Promise<FirebaseUser> {
    try {
      if (!/^\d{6}$/.test(ra)) {
        throw new Error("RA deve conter exatamente 6 dígitos")
      }
<<<<<<< HEAD
=======

>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
      const raExists = await this.checkRAExists(ra)
      if (raExists) {
        throw new Error("Este RA já está cadastrado")
      }
<<<<<<< HEAD
=======

>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
      const newUser: FirebaseUser = {
        username: username.trim(),
        ra,
        score: 0,
        gamesPlayed: 0,
        level: 1,
      }
<<<<<<< HEAD
      await set(child(this.usersRef, ra), newUser)
=======

      await set(child(this.usersRef, ra), newUser)

>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
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
<<<<<<< HEAD
=======

>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
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

  /**
   * Atualiza tanto a pontuação quanto o número de jogos realizados
   * @param ra RA do usuário
   * @param newScore Nova pontuação total
   * @param incrementGames Se deve incrementar o contador de jogos
   */
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

  /**
   * Calcula o nível do usuário baseado na pontuação
   * @param score Pontuação total do usuário
   * @returns Nível calculado
   */
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

  /**
   * Atualiza o nível do usuário baseado na pontuação
   * @param ra RA do usuário
   */
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

  /**
   * Incrementa apenas o contador de jogos realizados
   * @param ra RA do usuário
   */
  async incrementUserGamesCount(ra: string): Promise<FirebaseUser | null> {
    try {
      const userRef = child(this.usersRef, ra)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        const currentGamesPlayed = userData.gamesPlayed || 0
<<<<<<< HEAD

=======
        
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
        const updatedUserData = {
          ...userData,
          gamesPlayed: currentGamesPlayed + 1,
        }

        await set(userRef, updatedUserData)
        return updatedUserData
      }
<<<<<<< HEAD

=======
      
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
      return null
    } catch (error) {
      console.error("Error incrementing games count:", error)
      throw new Error("Erro ao incrementar contador de jogos")
    }
  }

  /**
   * Atualiza pontuação e incrementa jogos em uma única operação
   * @param ra RA do usuário
   * @param newScore Nova pontuação total
   */
  async updateScoreAndIncrementGames(ra: string, newScore: number): Promise<FirebaseUser | null> {
    try {
      const userRef = child(this.usersRef, ra)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        const currentGamesPlayed = userData.gamesPlayed || 0
        const newLevel = this.calculateLevel(newScore)
<<<<<<< HEAD

=======
        
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
        const updatedUserData = {
          ...userData,
          score: newScore,
          gamesPlayed: currentGamesPlayed + 1,
          level: newLevel,
        }

        await set(userRef, updatedUserData)
        return updatedUserData
      }
<<<<<<< HEAD

=======
      
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
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
<<<<<<< HEAD
=======

>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
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
<<<<<<< HEAD
=======

>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
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
