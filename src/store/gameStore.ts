import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"
import type { User, GameRoom, Question, GameState, PlayerAnswer, GameSettings } from "../types/game"
import { mockQuestions } from "../data/questions"
import { firebaseAuth } from "../services/firebaseAuth"

interface GameStore {
  // User state
  currentUser: User | null
  isAuthenticated: boolean

  // Game state
  currentRoom: GameRoom | null
  availableRooms: GameRoom[]
  currentQuestion: Question | null
  playerAnswers: PlayerAnswer[]
  gameSettings: GameSettings

  // Game session questions - store filtered questions for the entire game
  currentGameQuestions: Question[]

  // Online users
  onlineUsers: User[]

  // UI state
  isLoading: boolean
  error: string | null
  showResults: boolean

  // Game session tracking
  currentGameSession: {
    startTime: Date | null
    questionsAnswered: number
    correctAnswers: number
    totalScore: number
  }

  // Actions
  setUser: (user: User) => void
  logout: () => void
  createRoom: (roomName: string, maxPlayers: number, isPrivate: boolean) => void
  joinRoom: (roomId: string) => void
  leaveRoom: () => void
  startGame: () => void
  submitAnswer: (answerIndex: number, timeSpent: number) => void
  nextQuestion: () => void
  endGame: () => void
  resetGameState: () => void
  setGameSettings: (settings: Partial<GameSettings>) => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
  updateOnlineUsers: () => void
  syncRooms: () => void
  saveGameToFirebase: () => Promise<void>
}

const defaultGameSettings: GameSettings = {
  questionsPerGame: 10,
  timePerQuestion: 30,
  difficulty: "mixed",
  categories: [
    "reciclagem",
    "biodiversidade",
    "energia",
    "mudancas_climaticas",
    "consumo",
    "poluicao",
    "conservacao",
    "sustentabilidade",
    "ecossistemas",
    "residuos",
    "recursos_hidricos",
    "politica_ambiental",
    "oceanos",
    "solo",
    "urbanizacao",
    "conscientizacao",
    "poluicao_da_agua",
    "alimentacao_sustentavel",
    "atmosfera",
    "poluicao_plastica",
    "poluicao_do_ar",
    "energias_renovaveis",
  ],
}

// Helper function to filter and prepare questions
const getFilteredQuestions = (gameSettings: GameSettings): Question[] => {
  let filteredQuestions = [...mockQuestions]

  // Filter by difficulty if not mixed
  if (gameSettings.difficulty !== "mixed") {
    filteredQuestions = filteredQuestions.filter((q) => q.difficulty === gameSettings.difficulty)
  }

  // Filter by categories
  if (gameSettings.categories.length > 0) {
    filteredQuestions = filteredQuestions.filter((q) => gameSettings.categories.includes(q.category))
  }

  // Fallback: if no questions match the criteria, use all questions
  if (filteredQuestions.length === 0) {
    console.warn("No questions match the current settings, using all questions as fallback")
    filteredQuestions = [...mockQuestions]
  }

  // Shuffle questions
  const shuffled = filteredQuestions.sort(() => 0.5 - Math.random())

  // Return the required number of questions, cycling through if needed
  const selectedQuestions: Question[] = []
  for (let i = 0; i < gameSettings.questionsPerGame; i++) {
    selectedQuestions.push(shuffled[i % shuffled.length])
  }

  return selectedQuestions
}

// Mock online users for demonstration
const generateMockOnlineUsers = (): User[] => {
  const mockUsers = [
    { id: "158435", name: "Ana Júlia Furtado", level: 10, totalScore: 0, gamesPlayed: 8, correctAnswers: 45 },
    { id: "148723", name: "Natã da Silva Almeida", level: 10, totalScore: 1250, gamesPlayed: 8, correctAnswers: 45 },
    { id: "176563", name: "Livia de Moura Carvalho", level: 7, totalScore: 1100, gamesPlayed: 5, correctAnswers: 22 },
    {
      id: "163911",
      name: "Lucas Alves Nascimento Marques",
      level: 4,
      totalScore: 900,
      gamesPlayed: 5,
      correctAnswers: 30,
    },
  ]

  // Randomly select 3-6 users to be "online"
  const shuffled = mockUsers.sort(() => 0.5 - Math.random())
  const onlineCount = Math.floor(Math.random() * 4) + 3 // 3-6 users
  return shuffled.slice(0, onlineCount)
}

