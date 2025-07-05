import React from 'react';
import { Trophy, Medal, Star, Users, RotateCcw, Home, Share2 } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const GameResults: React.FC = () => {
  const { currentRoom, currentUser, leaveRoom } = useGameStore();
  const navigate = useNavigate();

  if (!currentRoom || !currentUser) return null;

  const sortedPlayers = currentRoom.players
    .map(player => ({
      ...player,
      score: currentRoom.scores[player.id] || 0
    }))
    .sort((a, b) => b.score - a.score);

  const userRank = sortedPlayers.findIndex(p => p.id === currentUser.id) + 1;
  const userScore = currentRoom.scores[currentUser.id] || 0;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 2: return <Medal className="h-8 w-8 text-gray-400" />;
      case 3: return <Medal className="h-8 w-8 text-amber-600" />;
      default: return <Star className="h-8 w-8 text-gray-300" />;
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

  const shareResults = () => {
    const text = `I just scored ${userScore} points and ranked #${userRank} in EcoTrivia! 🌱 Test your environmental knowledge: `;
    if (navigator.share) {
      navigator.share({
        title: 'EcoTrivia Results',
        text,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(text + window.location.origin);
      // You could show a toast notification here
    }
  };

  const handleBackToDashboard = () => {
    leaveRoom();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-nature p-8 text-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-4"
          >
            {getRankIcon(userRank)}
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Game Complete!</h1>
          <p className="text-xl opacity-90">
            You ranked #{userRank} with {userScore} points
          </p>
        </div>

        {/* Results */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Final Rankings</h2>
          
          <div className="space-y-4 mb-8">
            {sortedPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-6 rounded-xl border-2 ${
                  player.id === currentUser.id 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(index + 1)} flex items-center justify-center text-white font-bold`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{player.name}</h3>
                    <p className="text-gray-600">Level {player.level}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{player.score}</p>
                  <p className="text-sm text-gray-600">points</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-xl text-center">
              <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-primary-800">Players</h3>
              <p className="text-2xl font-bold text-primary-600">{currentRoom.players.length}</p>
            </div>
            
            <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 p-6 rounded-xl text-center">
              <Star className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-secondary-800">Your Score</h3>
              <p className="text-2xl font-bold text-secondary-600">{userScore}</p>
            </div>
            
            <div className="bg-gradient-to-r from-earth-50 to-earth-100 p-6 rounded-xl text-center">
              <Trophy className="h-8 w-8 text-earth-600 mx-auto mb-2" />
              <h3 className="font-semibold text-earth-800">Your Rank</h3>
              <p className="text-2xl font-bold text-earth-600">#{userRank}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={shareResults}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <Share2 className="h-5 w-5" />
              <span>Share Results</span>
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-nature text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Play Again</span>
            </button>
            
            <button
              onClick={handleBackToDashboard}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <Home className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};