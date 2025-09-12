import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckSquare, Plus, Search, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const Navbar = ({ darkMode, toggleDarkMode, searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-eastern-blue/20 dark:border-saddle transition-colors bg-gradient-to-r from-eastern-blue to-kimberly dark:from-saddle dark:to-black"
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity shrink-0">
            <CheckSquare className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white font-heading drop-shadow-sm">Todo Manager</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link
              to="/dashboard"
              className={`text-sm font-medium text-white/90 hover:text-white transition-colors ${
                location.pathname === '/dashboard' ? 'text-white' : ''
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className={`text-sm font-medium text-white/90 hover:text-white transition-colors ${
                location.pathname === '/' ? 'text-white' : ''
              }`}
            >
              Tasks
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium text-white/90 hover:text-white transition-colors ${
                location.pathname === '/about' ? 'text-white' : ''
              }`}
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
            <div className="hidden sm:flex items-center bg-white/15 backdrop-blur rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-white/80 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="bg-transparent placeholder-white/70 text-sm outline-none w-32 lg:w-56 text-white"
              />
            </div>
            {session ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="px-3 py-2 rounded-lg text-sm font-medium bg-white/15 text-white/90">
                  {session.user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-block px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white/90 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;