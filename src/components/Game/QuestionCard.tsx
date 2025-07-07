"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import { useGameStore } from "../../store/gameStore"
import { questionCategories } from "../../data/questions"
import { firebaseAuth } from "../../services/firebaseAuth"

export const QuestionCard: React.FC = () => {
  const {
    currentQuestion,
    gameSettings,
    submitAnswer,
    nextQuestion,
    showResults,
    playerAnswers,
    currentUser,
    currentGameSession,
    setUser,
    setError,
  } = useGameStore()

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(gameSettings.timePerQuestion)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [pointsEarned, setPointsEarned] = useState(0)
  const [isSavingToFirebase, setIsSavingToFirebase] = useState(false)


  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Carregando pergunta...</h2>
        </div>
      </div>
    )
  }


  const category = questionCategories[currentQuestion.category]
  const userAnswer = playerAnswers.find((a) => a.playerId === currentUser?.id)

  useEffect(() => {
    if (!showResults) {
      setSelectedAnswer(null)
      setHasAnswered(false)
      setIsCorrect(null)
      setPointsEarned(0)
      setTimeLeft(gameSettings.timePerQuestion)
    }
  }, [currentQuestion, showResults, gameSettings.timePerQuestion])

  useEffect(() => {
    if (hasAnswered || showResults) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (!hasAnswered) {
            handleTimeUp()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion, hasAnswered, showResults])

  const calculatePoints = (isCorrect: boolean, timeSpent: number): number => {
    if (!isCorrect) return 0

    const basePoints = currentQuestion.points
    const timeBonus = Math.max(0, (gameSettings.timePerQuestion - timeSpent) * 2)

    const difficultyMultiplier = {
      easy: 1,
      medium: 1.2,
      hard: 1.5,
    }[currentQuestion.difficulty]

    return Math.floor((basePoints + timeBonus) * difficultyMultiplier)
  }

  const updateFirebaseScore = async (pointsToAdd: number) => {
    if (!currentUser || pointsToAdd === 0) return

    try {
      setIsSavingToFirebase(true)

      const newTotalScore = currentUser.totalScore + pointsToAdd

      await firebaseAuth.updateUserScore(currentUser.id, newTotalScore)

      const updatedUser = {
        ...currentUser,
        totalScore: newTotalScore,
        level: Math.floor(newTotalScore / 1000) + 1,
        correctAnswers: currentUser.correctAnswers + (pointsToAdd > 0 ? 1 : 0),
      }

      setUser(updatedUser)
    } catch (error) {
      console.error("Erro ao salvar pontuação no Firebase:", error)
      setError("Erro ao salvar pontuação. Tente novamente.")
    } finally {
      setIsSavingToFirebase(false)
    }
  }

  const handleTimeUp = async () => {
    if (hasAnswered) return

    const timeSpent = gameSettings.timePerQuestion
    setHasAnswered(true)
    setIsCorrect(false)
    setPointsEarned(0)
    setSelectedAnswer(null)

    submitAnswer(-1, timeSpent)
  }

  const handleSubmitAnswer = async (answerIndex: number) => {
    if (hasAnswered) return

    const timeSpent = gameSettings.timePerQuestion - timeLeft
    const correct = answerIndex === currentQuestion.correctAnswer
    const points = calculatePoints(correct, timeSpent)

    setSelectedAnswer(answerIndex)
    setHasAnswered(true)
    setIsCorrect(correct)
    setPointsEarned(points)

    submitAnswer(answerIndex, timeSpent)

    if (points > 0) {
      await updateFirebaseScore(points)
    }
  }

  const handleNextQuestion = () => {
    nextQuestion()
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className={`${category.color} p-6 text-white`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm opacity-90 capitalize">
                  {currentQuestion.difficulty} • {currentQuestion.points} pontos
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
              <Clock className="h-5 w-5" />
              <span className="font-bold text-lg">{timeLeft}s</span>
            </div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / gameSettings.timePerQuestion) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">{currentQuestion.question}</h2>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option, index) => {
              let buttonClass =
                "p-6 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-lg transform hover:scale-105"

              if (showResults) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += " border-green-500 bg-green-50 text-green-800"
                } else if (selectedAnswer === index) {
                  buttonClass += " border-red-500 bg-red-50 text-red-800"
                } else {
                  buttonClass += " border-gray-200 bg-gray-50 text-gray-600"
                }
              } else if (selectedAnswer === index) {
                buttonClass += " border-primary-500 bg-primary-50 text-primary-800"
              } else {
                buttonClass += " border-gray-200 hover:border-primary-300 text-gray-800"
              }

              return (
                <button
                  key={index}
                  onClick={() => !hasAnswered && handleSubmitAnswer(index)}
                  disabled={hasAnswered || isSavingToFirebase}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showResults && (
                      <div>
                        {index === currentQuestion.correctAnswer && <CheckCircle className="h-6 w-6 text-green-600" />}
                        {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                          <XCircle className="h-6 w-6 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Firebase Saving */}
          {isSavingToFirebase && (
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Salvando pontuação...</span>
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="space-y-6">
              <div
                className={`p-4 rounded-lg ${
                  isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect ? "Correto!" : selectedAnswer === null ? "Acabou o tempo!" : "Incorreto"}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                    Você ganhou {pointsEarned} pontos
                  </p>
                </div>
                {!isCorrect && selectedAnswer !== null && (
                  <p className="text-sm text-red-600 mt-2">
                    A resposta correta é: {currentQuestion.options[currentQuestion.correctAnswer]}
                  </p>
                )}
              </div>

              {currentGameSession && (
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Progresso da Sessão</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{currentGameSession.questionsAnswered}</p>
                      <p className="text-gray-600">Perguntas</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-green-600">{currentGameSession.correctAnswers}</p>
                      <p className="text-gray-600">Correto</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-blue-600">{currentGameSession.totalScore}</p>
                      <p className="text-gray-600">Pontos Totais</p>
                    </div>
                  </div>
                </div>
              )}

              {currentQuestion.explanation && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Explicação</h4>
                  <p className="text-blue-700">{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={handleNextQuestion}
                  disabled={isSavingToFirebase}
                  className="px-8 py-3 bg-gradient-nature text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSavingToFirebase ? "Salvando" : "Proxima pergunta"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 5fad0dc19fe8ae8427379b8696451e66625d4109
