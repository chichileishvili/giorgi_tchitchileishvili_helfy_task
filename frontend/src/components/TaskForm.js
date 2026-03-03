import { useState } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [dueDate, setDueDate] = useState(initialData.dueDate || '');
  const [priority, setPriority] = useState(initialData.priority || 'medium');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }
    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(dueDate) < today) {
        newErrors.dueDate = 'Due date cannot be in the past.';
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit({ title, description, dueDate, priority });
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="form-label" htmlFor="task-title">
          Title <span className="form-required">*</span>
        </label>
        <input
          id="task-title"
          className={`form-input${errors.title ? ' form-input--error' : ''}`}
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
          }}
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="task-description">
          Description
        </label>
        <textarea
          id="task-description"
          className="form-textarea"
          placeholder="Enter task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="task-due-date">
          Due Date
        </label>
        <input
          id="task-due-date"
          className={`form-input${errors.dueDate ? ' form-input--error' : ''}`}
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: '' }));
          }}
        />
        {errors.dueDate && <span className="form-error">{errors.dueDate}</span>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="task-priority">
          Priority
        </label>
        <select
          id="task-priority"
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button className="form-button" type="submit">
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
