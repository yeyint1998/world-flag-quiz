import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Trophy, Play, RefreshCw } from 'lucide-react';

type Question = {
  country: string;
  flag: string;
  options: string[];
};

const questionsPool: Question[] = [
  { country: "France", flag: "🇫🇷", options: ["France", "Netherlands", "Luxembourg", "Belgium"] },
  { country: "Brazil", flag: "🇧🇷", options: ["Brazil", "Argentina", "Colombia", "Portugal"] },
  { country: "Japan", flag: "🇯🇵", options: ["Japan", "South Korea", "China", "Bangladesh"] },
  { country: "Germany", flag: "🇩🇪", options: ["Germany", "Belgium", "Austria", "Switzerland"] },
  { country: "Italy", flag: "🇮🇹", options: ["Italy", "Ireland", "Mexico", "Hungary"] },
  { country: "Canada", flag: "🇨🇦", options: ["Canada", "Peru", "Lebanon", "Switzerland"] },
  { country: "Australia", flag: "🇦🇺", options: ["Australia", "New Zealand", "United Kingdom", "Fiji"] },
  { country: "South Korea", flag: "🇰🇷", options: ["South Korea", "Japan", "North Korea", "Taiwan"] },
  { country: "United States", flag: "🇺🇸", options: ["United States", "Liberia", "Malaysia", "Puerto Rico"] },
  { country: "United Kingdom", flag: "🇬🇧", options: ["United Kingdom", "Australia", "New Zealand", "Fiji"] },
  { country: "Mexico", flag: "🇲🇽", options: ["Mexico", "Italy", "Ireland", "Spain"] },
  { country: "India", flag: "🇮🇳", options: ["India", "Ireland", "Niger", "Ivory Coast"] },
  { country: "China", flag: "🇨🇳", options: ["China", "Vietnam", "Taiwan", "Soviet Union"] },
  { country: "South Africa", flag: "🇿🇦", options: ["South Africa", "Vanuatu", "Jamaica", "Kenya"] },
  { country: "Argentina", flag: "🇦🇷", options: ["Argentina", "Uruguay", "Honduras", "El Salvador"] },
  { country: "Spain", flag: "🇪🇸", options: ["Spain", "Portugal", "Andorra", "Mexico"] },
  { country: "Egypt", flag: "🇪🇬", options: ["Egypt", "Syria", "Iraq", "Yemen"] },
  { country: "Nigeria", flag: "🇳🇬", options: ["Nigeria", "Ivory Coast", "Senegal", "Ghana"] },
  { country: "Kenya", flag: "🇰🇪", options: ["Kenya", "Tanzania", "Uganda", "Ethiopia"] },
  { country: "Sweden", flag: "🇸🇪", options: ["Sweden", "Norway", "Finland", "Denmark"] },
  { country: "Norway", flag: "🇳🇴", options: ["Norway", "Iceland", "Sweden", "Finland"] },
  { country: "Finland", flag: "🇫🇮", options: ["Finland", "Sweden", "Norway", "Estonia"] },
  { country: "Denmark", flag: "🇩🇰", options: ["Denmark", "Norway", "Sweden", "Switzerland"] },
  { country: "Switzerland", flag: "🇨🇭", options: ["Switzerland", "Austria", "Germany", "Sweden"] },
  { country: "Netherlands", flag: "🇳🇱", options: ["Netherlands", "France", "Luxembourg", "Russia"] },
  { country: "Russia", flag: "🇷🇺", options: ["Russia", "Serbia", "Slovakia", "Slovenia"] },
  { country: "Turkey", flag: "🇹🇷", options: ["Turkey", "Tunisia", "Morocco", "Algeria"] },
  { country: "Greece", flag: "🇬🇷", options: ["Greece", "Cyprus", "Uruguay", "Argentina"] },
  { country: "Thailand", flag: "🇹🇭", options: ["Thailand", "Costa Rica", "North Korea", "Cambodia"] },
  { country: "Vietnam", flag: "🇻🇳", options: ["Vietnam", "China", "Morocco", "Somalia"] },
  { country: "Indonesia", flag: "🇮🇩", options: ["Indonesia", "Monaco", "Poland", "Singapore"] },
  { country: "Philippines", flag: "🇵🇭", options: ["Philippines", "Czech Republic", "Djibouti", "Cuba"] },
  { country: "Malaysia", flag: "🇲🇾", options: ["Malaysia", "United States", "Liberia", "Chile"] },
  { country: "Singapore", flag: "🇸🇬", options: ["Singapore", "Indonesia", "Monaco", "Malta"] },
  { country: "New Zealand", flag: "🇳🇿", options: ["New Zealand", "Australia", "United Kingdom", "Fiji"] },
  { country: "Ireland", flag: "🇮🇪", options: ["Ireland", "Ivory Coast", "Italy", "India"] },
  { country: "Colombia", flag: "🇨🇴", options: ["Colombia", "Ecuador", "Venezuela", "Romania"] },
  { country: "Chile", flag: "🇨🇱", options: ["Chile", "Texas", "Cuba", "Puerto Rico"] },
  { country: "Peru", flag: "🇵🇪", options: ["Peru", "Canada", "Austria", "Lebanon"] },
  { country: "Saudi Arabia", flag: "🇸🇦", options: ["Saudi Arabia", "Pakistan", "Algeria", "Mauritania"] }
];

