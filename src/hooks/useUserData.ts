"use client"

import { useEffect, useState } from "react"
import { useGameStore } from "../store/gameStore"
import { database } from "../services/database"

export const useUserData = () => {
  const { currentUser, syncUserFromFirebase } = useGameStore()
  const [localStats, setLocalStats] = useState({
    totalGames: 0,
    totalScore: 0,
    gamesPlayed: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadLocalStats = async () => {
      if (!currentUser) return

      try {
        setIsLoading(true)

        // Buscar estatísticas do banco local
        const userStats = await database.getUserStats(currentUser.id)
        const userGames = await database.getUserGames(currentUser.id)

        setLocalStats({
          totalGames: userStats.totalGames,
          totalScore: userStats.totalScore,
          gamesPlayed: userGames.length, // Contar jogos diretamente
        })

        // Se os dados locais diferem do currentUser, sincronizar
        if (userGames.length !== currentUser.gamesPlayed) {
          console.log("Dados locais diferem do store, sincronizando...")
          await syncUserFromFirebase()
        }
      } catch (error) {
        console.error("Error loading local stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadLocalStats()
  }, [currentUser, syncUserFromFirebase])

  // Retornar dados mais confiáveis (priorizar dados locais se disponíveis)
  const reliableData = {
    totalScore: Math.max(currentUser?.totalScore || 0, localStats.totalScore),
    gamesPlayed: Math.max(currentUser?.gamesPlayed || 0, localStats.gamesPlayed),
    level: currentUser?.level || 1,
    correctAnswers: currentUser?.correctAnswers || 0,
  }

  return {
    userData: reliableData,
    isLoading,
    refresh: syncUserFromFirebase,
  }
}
