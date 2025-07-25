"use client"

import { useEffect, useState } from "react"
import { useGameStore } from "../../store/gameStore"
import { database } from "../../services/database"

export const DebugUserData = () => {
  const { currentUser } = useGameStore()
  const [debugInfo, setDebugInfo] = useState<any>(null)

  useEffect(() => {
    const loadDebugInfo = async () => {
      if (!currentUser) return

      try {
        const localGames = await database.getUserGames(currentUser.id)
        const localStats = await database.getUserStats(currentUser.id)

        setDebugInfo({
          storeUser: {
            totalScore: currentUser.totalScore,
            gamesPlayed: currentUser.gamesPlayed,
            level: currentUser.level,
          },
          localDatabase: {
            gamesCount: localGames.length,
            totalScore: localStats.totalScore,
            totalGames: localStats.totalGames,
          },
          localStorage: JSON.parse(localStorage.getItem("ecotrivia-game-store") || "{}"),
        })
      } catch (error) {
        console.error("Debug error:", error)
      }
    }

    loadDebugInfo()
  }, [currentUser])

  if (!debugInfo || process.env.NODE_ENV === "production") return null

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm">
      <h4 className="font-bold mb-2">Debug Info:</h4>
      <div className="space-y-1">
        <div>
          Store: {debugInfo.storeUser.gamesPlayed} jogos, {debugInfo.storeUser.totalScore} pts
        </div>
        <div>
          Local DB: {debugInfo.localDatabase.gamesCount} jogos, {debugInfo.localDatabase.totalScore} pts
        </div>
        <div>Persisted: {debugInfo.localStorage?.state?.currentUser?.gamesPlayed || 0} jogos</div>
      </div>
    </div>
  )
}
