import React, { useState } from 'react';
import { useData } from '../DataContext';

export default function Offerings() {
  const {
    offerings,
    courses,
    courseTypes,
    createOffering,
    updateOffering,
    deleteOffering,
  } = useData();

  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [courseTypeId, setCourseTypeId] = useState(courseTypes[0]?.id || '');
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [filterType, setFilterType] = useState('');

  function onAdd(e) {
    e.preventDefault();
    setError('');
    try {
      createOffering(Number(courseId), Number(courseTypeId));
    } catch (err) {
      setError(err.message);
    }
  }

  function onSaveEdit(id) {
    setError('');
    try {
      const { courseId: cId, courseTypeId: tId } = editing;
      updateOffering(id, Number(cId), Number(tId));
      setEditing(null);
    } catch (err) {
      setError(err.message);
    }
  }

  function labelFor(o) {
    const c = courses.find((x) => x.id === o.courseId);
    const t = courseTypes.find((x) => x.id === o.courseTypeId);
    return `${t ? t.name : 'Type'} - ${c ? c.name : 'Course'}`;
  }

  const visible = filterType ? offerings.filter((o) => o.courseTypeId === Number(filterType)) : offerings;

  return (
    <div>
      <div className="card">
        <h3>Create Course Offering</h3>
        <form className="form-row" onSubmit={onAdd}>
          <select value={courseTypeId} onChange={(e) => setCourseTypeId(e.target.value)}>
            {courseTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button className="button small" type="submit">Create</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="card">
        <h4>Filter Offerings</h4>
        <div className="form-row">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All</option>
            {courseTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card">
        <h4>Offerings</h4>
        <div>
          {visible.map((o) => (
            <div key={o.id} className="list-item">
              <div>{labelFor(o)}</div>
              <div className="item-actions">
                <button className="small" onClick={() => setEditing({ ...o })}>Edit</button>
                <button className="small" onClick={() => deleteOffering(o.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="card">
          <h4>Edit Offering</h4>
          <div className="form-row">
            <select value={editing.courseTypeId} onChange={(e) => setEditing((s) => ({ ...s, courseTypeId: Number(e.target.value) }))}>
              {courseTypes.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <select value={editing.courseId} onChange={(e) => setEditing((s) => ({ ...s, courseId: Number(e.target.value) }))}>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <button className="button small" onClick={() => onSaveEdit(editing.id)}>Save</button>
            <button className="small" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
