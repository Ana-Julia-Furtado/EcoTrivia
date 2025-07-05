import React, { useState } from 'react';
import { Plus, Users, Lock, Globe, Play, Settings } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { GameSettings } from './GameSettings';

export const GameLobby: React.FC = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [isPrivate, setIsPrivate] = useState(false);
  
  const { 
    currentRoom, 
    availableRooms, 
    createRoom, 
    joinRoom, 
    startGame, 
    currentUser 
  } = useGameStore();

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim()) {
      createRoom(roomName.trim(), maxPlayers, isPrivate);
      setShowCreateRoom(false);
      setRoomName('');
    }
  };

  const isRoomOwner = currentRoom && currentUser && currentRoom.players[0]?.id === currentUser.id;

  if (currentRoom) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentRoom.name}</h2>
              <p className="text-gray-600">
                {currentRoom.players.length}/{currentRoom.maxPlayers} players
              </p>
            </div>
            
            <div className="flex space-x-3">
              {isRoomOwner && (
                <>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                  
                  <button
                    onClick={startGame}
                    disabled={currentRoom.players.length < 2}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-nature text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play className="h-5 w-5" />
                    <span>Start Game</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRoom.players.map((player, index) => (
              <div
                key={player.id}
                className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border-2 border-primary-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-nature rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{player.name}</h3>
                    <p className="text-sm text-gray-600">Level {player.level}</p>
                    {index === 0 && (
                      <span className="inline-block bg-earth-500 text-white text-xs px-2 py-1 rounded-full">
                        Host
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {Array.from({ length: currentRoom.maxPlayers - currentRoom.players.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center"
              >
                <div className="text-center text-gray-400">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Waiting for player...</p>
                </div>
              </div>
            ))}
          </div>

          {!isRoomOwner && currentRoom.players.length < 2 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">Waiting for the host to start the game...</p>
            </div>
          )}
        </div>

        {showSettings && (
          <GameSettings onClose={() => setShowSettings(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Game Lobby</h1>
        <p className="text-gray-600 text-lg">Join a room or create your own to start playing!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Rooms</h2>
            <button
              onClick={() => setShowCreateRoom(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-nature text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <Plus className="h-5 w-5" />
              <span>Create Room</span>
            </button>
          </div>

          <div className="space-y-4">
            {availableRooms.filter(room => !room.isPrivate && room.gameState === 'waiting').map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{room.players.length}/{room.maxPlayers}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {room.isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                        <span>{room.isPrivate ? 'Private' : 'Public'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => joinRoom(room.id)}
                    disabled={room.players.length >= room.maxPlayers}
                    className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}

            {availableRooms.filter(room => !room.isPrivate && room.gameState === 'waiting').length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No rooms available</h3>
                <p className="text-gray-500">Be the first to create a room!</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
          {currentUser && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-lg">
                <h4 className="font-semibold text-primary-800">Your Level</h4>
                <p className="text-2xl font-bold text-primary-600">{currentUser.level}</p>
              </div>
              
              <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 p-4 rounded-lg">
                <h4 className="font-semibold text-secondary-800">Total Score</h4>
                <p className="text-2xl font-bold text-secondary-600">{currentUser.totalScore}</p>
              </div>
              
              <div className="bg-gradient-to-r from-earth-50 to-earth-100 p-4 rounded-lg">
                <h4 className="font-semibold text-earth-800">Games Played</h4>
                <p className="text-2xl font-bold text-earth-600">{currentUser.gamesPlayed}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCreateRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Room</h3>
            
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter room name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Players
                </label>
                <select
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value={2}>2 Players</option>
                  <option value={4}>4 Players</option>
                  <option value={6}>6 Players</option>
                  <option value={8}>8 Players</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="private"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="private" className="ml-2 block text-sm text-gray-700">
                  Private room (invite only)
                </label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateRoom(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-nature text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};