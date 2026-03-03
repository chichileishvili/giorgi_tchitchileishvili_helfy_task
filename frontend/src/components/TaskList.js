import { useRef, useEffect, useState, useCallback } from 'react';
import '../styles/TaskList.css';
import TaskItem from './TaskItem';

const CARD_WIDTH = 320;
const GAP = 16;

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animRef = useRef(null);
  const speedRef = useRef(0.5);

  const totalWidth = tasks.length * (CARD_WIDTH + GAP);

  const animate = useCallback(() => {
    if (tasks.length <= 1) return;
    setOffset((prev) => {
      const next = prev - speedRef.current;
      if (Math.abs(next) >= totalWidth) return 0;
      return next;
    });
    animRef.current = requestAnimationFrame(animate);
  }, [tasks.length, totalWidth]);

  useEffect(() => {
    if (!isPaused && tasks.length > 1) {
      animRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPaused, animate, tasks.length]);

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Create one to get started!</p>
      </div>
    );
  }

  const displayTasks =
    tasks.length > 1 ? [...tasks, ...tasks, ...tasks] : tasks;

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="fade-left" />
      <div className="fade-right" />
      <div className="track" style={{ transform: `translateX(${offset}px)` }}>
        {displayTasks.map((task, i) => (
          <div className="card-slot" key={`${task.id}-${i}`}>
            <TaskItem
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
