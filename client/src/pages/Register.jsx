import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.scss';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register({ name, email, password });

    if (result.success) {
      // Redirect based on user role
      if (isAdmin()) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__card">
          <h1 className="register__title">Register</h1>
          <p className="register__subtitle">Create your account</p>

          {error && <div className="register__error">{error}</div>}

          <form onSubmit={handleSubmit} className="register__form">
            <div className="register__field">
              <label htmlFor="name" className="register__label">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="register__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={100}
                placeholder="Enter your name"
              />
            </div>

            <div className="register__field">
              <label htmlFor="email" className="register__label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="register__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="register__field">
              <label htmlFor="password" className="register__label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="register__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Enter your password (min 6 characters)"
              />
            </div>

            <button
              type="submit"
              className="register__button"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="register__footer">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

