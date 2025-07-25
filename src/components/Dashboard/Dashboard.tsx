"use client"

import type React from "react"
import { Play, Users, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useGameStore } from "../../store/gameStore"
import { OnlineUsers } from "./OnlineUsers"
import { UserStats } from "./UserStats"
import { Ranking } from "./Ranking"

export const Dashboard: React.FC = () => {
  const { currentUser, availableRooms, isLoading, error } = useGameStore()
  const navigate = useNavigate()

  if (!currentUser) return null

  const activeRooms = availableRooms.filter((room) => !room.isPrivate && room.gameState === "waiting").length

  const totalPlayers = availableRooms.reduce((sum, room) => sum + room.players.length, 0)

  const quickActions = [
    {
      icon: Play,
      label: "Jogo Rápido",
      description: "Entrar em um jogo aleatório",
      action: () => navigate("/game"),
      color: "from-primary-500 to-primary-700",
    },
    {
      icon: Users,
      label: "Criar Sala",
      description: "Iniciar um jogo privado",
      action: () => navigate("/game"),
      color: "from-secondary-500 to-secondary-700",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Bem-vindo, {currentUser.name}! 🌱</h1>
            <p className="text-gray-600 text-lg">Pronto para testar seus conhecimentos ambientais?</p>
            <div className="mt-4 flex flex-wrap items-center space-x-2 text-sm text-gray-600">
              <span>RA: {currentUser.id}</span>
              <span>•</span>
              <span>Nível {currentUser.level}</span>
              <span>•</span>
              <span>{currentUser.totalScore} pontos totais</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="bg-gradient-nature p-4 rounded-full">
              <Zap className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <UserStats />

          {/* Loading/Error States */}
          {isLoading && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <p className="text-blue-700 text-sm">Inicializando sistema de perguntas...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-700 text-sm">{error}</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ações Rápidas</h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
                {quickActions.map(({ icon: Icon, label, description, action, color }, index) => (
                  <motion.button
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={action}
                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transform hover:scale-105 transition-all text-center"
                  >
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-6 mx-auto`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">{label}</h3>
                    <p className="text-gray-600">{description}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Ranking limit={10} showCurrentUser={true} />
        </div>
      </div>
    </div>
  )
}
