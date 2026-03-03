import '../styles/Navbar.css';
import { CheckSquare, Plus, Moon, Sun } from 'lucide-react';

const Navbar = ({ onCreateClick, theme, onToggleTheme }) => {
  return (
    <nav className="nav">
      <div className="brand">
        <span className="brand-icon">
          <CheckSquare size={16} />
        </span>
        <span className="brand-name">TaskApp</span>
      </div>

      <div className="nav-actions">
        <button
          className="theme-button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <button className="create-button" onClick={onCreateClick}>
          <Plus size={16} />
          New Task
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
