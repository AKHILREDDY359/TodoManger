import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Target, Users, Zap, Shield, Clock } from 'lucide-react';
import reactLogo from '../assets/react.svg';

const About = () => {
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

  const stats = [
    { label: 'Tasks Completed', value: '10,000+' },
    { label: 'Active Users', value: '2,500+' },
    { label: 'Projects Managed', value: '5,000+' },
    { label: 'Time Saved', value: '50,000hrs' }
  ];

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
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          TaskFlow is a modern task management solution designed to help individuals and teams 
          organize, prioritize, and complete their work efficiently. Built with cutting-edge 
          technology and user-centric design principles.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat) => (
          <motion.div key={stat.label} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
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
              className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl border border-orange-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="bg-orange-600 dark:bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of users who have transformed their productivity with TaskFlow. 
          Start organizing your tasks today and experience the difference.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Start Your Journey
        </motion.button>
      </div>
    </div>
  );
};

export default About;
