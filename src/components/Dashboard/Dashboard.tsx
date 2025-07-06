import React from 'react';
import {
  Play,
  Users,
  Trophy,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useGameStore } from '../../store/gameStore';
import { OnlineUsers } from './OnlineUsers';
import { UserStats } from './UserStats';

export const Dashboard: React.FC = () => {
  const { currentUser, availableRooms } = useGameStore();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const activeRooms = availableRooms.filter(
    (room) => !room.isPrivate && room.gameState === 'waiting'
  ).length;

  const totalPlayers = availableRooms.reduce(
    (sum, room) => sum + room.players.length,
    0
  );

  const quickActions = [
    {
      icon: Play,
      label: 'Jogo Rápido',
      description: 'Entrar em um jogo aleatório',
      action: () => navigate('/game'),
      color: 'from-primary-500 to-primary-700',
    },
    {
      icon: Users,
      label: 'Criar Sala',
      description: 'Iniciar um jogo privado',
      action: () => navigate('/game'),
      color: 'from-secondary-500 to-secondary-700',
    },
    {
      icon: Trophy,
      label: 'Ranking',
      description: 'Ver melhores jogadores',
      action: () => {}, // Ajuste depois para redirecionar ao ranking
      color: 'from-earth-500 to-earth-700',
    },
  ];

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Bem-vindo, {currentUser.name}! 🌱
            </h1>
            <p className="text-gray-600 text-lg">
              Pronto para testar seus conhecimentos ambientais?
            </p>
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
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sequência Atual</p>
              <p className="text-2xl font-bold text-gray-900">5 dias</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <UserStats />

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map(({ icon: Icon, label, description, action, color }, index) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={action}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-all text-left"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{label}</h3>
                  <p className="text-gray-600 text-sm">{description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <OnlineUsers />

          </div>
        </div>
      </div>
  );
};
