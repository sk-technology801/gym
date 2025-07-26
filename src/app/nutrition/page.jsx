
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Meal Card Component
const MealCard = ({ meal, index, isDarkTheme, onRemove, provided }) => {
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
      } shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm`}
    >
      <div className="flex justify-between items-center">
        <h3
          className={`text-lg font-semibold ${
            isDarkTheme ? 'text-gray-100' : 'text-gray-800'
          }`}
        >
          {meal.name}
        </h3>
        <motion.button
          onClick={() => onRemove(meal.id)}
          whileHover={{ scale: 1.1 }}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          Remove
        </motion.button>
      </div>
      <div className="flex flex-col space-y-1">
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          {meal.mealType} - {meal.calories} kcal
        </p>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          Protein: {meal.macros.protein}g, Carbs: {meal.macros.carbs}g, Fat: {meal.macros.fat}g
        </p>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          Dietary: {meal.dietary}
        </p>
        <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
          Time: {meal.time}
        </p>
      </div>
    </motion.div>
  );
};

// Add Meal Form Component
const AddMealForm = ({ onAddMeal, isDarkTheme }) => {
  const [name, setName] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [dietary, setDietary] = useState('None');
  const [time, setTime] = useState('08:00');
  const [day, setDay] = useState('Monday');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !calories) return;
    onAddMeal({
      id: Date.now().toString(),
      name,
      mealType,
      calories: parseInt(calories),
      macros: { protein: parseInt(protein) || 0, carbs: parseInt(carbs) || 0, fat: parseInt(fat) || 0 },
      dietary,
      time,
      day,
      loggedDate: new Date().toISOString().split('T')[0],
    });
    setName('');
    setMealType('Breakfast');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setDietary('None');
    setTime('08:00');
    setDay('Monday');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'} shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm`}
    >
      <h3 className={`text-lg font-semibold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
        Log New Meal
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Meal Name"
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
          required
        />
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
        >
          {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
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
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories (kcal)"
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
          required
        />
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          placeholder="Protein (g)"
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
        />
        <input
          type="number"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          placeholder="Carbs (g)"
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
        />
        <input
          type="number"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          placeholder="Fat (g)"
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
        />
        <select
          value={dietary}
          onChange={(e) => setDietary(e.target.value)}
          className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'}`}
        >
          {['None', 'Vegan', 'Vegetarian', 'Keto', 'Gluten-Free'].map((d) => (
            <option key={d} value={d}>{d}</option>
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
        Log Meal
      </motion.button>
    </motion.form>
  );
};

// Recipe Suggestion Component
const RecipeCard = ({ recipe, isDarkTheme, onAdd }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-800/60' : 'bg-gray-300/60'} cursor-pointer backdrop-blur-sm`}
      onClick={() => onAdd(recipe)}
    >
      <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
        {recipe.name}
      </h3>
      <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
        {recipe.type} - {recipe.calories} kcal
      </p>
      <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
        Protein: {recipe.macros.protein}g, Carbs: {recipe.macros.carbs}g, Fat: {recipe.macros.fat}g
      </p>
      <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
        Dietary: {recipe.dietary}
      </p>
    </motion.div>
  );
};

