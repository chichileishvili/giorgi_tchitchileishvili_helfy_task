import './App.css';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import useTasks from './hooks/useTasks';
import TaskItem from './components/TaskItem';

function App() {
  const {
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
  } = useTasks();

  return (
    <div className="page-wrapper">
      <Navbar
        onCreateClick={() => setIsFormOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main">
        <TaskList
          tasks={carouselTasks}
          onToggle={handleToggleTask}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
          draggable={sortBy === 'none'}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      </main>

      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">New Task</h2>
              <button
                className="close-button"
                onClick={() => setIsFormOpen(false)}
              >
                ✕
              </button>
            </div>
            <TaskForm onSubmit={handleCreateSubmit} />
          </div>
        </div>
      )}

      {editingTask && (
        <div className="modal-overlay" onClick={() => setEditingTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Edit Task</h2>
              <button
                className="close-button"
                onClick={() => setEditingTask(null)}
              >
                ✕
              </button>
            </div>
            <TaskForm onSubmit={handleEditSubmit} initialData={editingTask} />
          </div>
        </div>
      )}

      <div className="all-tasks">
        <div className="all-tasks-header">
          <h2>All Tasks</h2>
          <div className="all-tasks-controls">
            <TaskFilter filter={filter} onChange={setFilter} />
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="none">Sort: Default</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="priority-asc">Priority Low-High</option>
              <option value="priority-desc">Priority High-Low</option>
              <option value="date-asc"> Oldest first</option>
              <option value="date-desc"> Newest first</option>
            </select>
            <input
              className="search-input"
              type="text"
              placeholder="Type 3 letters to search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
              draggable={sortBy === 'none'}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
            />
          ))}
          {filteredTasks.length === 0 && (
            <p className="no-results">
              {searchQuery.length >= 3
                ? 'No tasks match your search.'
                : 'No tasks here yet.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