// Cross-tab synchronization utilities
const STORAGE_KEYS = {
  ROOMS: "ecotrivia-rooms",
  ONLINE_USERS: "ecotrivia-online-users",
  ROOM_UPDATE: "ecotrivia-room-update",
}

const saveRoomsToStorage = (rooms: GameRoom[]) => {
  localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms))
  // Trigger storage event for other tabs
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: STORAGE_KEYS.ROOM_UPDATE,
      newValue: Date.now().toString(),
    }),
  )
}

const loadRoomsFromStorage = (): GameRoom[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ROOMS)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveOnlineUsersToStorage = (users: User[]) => {
  localStorage.setItem(STORAGE_KEYS.ONLINE_USERS, JSON.stringify(users))
}

const loadOnlineUsersFromStorage = (): User[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ONLINE_USERS)
    return stored ? JSON.parse(stored) : generateMockOnlineUsers()
  } catch {
    return generateMockOnlineUsers()
  }
}

export const useGameStore = create<GameStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        currentUser: null,
        isAuthenticated: false,
        currentRoom: null,
        availableRooms: loadRoomsFromStorage(),
        currentQuestion: null,
        currentGameQuestions: [],
        playerAnswers: [],
        gameSettings: defaultGameSettings,
        onlineUsers: loadOnlineUsersFromStorage(),
        isLoading: false,
        error: null,
        showResults: false,
        currentGameSession: {
          startTime: null,
          questionsAnswered: 0,
          correctAnswers: 0,
          totalScore: 0,
        },

        // Actions
        setUser: (user) => {
          set({ currentUser: user, isAuthenticated: true })
          // Add current user to online users if not already there
          const { onlineUsers } = get()
          if (!onlineUsers.find((u) => u.id === user.id)) {
            const updatedUsers = [...onlineUsers, user]
            set({ onlineUsers: updatedUsers })
            saveOnlineUsersToStorage(updatedUsers)
          }
        },

        logout: () => {
          const { currentUser, onlineUsers } = get()
          const updatedUsers = currentUser ? onlineUsers.filter((u) => u.id !== currentUser.id) : onlineUsers

          set({
            currentUser: null,
            isAuthenticated: false,
            currentRoom: null,
            currentQuestion: null,
            currentGameQuestions: [],
            playerAnswers: [],
            showResults: false,
            onlineUsers: updatedUsers,
            currentGameSession: {
              startTime: null,
              questionsAnswered: 0,
              correctAnswers: 0,
              totalScore: 0,
            },
          })

          saveOnlineUsersToStorage(updatedUsers)
        },

        createRoom: (roomName, maxPlayers, isPrivate) => {
          const { currentUser, availableRooms } = get()
          if (!currentUser) return

          const newRoom: GameRoom = {
            id: Math.random().toString(36).substr(2, 9),
            name: roomName,
            players: [currentUser],
            maxPlayers,
            isPrivate,
            gameState: "waiting",
            questionIndex: 0,
            timeRemaining: 0,
            scores: { [currentUser.id]: 0 },
          }

          const updatedRooms = [...availableRooms, newRoom]

          set({
            currentRoom: newRoom,
            availableRooms: updatedRooms,
          })

          // Save to localStorage and notify other tabs
          saveRoomsToStorage(updatedRooms)
        },

        joinRoom: (roomId) => {
          const { currentUser, availableRooms } = get()
          if (!currentUser) return

          const room = availableRooms.find((r) => r.id === roomId)
          if (!room || room.players.length >= room.maxPlayers) return

          const updatedRoom = {
            ...room,
            players: [...room.players, currentUser],
            scores: { ...room.scores, [currentUser.id]: 0 },
          }

          const updatedRooms = availableRooms.map((r) => (r.id === roomId ? updatedRoom : r))

          set({
            currentRoom: updatedRoom,
            availableRooms: updatedRooms,
          })

          // Save to localStorage and notify other tabs
          saveRoomsToStorage(updatedRooms)
        },

        leaveRoom: () => {
          const { currentRoom, currentUser, availableRooms } = get()
          if (!currentRoom || !currentUser) return

          // Remove user from room
          const updatedRoom = {
            ...currentRoom,
            players: currentRoom.players.filter((p) => p.id !== currentUser.id),
          }

          let updatedRooms
          if (updatedRoom.players.length === 0) {
            // Remove empty room
            updatedRooms = availableRooms.filter((r) => r.id !== currentRoom.id)
          } else {
            // Update room with remaining players
            updatedRooms = availableRooms.map((r) => (r.id === currentRoom.id ? updatedRoom : r))
          }

          set({
            currentRoom: null,
            currentQuestion: null,
            currentGameQuestions: [],
            playerAnswers: [],
            showResults: false,
            availableRooms: updatedRooms,
            currentGameSession: {
              startTime: null,
              questionsAnswered: 0,
              correctAnswers: 0,
              totalScore: 0,
            },
          })
          saveRoomsToStorage(updatedRooms)
        },

        startGame: () => {
          const { currentRoom, gameSettings, availableRooms } = get()
          if (!currentRoom) return

          const gameQuestions = getFilteredQuestions(gameSettings)
          if (gameQuestions.length === 0) {
            set({ error: "Não foi possível encontrar perguntas para as configurações selecionadas." })
            return
          }

          const updatedRoom = {
            ...currentRoom,
            gameState: "playing" as GameState,
            questionIndex: 0,
            timeRemaining: gameSettings.timePerQuestion,
          }

          const updatedRooms = availableRooms.map((r) => (r.id === currentRoom.id ? updatedRoom : r))

          // Inicialização com a primeira pergunta
          set({
            currentRoom: updatedRoom,
            currentGameQuestions: gameQuestions,
            currentQuestion: gameQuestions[0],
            playerAnswers: [],
            availableRooms: updatedRooms,
            error: null,
            showResults: false,
            currentGameSession: {
              startTime: new Date(),
              questionsAnswered: 0,
              correctAnswers: 0,
              totalScore: 0,
            },
          })
          saveRoomsToStorage(updatedRooms)
        },

        resetGameState: () => {
          const { currentRoom, availableRooms, gameSettings } = get()
          if (!currentRoom) return

          // Reset room scores to zero for all players
          const resetScores: { [key: string]: number } = {}
          currentRoom.players.forEach((player) => {
            resetScores[player.id] = 0
          })

          // Reset the room state
          const updatedRoom = {
            ...currentRoom,
            gameState: "waiting" as GameState,
            questionIndex: 0,
            timeRemaining: 0,
            scores: resetScores,
          }

          const updatedRooms = availableRooms.map((r) => (r.id === currentRoom.id ? updatedRoom : r))

          // Reset all game-related state
          set({
            currentRoom: updatedRoom,
            availableRooms: updatedRooms,
            currentQuestion: null,
            currentGameQuestions: [],
            playerAnswers: [],
            showResults: false,
            error: null,
            currentGameSession: {
              startTime: null,
              questionsAnswered: 0,
              correctAnswers: 0,
              totalScore: 0,
            },
          })

          // Save to localStorage and notify other tabs
          saveRoomsToStorage(updatedRooms)
        },

        submitAnswer: (answerIndex, timeSpent) => {
          const { currentUser, currentQuestion, currentRoom, availableRooms, currentGameSession } = get()
          if (!currentUser || !currentQuestion || !currentRoom) return

          const isCorrect = answerIndex === currentQuestion.correctAnswer
          const timeBonus = Math.max(0, (30 - timeSpent) * 2)
          const points = isCorrect ? currentQuestion.points + timeBonus : 0

          const answer: PlayerAnswer = {
            playerId: currentUser.id,
            answerIndex,
            timeSpent,
            isCorrect,
            points,
          }

          const updatedScores = {
            ...currentRoom.scores,
            [currentUser.id]: (currentRoom.scores[currentUser.id] || 0) + points,
          }

          const updatedRoom = {
            ...currentRoom,
            scores: updatedScores,
          }

          const updatedRooms = availableRooms.map((r) => (r.id === currentRoom.id ? updatedRoom : r))

          // Update game session
          const updatedGameSession = {
            ...currentGameSession,
            questionsAnswered: currentGameSession.questionsAnswered + 1,
            correctAnswers: currentGameSession.correctAnswers + (isCorrect ? 1 : 0),
            totalScore: currentGameSession.totalScore + points,
          }

          set({
            playerAnswers: [...get().playerAnswers, answer],
            currentRoom: updatedRoom,
            availableRooms: updatedRooms,
            showResults: true,
            currentGameSession: updatedGameSession,
          })

          // Save to localStorage and notify other tabs
          saveRoomsToStorage(updatedRooms)
        },

        nextQuestion: () => {
          const { currentRoom, currentGameQuestions, availableRooms } = get()
          if (!currentRoom || !currentGameQuestions.length) return

          const nextIndex = currentRoom.questionIndex + 1

          // Check if we've reached the end of the game
          if (nextIndex >= currentGameQuestions.length) {
            get().endGame()
            return
          }

          const nextQuestion = currentGameQuestions[nextIndex]

          // Safety check
          if (!nextQuestion) {
            console.error("Next question not found, ending game")
            get().endGame()
            return
          }

          const updatedRoom = {
            ...currentRoom,
            questionIndex: nextIndex,
            timeRemaining: get().gameSettings.timePerQuestion,
          }

          const updatedRooms = availableRooms.map((r) => (r.id === currentRoom.id ? updatedRoom : r))

          set({
            currentRoom: updatedRoom,
            currentQuestion: nextQuestion,
            showResults: false,
            availableRooms: updatedRooms,
          })

          // Save to localStorage and notify other tabs
          saveRoomsToStorage(updatedRooms)
        },

        endGame: async () => {
          const { currentRoom, availableRooms } = get()
          if (!currentRoom) return

          const updatedRoom = {
            ...currentRoom,
            gameState: "finished" as GameState,
          }

          const updatedRooms = availableRooms.map((r) => (r.id === currentRoom.id ? updatedRoom : r))

          set({
            currentRoom: updatedRoom,
            currentQuestion: null,
            currentGameQuestions: [],
            showResults: true,
            availableRooms: updatedRooms,
          })

          // Save game to Firebase
          await get().saveGameToFirebase()

          // Save to localStorage and notify other tabs
          saveRoomsToStorage(updatedRooms)
        },

        saveGameToFirebase: async () => {
          const { currentUser, currentGameSession } = get()
          if (!currentUser || !currentGameSession.startTime) return

          try {
            // Update user score in Firebase
            const newTotalScore = currentUser.totalScore + currentGameSession.totalScore
            await firebaseAuth.updateUserScore(currentUser.id, newTotalScore)

            // Update current user in store
            const updatedUser = {
              ...currentUser,
              totalScore: newTotalScore,
              level: Math.floor(newTotalScore / 1000) + 1,
              gamesPlayed: currentUser.gamesPlayed + 1,
              correctAnswers: currentUser.correctAnswers + currentGameSession.correctAnswers,
            }

            set({ currentUser: updatedUser })
          } catch (error) {
            console.error("Error saving game to Firebase:", error)
          }
        },

        setGameSettings: (settings) =>
          set((state) => ({
            gameSettings: { ...state.gameSettings, ...settings },
          })),

        setError: (error) => set({ error }),
        setLoading: (loading) => set({ isLoading: loading }),

        updateOnlineUsers: () => {
          // Simulate real-time updates by occasionally changing online users
          const { currentUser } = get()
          const newOnlineUsers = generateMockOnlineUsers()

          // Always include current user if authenticated
          if (currentUser && !newOnlineUsers.find((u) => u.id === currentUser.id)) {
            newOnlineUsers.push(currentUser)
          }

          set({ onlineUsers: newOnlineUsers })
          saveOnlineUsersToStorage(newOnlineUsers)
        },

        syncRooms: () => {
          const storedRooms = loadRoomsFromStorage()
          set({ availableRooms: storedRooms })
        },
      }),
      {
        name: "ecotrivia-game-store",
        partialize: (state) => ({
          currentUser: state.currentUser,
          isAuthenticated: state.isAuthenticated,
          gameSettings: state.gameSettings,
        }),
      },
    ),
  ),
)

// Set up cross-tab synchronization
if (typeof window !== "undefined") {
  // Listen for storage events from other tabs
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEYS.ROOM_UPDATE) {
      // Sync rooms when another tab updates them
      useGameStore.getState().syncRooms()
    }
  })

  // Periodic sync to ensure consistency
  setInterval(() => {
    useGameStore.getState().syncRooms()
  }, 5000)

  // Cleanup empty rooms periodically
  setInterval(() => {
    const { availableRooms } = useGameStore.getState()
    const activeRooms = availableRooms.filter(
      (room) => room.players.length > 0 && (room.gameState === "waiting" || room.gameState === "playing"),
    )

    if (activeRooms.length !== availableRooms.length) {
      saveRoomsToStorage(activeRooms)
      useGameStore.setState({ availableRooms: activeRooms })
    }
  }, 10000)
}
