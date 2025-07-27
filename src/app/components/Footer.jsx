'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Social Icon Component
const SocialIcon = ({ icon, href, isDarkTheme }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ 
        scale: 1.3, 
        rotate: 10, 
        color: '#EF4444',
        boxShadow: '0 0 15px rgba(239,68,68,0.8)'
      }}
      whileTap={{ scale: 0.9 }}
      className={`text-2xl ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} hover:text-red-500 transition-colors p-2 rounded-full`}
    >
      {icon}
    </motion.a>
  );
};

// Newsletter Form Component
const NewsletterForm = ({ isDarkTheme }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Sound: Holographic ping for newsletter signup');
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <AnimatePresence>
        {subscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute inset-0 flex items-center justify-center ${
              isDarkTheme ? 'bg-gray-900/90' : 'bg-gray-200/90'
            } rounded-lg backdrop-blur-md`}
          >
            <p className={`text-sm font-semibold ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'} animate-glitch`}>
              Subscription Confirmed! 🚀
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`p-2 rounded-lg ${
                isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'
              } border border-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(239,68,68,0.7)' }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isDarkTheme ? 'bg-red-600 text-white' : 'bg-red-500 text-white'
              } shadow-neon animate-pulse-slow`}
            >
              Subscribe
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Footer({ isDarkTheme = true, setIsDarkTheme }) {
  const router = useRouter();

  const navLinks = [
    { name: 'Challenges', path: '/challenges' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Premium', path: '/premium' },
    { name: 'Workouts', path: '/workouts' },
    { name: 'Nutrition', path: '/nutrition' },
  ];

  const socialIcons = [
    { icon: '𝕏', href: 'https://x.com' },
    { icon: '📷', href: 'https://instagram.com' },
    { icon: '📘', href: 'https://facebook.com' },
    { icon: '🎥', href: 'https://youtube.com' },
  ];

  const handleThemeToggle = () => {
    if (typeof setIsDarkTheme === 'function') {
      setIsDarkTheme(!isDarkTheme);
    } else {
      console.warn('setIsDarkTheme is not a function. Theme toggle disabled.');
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`relative w-full ${
        isDarkTheme ? 'bg-gray-900/95' : 'bg-gray-100/95'
      } border-t-2 border-red-500/50 backdrop-blur-md py-10 mt-16`}
    >
      <div className="absolute inset-0 opacity-15 bg-[url('/cyber-grid.png')] animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 via-blue-600/30 to-purple-600/30 animate-gradient-y"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('/cyber-particles.png')] animate-cyber-particles"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 animate-glow-border"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkTheme ? 'text-gray-100' : 'text-gray-800'
              } bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 animate-glitch-slow`}
            >
              CyberSmith’s Arena
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ 
                    x: 8, 
                    color: '#EF4444',
                    textShadow: '0 0 10px rgba(239,68,68,0.8)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-sm cursor-pointer ${
                    isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                  } hover:text-red-500 transition-all duration-300`}
                  onClick={() => router.push(link.path)}
                >
                  {link.name}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkTheme ? 'text-gray-100' : 'text-gray-800'
              } bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 animate-glitch-slow`}
            >
              Join the CyberGrid
            </h3>
            <p className={`text-sm mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              Plug into exclusive updates, challenges, and cybernetic rewards.
            </p>
            <NewsletterForm isDarkTheme={isDarkTheme} />
          </div>

          {/* Social Media & Theme Toggle */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkTheme ? 'text-gray-100' : 'text-gray-800'
              } bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 animate-glitch-slow`}
            >
              Connect to the Matrix
            </h3>
            <div className="flex space-x-6 mb-6">
              {socialIcons.map((social, index) => (
                <SocialIcon
                  key={index}
                  icon={social.icon}
                  href={social.href}
                  isDarkTheme={isDarkTheme}
                />
              ))}
            </div>
            <motion.button
              onClick={handleThemeToggle}
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(239,68,68,0.7)' }}
              whileTap={{ scale: 0.95 }}
              disabled={typeof setIsDarkTheme !== 'function'}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                typeof setIsDarkTheme !== 'function'
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  : isDarkTheme
                  ? 'bg-gray-900 text-yellow-400'
                  : 'bg-gray-200 text-gray-800'
              } shadow-neon animate-pulse-slow`}
            >
              {isDarkTheme ? 'Light Mode 🌞' : 'Dark Mode 🌙'}
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-4 border-t border-red-500/40 text-center">
          <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} animate-glitch-slow`}>
            &copy; {new Date().getFullYear()} CyberSmith’s Arena. Powered by xAI.
          </p>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx global>{`
        @keyframes gradient-y {
          0% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
          100% {
            background-position: 50% 0%;
          }
        }
        .animate-gradient-y {
          background-size: 100% 300%;
          animation: gradient-y 12s ease infinite;
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
        @keyframes cyber-particles {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 150px 150px;
          }
        }
        .animate-cyber-particles {
          background: url('/cyber-particles.png') repeat;
          animation: cyber-particles 25s linear infinite;
        }
        @keyframes glow-border {
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
        .animate-glow-border {
          background-size: 300%;
          animation: glow-border 6s ease infinite;
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
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
      `}</style>
    </motion.footer>
  );
}