"use client";
import React, { useState, useEffect } from 'react';
import MotivationalQuoteButton from './MotivationalQuoteButton/page';

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setMainTask(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (mainTask.length > 0) {
      const allCompleted = mainTask.every(task => task.completed);
      setAllTasksCompleted(allCompleted);
    } else {
      setAllTasksCompleted(false); // Reset when there are no tasks
    }
  }, [mainTask]);

  useEffect(() => {
    if (allTasksCompleted) {
      alert("Congratulations! You've completed all your tasks!");
    }
  }, [allTasksCompleted]);

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return { date, time };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Title is required.");
      return;
    }

    const { date, time } = getCurrentDateTime();

    let updatedTasks;
    if (editIndex !== null) {
      updatedTasks = mainTask.map((task, index) => 
        index === editIndex ? { title, desc, date, time, completed: task.completed } : task
      );
      setEditIndex(null);
    } else {
      updatedTasks = [...mainTask, { title, desc, date, time, completed: false }];
    }

    setMainTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTitle("");
    setDesc("");
    setError("");
  };

  const deleteHandler = (i) => {
    const updatedTasks = mainTask.filter((_, index) => index !== i);
    setMainTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editHandler = (i) => {
    setTitle(mainTask[i].title);
    setDesc(mainTask[i].desc);
    setEditIndex(i);
  };

  const markAsDoneHandler = (i) => {
    const updatedTasks = mainTask.map((task, index) =>
      index === i ? { ...task, completed: !task.completed } : task
    );
    setMainTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save changes to local storage
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  let renderTask = <h2 className={`text-center text-lg ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>No tasks available</h2>;
  if (mainTask.length > 0) {
    renderTask = (
      <ul>
        {mainTask.map((t, i) => (
          <li key={i} className={`flex flex-col mb-4 ${t.completed ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : (darkMode ? 'bg-gray-800' : '')}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 w-full">
              <div className="flex flex-col sm:w-2/3">
                <h5 className={`text-lg sm:text-xl font-medium ${t.completed ? (darkMode ? 'line-through text-gray-500' : 'line-through text-gray-500') : (darkMode ? 'text-gray-300' : 'text-gray-800')}`}>{t.title}</h5>
                <p className={`text-sm sm:text-base font-light ${t.completed ? (darkMode ? 'line-through text-gray-500' : 'line-through text-gray-500') : (darkMode ? 'text-gray-400' : 'text-gray-600')}`}>{t.desc}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date: {t.date} Time: {t.time}</p>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => editHandler(i)}
                  className={`bg-blue-400 text-white px-3 py-1 rounded text-sm font-medium ${darkMode ? 'hover:bg-blue-500' : ''}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(i)}
                  className={`bg-red-400 text-white px-3 py-1 rounded text-sm font-medium ${darkMode ? 'hover:bg-red-500' : ''}`}
                >
                  Delete
                </button>
                <button
                  onClick={() => markAsDoneHandler(i)}
                  className={`px-3 py-1 rounded text-sm font-medium ${t.completed ? (darkMode ? 'bg-gray-600' : 'bg-gray-400') : (darkMode ? 'bg-green-600' : 'bg-green-400')} text-white`}
                >
                  {t.completed ? 'Undo' : 'Done'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`absolute top-4 left-4 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <button
          onClick={toggleDarkMode}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} shadow-md`}
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
      </div>
      <MotivationalQuoteButton />
      <div className={`p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded shadow-md w-full max-w-md`}>
        <h1 className={`text-center text-2xl sm:text-3xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>TodoList</h1>
        <form onSubmit={submitHandler} className="mt-4">
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              className={`w-full text-base border-gray-300 border px-3 py-2 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : ''}`}
              placeholder="Enter a task here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className={`w-full text-base border-gray-300 border px-3 py-2 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : ''}`}
              placeholder="Enter description here"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button className={`w-full px-4 py-2 text-base font-medium rounded mt-4 ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-800 text-white'}`}>
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
        </form>
        <hr className={`my-4 ${darkMode ? 'border-gray-600' : ''}`} />
        <div className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>{renderTask}</div>
      </div>
    </div>
  );
};

export default Page;
