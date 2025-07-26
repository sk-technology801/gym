
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Workout Card Component
const WorkoutCard = ({ workout, index, isDarkTheme, onComplete, onEdit, provided }) => {
  return (
    <motion.div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.03 }}
      whileDrag={{ scale: 1.05, boxShadow: '0 0 20px rgba(59,130,246,0.5)' }}
      className={`p-4 rounded-lg flex flex-col space-y-3 ${
        isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'
      } shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
    >
      <div className="flex justify-between items-center">
        <h3
          className={`text-lg font-semibold ${
            isDarkTheme ? 'text-gray-100' : 'text-gray-800'
          }`}
        >
          {workout.title}
        </h3>
        <div className="flex space-x-2">
          <motion.button
            onClick={() => onComplete(workout.id)}
            whileHover={{ scale: 1.1 }}
            className="text-green-400 hover:text-green-300 text-sm"
          >
            Complete
          </motion.button>
          <motion.button
            onClick={() => onEdit(workout.id)}
            whileHover={{ scale: 1.1 }}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Edit
          </motion.button>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          {workout.day} at {workout.time} ({workout.duration})
        </p>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          Type: {workout.type}
        </p>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          Intensity: {workout.intensity}
        </p>
      </div>
    </motion.div>
  );
};

// Add Workout Form Component
const AddWorkoutForm = ({ onAddWorkout, isDarkTheme }) => {
  const [title, setTitle] = useState('');
  const [day, setDay] = useState('Monday');
  const [time, setTime] = useState('12:00');
  const [duration, setDuration] = useState('30 min');
  const [type, setType] = useState('Cardio');
  const [intensity, setIntensity] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAddWorkout({
      id: Date.now().toString(),
      title,
      day,
      time,
      duration,
      type,
      intensity,
    });
    setTitle('');
    setDay('Monday');
    setTime('12:00');
    setDuration('30 min');
    setType('Cardio');
    setIntensity('Medium');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'} shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
    >
      <h3 className={`text-lg font-semibold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
        Add New Workout
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Workout Title"
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
          required
        />
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
        >
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
        />
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
        >
          {['15 min', '30 min', '45 min', '60 min'].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
        >
          {['Cardio', 'Strength', 'Flexibility'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
        >
          {['Low', 'Medium', 'High'].map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
          isDarkTheme ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
        } shadow-neon`}
      >
        Add Workout
      </motion.button>
    </motion.form>
  );
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([
    { id: '1', title: 'Leg Day', time: '10:00 AM', day: 'Monday', duration: '45 min', type: 'Strength', intensity: 'High' },
    { id: '2', title: 'Upper Body', time: '3:00 PM', day: 'Tuesday', duration: '60 min', type: 'Strength', intensity: 'Medium' },
    { id: '3', title: 'Cardio Blast', time: '7:00 AM', day: 'Wednesday', duration: '30 min', type: 'Cardio', intensity: 'High' },
    { id: '4', title: 'Yoga Flow', time: '6:00 PM', day: 'Thursday', duration: '40 min', type: 'Flexibility', intensity: 'Low' },
  ]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [filter, setFilter] = useState('All');
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [historyFilter, setHistoryFilter] = useState('All');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  // Simulated API for Workout Suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      // Simulated API response
      const apiSuggestions = [
        { id: 's1', title: 'HIIT Sprint', type: 'Cardio', intensity: 'High', duration: '20 min' },
        { id: 's2', title: 'Core Blast', type: 'Strength', intensity: 'Medium', duration: '30 min' },
        { id: 's3', title: 'Stretching', type: 'Flexibility', intensity: 'Low', duration: '15 min' },
      ];
      setSuggestions(apiSuggestions);
    };
    fetchSuggestions();
  }, []);

  // Drag and Drop Handler
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedWorkouts = Array.from(workouts);
    const [moved] = reorderedWorkouts.splice(result.source.index, 1);
    reorderedWorkouts.splice(result.destination.index, 0, moved);
    setWorkouts(reorderedWorkouts);
  };

  // Handle Workout Completion
  const handleComplete = (id) => {
    const completedWorkout = workouts.find((w) => w.id === id);
    if (completedWorkout) {
      completedWorkout.completedDate = new Date().toISOString().split('T')[0];
      setCompletedWorkouts((prev) => [...prev, completedWorkout]);
      setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
    }
  };

  // Add New Workout
  const handleAddWorkout = (newWorkout) => {
    setWorkouts((prev) => [...prev, newWorkout]);
  };

  // Filter Workouts
  const filteredWorkouts = filter === 'All' ? workouts : workouts.filter((workout) => workout.type === filter);

  // Filter Workout History by Date
  const filteredHistory = historyFilter === 'All'
    ? completedWorkouts
    : completedWorkouts.filter((workout) => workout.completedDate === historyFilter);

  // Calculate Progress
  const totalWorkouts = workouts.length + completedWorkouts.length;
  const completionPercentage = totalWorkouts > 0 ? (completedWorkouts.length / totalWorkouts) * 100 : 0;

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'
      } relative overflow-hidden`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 animate-pulse bg-[url('/cyber-grid.png')]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-blue-600/30 to-purple-600/30 animate-gradient-x"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-blue-500 to-purple-500"
          >
            Workout Hub
          </motion.h1>
          <div className="flex items-center space-x-4">
            <motion.select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-800 text-blue-400' : 'bg-gray-200 text-blue-600'
              } shadow-neon`}
            >
              <option value="All">All Types</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
            </motion.select>
            <motion.button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              whileHover={{ scale: 1.1 }}
              className={`p-2 rounded-full ${
                isDarkTheme ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'
              } shadow-neon`}
            >
              {isDarkTheme ? '🌞' : '🌙'}
            </motion.button>
          </div>
        </div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-4 rounded-lg ${isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'} shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
        >
          <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
            Progress Tracker
          </h2>
          <div className="w-full bg-gray-600 rounded-full h-4">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className={`text-sm mt-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            Completion: {completionPercentage.toFixed(1)}% ({completedWorkouts.length}/{totalWorkouts} workouts)
          </p>
        </motion.div>

        {/* Add Workout Form */}
        <AddWorkoutForm onAddWorkout={handleAddWorkout} isDarkTheme={isDarkTheme} />

        {/* Workout Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-8 p-4 rounded-lg ${isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'} shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
        >
          <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
            Suggested Workouts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {suggestions.map((suggestion) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-800/60' : 'bg-gray-300/60'}`}
                  onClick={() =>
                    handleAddWorkout({
                      id: suggestion.id,
                      title: suggestion.title,
                      day: 'Any',
                      time: '12:00',
                      duration: suggestion.duration,
                      type: suggestion.type,
                      intensity: suggestion.intensity,
                    })
                  }
                >
                  <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
                    {suggestion.title}
                  </h3>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    {suggestion.type} - {suggestion.intensity} - {suggestion.duration}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Content - Active Workouts */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="workouts">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
              >
                <AnimatePresence>
                  {filteredWorkouts.map((workout, index) => (
                    <Draggable key={workout.id} draggableId={workout.id} index={index}>
                      {(provided) => (
                        <WorkoutCard
                          workout={workout}
                          index={index}
                          isDarkTheme={isDarkTheme}
                          onComplete={handleComplete}
                          onEdit={() => router.push(`/workouts/${workout.id}`)}
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

        {/* Workout History */}
        {completedWorkouts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gray-800/60 rounded-2xl p-6 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-xl font-bold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
                Workout History
              </h2>
              <motion.select
                value={historyFilter}
                onChange={(e) => setHistoryFilter(e.target.value)}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  isDarkTheme ? 'bg-gray-800 text-blue-400' : 'bg-gray-200 text-blue-600'
                } shadow-neon`}
              >
                <option value="All">All Dates</option>
                {[...new Set(completedWorkouts.map((w) => w.completedDate))].map((date) => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </motion.select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHistory.map((workout) => (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg ${
                    isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'
                  } shadow-[0_0_15px_rgba(59,130,246,0.3)] opacity-70`}
                >
                  <h3
                    className={`text-lg font-semibold ${
                      isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                    }`}
                  >
                    {workout.title}
                  </h3>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    {workout.day} at {workout.time} ({workout.duration})
                  </p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Type: {workout.type}
                  </p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Intensity: {workout.intensity}
                  </p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Completed: {workout.completedDate}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
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
          background-size: 300% 300%;
          animation: gradient-x 10s ease infinite;
        }
        @keyframes neon-glow {
          0% {
            box-shadow: 0 0 8px rgba(239, 68, 68, 0.5), 0 0 15px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 25px rgba(239, 68, 68, 0.7), 0 0 35px rgba(59, 130, 246, 0.7);
          }
          100% {
            box-shadow: 0 0 8px rgba(239, 68, 68, 0.5), 0 0 15px rgba(59, 130, 246, 0.5);
          }
        }
        .shadow-neon {
          animation: neon-glow 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
