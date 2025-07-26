'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced 3D Gym Model with Advanced Equipment and Animations
const GymModel = ({ onEquipmentClick }) => {
  const treadmillRef = useRef();
  const weightsRef = useRef();
  const bikeRef = useRef();
  const yogaMatRef = useRef();
  const lightRef = useRef();
  const particlesRef = useRef();

  // Animate equipment
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (treadmillRef.current) {
      treadmillRef.current.rotation.y += 0.015; // Faster treadmill belt rotation
    }
    if (weightsRef.current) {
      weightsRef.current.position.y = Math.sin(t * 1.5) * 0.15 + 0.5; // Enhanced weights pulse
    }
    if (bikeRef.current) {
      bikeRef.current.rotation.z = Math.sin(t * 2) * 0.1; // Bike pedal motion
    }
    if (yogaMatRef.current) {
      yogaMatRef.current.scale.set(1 + Math.sin(t) * 0.05, 1 + Math.sin(t) * 0.05, 1); // Yoga mat pulse
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + Math.sin(t * 3) * 0.8; // Dynamic neon light
    }
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < 300; i++) {
        positions[i * 3 + 1] -= 0.03;
        if (positions[i * 3 + 1] < -6) positions[i * 3 + 1] = 6;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Enhanced Particle System
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 300;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    colors[i * 3] = Math.random(); // Red
    colors[i * 3 + 1] = Math.random() * 0.5; // Green
    colors[i * 3 + 2] = 1; // Blue
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  return (
    <group>
      {/* Gym Floor with Texture */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Treadmill */}
      <mesh
        ref={treadmillRef}
        position={[-3, 0, -2]}
        onClick={() => onEquipmentClick('Treadmill: Cardio Zone - 30 min, 6 mph')}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#ef4444" emissive="#3b82f6" emissiveIntensity={1} />
      </mesh>
      {/* Weights */}
      <mesh
        ref={weightsRef}
        position={[2, 0, -2]}
        onClick={() => onEquipmentClick('Weights: Strength Zone - 3 sets, 10 reps')}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <cylinderGeometry args={[0.6, 0.6, 1.8, 32]} />
        <meshStandardMaterial color="#3b82f6" emissive="#ef4444" emissiveIntensity={0.8} />
      </mesh>
      {/* Stationary Bike */}
      <mesh
        ref={bikeRef}
        position={[-1, 0, 2]}
        onClick={() => onEquipmentClick('Bike: Endurance Zone - 45 min, 15 mph')}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <boxGeometry args={[1.5, 1, 0.8]} />
        <meshStandardMaterial color="#10b981" emissive="#34d399" emissiveIntensity={0.7} />
      </mesh>
      {/* Yoga Mat */}
      <mesh
        ref={yogaMatRef}
        position={[3, -1.4, 2]}
        onClick={() => onEquipmentClick('Yoga Mat: Flexibility Zone - 20 min session')}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <planeGeometry args={[2, 1]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#a78bfa" emissiveIntensity={0.6} />
      </mesh>
      {/* Enhanced Particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.85} />
      </points>
      {/* Dynamic Lighting */}
      <pointLight ref={lightRef} position={[0, 4, 4]} color="#ef4444" intensity={2.5} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
};

// Fallback 2D Gym Placeholder
const GymPlaceholder = () => {
  return (
    <motion.div
      className="h-64 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-lg flex items-center justify-center"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-xl font-medium text-gray-200">Interactive Gym Preview</span>
    </motion.div>
  );
};

export default function Dashboard() {
  const [progressData, setProgressData] = useState([70, 80, 95, 60, 85, 90]);
  const [heatmapData, setHeatmapData] = useState([
    [4, 6, 3, 9, 1, 5, 7],
    [2, 7, 5, 4, 8, 3, 6],
    [9, 3, 6, 2, 5, 7, 4],
  ]);
  const [streak, setStreak] = useState(15);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isARMode, setIsARMode] = useState(false);
  const [equipmentInfo, setEquipmentInfo] = useState('');
  const [workouts, setWorkouts] = useState([
    { id: '1', title: 'Leg Day', time: '10:00 AM', day: 'Monday', duration: '45 min' },
    { id: '2', title: 'Upper Body', time: '3:00 PM', day: 'Tuesday', duration: '60 min' },
    { id: '3', title: 'Cardio', time: '7:00 AM', day: 'Wednesday', duration: '30 min' },
    { id: '4', title: 'Yoga', time: '6:00 PM', day: 'Thursday', duration: '40 min' },
  ]);
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'CyberAthlete', score: 1020, avatar: '/avatars/cyber.png' },
    { id: 2, name: 'NeonWarrior', score: 890, avatar: '/avatars/neon.png' },
    { id: 3, name: 'GymBot', score: 850, avatar: '/avatars/bot.png' },
    { id: 4, name: 'FitPhantom', score: 790, avatar: '/avatars/phantom.png' },
  ]);
  const [aiSuggestions, setAiSuggestions] = useState([
    { id: 1, title: 'HIIT Blast', desc: '30-min high-intensity interval training', intensity: 'High', icon: '🔥' },
    { id: 2, title: 'Yoga Flow', desc: '45-min flexibility and core workout', intensity: 'Medium', icon: '🧘' },
    { id: 3, title: 'Cycling Sprint', desc: '20-min high-speed cycling', intensity: 'High', icon: '🚴' },
    { id: 4, title: 'Core Strength', desc: '40-min core and abs workout', intensity: 'Medium', icon: '💪' },
  ]);
  const [workoutProgress, setWorkoutProgress] = useState({ completed: 0, total: workouts.length });
  const router = useRouter();
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  // Simulated real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressData((prev) =>
        prev.map((val) => Math.min(100, Math.max(10, val + Math.floor(Math.random() * 10 - 5))))
      );
      setStreak((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
      setLeaderboard((prev) =>
        prev.map((user) => ({ ...user, score: user.score + Math.floor(Math.random() * 15) }))
      );
      setHeatmapData((prev) =>
        prev.map((week) => week.map(() => Math.floor(Math.random() * 10)))
      );
      setAiSuggestions((prev) =>
        prev.map((sug) => ({
          ...sug,
          desc: Math.random() > 0.8 ? `Updated: ${sug.desc}` : sug.desc,
        }))
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Workout Timer
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  // Voice Activation with Enhanced Commands
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        try {
          const command = event.results[0][0].transcript.toLowerCase();
          if (command.includes('show progress')) {
            document.getElementById('progress-section')?.scrollIntoView({ behavior: 'smooth' });
          } else if (command.includes('open scheduler')) {
            document.getElementById('scheduler-section')?.scrollIntoView({ behavior: 'smooth' });
          } else if (command.includes('show leaderboard')) {
            document.getElementById('leaderboard-section')?.scrollIntoView({ behavior: 'smooth' });
          } else if (command.includes('suggest workout')) {
            document.getElementById('ai-suggestions-section')?.scrollIntoView({ behavior: 'smooth' });
          } else if (command.includes('toggle ar')) {
            setIsARMode(!isARMode);
          } else if (command.includes('show heatmap')) {
            document.getElementById('heatmap-section')?.scrollIntoView({ behavior: 'smooth' });
          } else if (command.includes('start timer')) {
            setIsTimerRunning(true);
          } else if (command.includes('stop timer')) {
            setIsTimerRunning(false);
          } else if (command.includes('highlight equipment')) {
            setEquipmentInfo('Highlighting: Treadmill, Weights, Bike, Yoga Mat');
          } else if (command.includes('add workout')) {
            setWorkouts((prev) => [
              ...prev,
              {
                id: `${prev.length + 1}`,
                title: 'New Workout',
                time: '12:00 PM',
                day: 'Friday',
                duration: '30 min',
              },
            ]);
          } else if (command.includes('complete workout')) {
            setWorkoutProgress((prev) => ({
              ...prev,
              completed: Math.min(prev.completed + 1, prev.total),
            }));
          }
          setIsListening(false);
        } catch (error) {
          console.error('Voice recognition error:', error);
          setIsListening(false);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
        setIsListening(false);
      };
    } else {
      console.warn('Web Speech API not supported in this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isARMode]);

  const toggleVoiceControl = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting voice recognition:', error);
      }
    }
  };

  // Drag and Drop Handler
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedWorkouts = Array.from(workouts);
    const [moved] = reorderedWorkouts.splice(result.source.index, 1);
    reorderedWorkouts.splice(result.destination.index, 0, moved);
    setWorkouts(reorderedWorkouts);
  };

  // Equipment Click Handler
  const handleEquipmentClick = (info) => {
    setEquipmentInfo(info);
    setTimeout(() => setEquipmentInfo(''), 4000); // Extended display time
  };

  // Format Timer
  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'
      } relative overflow-hidden`}
    >
      {/* Enhanced Particle Background */}
      <div className="absolute inset-0 opacity-10 animate-pulse bg-[url('/cyber-grid.png')]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-blue-600/30 to-purple-600/30 animate-gradient-x"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-blue-500 to-purple-500"
          >
            CyberFit Command Hub
          </motion.h1>
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setIsARMode(!isARMode)}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isARMode
                  ? 'bg-blue-600 text-white animate-pulse'
                  : isDarkTheme
                  ? 'bg-gray-800 text-blue-400'
                  : 'bg-gray-200 text-blue-600'
              } shadow-neon`}
            >
              {isARMode ? 'Exit AR' : 'AR Mode'}
            </motion.button>
            <motion.button
              onClick={toggleVoiceControl}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse'
                  : isDarkTheme
                  ? 'bg-gray-800 text-blue-400'
                  : 'bg-gray-200 text-blue-600'
              } shadow-neon`}
              disabled={!recognitionRef.current}
            >
              Voice Control {isListening ? 'On' : 'Off'}
            </motion.button>
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

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {/* 3D Gym Model or AR Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="col-span-1 md:col-span-2 lg:col-span-8 bg-gray-800/60 rounded-2xl p-6 shadow-[0_0_25px_rgba(239,68,68,0.5)]"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-xl font-bold ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
                {isARMode ? 'AR Workout Environment' : 'Virtual Gym Simulation'}
              </h2>
              {equipmentInfo && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium text-blue-400"
                >
                  {equipmentInfo}
                </motion.span>
              )}
            </div>
            <div className="h-64 rounded-lg overflow-hidden">
              {isARMode ? (
                <motion.div
                  className="h-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <span className="text-xl font-semibold text-gray-100">AI-Driven AR Experience</span>
                </motion.div>
              ) : (
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 3, 7]} fov={50} />
                  <OrbitControls enablePan={false} enableZoom={true} maxDistance={10} minDistance={3} />
                  <GymModel onEquipmentClick={handleEquipmentClick} />
                </Canvas>
              )}
            </div>
          </motion.div>

          {/* Workout Timer */}
          <motion.div
            id="timer-section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="col-span-1 lg:col-span-4 bg-gray-800/60 rounded-2xl p-6 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          >
            <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
              Workout Timer
            </h2>
            <motion.div
              className="flex items-center justify-center text-3xl font-bold text-blue-400 bg-gray-700/30 rounded-lg p-4"
              animate={{ scale: isTimerRunning ? [1, 1.1, 1] : 1 }}
              transition={{ repeat: isTimerRunning ? Infinity : 0, duration: 1.2 }}
            >
              {formatTimer(timer)}
            </motion.div>
            <div className="flex justify-center space-x-3 mt-4">
              <motion.button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                whileHover={{ scale: 1.1 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  isTimerRunning
                    ? 'bg-red-600 text-white'
                    : isDarkTheme
                    ? 'bg-gray-800 text-blue-400'
                    : 'bg-gray-200 text-blue-600'
                } shadow-neon`}
              >
                {isTimerRunning ? 'Pause' : 'Start'}
              </motion.button>
              <motion.button
                onClick={() => setTimer(0)}
                whileHover={{ scale: 1.1 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  isDarkTheme ? 'bg-gray-800 text-blue-400' : 'bg-gray-200 text-blue-600'
                } shadow-neon`}
              >
                Reset
              </motion.button>
            </div>
          </motion.div>

          {/* Workout Heatmap */}
          <motion.div
            id="heatmap-section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="col-span-1 lg:col-span-4 bg-gray-800/60 rounded-2xl p-6 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          >
            <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
              Weekly Activity Heatmap
            </h2>
            <div className="grid grid-cols-7 gap-1.5">
              {heatmapData.flat().map((value, index) => (
                <motion.div
                  key={index}
                  className={`w-6 h-6 rounded-md ${
                    value >= 8
                      ? 'bg-red-600'
                      : value >= 5
                      ? 'bg-blue-500'
                      : value >= 2
                      ? 'bg-blue-300'
                      : 'bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.3, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                  title={`Day ${index + 1}: Intensity ${value}/10`}
                />
              ))}
            </div>
            <p className={`text-xs text-center mt-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Intensity: Low (Blue) to High (Red)
            </p>
          </motion.div>

          {/* Progress Visualizer with Completion Tracker */}
          <motion.div
            id="progress-section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="col-span-1 lg:col-span-4 bg-gray-800/60 rounded-2xl p-6 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          >
            <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
              Workout Intensity & Progress
            </h2>
            <div className="flex items-end justify-center space-x-1.5 h-36">
              {progressData.map((value, index) => (
                <motion.div
                  key={index}
                  className="w-8 bg-gradient-to-t from-red-500 to-blue-500 rounded-t relative"
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ duration: 1.2, delay: index * 0.15 }}
                >
                  <span
                    className={`absolute -top-6 text-xs font-semibold ${
                      isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                    }`}
                  >
                    {value}%
                  </span>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="flex items-center justify-center space-x-3 mt-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium text-gray-400">Streak:</span>
              <span className={`text-base font-bold ${isDarkTheme ? 'text-red-500' : 'text-red-600'}`}>
                {streak}🔥
              </span>
              <span className="text-sm font-medium text-gray-400">Completed:</span>
              <span className={`text-base font-bold ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
                {workoutProgress.completed}/{workoutProgress.total}
              </span>
            </motion.div>
          </motion.div>

          {/* AI Workout Suggestions */}
          <motion.div
            id="ai-suggestions-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-gray-800/60 rounded-2xl p-6 shadow-[0_0_25px_rgba(239,68,68,0.5)]"
          >
            <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
              Personalized AI Suggestions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {aiSuggestions.map((suggestion) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' }}
                    className={`p-4 rounded-lg ${isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'}`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{suggestion.icon}</span>
                      <h3
                        className={`text-base font-semibold ${
                          isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                        }`}
                      >
                        {suggestion.title}
                      </h3>
                    </div>
                    <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                      {suggestion.desc}
                    </p>
                    <span
                      className={`text-xs font-semibold ${
                        suggestion.intensity === 'High' ? 'text-red-400' : 'text-blue-400'
                      }`}
                    >
                      Intensity: {suggestion.intensity}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Workout Scheduler */}
          <motion.div
            id="scheduler-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-gray-800/60 rounded-2xl p-6 shadow-[0_0_25px_rgba(239,68,68,0.5)]"
          >
            <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
              Workout Scheduler
            </h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="workouts">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                    <AnimatePresence>
                      {workouts.map((workout, index) => (
                        <Draggable key={workout.id} draggableId={workout.id} index={index}>
                          {(provided) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              whileHover={{ scale: 1.03 }}
                              className={`p-3 rounded-lg ${
                                isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'
                              } flex justify-between items-center shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
                            >
                              <div>
                                <h3
                                  className={`text-sm font-semibold ${
                                    isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                                  }`}
                                >
                                  {workout.title}
                                </h3>
                                <p
                                  className={`text-xs ${
                                    isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                                  }`}
                                >
                                  {workout.day} at {workout.time} ({workout.duration})
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <motion.button
                                  onClick={() =>
                                    setWorkoutProgress((prev) => ({
                                      ...prev,
                                      completed: Math.min(prev.completed + 1, prev.total),
                                    }))
                                  }
                                  whileHover={{ scale: 1.1 }}
                                  className="text-green-400 hover:text-green-300 text-xs"
                                >
                                  Complete
                                </motion.button>
                                <motion.button
                                  onClick={() => router.push(`/workouts/${workout.id}`)}
                                  whileHover={{ scale: 1.1 }}
                                  className="text-blue-400 hover:text-blue-300 text-xs"
                                >
                                  Edit
                                </motion.button>
                              </div>
                            </motion.div>
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

          {/* Interactive Leaderboard */}
          <motion.div
            id="leaderboard-section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-gray-800/60 rounded-2xl p-6 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          >
            <h2 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-gray-100' : 'text-gray-800'}`}>
              Global Leaderboard
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              <AnimatePresence>
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)' }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg cursor-pointer ${
                      isDarkTheme ? 'bg-gray-700/60' : 'bg-gray-200/60'
                    } flex items-center justify-between`}
                    onClick={() => router.push(`/profile/${user.id}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-blue-500"
                      />
                      <div>
                        <span
                          className={`text-xs font-bold ${
                            index === 0
                              ? 'text-yellow-400'
                              : index === 1
                              ? 'text-gray-400'
                              : 'text-bronze-400'
                          }`}
                        >
                          #{index + 1}
                        </span>
                        <span
                          className={`text-sm font-medium ml-2 ${
                            isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                          }`}
                        >
                          {user.name}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        isDarkTheme ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      {user.score} pts
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for Enhanced Animations */}
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
        .max-h-64 {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #1f2937;
        }
        .max-h-64::-webkit-scrollbar {
          width: 8px;
        }
        .max-h-64::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .max-h-64::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}