import React, { useState } from 'react';
import './App.css';
import { DataProvider } from './DataContext';
import Header from './components/Header';
import CourseTypes from './components/CourseTypes';
import Courses from './components/Courses';
import Offerings from './components/Offerings';
import Registrations from './components/Registrations';

function App() {
  const [view, setView] = useState('offerings');

  return (
    <DataProvider>
      <div className="app-root">
        <Header view={view} setView={setView} />
        <main className="app-main">
          {view === 'types' && <CourseTypes />}
          {view === 'courses' && <Courses />}
          {view === 'offerings' && <Offerings />}
          {view === 'registrations' && <Registrations />}
        </main>
      </div>
    </DataProvider>
  );
}

export default App;
