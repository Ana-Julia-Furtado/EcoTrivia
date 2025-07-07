import React, { useEffect } from 'react';
import { Users, Circle, Crown, Star } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';

export const OnlineUsers: React.FC = () => {
  const { onlineUsers, currentUser, updateOnlineUsers } = useGameStore();

  // Update online users every 10 seconds to simulate real-time activity
  useEffect(() => {
    const interval = setInterval(() => {
      updateOnlineUsers();
    }, 10000);

    return () => clearInterval(interval);
  }, [updateOnlineUsers]);

  const getLevelIcon = (level: number) => {
    if (level >= 5) return <Crown className="h-4 w-4 text-yellow-500" />;
    if (level >= 3) return <Star className="h-4 w-4 text-blue-500" />;
    return <Circle className="h-4 w-4 text-gray-400" />;
  };

  const getLevelColor = (level: number) => {
    if (level >= 5) return 'from-yellow-400 to-yellow-600';
    if (level >= 3) return 'from-blue-400 to-blue-600';
    if (level >= 2) return 'from-green-400 to-green-600';
    return 'from-gray-400 to-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Jogadores Online</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-600">{onlineUsers.length}</span>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        <AnimatePresence>
          {onlineUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                user.id === currentUser?.id 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getLevelColor(user.level)} flex items-center justify-center text-white font-bold text-sm`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className={`font-medium ${user.id === currentUser?.id ? 'text-primary-800' : 'text-gray-900'}`}>
                      {user.name}
                      {user.id === currentUser?.id && (
                        <span className="ml-2 text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
                          Você
                        </span>
                      )}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <span>RA: {user.id}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      {getLevelIcon(user.level)}
                      <span>Nível {user.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user.totalScore}</p>
                <p className="text-xs text-gray-600">pontos</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {onlineUsers.length === 0 && (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum jogador online no momento</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Atualizado agora</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Ao vivo</span>
          </div>
        </div>
      </div>
    </div>
  );
};