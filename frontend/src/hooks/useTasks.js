import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useTaskServices from '../services/taskService';

const PRIORITY_ORDER = { high: 3, medium: 2, low: 1 };

const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('none');

  const {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  } = useTaskServices();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, [fetchTasks]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = useCallback(
    async (taskData) => {
      try {
        const newTask = await createTask(taskData);
        setTasks((prev) => [...prev, newTask]);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
    [createTask]
  );

  const handleDeleteTask = useCallback(
    async (taskId) => {
      try {
        await deleteTask(taskId);
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    [deleteTask]
  );

  const handleToggleTask = useCallback(
    async (taskId) => {
      try {
        const updatedTask = await toggleTaskCompletion(taskId);
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? updatedTask : t))
        );
      } catch (error) {
        console.error('Error toggling task:', error);
      }
    },
    [toggleTaskCompletion]
  );

  const handleEditTask = useCallback(
    async (taskId, updates) => {
      try {
        const updatedTask = await updateTask(taskId, updates);
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? updatedTask : t))
        );
      } catch (error) {
        console.error('Error editing task:', error);
      }
    },
    [updateTask]
  );

  const reorderTasks = useCallback((fromId, toId) => {
    setTasks((prev) => {
      const list = [...prev];
      const fromIdx = list.findIndex((t) => t.id === fromId);
      const toIdx = list.findIndex((t) => t.id === toId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      return list;
    });
  }, []);

  const carouselTasks = tasks;

  const filteredTasks = useMemo(() => {
    let list = tasks;
    if (filter === 'completed') list = list.filter((t) => t.completed);
    if (filter === 'pending') list = list.filter((t) => !t.completed);
    if (searchQuery.length >= 3) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description || '').toLowerCase().includes(q)
      );
    }
    if (sortBy !== 'none') {
      const [field, dir] = sortBy.split('-');
      list = [...list].sort((a, b) => {
        let cmp = 0;
        if (field === 'title') cmp = a.title.localeCompare(b.title);
        if (field === 'priority')
          cmp = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
        if (field === 'date')
          cmp = new Date(a.createdAt) - new Date(b.createdAt);
        return dir === 'asc' ? cmp : -cmp;
      });
    }
    return list;
  }, [tasks, filter, searchQuery, sortBy]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleCreateSubmit = async (taskData) => {
    await handleCreateTask(taskData);
    setIsFormOpen(false);
  };

  const handleEditSubmit = async (taskData) => {
    await handleEditTask(editingTask.id, taskData);
    setEditingTask(null);
  };

  const dragId = useRef(null);

  const handleDragStart = (id) => {
    dragId.current = id;
  };

  const handleDrop = (targetId) => {
    if (dragId.current === null || dragId.current === targetId) return;
    reorderTasks(dragId.current, targetId);
    dragId.current = null;
  };

  return {
    filteredTasks,
    carouselTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    handleDeleteTask,
    handleToggleTask,
    isFormOpen,
    setIsFormOpen,
    editingTask,
    setEditingTask,
    theme,
    toggleTheme,
    handleCreateSubmit,
    handleEditSubmit,
    handleDragStart,
    handleDrop,
  };
};

export default useTasks;
