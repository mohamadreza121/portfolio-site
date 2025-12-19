import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Project1 from '../pages/Project1';
import Project2 from '../pages/Project2';
import Project3 from '../pages/Project3';
import Project4 from '../pages/Project4';
import Project5 from '../pages/Project5';
import Project6 from '../pages/Project6';

export default function Router({ theme, toggleTheme, active, setActive }) {
  return (
    <Routes>
      {/* Pass theme + toggleTheme down to Main */}
      <Route
        path="/"
        element={<Main theme={theme} toggleTheme={toggleTheme} active={active} setActive={setActive}/>}
      />

      {/* If your project pages need theme awareness, pass it here too */}
      <Route path="/projects/1" element={<Project1 theme={theme} />} />
      <Route path="/projects/2" element={<Project2 theme={theme} />} />
      <Route path="/projects/3" element={<Project3 theme={theme} />} />
      <Route path="/projects/4" element={<Project4 theme={theme} />} />
      <Route path="/projects/5" element={<Project5 theme={theme} />} />
      <Route path="/projects/6" element={<Project6 theme={theme} />} />
    </Routes>
  );
}
