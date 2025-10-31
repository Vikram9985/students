import React, { useState } from 'react';
import { useData } from '../DataContext';

export default function Registrations() {
  const { offerings, courses, courseTypes, registerStudent, listRegistrations } = useData();
  const [offeringId, setOfferingId] = useState(offerings[0]?.id || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function labelFor(o) {
    const c = courses.find((x) => x.id === o.courseId);
    const t = courseTypes.find((x) => x.id === o.courseTypeId);
    return `${t ? t.name : 'Type'} - ${c ? c.name : 'Course'}`;
  }

  function onRegister(e) {
    e.preventDefault();
    setError('');
    try {
      registerStudent(Number(offeringId), { name, email });
      setName('');
      setEmail('');
    } catch (err) {
      setError(err.message);
    }
  }

  const regs = listRegistrations(Number(offeringId));

  return (
    <div>
      <div className="card">
        <h3>Register Student</h3>
        <form className="form-row" onSubmit={onRegister}>
          <select value={offeringId} onChange={(e) => setOfferingId(e.target.value)}>
            {offerings.map((o) => (
              <option key={o.id} value={o.id}>{labelFor(o)}</option>
            ))}
          </select>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <button className="button small" type="submit">Register</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="card">
        <h4>Registered Students for Selected Offering</h4>
        <div>
          {regs.length === 0 ? (
            <div className="muted">No registrations yet.</div>
          ) : (
            regs.map((r) => (
              <div key={r.id} className="list-item">
                <div>
                  <strong>{r.name}</strong>
                  <div style={{fontSize:'0.9rem',color:'#6b7280'}}>{r.email}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
