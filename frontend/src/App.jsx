import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import GoalAnalysis from '../pages/GoalAnalysis';
import JobMatching from '../pages/JobMatching';
import MockInterview from '../pages/MockInterview';
import ResumeBuilder from '../pages/ResumeBuilder';
import SkillTracker from '../pages/SkillTracker';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]'>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goalanalysis" element={<GoalAnalysis />} />
          <Route path="/jobmatching" element={<JobMatching />} />
          <Route path="/resumebuilder" element={<ResumeBuilder />} />
          <Route path="/skilltracker" element={<SkillTracker />} />
          <Route path="/mockinterview" element={<MockInterview />} />
        </Routes>
      </div>
    );
}

export default App;
