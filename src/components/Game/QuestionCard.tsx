import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { questionCategories } from '../../data/questions';

export const QuestionCard: React.FC = () => {
  const { 
    currentQuestion, 
    gameSettings, 
    submitAnswer, 
    nextQuestion,
    showResults,
    playerAnswers,
    currentUser
  } = useGameStore();
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(gameSettings.timePerQuestion);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    if (!currentQuestion || hasAnswered) return;

    setTimeLeft(gameSettings.timePerQuestion);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!hasAnswered) {
            handleSubmitAnswer(-1); // No answer selected
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, hasAnswered, gameSettings.timePerQuestion]);

  useEffect(() => {
    if (!showResults) {
      setSelectedAnswer(null);
      setHasAnswered(false);
    }
  }, [showResults]);

  const handleSubmitAnswer = (answerIndex: number) => {
    if (hasAnswered) return;
    
    const timeSpent = gameSettings.timePerQuestion - timeLeft;
    setSelectedAnswer(answerIndex);
    setHasAnswered(true);
    submitAnswer(answerIndex, timeSpent);
  };

  const handleNextQuestion = () => {
    nextQuestion();
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Loading question...</h2>
        </div>
      </div>
    );
  }

  const category = questionCategories[currentQuestion.category];
  const userAnswer = playerAnswers.find(a => a.playerId === currentUser?.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className={`${category.color} p-6 text-white`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm opacity-90 capitalize">{currentQuestion.difficulty} • {currentQuestion.points} points</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
              <Clock className="h-5 w-5" />
              <span className="font-bold text-lg">{timeLeft}s</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / gameSettings.timePerQuestion) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Answer options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "p-6 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-lg transform hover:scale-105";
              
              if (showResults) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += " border-green-500 bg-green-50 text-green-800";
                } else if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
                  buttonClass += " border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += " border-gray-200 bg-gray-50 text-gray-600";
                }
              } else if (selectedAnswer === index) {
                buttonClass += " border-primary-500 bg-primary-50 text-primary-800";
              } else {
                buttonClass += " border-gray-200 hover:border-primary-300 text-gray-800";
              }

              return (
                <button
                  key={index}
                  onClick={() => !hasAnswered && handleSubmitAnswer(index)}
                  disabled={hasAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showResults && (
                      <div>
                        {index === currentQuestion.correctAnswer && (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        )}
                        {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                          <XCircle className="h-6 w-6 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Results and explanation */}
          {showResults && (
            <div className="space-y-6">
              {userAnswer && (
                <div className={`p-4 rounded-lg ${userAnswer.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {userAnswer.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className={`font-semibold ${userAnswer.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {userAnswer.isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className={`text-sm ${userAnswer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    You earned {userAnswer.points} points
                  </p>
                </div>
              )}

              {currentQuestion.explanation && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
                  <p className="text-blue-700">{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-gradient-nature text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Next Question
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};