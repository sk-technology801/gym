'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Leaderboard Entry Component
const LeaderboardEntry = ({ entry, index, isDarkTheme }) => {
  const [showBadges, setShowBadges] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex justify-between items-center p-4 rounded-lg relative ${
        index === 0
          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
          : index === 1
          ? 'bg-gradient-to-r from-gray-400 to-gray-600'
          : index === 2
          ? 'bg-gradient-to-r from-orange-600 to-red-600'
          : isDarkTheme
          ? 'bg-gray-900/60'
          : 'bg-gray-300/60'
      } shadow-[0_0_15px_rgba(59,130,246,0.4)] backdrop-blur-md`}
      onMouseEnter={() => setShowBadges(true)}
      onMouseLeave={() => setShowBadges(false)}
    >
      <div className="flex items-center space-x-3">
        <span className={`text-lg font-bold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
          {index + 1}.
        </span>
        <span className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
          {entry.user}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          {entry.points} pts
        </span>
        <span className={`text-sm ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
          {entry.badges?.length || 0} 🏆
        </span>
      </div>
      <AnimatePresence>
        {showBadges && entry.badges?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-0 mt-2 p-3 rounded-lg ${
              isDarkTheme ? 'bg-gray-900/80' : 'bg-gray-200/80'
            } shadow-[0_0_10px_rgba(239,68,68,0.5)] z-10`}
          >
            {entry.badges.map((badge, idx) => (
              <p key={idx} className={`text-sm ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
                🏆 {badge}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// User Stats Component
const UserStats = ({ user, isDarkTheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl ${isDarkTheme ? 'bg-gray-800/70' : 'bg-gray-200/70'} shadow-[0_0_20px_rgba(239,68,68,0.6)] backdrop-blur-md`}
    >
      <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'} bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500`}>
        Your CyberSmith Stats
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            Username: {user.user}
          </p>
          <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            Points: {user.points} pts
          </p>
          <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            Rank: #{user.rank}
          </p>
        </div>
        <div>
          <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            Challenges Completed: {user.completedChallenges}
          </p>
          <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            Streak: {user.streak} 🔥
          </p>
          <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            Badges: {user.badges?.length || 0} 🏆
          </p>
        </div>
      </div>
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
        Live Holo-Updates
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

export default function LeaderboardPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [leaderboard, setLeaderboard] = useState([
    { id: 'l1', user: 'CyberSmith', points: 1500, badges: ['Challenge Master', '7-Day Fire'], completedChallenges: 10, streak: 12, rank: 1 },
    { id: 'l2', user: 'NeonBlaze', points: 1200, badges: ['Point Legend'], completedChallenges: 8, streak: 5, rank: 2 },
    { id: 'l3', user: 'You', points: 800, badges: ['Challenge Master'], completedChallenges: 3, streak: 2, rank: 3 },
    { id: 'l4', user: 'QuantumRiser', points: 600, badges: ['7-Day Fire'], completedChallenges: 5, streak: 3, rank: 4 },
    { id: 'l5', user: 'PulseViper', points: 400, badges: [], completedChallenges: 2, streak: 1, rank: 5 },
  ]);
  const [filterQuery, setFilterQuery] = useState('');
  const [sortBy, setSortBy] = useState('points');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [liveUpdates, setLiveUpdates] = useState([]);
  const itemsPerPage = 5;
  const router = useRouter();

  // Simulated live updates
  useEffect(() => {
    const updates = [
      'CyberSmith climbed to #1!',
      'NeonBlaze earned 200 points!',
      'You gained a new badge!',
      'QuantumRiser completed a challenge!',
      'PulseViper joined the arena!',
    ];
    setLiveUpdates(updates);

    const interval = setInterval(() => {
      setLiveUpdates((prev) => [
        updates[Math.floor(Math.random() * updates.length)],
        ...prev.slice(0, 4),
      ]);
      console.log('Sound: Holographic ping for leaderboard update');
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Sort and filter leaderboard
  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (sortBy === 'points') {
      return sortOrder === 'desc' ? b.points - a.points : a.points - b.points;
    } else if (sortBy === 'completedChallenges') {
      return sortOrder === 'desc'
        ? b.completedChallenges - a.completedChallenges
        : a.completedChallenges - b.completedChallenges;
    } else if (sortBy === 'streak') {
      return sortOrder === 'desc' ? b.streak - a.streak : a.streak - b.streak;
    }
    return 0;
  });

  const filteredLeaderboard = sortedLeaderboard.filter((entry) =>
    entry.user.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredLeaderboard.length / itemsPerPage);
  const paginatedLeaderboard = filteredLeaderboard.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-blue-500 to-purple-500"
          >
            CyberSmith’s Leaderboard
          </motion.h1>
          <div className="flex flex-wrap items-center gap-4">
            <motion.input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search Players"
              className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'} border border-red-500/30`}
            />
            <motion.select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-900 text-red-400' : 'bg-gray-200 text-red-600'
              } shadow-neon border border-red-500/30`}
            >
              <option value="points">Sort by Points</option>
              <option value="completedChallenges">Sort by Challenges</option>
              <option value="streak">Sort by Streak</option>
            </motion.select>
            <motion.select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-900 text-red-400' : 'bg-gray-200 text-red-600'
              } shadow-neon border border-red-500/30`}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </motion.select>
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

        {/* User Stats */}
        <UserStats
          user={leaderboard.find((entry) => entry.user === 'You') || { user: 'You', points: 0, rank: leaderboard.length + 1, completedChallenges: 0, streak: 0, badges: [] }}
          isDarkTheme={isDarkTheme}
        />

        {/* Live Updates */}
        <LiveUpdates updates={liveUpdates} isDarkTheme={isDarkTheme} />

        {/* Global Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-8 p-6 rounded-xl ${isDarkTheme ? 'bg-gray-800/70' : 'bg-gray-200/70'} shadow-[0_0_20px_rgba(239,68,68,0.6)] backdrop-blur-md`}
        >
          <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'} bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500`}>
            Global CyberSmith’s Arena
          </h2>
          <div className="space-y-3">
            <AnimatePresence>
              {paginatedLeaderboard.map((entry, index) => (
                <LeaderboardEntry
                  key={entry.id}
                  entry={entry}
                  index={(currentPage - 1) * itemsPerPage + index}
                  isDarkTheme={isDarkTheme}
                />
              ))}
            </AnimatePresence>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-4">
            <motion.button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                currentPage === 1
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  : isDarkTheme
                  ? 'bg-gray-900 text-red-400'
                  : 'bg-gray-200 text-red-600'
              } shadow-neon`}
            >
              Previous
            </motion.button>
            <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Page {currentPage} of {totalPages}
            </span>
            <motion.button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                currentPage === totalPages
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  : isDarkTheme
                  ? 'bg-gray-900 text-red-400'
                  : 'bg-gray-200 text-red-600'
              } shadow-neon`}
            >
              Next
            </motion.button>
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
        @keyframes particles {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100px 100px;
          }
        }
        .animate-particles {
          background: url('/particles.png') repeat;
          animation: particles 20s linear infinite;
        }
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
      `}</style>
    </div>
  );
}