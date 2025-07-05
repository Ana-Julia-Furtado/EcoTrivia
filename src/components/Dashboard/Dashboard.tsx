import React from 'react';
import { Play, Users, Trophy, TrendingUp, Award, Calendar, Zap } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { OnlineUsers } from './OnlineUsers';
import { UserStats } from './UserStats';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { currentUser, availableRooms } = useGameStore();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const activeRooms = availableRooms.filter(room => !room.isPrivate && room.gameState === 'waiting').length;
  const totalPlayers = availableRooms.reduce((sum, room) => sum + room.players.length, 0);

  const quickActions = [
    { 
      icon: Play, 
      label: 'Jogo Rápido', 
      description: 'Entrar em um jogo aleatório',
      action: () => navigate('/game'),
      color: 'from-primary-500 to-primary-700'
    },
    { 
      icon: Users, 
      label: 'Criar Sala', 
      description: 'Iniciar um jogo privado',
      action: () => navigate('/game'),
      color: 'from-secondary-500 to-secondary-700'
    },
    { 
      icon: Trophy, 
      label: 'Ranking', 
      description: 'Ver melhores jogadores',
      action: () => {},
      color: 'from-earth-500 to-earth-700'
    }
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
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
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
          {/* User Stats */}
          <UserStats />

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={action.action}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-all text-left"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.label}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Online Users */}
          <OnlineUsers />

          {/* Live Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas Ao Vivo</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Salas Ativas</span>
                <span className="font-bold text-primary-600">{activeRooms}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jogadores em Salas</span>
                <span className="font-bold text-secondary-600">{totalPlayers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Seu Ranking</span>
                <span className="font-bold text-earth-600">#42</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Dados salvos no banco</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Alcançou Nível {currentUser.level}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Pontuação: {currentUser.totalScore}</span>
              </div>
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="bg-gradient-nature rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="h-5 w-5" />
              <h3 className="font-semibold">Desafio Diário</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Responda 5 perguntas sobre energia renovável
            </p>
            <div className="w-full bg-white/20 rounded-full h-2 mb-3">
              <div className="bg-white h-2 rounded-full w-3/5"></div>
            </div>
            <p className="text-xs opacity-75">3/5 completado</p>
          </div>
        </div>
      </div>
    </div>
  );
};
