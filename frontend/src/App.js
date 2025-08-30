import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Contributors from './components/Contributors';
import Footer from './components/Layout/Footer';
import EventCreation from './components/common/EventCreation';
import AboutPage from './components/AboutPage';
import EventsPage from './Pages/Events/EventsPage';
import HackathonPage from './Pages/Hackathons/HackathonPage';
import ProjectGallery from './components/ProjectGallery';
import ScrollToTopButton from './components/scrolltotopButton';
import NotFound from './components/NotFound';
import './App.css';

// Import Auth components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Unauthorized from './components/auth/Unauthorized';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Import Dashboard components
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import HomePage from './Pages/Home/HomePage';


function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />

          <main className='min-h-screen'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/hackathons" element={<HackathonPage />} />
              <Route path="/projects" element={<ProjectGallery />} />
              <Route path="/contributors" element={<Contributors />} />

              {/* Protected route for event creation */}
              <Route
                path="/create-event"
                element={
                  <ProtectedRoute requiredPermissions={['CREATE_EVENT']}>
                    <EventCreation />
                  </ProtectedRoute>
                }
              />

              {/* Dashboard routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="/about" element={<AboutPage />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>

          <ScrollToTopButton />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
