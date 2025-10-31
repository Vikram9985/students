import React, { useState } from 'react';
import { useData } from '../DataContext';

export default function CourseTypes() {
  const { courseTypes, createCourseType, updateCourseType, deleteCourseType } = useData();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState('');

  function onAdd(e) {
    e.preventDefault();
    setError('');
    try {
      createCourseType(name);
      setName('');
    } catch (err) {
      setError(err.message);
    }
  }

  function onSaveEdit(id) {
    setError('');
    try {
      updateCourseType(id, editName);
      setEditing(null);
      setEditName('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="card">
        <h3>Manage Course Types</h3>
        <form className="form-row" onSubmit={onAdd}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New course type" />
          <button className="button small" type="submit">Add</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="card">
        <h4>Existing Types</h4>
        <div>
          {courseTypes.map((t) => (
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
                    <button className="small" onClick={() => deleteCourseType(t.id)}>Delete</button>
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
