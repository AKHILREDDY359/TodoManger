import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, Calendar, BarChart3 } from "lucide-react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import Button from "./Button";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const TaskDashboard = ({ searchQuery = "" }) => {
  const { session } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [now, setNow] = useState(new Date());

  const isAuthed = !!session;

  // Load tasks from Supabase
  useEffect(() => {
    const fetchTasks = async () => {
      if (!isAuthed) {
        // Not logged in → nothing to load; stop showing the loading state
        setTasks([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        const normalizedTasks = data.map((t) => ({
          ...t,
          dueDate: t.due_date, // convert for UI
        }));
        setTasks(normalizedTasks);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [session, isAuthed]);

  // Update clock every day at midnight
  useEffect(() => {
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);
    const delay = nextMidnight.getTime() - Date.now();

    let intervalId;
    const timeoutId = window.setTimeout(() => {
      setNow(new Date());
      intervalId = window.setInterval(
        () => setNow(new Date()),
        24 * 60 * 60 * 1000
      );
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  // Filtering
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" ? true : task.status === filter;
    if (!matchesFilter) return false;
    if (!normalizedQuery) return true;
    const haystack = `${task.title} ${task.description} ${task.category}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  // Stats (show zeros if not authed)
  const taskStats = isAuthed
    ? {
        total: tasks.length,
        completed: tasks.filter((t) => t.status === "completed").length,
        inProgress: tasks.filter((t) => t.status === "in-progress").length,
        todo: tasks.filter((t) => t.status === "todo").length,
      }
    : { total: 0, completed: 0, inProgress: 0, todo: 0 };

  // CRUD Handlers
  const handleCreateTask = async (taskData) => {
    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          status: "todo",
          due_date: taskData.dueDate,
          category: taskData.category,
          user_id: session.user.id,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding task:", error);
    } else {
      const newTask = { ...data[0], dueDate: data[0].due_date };
      setTasks([...tasks, newTask]);
      setShowForm(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    const { data, error } = await supabase
      .from("todos")
      .update({
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        status: taskData.status,
        due_date: taskData.dueDate,
        category: taskData.category,
      })
      .eq("id", editingTask.id)
      .select();

    if (error) {
      console.error("Error updating task:", error);
    } else {
      const updatedTask = { ...data[0], dueDate: data[0].due_date };
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const { error } = await supabase.from("todos").delete().eq("id", taskId);

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ status: newStatus })
      .eq("id", taskId)
      .select();

    if (error) {
      console.error("Error updating status:", error);
    } else {
      const updatedTask = { ...data[0], dueDate: data[0].due_date };
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Task Dashboard
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
          Manage and track your tasks efficiently
        </p>
        {/* Animated Banner */}
        <motion.div 
          className="mt-8 relative overflow-hidden rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-eastern-blue via-kimberly to-logan dark:from-saddle dark:via-twine dark:to-chardonnay p-8 md:p-12 text-white relative">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
              <div className="absolute bottom-6 left-12 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-full animate-pulse delay-1500"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-4"
              >
                <Calendar className="h-12 w-12 mx-auto mb-3 text-white/90" />
              </motion.div>
              
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold mb-2"
              >
                {now.toLocaleString("default", { month: "long" })} {now.getDate()}
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-lg md:text-xl text-white/90 font-medium"
              >
                {now.toLocaleString("default", { weekday: "long" })}
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-4 text-sm text-white/80"
              >
                {isAuthed ? `${taskStats.total} tasks • ${taskStats.completed} completed` : 'Login to start managing your tasks'}
              </motion.div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-6 right-6 text-white/20"
            >
              <Plus className="h-6 w-6" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-6 left-6 text-white/20"
            >
              <BarChart3 className="h-6 w-6" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-athens-gray dark:bg-saddle p-6 rounded-xl shadow-sm border border-chardonnay dark:border-twine"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Tasks
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {taskStats.total}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-eastern-blue dark:text-chardonnay" />
          </div>
        </motion.div>

        {/* Completed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-athens-gray dark:bg-saddle p-6 rounded-xl shadow-sm border border-chardonnay dark:border-twine"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Completed
              </p>
              <p className="text-2xl font-bold text-eastern-blue dark:text-chardonnay">
                {taskStats.completed}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-green-600 dark:bg-green-400 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* In Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-athens-gray dark:bg-saddle p-6 rounded-xl shadow-sm border border-chardonnay dark:border-twine"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                In Progress
              </p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {taskStats.inProgress}
              </p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-yellow-600 dark:bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* To Do */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-athens-gray dark:bg-saddle p-6 rounded-xl shadow-sm border border-chardonnay dark:border-twine"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                To Do
              </p>
              <p className="text-2xl font-bold text-eastern-blue dark:text-chardonnay">
                {taskStats.todo}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-eastern-blue dark:text-chardonnay" />
          </div>
        </motion.div>
      </div>

      {/* Filters + Add Task */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <Button
          onClick={() => isAuthed && setShowForm(true)}
          disabled={!isAuthed}
          className="bg-eastern-blue hover:bg-kimberly disabled:opacity-60 dark:bg-twine dark:hover:bg-saddle text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isAuthed ? 'Add New Task' : 'Login to add tasks'}
        </Button>
      </div>

      {/* Tasks Grid */}
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

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isAuthed ? 'No tasks found' : 'Welcome to Todo Manager'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {isAuthed ? 'Create your first task to get started' : 'Please login to view and manage your tasks'}
          </p>
        </motion.div>
      )}

      {/* Task Form */}
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

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          About TaskFlow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Features
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-eastern-blue rounded-full mr-3"></div>
                Priority-based task organization
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-eastern-blue rounded-full mr-3"></div>
                Real-time status tracking
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-eastern-blue rounded-full mr-3"></div>
                Due date management
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-eastern-blue rounded-full mr-3"></div>
                Category-based filtering
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Benefits
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              TaskFlow helps you stay organized and productive by providing a
              clean, intuitive interface for managing your daily tasks and
              long-term projects.
            </p>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-eastern-blue dark:text-chardonnay">
                  {taskStats.total}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Tasks
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-eastern-blue dark:text-chardonnay">
                  {Math.round((taskStats.completed / taskStats.total) * 100) ||
                    0}
                  %
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Completion Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskDashboard;
