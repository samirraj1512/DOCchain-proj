import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './HomePage.js'; // Your existing page
import BuildingAccess from './BuildingAccess.js'
import Voting from './VotingPage.js'
import Docker from './DockerPage.js'
import AboutUs from './AboutUs.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/access" element={<BuildingAccess />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/voting" element={<Voting/>} />
        <Route path="/docker" element={<Docker/>} />
      </Routes>
    </Router>
  //   <MediaRenderer
  //   src="ipfs://Qmf5YGuNwboATBj5fvexmEaZzGAGLBfENfCmfuVZ3oKV7j/System%20Software%20An%20Introduction%20To%20Systems%20Programming%20by%20Leland%20L.%20Beck%20(z-lib.org).pdf"
  //   alt="A red circle"
  // />
       
  );
}

export default App;