const TOTAL_QUESTIONS = 10;

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'results'>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const startGame = () => {
    const shuffledQuestions = shuffleArray(questionsPool).slice(0, TOTAL_QUESTIONS);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShuffledOptions(shuffleArray(shuffledQuestions[0].options));
    setGameState('playing');
  };

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    
    if (answer === questions[currentQuestionIndex].country) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        setSelectedAnswer(null);
        setShuffledOptions(shuffleArray(questions[nextIndex].options));
      } else {
        setGameState('results');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 font-sans">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center"
          >
            <div className="text-8xl mb-6">🌍</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Flag Quiz</h1>
            <p className="text-gray-600 mb-8 text-lg">Test your knowledge of world flags!</p>
            <button
              onClick={startGame}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-indigo-200"
            >
              <Play className="w-6 h-6" fill="currentColor" />
              Start Game
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && questions.length > 0 && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-lg w-full"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
              </div>
              <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                Score: {score}
              </div>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
              <motion.div 
                className="bg-indigo-600 h-2 rounded-full"
                initial={{ width: `${(currentQuestionIndex / TOTAL_QUESTIONS) * 100}%` }}
                animate={{ width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex justify-center mb-10">
              <motion.div 
                key={currentQuestionIndex}
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-[120px] leading-none select-none drop-shadow-xl"
              >
                {questions[currentQuestionIndex].flag}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shuffledOptions.map((option, index) => {
                const isCorrect = option === questions[currentQuestionIndex].country;
                const isSelected = option === selectedAnswer;
                
                let buttonClass = "bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200";
                
                if (selectedAnswer) {
                  if (isCorrect) {
                    buttonClass = "bg-emerald-500 text-white border-emerald-600 shadow-emerald-200 shadow-lg";
                  } else if (isSelected) {
                    buttonClass = "bg-rose-500 text-white border-rose-600 shadow-rose-200 shadow-lg";
                  } else {
                    buttonClass = "bg-gray-50 text-gray-400 border-gray-100 opacity-50";
                  }
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={!selectedAnswer ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                    className={`relative p-4 rounded-xl border-2 font-medium text-lg transition-all duration-200 flex items-center justify-between ${buttonClass}`}
                  >
                    <span>{option}</span>
                    {selectedAnswer && isCorrect && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                    {selectedAnswer && isSelected && !isCorrect && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <XCircle className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {gameState === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="w-12 h-12 text-yellow-500" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-500 mb-8">Here's how you did:</p>
            
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-8">
              {score} / {TOTAL_QUESTIONS}
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700 font-medium">
                {score === TOTAL_QUESTIONS ? "Perfect score! You're a geography master! 🌟" :
                 score >= TOTAL_QUESTIONS * 0.7 ? "Great job! You know your flags well! 👏" :
                 score >= TOTAL_QUESTIONS * 0.4 ? "Not bad! Keep practicing! 👍" :
                 "Time to study some maps! 📚"}
              </p>
              
              <button
                onClick={startGame}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg mt-8"
              >
                <RefreshCw className="w-5 h-5" />
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
