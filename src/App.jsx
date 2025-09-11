// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskDashboard from './components/TaskDashboard';
import './index.css';
import { ThemeProvider } from './context/ThemeProvider';
import About from './components/About';
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
// Auth provider is applied in main.jsx

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-[100dvh] bg-[#ECEEDF] dark:bg-gray-900 transition-colors flex flex-col">
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="pt-16 flex-1 min-h-0">
            <Routes>
              <Route path="/" element={<TaskDashboard searchQuery={searchQuery} />} />
              <Route path="/dashboard" element={<TaskDashboard searchQuery={searchQuery} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
