import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Calendar, BarChart3 } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import Button from './Button';

const TaskDashboard = ({ searchQuery = '' }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design Homepage Layout', description: 'Create wireframes and mockups for the new homepage', priority: 'high', status: 'in-progress', dueDate: '2024-01-15', category: 'Design' },
    { id: 2, title: 'Implement User Authentication', description: 'Set up login and registration functionality', priority: 'high', status: 'todo', dueDate: '2024-01-20', category: 'Development' },
    { id: 3, title: 'Write Documentation', description: 'Create user guide and API documentation', priority: 'medium', status: 'todo', dueDate: '2024-01-25', category: 'Documentation' },
    { id: 4, title: 'Code Review Session', description: 'Review pull requests and provide feedback', priority: 'low', status: 'completed', dueDate: '2024-01-10', category: 'Review' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Schedule an update at the next midnight, then every 24h
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);
    const delay = nextMidnight.getTime() - Date.now();

    let intervalId;
    const timeoutId = window.setTimeout(() => {
      setNow(new Date());
      intervalId = window.setInterval(() => setNow(new Date()), 24 * 60 * 60 * 1000);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' ? true : task.status === filter;
    if (!matchesFilter) return false;
    if (!normalizedQuery) return true;
    const haystack = `${task.title} ${task.description} ${task.category}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length
  };

  const handleCreateTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: 'todo'
    };
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const handleUpdateTask = (taskData) => {
    setTasks(tasks.map(task =>
      task.id === editingTask.id ? { ...task, ...taskData } : task
    ));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-900 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-heading mb-2">Task Dashboard</h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-body">Manage and track your tasks efficiently</p>
        <div className="mt-8 flex items-center justify-center">
          <div className="relative w-full max-w-3xl">
            <img
              src="/hero-animated.svg"
              alt="Animated tasks calendar"
              className="w-full rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            />
            <div className="absolute inset-x-0 top-[23%] md:top-[22%] px-3 py-1 text-white text-sm md:text-base font-semibold tracking-wide text-center pointer-events-none">
              {now.toLocaleString('default', { month: 'long' })} {now.getDate()}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-orange-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{taskStats.total}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-orange-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{taskStats.completed}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-green-600 dark:bg-green-400 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-orange-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{taskStats.inProgress}</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-yellow-600 dark:bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-orange-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">To Do</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{taskStats.todo}</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <Button
          onClick={() => setShowForm(true)}
          className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Task
        </Button>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onEdit={(task) => setEditingTask(task)}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        ))}
      </motion.div>

      {filteredTasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
          <p className="text-gray-500 dark:text-gray-400">Create your first task to get started</p>
        </motion.div>
      )}

      {(showForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading mb-4">About TaskFlow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  Priority-based task organization
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  Real-time status tracking
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  Due date management
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  Category-based filtering
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Benefits</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                TaskFlow helps you stay organized and productive by providing a clean, intuitive interface for managing your daily tasks and long-term projects.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{taskStats.total}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.round((taskStats.completed / taskStats.total) * 100) || 0}%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
    </div>
  );
};

export default TaskDashboard;