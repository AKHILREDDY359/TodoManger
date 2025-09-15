import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Target, Users, Zap, Shield, Clock } from 'lucide-react';
import reactLogo from '../assets/react.svg';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const About = () => {
  const { session } = useAuth();
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    activeUsers: 0,
    projectsManaged: 0,
    timeSaved: 0
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedStats, setAnimatedStats] = useState({
    tasksCompleted: 0,
    activeUsers: 0,
    projectsManaged: 0,
    timeSaved: 0
  });

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animate counters when stats change
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const stepDuration = duration / steps;

      Object.keys(stats).forEach(key => {
        const targetValue = stats[key];
        const startValue = animatedStats[key];
        const increment = (targetValue - startValue) / steps;
        
        let currentStep = 0;
        const counter = setInterval(() => {
          currentStep++;
          const newValue = Math.round(startValue + (increment * currentStep));
          
          setAnimatedStats(prev => ({
            ...prev,
            [key]: Math.min(newValue, targetValue)
          }));

          if (currentStep >= steps) {
            clearInterval(counter);
            setAnimatedStats(prev => ({
              ...prev,
              [key]: targetValue
            }));
          }
        }, stepDuration);
      });
    };

    // Only animate if stats have changed
    if (stats.tasksCompleted > 0 || stats.activeUsers > 0 || stats.projectsManaged > 0 || stats.timeSaved > 0) {
      animateCounters();
    }
  }, [stats]);

  // Fetch dynamic stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (session?.user?.id) {
          // Get user's completed tasks
          const { data: userTasks, error: userError } = await supabase
            .from('todos')
            .select('*')
            .eq('user_id', session.user.id);

          if (!userError && userTasks) {
            const completedTasks = userTasks.filter(task => task.status === 'completed').length;
            setStats(prev => ({
              ...prev,
              tasksCompleted: completedTasks
            }));
          }
        }

        // Get total users count (this would be a real query in production)
        const { data: allUsers, error: usersError } = await supabase
          .from('todos')
          .select('user_id')
          .not('user_id', 'is', null);

        if (!usersError && allUsers) {
          const uniqueUsers = new Set(allUsers.map(task => task.user_id)).size;
          setStats(prev => ({
            ...prev,
            activeUsers: uniqueUsers
          }));
        }

        // Get total projects (categories)
        const { data: allTasks, error: tasksError } = await supabase
          .from('todos')
          .select('category')
          .not('category', 'is', null);

        if (!tasksError && allTasks) {
          const uniqueCategories = new Set(allTasks.map(task => task.category)).size;
          setStats(prev => ({
            ...prev,
            projectsManaged: uniqueCategories
          }));
        }

        // Calculate time saved (estimate: 5 minutes per completed task)
        const { data: completedTasks, error: completedError } = await supabase
          .from('todos')
          .select('*')
          .eq('status', 'completed');

        if (!completedError && completedTasks) {
          const timeSaved = Math.round(completedTasks.length * 5 / 60); // Convert to hours
          setStats(prev => ({
            ...prev,
            timeSaved: timeSaved
          }));
        }

      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [session]);

  const features = [
    {
      type: 'image',
      icon: reactLogo,
      title: 'Built with React',
      description: 'A modern, fast, and reactive UI built with React and Vite for optimal performance.'
    },
    {
      type: 'icon',
      icon: Target,
      title: 'Priority Management',
      description: 'Organize tasks by priority levels with visual indicators to focus on what matters most.'
    },
    {
      type: 'icon',
      icon: Clock,
      title: 'Due Date Tracking',
      description: 'Never miss deadlines with smart due date reminders and overdue task highlighting.'
    },
    {
      type: 'icon',
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Instant task status updates and progress tracking for seamless workflow management.'
    },
    {
      type: 'icon',
      icon: Shield,
      title: 'Data Security',
      description: 'Your tasks are stored securely with local storage and privacy-first approach.'
    },
    {
      type: 'icon',
      icon: Users,
      title: 'User-Friendly',
      description: 'Intuitive interface designed for productivity with minimal learning curve.'
    },
    {
      type: 'icon',
      icon: CheckSquare,
      title: 'Task Categories',
      description: 'Organize tasks into custom categories for better project management.'
    }
  ];

  const statsData = [
    { label: 'Tasks Completed', value: animatedStats.tasksCompleted },
    { label: 'Active Users', value: animatedStats.activeUsers },
    { label: 'Projects Managed', value: animatedStats.projectsManaged },
    { label: 'Time Saved', value: `${animatedStats.timeSaved}hrs` }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About TaskFlow
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          TaskFlow is a modern task management solution designed to help individuals and teams 
          organize, prioritize, and complete their work efficiently. Built with cutting-edge 
          technology and user-centric design principles.
        </p>
        
        {/* Live Clock Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-block bg-gradient-to-r from-eastern-blue to-kimberly dark:from-saddle dark:to-twine rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <Clock className="h-8 w-8 text-white" />
            <div className="text-white">
              <div className="text-sm font-medium opacity-90">Current Time</div>
              <div className="text-2xl md:text-3xl font-bold font-mono">
                {formatTime(currentTime)}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {statsData.map((stat, index) => (
          <motion.div 
            key={stat.label} 
            className="text-center bg-white dark:bg-saddle p-6 rounded-xl border border-chardonnay dark:border-twine hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div 
              className="text-3xl md:text-4xl font-bold text-eastern-blue dark:text-chardonnay mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
            >
              <motion.span
                key={stat.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {stat.value}
              </motion.span>
            </motion.div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
            <motion.div
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-3"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
            >
              <motion.div
                className="bg-eastern-blue dark:bg-chardonnay h-1 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: index * 0.1 + 0.7, duration: 1.5 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-athens-gray dark:bg-saddle p-6 rounded-xl border border-chardonnay dark:border-twine hover:shadow-lg transition-shadow"
            >
              <div className="bg-eastern-blue dark:bg-twine w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.type === 'image' ? (
                  <img src={IconComponent} alt={feature.title} className="h-6 w-6" />
                ) : (
                  <IconComponent className="h-6 w-6 text-white" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-eastern-blue to-kimberly dark:from-saddle dark:to-twine rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Join our growing community of productive users. 
          Start organizing your tasks today and experience the difference.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-eastern-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Start Your Journey
        </motion.button>
      </div>
    </div>
  );
};

export default About;
