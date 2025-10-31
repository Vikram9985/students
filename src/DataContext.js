import React, { createContext, useContext, useState, useRef } from 'react';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const idRef = useRef(1);
  const nextId = () => idRef.current++;

  const [courseTypes, setCourseTypes] = useState([
    { id: 1, name: 'Individual' },
    { id: 2, name: 'Group' },
    { id: 3, name: 'Special' },
  ]);

  const [courses, setCourses] = useState([
    { id: 1, name: 'Hindi' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Urdu' },
  ]);

  const [offerings, setOfferings] = useState([
    { id: 1, courseId: 2, courseTypeId: 1 }, // Individual - English
    { id: 2, courseId: 1, courseTypeId: 2 }, // Group - Hindi
  ]);

  // registrations: { offeringId: number } -> array of { id, name, email }
  const [registrations, setRegistrations] = useState({});

  // Course Types CRUD
  function createCourseType(name) {
    name = name?.trim();
    if (!name) throw new Error('Name is required');
    if (courseTypes.some((c) => c.name.toLowerCase() === name.toLowerCase()))
      throw new Error('Course type already exists');
    const item = { id: nextId(), name };
    setCourseTypes((s) => [...s, item]);
    return item;
  }

  function updateCourseType(id, name) {
    name = name?.trim();
    if (!name) throw new Error('Name is required');
    setCourseTypes((s) => s.map((c) => (c.id === id ? { ...c, name } : c)));
  }

  function deleteCourseType(id) {
    // also remove offerings that reference this type
    setOfferings((s) => s.filter((o) => o.courseTypeId !== id));
    setCourseTypes((s) => s.filter((c) => c.id !== id));
  }

  // Courses CRUD
  function createCourse(name) {
    name = name?.trim();
    if (!name) throw new Error('Name is required');
    if (courses.some((c) => c.name.toLowerCase() === name.toLowerCase()))
      throw new Error('Course already exists');
    const item = { id: nextId(), name };
    setCourses((s) => [...s, item]);
    return item;
  }

  function updateCourse(id, name) {
    name = name?.trim();
    if (!name) throw new Error('Name is required');
    setCourses((s) => s.map((c) => (c.id === id ? { ...c, name } : c)));
  }

  function deleteCourse(id) {
    setOfferings((s) => s.filter((o) => o.courseId !== id));
    setCourses((s) => s.filter((c) => c.id !== id));
  }

  // Offerings CRUD
  function createOffering(courseId, courseTypeId) {
    if (!courseId || !courseTypeId) throw new Error('Course and type required');
    if (
      offerings.some(
        (o) => o.courseId === courseId && o.courseTypeId === courseTypeId
      )
    )
      throw new Error('Offering already exists');
    const item = { id: nextId(), courseId, courseTypeId };
    setOfferings((s) => [...s, item]);
    return item;
  }

  function updateOffering(id, courseId, courseTypeId) {
    setOfferings((s) => s.map((o) => (o.id === id ? { ...o, courseId, courseTypeId } : o)));
  }

  function deleteOffering(id) {
    setOfferings((s) => s.filter((o) => o.id !== id));
    setRegistrations((r) => {
      const copy = { ...r };
      delete copy[id];
      return copy;
    });
  }

  // Registrations
  function registerStudent(offeringId, { name, email }) {
    name = name?.trim();
    email = email?.trim();
    if (!name || !email) throw new Error('Name and email are required');
    setRegistrations((r) => {
      const list = r[offeringId] ? [...r[offeringId]] : [];
      const student = { id: nextId(), name, email };
      list.push(student);
      return { ...r, [offeringId]: list };
    });
  }

  function listRegistrations(offeringId) {
    return registrations[offeringId] || [];
  }

  return (
    <DataContext.Provider
      value={{
        courseTypes,
        courses,
        offerings,
        registrations,
        createCourseType,
        updateCourseType,
        deleteCourseType,
        createCourse,
        updateCourse,
        deleteCourse,
        createOffering,
        updateOffering,
        deleteOffering,
        registerStudent,
        listRegistrations,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

export default DataContext;
