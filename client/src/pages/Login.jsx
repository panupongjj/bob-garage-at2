import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login({ email, password });

    if (result.success) {
      // Redirect based on user role
      if (isAdmin()) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__card">
          <h1 className="login__title">Login</h1>
          <p className="login__subtitle">Welcome back to Bob's Garage</p>

          {error && <div className="login__error">{error}</div>}

          <form onSubmit={handleSubmit} className="login__form">
            <div className="login__field">
              <label htmlFor="email" className="login__label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="login__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="login__field">
              <label htmlFor="password" className="login__label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="login__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="login__button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="login__footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

