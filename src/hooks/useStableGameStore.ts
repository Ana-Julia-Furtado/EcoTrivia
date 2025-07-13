"use client"

import { useEffect, useState } from "react"
import { useGameStore } from "../store/gameStore"

// Custom hook to provide stable data and prevent flickering
export const useStableGameStore = () => {
  const store = useGameStore()
  const [stableData, setStableData] = useState({
    currentUser: store.currentUser,
    isAuthenticated: store.isAuthenticated,
    isHydrated: store.isHydrated,
  })

  useEffect(() => {
    // Only update stable data when hydrated and data actually changes
    if (store.isHydrated) {
      setStableData((prev) => {
        const hasChanged =
          prev.currentUser?.id !== store.currentUser?.id ||
          prev.currentUser?.totalScore !== store.currentUser?.totalScore ||
          prev.currentUser?.gamesPlayed !== store.currentUser?.gamesPlayed ||
          prev.isAuthenticated !== store.isAuthenticated

        if (hasChanged) {
          return {
            currentUser: store.currentUser,
            isAuthenticated: store.isAuthenticated,
            isHydrated: store.isHydrated,
          }
        }

        return prev
      })
    }
  }, [store.currentUser, store.isAuthenticated, store.isHydrated])

  return {
    ...store,
    ...stableData,
  }
}
