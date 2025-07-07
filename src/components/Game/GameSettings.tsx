import React from 'react';
import { X, Clock, Target, Filter } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { questionCategories } from '../../data/questions';
import { QuestionCategory } from '../../types/game';

interface GameSettingsProps {
  onClose: () => void;
}

export const GameSettings: React.FC<GameSettingsProps> = ({ onClose }) => {
  const { gameSettings, setGameSettings } = useGameStore();

  const handleCategoryToggle = (category: QuestionCategory) => {
    const updatedCategories = gameSettings.categories.includes(category)
      ? gameSettings.categories.filter(c => c !== category)
      : [...gameSettings.categories, category];
    
    setGameSettings({ categories: updatedCategories });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Game Settings</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Questions per game */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-5 w-5 text-primary-600" />
              <h4 className="text-lg font-semibold text-gray-900">Questions per Game</h4>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[5, 10, 15, 20].map((count) => (
                <button
                  key={count}
                  onClick={() => setGameSettings({ questionsPerGame: count })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    gameSettings.questionsPerGame === count
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Time per question */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-primary-600" />
              <h4 className="text-lg font-semibold text-gray-900">Time per Question (seconds)</h4>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[15, 30, 45, 60].map((time) => (
                <button
                  key={time}
                  onClick={() => setGameSettings({ timePerQuestion: time })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    gameSettings.timePerQuestion === time
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {time}s
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-primary-600" />
              <h4 className="text-lg font-semibold text-gray-900">Difficulty</h4>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {['mixed', 'easy', 'medium', 'hard'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setGameSettings({ difficulty: difficulty as any })}
                  className={`p-3 rounded-lg border-2 transition-all capitalize ${
                    gameSettings.difficulty === difficulty
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Question Categories</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(questionCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => handleCategoryToggle(key as QuestionCategory)}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                    gameSettings.categories.includes(key as QuestionCategory)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
            
            {gameSettings.categories.length === 0 && (
              <p className="text-red-500 text-sm mt-2">Please select at least one category</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            disabled={gameSettings.categories.length === 0}
            className="px-6 py-2 bg-gradient-nature text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};