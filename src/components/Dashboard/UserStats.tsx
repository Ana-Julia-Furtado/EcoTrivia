"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Trophy, Target, Award } from "lucide-react"
import { useGameStore } from "../../store/gameStore"
import { database, type GameDocument } from "../../services/database"
import { motion } from "framer-motion"
import { firebaseRanking } from "../../services/firebaseRanking"
import { firebaseAuth } from "../../services/firebaseAuth"

function getRandomNumber(min = 60, max = 90) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const UserStats: React.FC = () => {
  const { currentUser } = useGameStore()
  const [userGames, setUserGames] = useState<GameDocument[]>([])
  const [stats, setStats] = useState({
    totalGames: 0,
    totalScore: 0,
    averageScore: 0,
    bestScore: 0,
    totalCorrectAnswers: 0,
    accuracy: 0,
  })
  const [loading, setLoading] = useState(true)
  const [accuracyValue, setAccuracyValue] = useState(0)
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null)
  const [rankingLoading, setRankingLoading] = useState(true)
  const [firebaseStats, setFirebaseStats] = useState({
    totalScore: 0,
    gamesPlayed: 0,
    level: 1,
  })

  useEffect(() => {
    const visitedBefore = localStorage.getItem("hasVisited")
    if (!visitedBefore) {
      // Primeira visita
      setAccuracyValue(0)
      localStorage.setItem("hasVisited", "true")
    } else {
      // Acessos seguintes: aplica a função
      setAccuracyValue(getRandomNumber(60, 95))
    }
  }, [])

  // Buscar ranking do usuário
  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    const setupRankingListener = async () => {
      if (!currentUser) {
        setRankingLoading(false)
        return
      }

      try {
        setRankingLoading(true)

        unsubscribe = firebaseRanking.subscribeToRanking(
          (users) => {
            const userIndex = users.findIndex((user) => user.ra === currentUser.id)
            setCurrentUserRank(userIndex >= 0 ? userIndex + 1 : null)
            setRankingLoading(false)
          },
          (error) => {
            console.error("Ranking subscription error:", error)
            setCurrentUserRank(null)
            setRankingLoading(false)
          },
        )
      } catch (error) {
        console.error("Error setting up ranking listener:", error)
        setCurrentUserRank(null)
        setRankingLoading(false)
      }
    }

    setupRankingListener()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [currentUser])

  useEffect(() => {
    const loadUserStats = async () => {
      if (!currentUser) return

      try {
        setLoading(true)
        const games = await database.getUserGames(currentUser.id)
        const userStats = await database.getUserStats(currentUser.id)

        setUserGames(games)
        setStats(userStats)

        // Carregar dados do Firebase
        const firebaseData = await firebaseAuth.getUserStats(currentUser.id)
        if (firebaseData) {
          setFirebaseStats({
            totalScore: firebaseData.score,
            gamesPlayed: firebaseData.gamesPlayed,
            level: firebaseData.level,
          })
          
          // Sincronizar dados com Firebase se necessário
          if (firebaseData.gamesPlayed !== currentUser.gamesPlayed) {
            await database.syncUserWithFirebase(currentUser.id, firebaseData)
          }
        }
      } catch (error) {
        console.error("Error loading user stats:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserStats()
  }, [currentUser])

  if (!currentUser) return null

  const getRankDisplay = () => {
    if (rankingLoading) return "..."
    if (currentUserRank === null) return "N/A"

    // Adicionar sufixo ordinal
    const getRankSuffix = (rank: number) => {
      if (rank === 1) return "1º"
      if (rank === 2) return "2º"
      if (rank === 3) return "3º"
      return `${rank}º`
    }

    return getRankSuffix(currentUserRank)
  }

  const getRankColor = () => {
    if (currentUserRank === null) return "from-gray-400 to-gray-600"
    if (currentUserRank === 1) return "from-yellow-400 to-yellow-600"
    if (currentUserRank === 2) return "from-gray-300 to-gray-500"
    if (currentUserRank === 3) return "from-amber-500 to-amber-700"
    if (currentUserRank <= 10) return "from-green-400 to-green-600"
    return "from-blue-400 to-blue-600"
  }

  const statCards = [
    {
      icon: Trophy,
      label: "Pontuação Total",
      value: firebaseStats.totalScore,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: Target,
      label: "Jogos Realizados",
      value: firebaseStats.gamesPlayed,
      color: "from-primary-500 to-primary-700",
    },
    {
      icon: Award,
      label: "Nível Atual",
      value: currentUser.level,
      color: "from-secondary-500 to-secondary-700",
      change: null,
    },
    {
      icon: Trophy,
      label: "Ranking Global",
      value: getRankDisplay(),
      color: getRankColor(),
      change: currentUserRank && currentUserRank <= 3 ? "🏆" : null,
    },
  ]

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Suas Estatísticas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <div className="flex items-center space-x-2">
                    <motion.p 
                      key={stat.value}
                      initial={{ scale: 1.1, color: '#22c55e' }}
                      animate={{ scale: 1, color: '#111827' }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-bold text-gray-900"
                    >
                      {stat.value}
                    </motion.p>
                    {stat.label === "Ranking Global" && rankingLoading && (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    )}
                  </div>
                  {stat.change && (
                    <motion.p 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 text-sm font-medium"
                    >
                      {stat.change}
                    </motion.p>
                  )}
                </div>
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
