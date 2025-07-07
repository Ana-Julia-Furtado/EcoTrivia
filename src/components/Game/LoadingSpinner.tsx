import React from 'react';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="bg-gradient-nature p-4 rounded-full mb-4"
      >
        <Leaf className="h-8 w-8 text-white" />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-600 font-medium"
      >
        {message}
      </motion.p>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-32 h-1 bg-gradient-nature rounded-full mt-4"
      />
    </div>
  );
};