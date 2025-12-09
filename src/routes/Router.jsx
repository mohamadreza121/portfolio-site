import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Project1 from '../pages/Project1';
import Project2 from '../pages/Project2';
import Project3 from '../pages/Project3';
import Project4 from '../pages/Project4';
import Project5 from '../pages/Project5';
import Project6 from '../pages/Project6';

export default function Router(){
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/projects/1" element={<Project1 />} />
      <Route path="/projects/2" element={<Project2 />} />
      <Route path="/projects/3" element={<Project3 />} />
      <Route path="/projects/4" element={<Project4 />} />
      <Route path="/projects/5" element={<Project5 />} />
      <Route path="/projects/6" element={<Project6 />} />
    </Routes>
  );
}
