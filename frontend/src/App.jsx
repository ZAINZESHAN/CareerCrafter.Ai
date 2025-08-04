import { Routes, Route } from 'react-router-dom';
import Login from '../src/pages/Login';
import SignUp from '../src/pages/SignUp';
import Profile from '../src/pages/Profile';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Dashboard from '../src/pages/Dashboard';
import GoalAnalysis from '../src/pages/GoalAnalysis';
import JobMatching from '../src/pages/JobMatching';
import MockInterview from '../src/pages/MockInterview';
import ResumeBuilder from '../src/pages/ResumeBuilder';
import SkillTracker from '../src/pages/SkillTracker';
import About from '../src/pages/About';
import Contact from '../src/pages/Contact';
import NotFound from '../src/pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import NeedHelp from './components/NeedHelp';

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
      <NeedHelp />
      <Footer />
    </div>
  );
}

export default App;
