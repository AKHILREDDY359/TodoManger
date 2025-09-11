import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Edit, Trash2, Clock, Flag } from 'lucide-react';
import Button from './Button';

const TaskCard = ({ task, index, onEdit, onDelete, onStatusChange }) => {
  const priorityColors = {
    high: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
    low: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700'
  };

  const statusColors = {
    'todo': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    'in-progress': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
    'completed': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'completed';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-orange-50 dark:bg-gray-800 rounded-xl shadow-sm border border-orange-200 dark:border-gray-700 p-6 hover:shadow-md transition-all hover:border-orange-300 dark:hover:border-gray-600"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-heading mb-2">{task.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm font-body line-clamp-2">{task.description}</p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
          <Flag className="h-3 w-3 mr-1" />
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-1" />
          <span className={isOverdue() ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
            {formatDate(task.dueDate)}
          </span>
          {isOverdue() && <Clock className="h-4 w-4 ml-1 text-red-600 dark:text-red-400" />}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {task.category}
        </span>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 ${statusColors[task.status]}`}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {task.status === 'completed' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg"
        >
          <p className="text-sm text-green-800 dark:text-green-300 font-medium">✓ Task completed successfully!</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskCard;