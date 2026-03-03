import '../styles/TaskFilter.css';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
];

const TaskFilter = ({ filter, onChange }) => {
  return (
    <div className="task-filter">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`filter-btn${filter === f.value ? ' active' : ''}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
