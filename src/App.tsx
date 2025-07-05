import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import { LoginForm } from './components/Auth/LoginForm';
import { Header } from './components/Layout/Header';
import { GameLobby } from './components/Game/GameLobby';
import { QuestionCard } from './components/Game/QuestionCard';
import { GameResults } from './components/Game/GameResults';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  const { isAuthenticated, currentRoom } = useGameStore();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const getGameComponent = () => {
    if (!currentRoom) return <GameLobby />;
    
    switch (currentRoom.gameState) {
      case 'waiting':
        return <GameLobby />;
      case 'playing':
      case 'question':
        return <QuestionCard />;
      case 'finished':
        return <GameResults />;
      default:
        return <GameLobby />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-earth-50">
        <Header />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/game" element={getGameComponent()} />
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;