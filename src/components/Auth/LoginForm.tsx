import React, { useState } from 'react';
import { Leaf, User, Hash, LogIn, UserPlus, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { firebaseAuth } from '../../services/firebaseAuth';

export const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [ra, setRA] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { setUser } = useGameStore();

  const validateInputs = () => {
    if (!ra.trim()) {
      setError('RA é obrigatório');
      return false;
    }

    if (!/^\d{6}$/.test(ra)) {
      setError('RA deve conter 6 dígitos');
      return false;
    }

    if (!isLogin && !username.trim()) {
      setError('Nome de usuário é obrigatório para registro');
      return false;
    }

    if (!isLogin && username.trim().length < 2) {
      setError('Nome de usuário deve ter pelo menos 2 caracteres');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const firebaseUser = await firebaseAuth.loginUser(ra);
        
        // Converter usuario firebase para usuario do app
        const user = {
          id: firebaseUser.ra,
          name: firebaseUser.username,
          email: `${firebaseUser.ra}@student.edu`,
          level: Math.floor(firebaseUser.score / 1000) + 1,
          totalScore: firebaseUser.score,
          gamesPlayed: 0, 
          correctAnswers: 0 
        };

        setUser(user);
        setSuccess('Login realizado com sucesso!');
      } else {
        // Registro
        const firebaseUser = await firebaseAuth.registerUser(username, ra);
        
        // Converter usuario firebase para usuario do app
        const user = {
          id: firebaseUser.ra,
          name: firebaseUser.username,
          email: `${firebaseUser.ra}@student.edu`,
          level: 1,
          totalScore: 0,
          gamesPlayed: 0,
          correctAnswers: 0
        };

        setUser(user);
        setSuccess('Registro realizado com sucesso!');
      }
    } catch (error: any) {
      setError(error.message || 'Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(null);
    setUsername('');
    setRA('');
  };

  const handleRAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setRA(value);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-earth-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-nature p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Leaf className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EcoTrivia</h1>
          <p className="text-gray-600">Jogo de Sustentabilidade Ambiental</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              isLogin
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <LogIn className="h-4 w-4 inline mr-2" />
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              !isLogin
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserPlus className="h-4 w-4 inline mr-2" />
            Registro
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome de Usuário
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError(null);
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Digite seu nome"
                    disabled={isLoading}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RA (Registro Acadêmico)
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={ra}
                onChange={handleRAChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Digite seu RA"
                maxLength={6}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Mensagem de erro */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2"
              >
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mensagem de sucesso */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2"
              >
                <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                <p className="text-green-700 text-sm">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-nature text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                {isLogin ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                <span>{isLogin ? 'Entrar' : 'Registrar'}</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button
              type="button"
              onClick={handleModeSwitch}
              className="ml-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              disabled={isLoading}
            >
              {isLogin ? 'Registre-se aqui' : 'Faça login aqui'}
            </button>
          </p>
        </div>

        {/* Firebase */}
      </motion.div>
    </div>
  );
};
