import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Calendar, Flag, Tag, CheckCircle, Clock, Circle } from 'lucide-react';
import Button from './Button';

const TaskCard = ({ task, index, onEdit, onDelete, onStatusChange }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'in-progress':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'todo':
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'todo':
        return <Circle className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return `${dateStr} at ${timeStr}`;
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today && task.status !== 'completed';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            title="Edit task"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Status and Priority */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {getStatusIcon(task.status)}
            <span className="ml-1 capitalize">{task.status.replace('-', ' ')}</span>
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            <Flag className="h-3 w-3 mr-1" />
            <span className="capitalize">{task.priority}</span>
          </span>
        </div>
      </div>

      {/* Category and Due Date/Time */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          {task.category && (
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{task.category}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span className={isOverdue(task.dueDate) ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
              {formatDateTime(task.dueDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Status Change Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <Button
            onClick={() => onStatusChange(task.id, 'todo')}
            className={`flex-1 text-xs py-2 px-3 font-semibold shadow-md hover:shadow-lg transition-all duration-200 ${
              task.status === 'todo'
                ? 'bg-orange-300 dark:bg-orange-500 text-orange-800 dark:text-orange-100 border border-orange-400 dark:border-orange-600 opacity-90'
                : 'bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700 border border-orange-600 dark:border-orange-700'
            }`}
          >
            {task.status === 'todo' ? 'Added to To Do' : 'Mark as To Do'}
          </Button>
          <Button
            onClick={() => onStatusChange(task.id, 'in-progress')}
            className={`flex-1 text-xs py-2 px-3 font-semibold shadow-md hover:shadow-lg transition-all duration-200 ${
              task.status === 'in-progress'
                ? 'bg-blue-300 dark:bg-blue-500 text-blue-700 dark:text-blue-200 border border-blue-400 dark:border-blue-600 opacity-75'
                : 'bg-blue-400 dark:bg-blue-600 text-white hover:bg-blue-500 dark:hover:bg-blue-700 border border-blue-500 dark:border-blue-700'
            }`}
          >
            {task.status === 'in-progress' ? 'Added to In Progress' : 'Mark as In Progress'}
          </Button>
          <Button
            onClick={() => onStatusChange(task.id, 'completed')}
            className={`flex-1 text-xs py-2 px-3 font-semibold shadow-md hover:shadow-lg transition-all duration-200 ${
              task.status === 'completed'
                ? 'bg-green-300 dark:bg-green-500 text-green-700 dark:text-green-200 border border-green-400 dark:border-green-600 opacity-75'
                : 'bg-green-400 dark:bg-green-600 text-white hover:bg-green-500 dark:hover:bg-green-700 border border-green-500 dark:border-green-700'
            }`}
          >
            {task.status === 'completed' ? 'Added to Complete' : 'Mark as Complete'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;