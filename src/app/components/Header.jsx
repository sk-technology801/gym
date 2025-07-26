'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [progress, setProgress] = useState(75);
  const [streak, setStreak] = useState(12);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const recognitionRef = useRef(null);

  // Simulated progress and streak updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 10 : prev + 5));
      setStreak((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Voice Activation Setup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        if (command.includes('open menu')) {
          setIsMenuOpen(true);
        } else if (command.includes('close menu')) {
          setIsMenuOpen(false);
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
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
  }, []);

  const toggleVoiceControl = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Workouts', href: '/workouts' },
    { name: 'Nutrition', href: '/nutrition' },
    { name: 'Challenges', href: '/challenges' },
    { name: 'Leaderboard', href: '/leaderboard' },
  ];

  const profileLinks = [
    { name: 'Profile', href: '/profile' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Settings', href: '/settings' },
    { name: 'Logout', href: '/logout' },
  ];

  const handlePremiumClick = () => {
    router.push('/premium');
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <header
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 opacity-5 animate-pulse bg-[url('/cyber-grid.png')]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-blue-600/30 to-transparent animate-gradient-x"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <Tilt max={15} scale={1.05}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex items-center space-x-3"
            >
              <Link href="/">
                <div className="relative">
                  <span className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                    FITFURY
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-full animate-neon-glow"></div>
                  <span className="absolute top-0 right-0 text-xs text-blue-400 animate-pulse">
                    v3.0
                  </span>
                </div>
              </Link>
              <span
                className={`text-sm italic ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Power Up Your Grind
              </span>
            </motion.div>
          </Tilt>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`text-base font-semibold px-3 py-2 rounded-lg transition-all duration-300 relative group ${
                    pathname === link.href
                      ? 'text-white bg-gradient-to-r from-red-500 to-blue-500'
                      : isDarkTheme
                      ? 'text-gray-200 hover:text-white hover:bg-gray-800/50'
                      : 'text-gray-700 hover:text-black hover:bg-gray-200/50'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-300 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Profile and Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Progress Ring */}
            <div className="relative w-12 h-12">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className={isDarkTheme ? 'stroke-gray-700' : 'stroke-gray-300'}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeWidth="8"
                  stroke="url(#progressGradient)"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 283' }}
                  animate={{ strokeDasharray: `${(progress / 100) * 283} 283` }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div
                className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
                  isDarkTheme ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {progress}%
              </div>
            </div>

            {/* Streak Counter */}
            <motion.div
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xs font-medium text-gray-400">Streak:</span>
              <span
                className={`text-sm font-bold ${
                  isDarkTheme ? 'text-red-500' : 'text-red-600'
                }`}
              >
                {streak}🔥
              </span>
            </motion.div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full ${
                isDarkTheme ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isDarkTheme ? '🌞' : '🌙'}
            </button>

            {/* Voice Control Toggle */}
            <button
              onClick={toggleVoiceControl}
              className={`p-1.5 rounded-full ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : isDarkTheme
                  ? 'bg-gray-800 text-blue-400'
                  : 'bg-gray-200 text-blue-600'
              }`}
              disabled={!recognitionRef.current}
            >
              🎙️
            </button>

            {/* Profile Dropdown */}
            <Tilt max={10} scale={1.05}>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <motion.img
                    src="/user-avatar.png"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-gradient-to-r from-red-500 to-blue-500"
                    whileHover={{ scale: 1.1 }}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/40')}
                  />
                  <span
                    className={`text-base font-medium ${
                      isDarkTheme ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    CyberAthlete
                  </span>
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute right-0 mt-2 w-48 ${
                        isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'
                      } rounded-lg shadow-2xl py-2 z-20 border border-gray-700/50`}
                    >
                      {profileLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`block px-4 py-2 text-base ${
                            isDarkTheme
                              ? 'text-gray-200 hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:text-white'
                              : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                          } transition-all duration-200`}
                          onClick={() => setIsProfileOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Tilt>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={handlePremiumClick}
                className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-5 py-2 rounded-full font-bold text-base hover:brightness-110 transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              >
                Power Up
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full ${
                isDarkTheme ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-3 py-6 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-base font-semibold px-3 py-2 rounded-lg transition-all duration-300 ${
                      pathname === link.href
                        ? 'text-white bg-gradient-to-r from-red-500 to-blue-500'
                        : isDarkTheme
                        ? 'text-gray-200 hover:text-white hover:bg-gray-800/50'
                        : 'text-gray-700 hover:text-black hover:bg-gray-200/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className={isDarkTheme ? 'stroke-gray-700' : 'stroke-gray-300'}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        strokeWidth="8"
                        stroke="url(#mobileProgressGradient)"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: '0 283' }}
                        animate={{ strokeDasharray: `${(progress / 100) * 283} 283` }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                      />
                      <defs>
                        <linearGradient id="mobileProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div
                      className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
                        isDarkTheme ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      {progress}%
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span
                      className={`text-xs font-medium ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Streak:
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        isDarkTheme ? 'text-red-500' : 'text-red-600'
                      }`}
                    >
                      {streak}🔥
                    </span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`p-1.5 rounded-full ${
                      isDarkTheme ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {isDarkTheme ? '🌞' : '🌙'}
                  </button>
                </div>
                {profileLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-base font-semibold px-3 py-2 rounded-lg transition-all duration-300 ${
                      isDarkTheme
                        ? 'text-gray-200 hover:text-white hover:bg-gray-800/50'
                        : 'text-gray-700 hover:text-black hover:bg-gray-200/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={toggleVoiceControl}
                  className={`p-2 rounded-full text-center ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : isDarkTheme
                      ? 'bg-gray-800 text-blue-400'
                      : 'bg-gray-200 text-blue-600'
                  }`}
                  disabled={!recognitionRef.current}
                >
                  Voice Control {isListening ? 'On' : 'Off'}
                </button>
                <button
                  onClick={handlePremiumClick}
                  className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-5 py-2 rounded-full font-bold text-base hover:brightness-110 transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                >
                  Power Up
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
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
        @keyframes neon-glow {
          0% {
            box-shadow: 0 0 5px rgba(239, 68, 68, 0.3), 0 0 10px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.5), 0 0 25px rgba(59, 130, 246, 0.5);
          }
          100% {
            box-shadow: 0 0 5px rgba(239, 68, 68, 0.3), 0 0 10px rgba(59, 130, 246, 0.3);
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 10s ease infinite;
        }
        .animate-neon-glow {
          animation: neon-glow 2s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}