import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Users from "./components/BrowseSkills";
import Dashboard from "./components/Dashboard";
import AddVideo from "./components/AddVideo";
import BrowseSkills from "./components/BrowseSkills";
import VideoDetail  from "./components/VideoDetail";
import "./App.css";
function App() { 
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/browse" element={<BrowseSkills/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-video" element={<AddVideo />}/>
        <Route path ="/video/:id" element={<VideoDetail/>}/>
      </Routes>

    </Router>
  );
}

export default App;