import '../styles/TaskItem.css';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const TaskItem = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  draggable,
  onDragStart,
  onDrop,
}) => {
  const isTaskCompleted = task.completed;

  return (
    <div
      className={`task-card${isTaskCompleted ? ' completed' : ''}${draggable ? ' draggable' : ''}`}
      draggable={draggable}
      onDragStart={draggable ? () => onDragStart(task.id) : undefined}
      onDragOver={draggable ? (e) => e.preventDefault() : undefined}
      onDrop={
        draggable
          ? (e) => {
              e.preventDefault();
              onDrop(task.id);
            }
          : undefined
      }
    >
      <div className="top-row">
        <div className="task-info">
          <button
            className={`check-button${isTaskCompleted ? ' completed' : ''}`}
            onClick={() => onToggle(task.id)}
            aria-label="Toggle task"
          >
            {isTaskCompleted && <Check size={12} />}
          </button>

          <div className="text-content">
            <h3 className={`task-title${isTaskCompleted ? ' completed' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
          </div>
        </div>

        {task.priority && (
          <span className={`priority-badge ${task.priority}`}>
            {task.priority}
          </span>
        )}
      </div>

      <div className="bottom-row">
        <div className="dates-row">
          <span className="date-text">
            Created:{' '}
            {task.createdAt
              ? format(new Date(task.createdAt), 'MMM d, yyyy')
              : '—'}
          </span>
          {task.dueDate && (
            <span
              className={`date-text due-date${new Date(task.dueDate) < new Date() && !task.completed ? ' overdue' : ''}`}
            >
              Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </span>
          )}
        </div>

        <div className="action-buttons">
          <button
            className="icon-button edit-button"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
          >
            <Pencil size={14} />
          </button>
          <button
            className="icon-button delete-button"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
