import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.scss';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          Bob's Garage
        </Link>

        <ul className="navbar__menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>

          {isAuthenticated() && (
            <li>
              <Link to="/saved-items">Saved Items</Link>
            </li>
          )}

          {isAdmin() && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>

        <div className="navbar__actions">
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {isAuthenticated() ? (
            <div className="navbar__user">
              <span className="navbar__user-name">{user?.name}</span>
              <button onClick={handleLogout} className="navbar__logout">
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar__auth">
              <Link to="/login" className="navbar__login">
                Login
              </Link>
              <Link to="/register" className="navbar__register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

