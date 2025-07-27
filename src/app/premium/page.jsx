'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Benefit Card Component
const BenefitCard = ({ benefit, index, isDarkTheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 0 40px rgba(239,68,68,0.9)', 
        rotateY: 10,
        z: 10,
      }}
      className={`p-6 rounded-xl relative overflow-hidden ${
        isDarkTheme ? 'bg-gray-800/80' : 'bg-gray-200/80'
      } shadow-[0_0_20px_rgba(239,68,68,0.6)] backdrop-blur-md border border-red-500/40 transform-gpu`}
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.5),transparent)] animate-holo-pulse"></div>
      <h3
        className={`text-xl font-bold mb-3 ${
          isDarkTheme ? 'text-gray-100' : 'text-gray-800'
        } bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500`}
      >
        {benefit.title}
      </h3>
      <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
        {benefit.description}
      </p>
    </motion.div>
  );
};

// Tier Comparison Component
const TierCard = ({ tier, isDarkTheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59,130,246,0.8)' }}
      className={`p-6 rounded-xl relative ${
        isDarkTheme ? 'bg-gray-800/70' : 'bg-gray-200/70'
      } shadow-[0_0_20px_rgba(59,130,246,0.6)] backdrop-blur-md border border-blue-500/30`}
    >
      <h3
        className={`text-lg font-bold mb-3 ${
          isDarkTheme ? 'text-gray-100' : 'text-gray-800'
        } bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500`}
      >
        {tier.name}
      </h3>
      <ul className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
        {tier.features.map((feature, idx) => (
          <li key={idx} className="flex items-center">
            <span className="mr-2 text-blue-400">⚡</span> {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// Countdown Timer Component
const CountdownTimer = ({ isDarkTheme }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3); // 3-day limited offer
    targetDate.setHours(23, 59, 59, 999);

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        setTimeLeft('Offer Expired!');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-sm font-semibold ${isDarkTheme ? 'text-red-400' : 'text-red-600'} animate-glitch`}
    >
      Limited Offer Ends In: {timeLeft}
    </motion.div>
  );
};

// Live Updates Component
const LiveUpdates = ({ updates, isDarkTheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl ${isDarkTheme ? 'bg-gray-800/70' : 'bg-gray-200/70'} shadow-[0_0_20px_rgba(59,130,246,0.6)] backdrop-blur-md`}
    >
      <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
        Live Premium Updates
      </h3>
      <div className="space-y-2">
        {updates.map((update, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} animate-glitch`}
          >
            {update}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

export default function PremiumPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState([
    'CyberSmith upgraded to SuperGrok!',
    'NeonBlaze unlocked premium challenges!',
    'QuantumRiser gained exclusive badges!',
    'PulseViper earned a holographic badge!',
  ]);
  const router = useRouter();

  const benefits = [
    {
      title: 'Enhanced Usage Quotas',
      description: 'Unleash your potential with higher interaction limits and more challenges.',
    },
    {
      title: 'Elite Challenges',
      description: 'Access exclusive battle stages with rare rewards and Platinum tiers.',
    },
    {
      title: 'Priority CyberSupport',
      description: 'Get rapid responses and dedicated assistance for your arena conquests.',
    },
    {
      title: 'Holographic Badges',
      description: 'Showcase your supremacy with unique, animated premium badges.',
    },
  ];

  const tiers = [
    {
      name: 'Free Tier',
      features: [
        'Basic challenge access',
        'Limited daily interactions',
        'Standard support',
        'Basic badges',
      ],
    },
    {
      name: 'SuperGrok',
      features: [
        'Unlimited challenge access',
        'Higher usage quotas',
        'Priority support',
        'Exclusive holographic badges',
        'Premium-only challenges',
      ],
    },
  ];

  const handleUpgrade = () => {
    console.log('Sound: Energetic pulse for upgrade click');
    window.location.href = 'https://x.ai/grok';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newUpdate = [
        'CyberSmith unlocked a premium challenge!',
        'NeonBlaze earned 500 premium points!',
        'QuantumRiser claimed a rare badge!',
        'PulseViper upgraded to SuperGrok!',
      ][Math.floor(Math.random() * 4)];
      setLiveUpdates((prev) => [newUpdate, ...prev.slice(0, 3)]);
      console.log('Sound: Holographic ping for live update');
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'
      } relative overflow-hidden`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-15 animate-pulse bg-[url('/cyber-grid.png')]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 via-blue-600/40 to-purple-600/40 animate-gradient-x"></div>
      <div className="absolute inset-0 opacity-10 animate-particles"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 animate-glitch-slow"
          >
            CyberSmith’s SuperGrok
          </motion.h1>
          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              whileHover={{ scale: 1.1 }}
              className={`p-2 rounded-full ${
                isDarkTheme ? 'bg-gray-900 text-yellow-400' : 'bg-gray-200 text-gray-800'
              } shadow-neon`}
            >
              {isDarkTheme ? '🌞' : '🌙'}
            </motion.button>
            <motion.button
              onClick={() => router.push('/challenges')}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-900 text-red-400' : 'bg-gray-200 text-red-600'
              } shadow-neon`}
            >
              Challenges
            </motion.button>
            <motion.button
              onClick={() => router.push('/leaderboard')}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-900 text-red-400' : 'bg-gray-200 text-red-600'
              } shadow-neon`}
            >
              Leaderboard
            </motion.button>
            <motion.button
              onClick={() => router.push('/workouts')}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-900 text-red-400' : 'bg-gray-200 text-red-600'
              } shadow-neon`}
            >
              Workouts
            </motion.button>
            <motion.button
              onClick={() => router.push('/nutrition')}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-900 text-red-400' : 'bg-gray-200 text-red-600'
              } shadow-neon`}
            >
              Nutrition
            </motion.button>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-xl ${
            isDarkTheme ? 'bg-gray-800/80' : 'bg-gray-200/80'
          } shadow-[0_0_30px_rgba(239,68,68,0.8)] backdrop-blur-md text-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-20 bg-[url('/holo-circuit.png')] animate-holo-circuit"></div>
          <h2 className={`text-4xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'} bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 animate-glitch-slow`}>
            Unlock SuperGrok: Conquer the Arena
          </h2>
          <p className={`text-lg ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            Amplify your CyberSmith experience with elite challenges, holographic badges, and unrestricted access to the arena.
          </p>
          <CountdownTimer isDarkTheme={isDarkTheme} />
          <motion.button
            onClick={handleUpgrade}
            whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(239,68,68,1)' }}
            whileTap={{ scale: 0.95 }}
            className={`mt-6 px-8 py-4 rounded-full text-lg font-semibold ${
              isDarkTheme ? 'bg-red-600 text-white' : 'bg-red-500 text-white'
            } shadow-neon animate-pulse-slow`}
          >
            Upgrade to SuperGrok Now
          </motion.button>
        </motion.div>

        {/* Live Updates */}
        <LiveUpdates updates={liveUpdates} isDarkTheme={isDarkTheme} />

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'} bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500`}>
            SuperGrok Advantages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  benefit={benefit}
                  index={index}
                  isDarkTheme={isDarkTheme}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tier Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'} bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500`}>
            Choose Your Path
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tiers.map((tier, index) => (
              <TierCard
                key={index}
                tier={tier}
                isDarkTheme={isDarkTheme}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx global>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 300%;
          animation: gradient-x 8s ease infinite;
        }
        @keyframes neon-glow {
          0% {
            box-shadow: 0 0 10px rgba(239, 68, 68, 0.7), 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.9), 0 0 40px rgba(59, 130, 246, 0.7);
          }
          100% {
            box-shadow: 0 0 10px rgba(239, 68, 68, 0.7), 0 0 20px rgba(59, 130, 246, 0.5);
          }
        }
        .shadow-neon {
          animation: neon-glow 1.2s ease-in-out infinite;
        }
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        .animate-glitch {
          animation: glitch 0.3s ease infinite;
        }
        @keyframes glitch-slow {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-1px, 1px);
          }
          40% {
            transform: translate(1px, -1px);
          }
          60% {
            transform: translate(-1px, 1px);
          }
          80% {
            transform: translate(1px, -1px);
          }
          100% {
            transform: translate(0);
          }
        }
        .animate-glitch-slow {
          animation: glitch-slow 2s ease infinite;
        }
        @keyframes holo-pulse {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }
        .animate-holo-pulse {
          animation: holo-pulse 3s ease-in-out infinite;
        }
        @keyframes holo-circuit {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 200px 200px;
          }
        }
        .animate-holo-circuit {
          background: url('/holo-circuit.png') repeat;
          animation: holo-circuit 30s linear infinite;
        }
        @keyframes pulse-slow {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
        .transform-gpu {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}