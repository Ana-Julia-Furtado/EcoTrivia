"use client"

import { useEffect, useState } from "react"
import { useGameStore } from "../store/gameStore"
<<<<<<< HEAD
=======

// Custom hook to provide stable data and prevent flickering
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
export const useStableGameStore = () => {
  const store = useGameStore()
  const [stableData, setStableData] = useState({
    currentUser: store.currentUser,
    isAuthenticated: store.isAuthenticated,
    isHydrated: store.isHydrated,
  })

  useEffect(() => {
<<<<<<< HEAD
=======
    // Only update stable data when hydrated and data actually changes
>>>>>>> f1e47b1da8a8b8e780d0ecd138e731483946378d
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
