import React, { useState } from 'react';
import { useData } from '../DataContext';

export default function Courses() {
  const { courses, createCourse, updateCourse, deleteCourse } = useData();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState('');

  function onAdd(e) {
    e.preventDefault();
    setError('');
    try {
      createCourse(name);
      setName('');
    } catch (err) {
      setError(err.message);
    }
  }

  function onSaveEdit(id) {
    setError('');
    try {
      updateCourse(id, editName);
      setEditing(null);
      setEditName('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="card">
        <h3>Manage Courses</h3>
        <form className="form-row" onSubmit={onAdd}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New course" />
          <button className="button small" type="submit">Add</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="card">
        <h4>Existing Courses</h4>
        <div>
          {courses.map((t) => (
            <div key={t.id} className="list-item">
              <div>
                {editing === t.id ? (
                  <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                ) : (
                  <strong>{t.name}</strong>
                )}
              </div>
              <div className="item-actions">
                {editing === t.id ? (
                  <>
                    <button className="button small" onClick={() => onSaveEdit(t.id)}>Save</button>
                    <button className="small" onClick={() => setEditing(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="small" onClick={() => { setEditing(t.id); setEditName(t.name); }}>Edit</button>
                    <button className="small" onClick={() => deleteCourse(t.id)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
