import { Routes, Route } from 'react-router-dom';
import Login from '../src/pages/Login';
import SignUp from '../src/pages/SignUp';
import Profile from '../src/pages/Profile';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Dashboard from '../src/pages/Dashboard';
import GoalAnalysis from '../src/pages/GoalAnalysis';
import MockInterview from '../src/pages/MockInterview';
import ResumeBuilder from '../src/pages/ResumeBuilder';
import About from '../src/pages/About';
import Contact from '../src/pages/Contact';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import NeedHelp from './components/NeedHelp';
import ScrollTop from './components/ScrollTop';
import ProtectedRoute from './components/ProtectedRoute';
import Resume from './pages/Resume';
import Career from './pages/Career';

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]'>
      <ToastContainer />
      <ScrollTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/career/:careerId"
          element={
            <ProtectedRoute>
              <Career />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume/:resumeId"
          element={
            <ProtectedRoute>
              <Resume />
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
        <Route
          path="/goalanalysis"
          element={
            <ProtectedRoute>
              <GoalAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumebuilder"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mockinterview"
          element={
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <NeedHelp />
      <Footer />
    </div>
  );
}

export default App;
