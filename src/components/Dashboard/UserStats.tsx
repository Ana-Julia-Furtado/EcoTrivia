"use client"

import type React from "react"
import { useEffect, useState, useMemo, useCallback } from "react"
import { Trophy, Target, Award, RefreshCw } from "lucide-react"
import { useGameStore } from "../../store/gameStore"
import { motion } from "framer-motion"
import { firebaseRanking } from "../../services/firebaseRanking"

function getRandomNumber(min = 60, max = 90) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const UserStats: React.FC = () => {
  const { currentUser, isLoading, isHydrated, syncUserFromFirebase } = useGameStore(
    useCallback(
      (state) => ({
        currentUser: state.currentUser,
        isLoading: state.isLoading,
        isHydrated: state.isHydrated,
        syncUserFromFirebase: state.syncUserFromFirebase,
      }),
      [],
    ),
  )

  const [accuracyValue, setAccuracyValue] = useState(0)
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null)
  const [rankingLoading, setRankingLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  useEffect(() => {
    const visitedBefore = localStorage.getItem("hasVisited")
    if (!visitedBefore) {
      setAccuracyValue(0)
      localStorage.setItem("hasVisited", "true")
    } else {
      setAccuracyValue(getRandomNumber(60, 95))
    }
  }, [])
  useEffect(() => {
    if (!currentUser || !isHydrated) {
      setRankingLoading(false)
      return
    }

    let unsubscribe: (() => void) | null = null
    let timeoutId: NodeJS.Timeout

    const setupRankingListener = () => {
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
    timeoutId = setTimeout(setupRankingListener, 1000)

    return () => {
      clearTimeout(timeoutId)
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [currentUser, isHydrated])

  const handleManualSync = useCallback(async () => {
    if (!currentUser || syncing) return

    try {
      setSyncing(true)
      await syncUserFromFirebase()
    } catch (error) {
      console.error("Error during manual sync:", error)
    } finally {
      setSyncing(false)
    }
  }, [currentUser, syncing, syncUserFromFirebase])
  const getRankDisplay = useCallback(() => {
    if (rankingLoading) return "..."
    if (currentUserRank === null) return "N/A"

    const getRankSuffix = (rank: number) => {
      if (rank === 1) return "1º"
      if (rank === 2) return "2º"
      if (rank === 3) return "3º"
      return `${rank}º`
    }

    return getRankSuffix(currentUserRank)
  }, [rankingLoading, currentUserRank])

  const getRankColor = useCallback(() => {
    if (currentUserRank === null) return "from-gray-400 to-gray-600"
    if (currentUserRank === 1) return "from-yellow-400 to-yellow-600"
    if (currentUserRank === 2) return "from-gray-300 to-gray-500"
    if (currentUserRank === 3) return "from-amber-500 to-amber-700"
    if (currentUserRank <= 10) return "from-green-400 to-green-600"
    return "from-blue-400 to-blue-600"
  }, [currentUserRank])
  const statCards = useMemo(() => {
    if (!currentUser) return []

    return [
      {
        icon: Trophy,
        label: "Pontuação Total",
        value: currentUser.totalScore || 0,
        color: "from-yellow-400 to-yellow-600",
        isUpdating: isLoading,
      },
      {
        icon: Target,
        label: "Jogos Realizados",
        value: currentUser.gamesPlayed || 0,
        color: "from-primary-500 to-primary-700",
        isUpdating: isLoading,
      },
      {
        icon: Award,
        label: "Nível Atual",
        value: currentUser.level,
        color: "from-secondary-500 to-secondary-700",
        change: null,
        isUpdating: isLoading,
      },
      {
        icon: Trophy,
        label: "Ranking Global",
        value: getRankDisplay(),
        color: getRankColor(),
        change: currentUserRank && currentUserRank <= 3 ? "🏆" : null,
        isUpdating: rankingLoading,
      },
    ]
  }, [currentUser, isLoading, getRankDisplay, getRankColor, currentUserRank, rankingLoading])
  if (!isHydrated || (!currentUser && isLoading)) {
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

  if (!currentUser) return null

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Suas Estatísticas</h3>
          <button
            onClick={handleManualSync}
            disabled={syncing || isLoading}
            className="flex items-center space-x-2 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Sincronizar dados"
          >
            <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Sincronizando..." : "Atualizar"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <div className="flex items-center space-x-2">
                    <motion.p
                      key={`${stat.label}-${stat.value}`}
                      initial={{ scale: 1 }}
                      animate={{ scale: 1 }}
                      className="text-3xl font-bold text-gray-900"
                    >
                      {stat.value}
                    </motion.p>
                    {stat.isUpdating && (
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
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center flex-shrink-0`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sync status indicator - only show when actively syncing */}
        {syncing && (
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <span>Sincronizando dados...</span>
          </div>
        )}
      </div>
    </div>
  )
}
