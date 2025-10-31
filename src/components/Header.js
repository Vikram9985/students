import React from 'react';

export default function Header({ view, setView }) {
  return (
    <header className="header">
      <h1>Student Registration</h1>
      <nav className="nav" aria-label="Main navigation">
        <button
          className={view === 'offerings' ? 'active' : ''}
          onClick={() => setView('offerings')}
        >
          Offerings
        </button>
        <button
          className={view === 'types' ? 'active' : ''}
          onClick={() => setView('types')}
        >
          Course Types
        </button>
        <button
          className={view === 'courses' ? 'active' : ''}
          onClick={() => setView('courses')}
        >
          Courses
        </button>
        <button
          className={view === 'registrations' ? 'active' : ''}
          onClick={() => setView('registrations')}
        >
          Registrations
        </button>
      </nav>
    </header>
  );
}
