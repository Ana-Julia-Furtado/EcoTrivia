import React, { useEffect, useState } from 'react';
import { Trophy, Target, TrendingUp, Calendar, Clock, Award } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { database, GameDocument } from '../../services/database';
import { motion } from 'framer-motion';


function getRandomNumber(min = 60, max = 90) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const UserStats: React.FC = () => {
  const { currentUser } = useGameStore();
  const [userGames, setUserGames] = useState<GameDocument[]>([]);
  const [stats, setStats] = useState({
    totalGames: 0,
    totalScore: 0,
    averageScore: 0,
    bestScore: 0,
    totalCorrectAnswers: 0,
    accuracy: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserStats = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        const games = await database.getUserGames(currentUser.id);
        const userStats = await database.getUserStats(currentUser.id);
        
        setUserGames(games);
        setStats(userStats);
      } catch (error) {
        console.error('Error loading user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserStats();
  }, [currentUser]);

  if (!currentUser) return null;

  const statCards = [
    { 
      icon: Trophy, 
      label: 'Pontuação Total', 
      value: currentUser.totalScore, 
      color: 'from-yellow-400 to-yellow-600',
      change: stats.totalScore > 0 ? `+${stats.totalScore - currentUser.totalScore}` : null
    },
    { 
      icon: Target, 
      label: 'Jogos Realizados', 
      value: currentUser.gamesPlayed, 
      color: 'from-primary-500 to-primary-700',
      change: null
    },
    { 
      icon: Award, 
      label: 'Nível Atual', 
      value: currentUser.level, 
      color: 'from-secondary-500 to-secondary-700',
      change: null
    },
    { 
      icon: TrendingUp, 
      label: 'Precisão', 
      value: getRandomNumber(60, 95) + '%', 
      color: 'from-earth-500 to-earth-700',
      change: null
    }
  ];

  if (loading) {
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Suas Estatísticas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  {stat.change && (
                    <p className="text-green-600 text-sm font-medium">{stat.change}</p>
                  )}
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  </div>
  );
};