// Water Tracker Component
const WaterTracker = ({ waterIntake, setWaterIntake, isDarkTheme }) => {
  const maxWater = 2000; // 2L goal in ml
  const waterProgress = (waterIntake / maxWater) * 100;

  const addWater = (amount) => {
    setWaterIntake((prev) => Math.min(prev + amount, maxWater));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'} shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm`}
    >
      <h3 className={`text-lg font-semibold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
        Water Intake
      </h3>
      <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
        {waterIntake} ml / {maxWater} ml
      </p>
      <div className="w-full bg-gray-600 rounded-full h-4 mb-4">
        <motion.div
          className="bg-gradient-to-r from-blue-400 to-cyan-500 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(waterProgress, 100)}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="flex space-x-3">
        <motion.button
          onClick={() => addWater(250)}
          whileHover={{ scale: 1.05 }}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            isDarkTheme ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
          } shadow-neon`}
        >
          +250ml
        </motion.button>
        <motion.button
          onClick={() => addWater(500)}
          whileHover={{ scale: 1.05 }}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            isDarkTheme ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
          } shadow-neon`}
        >
          +500ml
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function Nutrition() {
  const [meals, setMeals] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [
      {
        id: '1',
        name: 'Avocado Toast',
        mealType: 'Breakfast',
        calories: 300,
        macros: { protein: 10, carbs: 35, fat: 15 },
        dietary: 'Vegetarian',
        time: '08:00',
        loggedDate: '2025-07-26',
        day: 'Wednesday',
      },
      {
        id: '2',
        name: 'Grilled Chicken Salad',
        mealType: 'Lunch',
        calories: 450,
        macros: { protein: 30, carbs: 20, fat: 25 },
        dietary: 'None',
        time: '12:30',
        loggedDate: '2025-07-26',
        day: 'Wednesday',
      },
    ],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [filter, setFilter] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const [calorieFilter, setCalorieFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const [currentDay, setCurrentDay] = useState('Wednesday');
  const [recipeSuggestions, setRecipeSuggestions] = useState([]);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [waterIntake, setWaterIntake] = useState(0);
  const [loggingStreak, setLoggingStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const router = useRouter();

  // Simulated API for Recipe Suggestions and Insights
  useEffect(() => {
    const fetchSuggestions = async () => {
      const apiSuggestions = [
        {
          id: 'r1',
          name: 'Keto Avocado Bowl',
          type: 'Lunch',
          calories: 400,
          macros: { protein: 15, carbs: 10, fat: 30 },
          dietary: 'Keto',
        },
        {
          id: 'r2',
          name: 'Vegan Buddha Bowl',
          type: 'Dinner',
          calories: 350,
          macros: { protein: 12, carbs: 45, fat: 10 },
          dietary: 'Vegan',
        },
        {
          id: 'r3',
          name: 'Protein Smoothie',
          type: 'Snack',
          calories: 250,
          macros: { protein: 20, carbs: 30, fat: 5 },
          dietary: 'Vegetarian',
        },
      ];
      setRecipeSuggestions(apiSuggestions);
    };
    fetchSuggestions();

    // Motivational Quote
    const quotes = [
      'Fuel your body, feed your soul!',
      'Eat well, live well!',
      'Nutrition is the foundation of fitness.',
      'Your body deserves the best fuel.',
    ];
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Check for badges
    const totalMeals = Object.values(meals).flat().length;
    if (totalMeals >= 10 && !badges.includes('10 Meals')) {
      setBadges((prev) => [...prev, '10 Meals']);
    }
    if (loggingStreak >= 3 && !badges.includes('3-Day Streak')) {
      setBadges((prev) => [...prev, '3-Day Streak']);
    }
  }, [meals, loggingStreak, badges]);

  // Update Logging Streak
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastLogged = localStorage.getItem('lastLoggedDate');
    if (lastLogged !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastLogged === yesterday.toISOString().split('T')[0]) {
        setLoggingStreak((prev) => prev + 1);
      } else {
        setLoggingStreak(1);
      }
      localStorage.setItem('lastLoggedDate', today);
    }
  }, [meals]);

  // Drag and Drop Handler
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceDay = source.droppableId;
    const destDay = destination.droppableId;
    const reorderedMeals = { ...meals };

    const [moved] = reorderedMeals[sourceDay].splice(source.index, 1);
    moved.day = destDay;
    reorderedMeals[destDay].splice(destination.index, 0, moved);

    setMeals(reorderedMeals);
  };

  // Add New Meal
  const handleAddMeal = (newMeal) => {
    setMeals((prev) => ({
      ...prev,
      [newMeal.day]: [...prev[newMeal.day], newMeal],
    }));
  };

  // Remove Meal
  const handleRemove = (id) => {
    setMeals((prev) => {
      const updatedMeals = { ...prev };
      Object.keys(updatedMeals).forEach((day) => {
        updatedMeals[day] = updatedMeals[day].filter((meal) => meal.id !== id);
      });
      return updatedMeals;
    });
  };

  // Add Recipe to Meals
  const handleAddRecipe = (recipe) => {
    handleAddMeal({
      id: Date.now().toString(),
      name: recipe.name,
      mealType: recipe.type,
      calories: recipe.calories,
      macros: recipe.macros,
      dietary: recipe.dietary,
      time: '12:00',
      day: currentDay,
      loggedDate: new Date().toISOString().split('T')[0],
    });
  };

  // Export Meal Log as CSV
  const exportMealLog = () => {
    const headers = 'Name,Meal Type,Calories,Protein,Carbs,Fat,Dietary,Time,Day,Logged Date\n';
    const csv = Object.values(meals)
      .flat()
      .map(
        (meal) =>
          `${meal.name},${meal.mealType},${meal.calories},${meal.macros.protein},${meal.macros.carbs},${meal.macros.fat},${meal.dietary},${meal.time},${meal.day},${meal.loggedDate}`
      )
      .join('\n');
    const blob = new Blob([headers + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meal_log.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filter Meals
  const filteredMeals = meals[currentDay].filter((meal) => {
    const typeMatch = filter === 'All' || meal.mealType === filter;
    const dietaryMatch = dietaryFilter === 'All' || meal.dietary === dietaryFilter;
    const calorieMatch =
      calorieFilter === 'All' ||
      (calorieFilter === 'Low' && meal.calories < 300) ||
      (calorieFilter === 'Medium' && meal.calories >= 300 && meal.calories <= 500) ||
      (calorieFilter === 'High' && meal.calories > 500);
    const timeMatch =
      timeFilter === 'All' ||
      (timeFilter === 'Morning' && meal.time < '12:00') ||
      (timeFilter === 'Afternoon' && meal.time >= '12:00' && meal.time < '17:00') ||
      (timeFilter === 'Evening' && meal.time >= '17:00');
    return typeMatch && dietaryMatch && calorieMatch && timeMatch;
  });

  // Nutrition Insights
  const totalCalories = Object.values(meals)
    .flat()
    .reduce((sum, meal) => sum + meal.calories, 0);
  const totalMacros = Object.values(meals)
    .flat()
    .reduce(
      (acc, meal) => ({
        protein: acc.protein + meal.macros.protein,
        carbs: acc.carbs + meal.macros.carbs,
        fat: acc.fat + meal.macros.fat,
      }),
      { protein: 0, carbs: 0, fat: 0 }
    );
  const calorieGoal = 2000;
  const macroGoals = { protein: 100, carbs: 200, fat: 70 };
  const calorieProgress = (totalCalories / calorieGoal) * 100;
  const insights = [];
  if (totalMacros.protein / macroGoals.protein < 0.8) {
    insights.push('Increase protein intake with foods like chicken or tofu.');
  }
  if (totalMacros.carbs / macroGoals.carbs > 1.2) {
    insights.push('Consider reducing carbs for better balance.');
  }
  if (totalCalories > calorieGoal) {
    insights.push('Calorie intake exceeds goal; opt for lower-calorie meals.');
  }

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
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-blue-500 to-purple-500"
          >
            Nutrition Hub
          </motion.h1>
          <div className="flex flex-wrap items-center gap-4">
            <motion.select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-800 text-blue-400' : 'bg-gray-200 text-blue-600'
              } shadow-neon`}
            >
              <option value="All">All Meals</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </motion.select>
            <motion.select
              value={dietaryFilter}
              onChange={(e) => setDietaryFilter(e.target.value)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-800 text-blue-400' : 'bg-gray-200 text-blue-600'
              } shadow-neon`}
            >
              <option value="All">All Diets</option>
              <option value="None">None</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Keto">Keto</option>
              <option value="Gluten-Free">Gluten-Free</option>
            </motion.select>
            <motion.select
              value={calorieFilter}
              onChange={(e) => setCalorieFilter(e.target.value)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-800 text-blue-400' : 'bg-gray-200 text-blue-600'
              } shadow-neon`}
            >
              <option value="All">All Calories</option>
              <option value="Low">Low (&lt;300 kcal)</option>
              <option value="Medium">Medium (300-500 kcal)</option>
              <option value="High">High (&gt;500 kcal)</option>
            </motion.select>
            <motion.select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-800 text-blue-400' : 'bg-gray-200 text-blue-600'
              } shadow-neon`}
            >
              <option value="All">All Times</option>
              <option value="Morning">Morning (&lt;12:00)</option>
              <option value="Afternoon">Afternoon (12:00-17:00)</option>
              <option value="Evening">Evening (&gt;17:00)</option>
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
            <motion.button
              onClick={() => router.push('/workouts')}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-gray-800 text-blue-400' : 'bg-gray-200 text-blue-600'
              } shadow-neon`}
            >
              Go to Workouts
            </motion.button>
          </div>
        </div>

        {/* Motivational Quote and Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-4 rounded-lg ${isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'} shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center`}
        >
          <p className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
            "{motivationalQuote}"
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Streak: {loggingStreak} 🔥
            </span>
            {badges.length > 0 && (
              <span className={`text-sm ${isDarkTheme ? 'text-yellow-400' : 'text-yellow-600'}`}>
                Badges: {badges.join(', ')} 🏆
              </span>
            )}
          </div>
        </motion.div>

        {/* Nutrition Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-4 rounded-lg ${isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'} shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm`}
        >
          <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
            Nutrition Tracker
          </h2>
          <div className="space-y-4">
            <div>
              <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Calories: {totalCalories} / {calorieGoal} kcal
              </p>
              <div className="w-full bg-gray-600 rounded-full h-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(calorieProgress, 100)}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['protein', 'carbs', 'fat'].map((macro) => (
                <div key={macro}>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    {macro.charAt(0).toUpperCase() + macro.slice(1)}: {totalMacros[macro]}g / {macroGoals[macro]}g
                  </p>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-red-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(totalMacros[macro] / macroGoals[macro]) * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Water Tracker */}
        <WaterTracker waterIntake={waterIntake} setWaterIntake={setWaterIntake} isDarkTheme={isDarkTheme} />

        {/* Nutrition Insights */}
        {insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-lg ${isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'} shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm`}
          >
            <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
              Nutrition Insights
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {insights.map((insight, index) => (
                <li key={index} className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  {insight}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Add Meal Form */}
        <AddMealForm onAddMeal={handleAddMeal} isDarkTheme={isDarkTheme} />

        {/* Recipe Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-8 p-4 rounded-lg ${isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'} shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm`}
        >
          <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
            Recipe Suggestions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {recipeSuggestions.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isDarkTheme={isDarkTheme}
                  onAdd={handleAddRecipe}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Weekly Meal Planner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
            Weekly Meal Planner
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <motion.button
                key={day}
                onClick={() => setCurrentDay(day)}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  currentDay === day
                    ? isDarkTheme
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : isDarkTheme
                    ? 'bg-gray-800 text-blue-400'
                    : 'bg-gray-200 text-blue-600'
                } shadow-neon`}
              >
                {day}
              </motion.button>
            ))}
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={currentDay}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <AnimatePresence>
                    {filteredMeals.map((meal, index) => (
                      <Draggable key={meal.id} draggableId={meal.id} index={index}>
                        {(provided) => (
                          <MealCard
                            meal={meal}
                            index={index}
                            isDarkTheme={isDarkTheme}
                            onRemove={handleRemove}
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
            {/* Additional Droppables for Other Days */}
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
              .filter((day) => day !== currentDay)
              .map((day) => (
                <Droppable key={day} droppableId={day}>
                  {(provided) => <div ref={provided.innerRef} {...provided.droppableProps} />}
                </Droppable>
              ))}
          </DragDropContext>
        </motion.div>

        {/* Meal History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gray-800/60 rounded-2xl p-6 shadow-[0_0_25px_rgba(59,130,246,0.5)] backdrop-blur-sm"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className={`text-xl font-bold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
              Meal History
            </h2>
            <motion.button
              onClick={exportMealLog}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              } shadow-neon`}
            >
              Export as CSV
            </motion.button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(meals)
              .flat()
              .map((meal) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg ${
                    isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'
                  } shadow-[0_0_15px_rgba(59,130,246,0.3)] opacity-70 backdrop-blur-sm`}
                >
                  <h3
                    className={`text-lg font-semibold ${
                      isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                    }`}
                  >
                    {meal.name}
                  </h3>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    {meal.mealType} - {meal.calories} kcal
                  </p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Protein: {meal.macros.protein}g, Carbs: {meal.macros.carbs}g, Fat: {meal.macros.fat}g
                  </p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Dietary: {meal.dietary}
                  </p>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Logged: {meal.loggedDate} ({meal.day} at {meal.time})
                  </p>
                </motion.div>
              ))}
          </div>
        </motion.div>
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
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </div>
  );
}
