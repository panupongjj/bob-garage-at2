import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { ProtectedRoute } from './utils/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SavedItems from './pages/SavedItems';
import NotFound from './pages/NotFound';
import './styles/main.scss';
import './App.scss';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <UserProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="app__main">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/saved-items"
                    element={
                      <ProtectedRoute>
                        <SavedItems />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </UserProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

