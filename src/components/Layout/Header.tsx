import React from 'react';
import { Leaf, User, Settings, LogOut, Hash } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const Header: React.FC = () => {
  const { currentUser, logout } = useGameStore();

  return (
    <header className="bg-gradient-nature shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">EcoTrivia</h1>
              <p className="text-sm text-green-100">Jogo de Sustentabilidade Ambiental</p>
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white/10 rounded-full px-4 py-2">
                <User className="h-5 w-5 text-white" />
                <div className="text-left">
                  <span className="text-white font-medium block">{currentUser.name}</span>
                  <div className="flex items-center space-x-2 text-green-200 text-xs">
                    <Hash className="h-3 w-3" />
                    <span>RA: {currentUser.id}</span>
                    <span>•</span>
                    <span>Nível {currentUser.level}</span>
                  </div>
                </div>
              </div>
              
              <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              
              <button 
                onClick={logout}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};