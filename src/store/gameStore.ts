import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"
import type { User, GameRoom, Question, GameState, PlayerAnswer, GameSettings } from "../types/game"
import { mockQuestions } from "../data/questions"
import { firebaseAuth } from "../services/firebaseAuth"
import { database } from "../services/database"

interface GameStore {
  currentUser: User | null
  isAuthenticated: boolean
  currentRoom: GameRoom | null
  availableRooms: GameRoom[]
  currentQuestion: Question | null
  playerAnswers: PlayerAnswer[]
  gameSettings: GameSettings
  currentGameQuestions: Question[]
  onlineUsers: User[]
  isLoading: boolean
  error: string | null
  showResults: boolean
  currentGameSession: {
    startTime: Date | null
    questionsAnswered: number
    correctAnswers: number
    totalScore: number
  }
  setUser: (user: User) => void
  logout: () => void
  createRoom: (roomName: string, maxPlayers: number, isPrivate: boolean) => void
  joinRoom: (roomId: string) => void
  leaveRoom: () => void
  startGame: () => void
  submitAnswer: (answerIndex: number, timeSpent: number) => void
  nextQuestion: () => void
  endGame: () => void
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
const getFilteredQuestions = (gameSettings: GameSettings): Question[] => {
  let filteredQuestions = [...mockQuestions]
  if (gameSettings.difficulty !== "mixed") {
    filteredQuestions = filteredQuestions.filter((q) => q.difficulty === gameSettings.difficulty)
  }
  if (gameSettings.categories.length > 0) {
    filteredQuestions = filteredQuestions.filter((q) => gameSettings.categories.includes(q.category))
  }
  if (filteredQuestions.length === 0) {
    console.warn("No questions match the current settings, using all questions as fallback")
    filteredQuestions = [...mockQuestions]
  }
  const shuffled = filteredQuestions.sort(() => 0.5 - Math.random())
  const selectedQuestions: Question[] = []
  for (let i = 0; i < gameSettings.questionsPerGame; i++) {
    selectedQuestions.push(shuffled[i % shuffled.length])
  }
  return selectedQuestions
}
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

  const shuffled = mockUsers.sort(() => 0.5 - Math.random())
  const onlineCount = Math.floor(Math.random() * 4) + 3 // 3-6 users
  return shuffled.slice(0, onlineCount)
}
const STORAGE_KEYS = {
  ROOMS: "ecotrivia-rooms",
  ONLINE_USERS: "ecotrivia-online-users",
  ROOM_UPDATE: "ecotrivia-room-update",
}

const saveRoomsToStorage = (rooms: GameRoom[]) => {
  localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms))
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

        setUser: (user) => {
          set({ currentUser: user, isAuthenticated: true })
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
          saveRoomsToStorage(updatedRooms)
        },

        leaveRoom: () => {
          const { currentRoom, currentUser, availableRooms } = get()
          if (!currentRoom || !currentUser) return
          const updatedRoom = {
            ...currentRoom,
            players: currentRoom.players.filter((p) => p.id !== currentUser.id),
          }

          let updatedRooms
          if (updatedRoom.players.length === 0) {
            updatedRooms = availableRooms.filter((r) => r.id !== currentRoom.id)
          } else {
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
          set({
            currentRoom: updatedRoom,
            currentGameQuestions: gameQuestions,
            currentQuestion: gameQuestions[0],
            playerAnswers: [],
            availableRooms: updatedRooms,
            error: null,
            currentGameSession: {
              startTime: new Date(),
              questionsAnswered: 0,
              correctAnswers: 0,
              totalScore: 0,
            },
          })
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
          saveRoomsToStorage(updatedRooms)
        },

        nextQuestion: () => {
          const { currentRoom, currentGameQuestions, availableRooms } = get()
          if (!currentRoom || !currentGameQuestions.length) return

          const nextIndex = currentRoom.questionIndex + 1
          if (nextIndex >= currentGameQuestions.length) {
            get().endGame()
            return
          }

          const nextQuestion = currentGameQuestions[nextIndex]
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
          await get().saveGameToFirebase()
          saveRoomsToStorage(updatedRooms)
        },

        saveGameToFirebase: async () => {
          const { currentUser, currentGameSession } = get()
          if (!currentUser || !currentGameSession.startTime) return

          try {
            await database.saveGame({
              userId: currentUser.id,
              score: currentGameSession.totalScore,
              questionsAnswered: currentGameSession.questionsAnswered,
              correctAnswers: currentGameSession.correctAnswers,
              gameDate: new Date(),
              duration: new Date().getTime() - currentGameSession.startTime.getTime(),
              category: get().gameSettings.categories,
            })

            // Atualizar pontuação e incrementar contador de jogos no Firebase
            const newTotalScore = currentUser.totalScore + currentGameSession.totalScore
            const updatedFirebaseUser = await firebaseAuth.updateScoreAndIncrementGames(currentUser.id, newTotalScore)

            if (updatedFirebaseUser) {
              // Sincronizar dados do Firebase com o banco de dados local
              await database.syncUserWithFirebase(currentUser.id, {
                score: updatedFirebaseUser.score,
                gamesPlayed: updatedFirebaseUser.gamesPlayed,
              })

              // Atualizar usuário no store com dados do Firebase
              const updatedUser = {
                ...currentUser,
                totalScore: updatedFirebaseUser.score,
                level: Math.floor(updatedFirebaseUser.score / 1000) + 1,
                gamesPlayed: updatedFirebaseUser.gamesPlayed,
                correctAnswers: currentUser.correctAnswers + currentGameSession.correctAnswers,
              }

              set({ currentUser: updatedUser })
            }
          } catch (error) {
            console.error("Error saving game to Firebase:", error)
            set({ error: "Erro ao salvar progresso do jogo. Tente novamente." })
          }
        },

        setGameSettings: (settings) =>
          set((state) => ({
            gameSettings: { ...state.gameSettings, ...settings },
          })),

        setError: (error) => set({ error }),
        setLoading: (loading) => set({ isLoading: loading }),

        updateOnlineUsers: () => {
          const { currentUser } = get()
          const newOnlineUsers = generateMockOnlineUsers()
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

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEYS.ROOM_UPDATE) {
      useGameStore.getState().syncRooms()
    }
  })
  setInterval(() => {
    useGameStore.getState().syncRooms()
  }, 5000)
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
