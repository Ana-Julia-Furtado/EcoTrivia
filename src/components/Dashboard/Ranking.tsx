import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { firebaseRanking } from '../../services/firebaseRanking';
import type { RankingUser } from '../../services/firebaseRanking';

interface RankingProps {
  limit?: number;
  showCurrentUser?: boolean;
}

export const Ranking: React.FC<RankingProps> = ({ 
  limit = 10, 
  showCurrentUser = true 
}) => {
  const { currentUser } = useGameStore();
  const [rankingUsers, setRankingUsers] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setupRankingListener = async () => {
      try {
        setLoading(true);
        setError(null);

        // Set up real-time listener for ranking updates
        unsubscribe = firebaseRanking.subscribeToRanking((users) => {
          setRankingUsers(users.slice(0, limit));
          
          // Find current user's rank if they exist
          if (currentUser) {
            const userIndex = users.findIndex(user => user.ra === currentUser.id);
            setCurrentUserRank(userIndex >= 0 ? userIndex + 1 : null);
          }
          
          setLoading(false);
        }, (error) => {
          console.error('Ranking subscription error:', error);
          setError('Erro ao carregar ranking');
          setLoading(false);
        });

      } catch (error) {
        console.error('Error setting up ranking listener:', error);
        setError('Erro ao conectar com o ranking');
        setLoading(false);
      }
    };

    setupRankingListener();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [limit, currentUser]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <Star className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-amber-500 to-amber-700';
      default: return 'from-gray-200 to-gray-400';
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3: return 'bg-gradient-to-r from-amber-500 to-amber-700 text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Ranking Global</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-600">Carregando...</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Ranking Global</h3>
          </div>
        </div>
        
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-red-600 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Ranking Global</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-600">Ao vivo</span>
        </div>
      </div>

      {/* Current User Rank (if not in top list) */}
      {showCurrentUser && currentUser && currentUserRank && currentUserRank > limit && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-primary-50 border-2 border-primary-200 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {currentUserRank}
              </div>
              <div>
                <h4 className="font-medium text-primary-800">
                  {currentUser.name} (Você)
                </h4>
                <p className="text-xs text-primary-600">Sua posição atual</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary-700">{currentUser.totalScore}</p>
              <p className="text-xs text-primary-600">pontos</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Top Rankings */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {rankingUsers.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = currentUser?.id === user.ra;
            
            return (
              <motion.div
                key={user.ra}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ 
                  duration: 0.3,
                  layout: { duration: 0.2 }
                }}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  isCurrentUser 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Rank Badge */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getRankBadgeColor(rank)}`}>
                    {rank <= 3 ? (
                      <div className="flex items-center justify-center">
                        {getRankIcon(rank)}
                      </div>
                    ) : (
                      rank
                    )}
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-medium ${isCurrentUser ? 'text-primary-800' : 'text-gray-900'}`}>
                        {user.username}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
                            Você
                          </span>
                        )}
                      </h4>
                      {rank <= 3 && (
                        <div className="flex items-center space-x-1">
                          <Zap className="h-3 w-3 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <span>RA: {user.ra}</span>
                      <div className="flex items-center space-x-1">
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <motion.p 
                    key={user.score}
                    initial={{ scale: 1.2, color: '#22c55e' }}
                    animate={{ scale: 1, color: '#111827' }}
                    transition={{ duration: 0.3 }}
                    className="text-lg font-bold text-gray-900"
                  >
                    {user.score.toLocaleString()}
                  </motion.p>
                  <p className="text-xs text-gray-600">pontos</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {rankingUsers.length === 0 && !loading && (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum jogador no ranking ainda</p>
          <p className="text-gray-400 text-sm">Seja o primeiro a jogar!</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Atualizado em tempo real</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Firebase</span>
          </div>
        </div>
      </div>
    </div>
  );
};
