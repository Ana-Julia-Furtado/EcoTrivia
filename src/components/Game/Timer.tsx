import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const isUrgent = timeLeft <= 10;

  return (
    <div className="flex items-center space-x-3">
      <Clock className={`h-5 w-5 ${isUrgent ? 'text-red-500' : 'text-white'}`} />
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className={`font-bold text-lg ${isUrgent ? 'text-red-500' : 'text-white'}`}>
            {timeLeft}s
          </span>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              isUrgent ? 'bg-red-500' : 'bg-white'
            }`}
            style={{ width: `${percentage}%` }}
            animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
            transition={isUrgent ? { duration: 0.5, repeat: Infinity } : {}}
          />
        </div>
      </div>
    </div>
  );
};