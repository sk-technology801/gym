
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Challenge Card Component
const ChallengeCard = ({ challenge, index, isDarkTheme, onJoin, onComplete, provided }) => {
  const progress = (challenge.completedTasks / challenge.totalTasks) * 100;
  const timeLeft = challenge.endDate
    ? Math.max(0, Math.floor((new Date(challenge.endDate) - new Date()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <motion.div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239,68,68,0.8)' }}
      whileDrag={{ scale: 1.1, boxShadow: '0 0 40px rgba(59,130,246,0.9)' }}
      className={`p-6 rounded-xl relative overflow-hidden ${
        isDarkTheme ? 'bg-gray-800/70' : 'bg-gray-200/70'
      } shadow-[0_0_20px_rgba(239,68,68,0.6)] backdrop-blur-md border border-red-500/30`}
    >
      <div className="absolute inset-0 opacity-20 animate-glitch"></div>
      <div className="flex justify-between items-center mb-3">
        <h3
          className={`text-xl font-bold ${
            isDarkTheme ? 'text-gray-100' : 'text-gray-800'
          } bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500`}
        >
          {challenge.name} ({challenge.tier})
        </h3>
        {challenge.status === 'available' && (
          <motion.button
            onClick={() => {
              onJoin(challenge.id);
              // Simulated sound effect
              console.log('Sound: Energetic pulse for joining challenge');
            }}
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 rounded-full text-sm font-semibold bg-green-600/80 text-white shadow-neon"
          >
            Join
          </motion.button>
        )}
        {challenge.status === 'active' && (
          <motion.button
            onClick={() => {
              onComplete(challenge.id);
              console.log('Sound: Power-up chime for task completion');
            }}
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-600/80 text-white shadow-neon"
          >
            Complete Task
          </motion.button>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          Type: {challenge.type} | Difficulty: {challenge.difficulty}
        </p>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          Progress: {challenge.completedTasks}/{challenge.totalTasks} tasks
        </p>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-red-500 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        {timeLeft !== null && (
          <p className={`text-sm ${isDarkTheme ? 'text-red-400' : 'text-red-600'}`}>
            Time Left: {timeLeft} days
          </p>
        )}
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          Reward: {challenge.reward}
        </p>
      </div>
    </motion.div>
  );
};

// Create Challenge Form Component
const CreateChallengeForm = ({ onCreateChallenge, isDarkTheme }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Strength');
  const [difficulty, setDifficulty] = useState('Medium');
  const [totalTasks, setTotalTasks] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [tier, setTier] = useState('Bronze');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !totalTasks || !durationDays) return;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(durationDays));
    onCreateChallenge({
      id: Date.now().toString(),
      name,
      type,
      difficulty,
      totalTasks: parseInt(totalTasks),
      completedTasks: 0,
      status: 'active',
      endDate: endDate.toISOString(),
      creator: 'You',
      tier,
      reward: `${tier} Badge + ${parseInt(totalTasks) * 50} Points`,
    });
    console.log('Sound: Holographic ping for challenge creation');
    setName('');
    setType('Strength');
    setDifficulty('Medium');
    setTotalTasks('');
    setDurationDays('');
    setTier('Bronze');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl ${isDarkTheme ? 'bg-gray-800/70' : 'bg-gray-200/70'} shadow-[0_0_20px_rgba(239,68,68,0.6)] backdrop-blur-md`}
    >
      <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
        Forge Extreme Challenge
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Challenge Name"
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'} border border-red-500/30`}
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'} border border-red-500/30`}
        >
          {['Strength', 'Endurance', 'Flexibility', 'Hybrid'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'} border border-red-500/30`}
        >
          {['Easy', 'Medium', 'Hard', 'Extreme'].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'} border border-red-500/30`}
        >
          {['Bronze', 'Silver', 'Gold', 'Platinum'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input
          type="number"
          value={totalTasks}
          onChange={(e) => setTotalTasks(e.target.value)}
          placeholder="Total Tasks"
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'} border border-red-500/30`}
          required
        />
        <input
          type="number"
          value={durationDays}
          onChange={(e) => setDurationDays(e.target.value)}
          placeholder="Duration (days)"
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'} border border-red-500/30`}
          required
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
          isDarkTheme ? 'bg-red-600 text-white' : 'bg-red-500 text-white'
        } shadow-neon`}
      >
        Forge Challenge
      </motion.button>
    </motion.form>
  );
};

// Leaderboard Component
const Leaderboard = ({ leaderboard, isDarkTheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl ${isDarkTheme ? 'bg-gray-800/70' : 'bg-gray-200/70'} shadow-[0_0_20px_rgba(239,68,68,0.6)] backdrop-blur-md`}
    >
      <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
        Global CyberSmith’s Arena
      </h3>
      <div className="space-y-3">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex justify-between items-center p-3 rounded-lg ${
              index === 0
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                : isDarkTheme
                ? 'bg-gray-900/60'
                : 'bg-gray-300/60'
            } shadow-[0_0_10px_rgba(59,130,246,0.4)]`}
          >
            <span className={`text-sm font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
              {index + 1}. {entry.user}
            </span>
            <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              {entry.points} pts
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Achievement Wall Component
const AchievementWall = ({ badges, isDarkTheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl ${isDarkTheme ? 'bg-gray-800/70' : 'bg-gray-200/70'} shadow-[0_0_20px_rgba(239,68,68,0.6)] backdrop-blur-md`}
    >
      <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
        Achievement Wall
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.length > 0 ? (
          badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`p-3 rounded-lg text-center ${
                isDarkTheme ? 'bg-gray-900/60 text-blue-400' : 'bg-gray-300/60 text-blue-600'
              } shadow-[0_0_15px_rgba(59,130,246,0.5)]`}
            >
              🏆 {badge}
            </motion.div>
          ))
        ) : (
          <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            No badges yet. Crush those challenges!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default function Challenges() {
  const [challenges, setChallenges] = useState([
    {
      id: '1',
      name: '100 Push-Up Blitz',
      type: 'Strength',
      difficulty: 'Hard',
      totalTasks: 100,
      completedTasks: 50,
      status: 'active',
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      creator: 'System',
      tier: 'Gold',
      reward: 'Gold Badge + 5000 Points',
    },
    {
      id: '2',
      name: 'Marathon Endurance',
      type: 'Endurance',
      difficulty: 'Extreme',
      totalTasks: 42,
      completedTasks: 0,
      status: 'available',
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      creator: 'System',
      tier: 'Platinum',
      reward: 'Platinum Badge + 10000 Points',
    },
  ]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([
    { id: 'l1', user: 'CyberSmith', points: 1500 },
    { id: 'l2', user: 'NeonBlaze', points: 1200 },
    { id: 'l3', user: 'You', points: 800 },
  ]);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [dailyQuest, setDailyQuest] = useState('');
  const [liveUpdates, setLiveUpdates] = useState([]);
  const router = useRouter();

  // Simulated Daily Quest and Badges
  useEffect(() => {
    const quests = [
      'Sprint 1km in 4 minutes!',
      'Complete 75 burpees in 6 minutes!',
      'Hold a plank for 4 minutes!',
      'Do 50 pull-ups in 10 minutes!',
    ];
    setDailyQuest(quests[Math.floor(Math.random() * quests.length)]);

    // Simulated live updates
    const updates = [
      'CyberSmith just completed 10 tasks in Iron Core!',
      'NeonBlaze joined the Sprint Surge challenge!',
      'You earned 100 points for joining a challenge!',
    ];
    setLiveUpdates(updates);

    // Check for badges
    const completedCount = challenges.filter((c) => c.status === 'completed').length;
    if (completedCount >= 5 && !badges.includes('Challenge Master')) {
      setBadges((prev) => [...prev, 'Challenge Master']);
      console.log('Sound: Triumphant fanfare for badge unlock');
    }
    if (streak >= 7 && !badges.includes('7-Day Fire')) {
      setBadges((prev) => [...prev, '7-Day Fire']);
      console.log('Sound: Electric surge for badge unlock');
    }
    if (leaderboard.find((entry) => entry.user === 'You')?.points >= 2000 && !badges.includes('Point Legend')) {
      setBadges((prev) => [...prev, 'Point Legend']);
      console.log('Sound: Holographic chime for badge unlock');
    }
  }, [challenges, streak, leaderboard]);

  // Update Streak
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = localStorage.getItem('lastChallengeDate');
    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastActive === yesterday.toISOString().split('T')[0]) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(1);
      }
      localStorage.setItem('lastChallengeDate', today);
    }
  }, [challenges]);

  // Drag and Drop Handler for Active Challenges
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedChallenges = Array.from(challenges.filter((c) => c.status === 'active'));
    const [moved] = reorderedChallenges.splice(result.source.index, 1);
    reorderedChallenges.splice(result.destination.index, 0, moved);
    setChallenges((prev) => [
      ...prev.filter((c) => c.status !== 'active'),
      ...reorderedChallenges,
    ]);
    console.log('Sound: Cybernetic click for drag and drop');
  };

  // Handle Joining a Challenge
  const handleJoin = (id) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'active' } : c))
    );
    setLeaderboard((prev) =>
      prev.map((entry) =>
        entry.user === 'You' ? { ...entry, points: entry.points + 100 } : entry
      )
    );
    setLiveUpdates((prev) => [...prev, `You joined the ${challenges.find((c) => c.id === id).name} challenge!`]);
  };

  // Handle Task Completion
  const handleComplete = (id) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newCompletedTasks = c.completedTasks + 1;
          const isComplete = newCompletedTasks >= c.totalTasks;
          if (isComplete) {
            setCompletedChallenges((prevCompleted) => [
              ...prevCompleted,
              { ...c, status: 'completed', completedDate: new Date().toISOString() },
            ]);
            setLeaderboard((prevLeaderboard) =>
              prevLeaderboard.map((entry) =>
                entry.user === 'You'
                  ? { ...entry, points: entry.points + 500 }
                  : entry
              )
            );
            setLiveUpdates((prev) => [...prev, `You completed ${c.name}!`]);
          }
          return {
            ...c,
            completedTasks: newCompletedTasks,
            status: isComplete ? 'completed' : c.status,
          };
        }
        return c;
      })
    );
    localStorage.setItem('lastChallengeDate', new Date().toISOString().split('T')[0]);
  };

  // Create New Challenge
  const handleCreateChallenge = (newChallenge) => {
    setChallenges((prev) => [...prev, newChallenge]);
    setLeaderboard((prev) =>
      prev.map((entry) =>
        entry.user === 'You' ? { ...entry, points: entry.points + 200 } : entry
      )
    );
    setLiveUpdates((prev) => [...prev, `You created ${newChallenge.name}!`]);
  };

  // Share Completed Challenge
  const shareChallenge = (challenge) => {
    const shareText = `Crushed "${challenge.name}"! 💪 ${challenge.completedTasks} tasks done in ${challenge.tier} tier! #CyberFit`;
    console.log('Sound: Victory beep for sharing');
    alert(`Shared: ${shareText}`);
  };

  // Filter Challenges
  const filteredChallenges = challenges.filter(
    (challenge) =>
      (filterType === 'All' || challenge.type === filterType) &&
      (filterDifficulty === 'All' || challenge.difficulty === filterDifficulty) &&
      (filterStatus === 'All' || challenge.status === filterStatus) &&
      (searchQuery === '' || challenge.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
            CyberSmith’s Arena
          </motion.h1>
          <div className="flex flex-wrap items-center gap-4">
            <motion.input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Challenges"
              className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'} border border-red-500/30`}
            />
            <motion.select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-900 text-red-400' : 'bg-gray-200 text-red-600'
              } shadow-neon border border-red-500/30`}
            >
              <option value="All">All Types</option>
              <option value="Strength">Strength</option>
              <option value="Endurance">Endurance</option>
              <option value="Flexibility">Flexibility</option>
              <option value="Hybrid">Hybrid</option>
            </motion.select>
            <motion.select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-900 text-red-400' : 'bg-gray-200 text-red-600'
              } shadow-neon border border-red-500/30`}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Extreme">Extreme</option>
            </motion.select>
            <motion.select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-900 text-red-400' : 'bg-gray-200 text-red-600'
              } shadow-neon border border-red-500/30`}
            >
              <option value="All">All Statuses</option>
              <option value="active">Active</option>
              <option value="available">Available</option>
              <option value="completed">Completed</option>
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

        {/* Daily Extreme Quest */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-6 rounded-xl ${isDarkTheme ? 'bg-gray-800/70' : 'bg-gray-200/70'} shadow-[0_0_20px_rgba(239,68,68,0.6)] backdrop-blur-md flex flex-col sm:flex-row justify-between items-center`}
        >
          <div>
            <h3 className={`text-xl font-bold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
              Daily Extreme Quest
            </h3>
            <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              {dailyQuest}
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Streak: {streak} 🔥
            </span>
            {badges.length > 0 && (
              <span className={`text-sm ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
                Badges: {badges.join(', ')} 🏆
              </span>
            )}
          </div>
        </motion.div>

        {/* Live Progress Broadcast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-6 rounded-xl ${isDarkTheme ? 'bg-gray-800/70' : 'bg-gray-200/70'} shadow-[0_0_20px_rgba(59,130,246,0.6)] backdrop-blur-md`}
        >
          <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
            Live Holo-Updates
          </h3>
          <div className="space-y-2">
            {liveUpdates.map((update, index) => (
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

        {/* Achievement Wall */}
        <AchievementWall badges={badges} isDarkTheme={isDarkTheme} />

        {/* Leaderboard */}
        <Leaderboard leaderboard={leaderboard} isDarkTheme={isDarkTheme} />

        {/* Create Challenge Form */}
        <CreateChallengeForm onCreateChallenge={handleCreateChallenge} isDarkTheme={isDarkTheme} />

        {/* Active Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'} bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500`}>
            Active Battle Stages
          </h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="active-challenges">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {filteredChallenges
                      .filter((challenge) => challenge.status === 'active')
                      .map((challenge, index) => (
                        <Draggable key={challenge.id} draggableId={challenge.id} index={index}>
                          {(provided) => (
                            <ChallengeCard
                              challenge={challenge}
                              index={index}
                              isDarkTheme={isDarkTheme}
                              onJoin={handleJoin}
                              onComplete={() => handleComplete(challenge.id)}
                              provided={provided}
                            />
                          )}
                        </Draggable>
                      ))}
                  </AnimatePresence>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </motion.div>

        {/* Available Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'} bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500`}>
            Available Battle Stages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredChallenges
                .filter((challenge) => challenge.status === 'available')
                .map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    index={0}
                    isDarkTheme={isDarkTheme}
                    onJoin={handleJoin}
                    onComplete={() => {}}
                  />
                ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Completed Challenges */}
        {completedChallenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gray-800/70 rounded-2xl p-6 shadow-[0_0_25px_rgba(239,68,68,0.7)] backdrop-blur-md"
          >
            <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'} bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500`}>
              Conquered Battle Stages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg ${
                    isDarkTheme ? 'bg-gray-900/60' : 'bg-gray-300/60'
                  } shadow-[0_0_15px_rgba(239,68,68,0.4)] opacity-80 backdrop-blur-md`}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                      }`}
                    >
                      {challenge.name} ({challenge.tier})
                    </h3>
                    <motion.button
                      onClick={() => shareChallenge(challenge)}
                      whileHover={{ scale: 1.1 }}
                      className="text-sm text-purple-400 hover:text-purple-300"
                    >
                      Share
                    </motion.button>
                  </div>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Type: {challenge.type}
                  </p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Difficulty: {challenge.difficulty}
                  </p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Completed: {challenge.completedDate.split('T')[0]}
                  </p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Reward: {challenge.reward}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
