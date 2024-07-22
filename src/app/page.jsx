"use client";
import React, { useState, useEffect } from 'react';
import MotivationalQuoteButton from './MotivationalQuoteButton/page';
import ProgressBar from './ProgressBar'; // Import path should be correct

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);

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
      setAllTasksCompleted(false);
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
  };

  const calculateProgress = () => {
    if (mainTask.length === 0) return 0;
    const completedTasks = mainTask.filter(task => task.completed).length;
    return (completedTasks / mainTask.length) * 100;
  };

  let renderTask = <h2 className="text-center text-xl">No task available</h2>;
  if (mainTask.length > 0) {
    renderTask = (
      <ul>
        {mainTask.map((t, i) => (
          <li key={i} className={`flex flex-col mb-8 ${t.completed ? 'bg-green-100' : ''}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 w-full">
              <div className="flex flex-col sm:w-2/3">
                <h5 className={`text-xl sm:text-2xl font-semibold ${t.completed ? 'line-through' : ''}`}>{t.title}</h5>
                <p className={`text-lg sm:text-xl font-italic ${t.completed ? 'line-through' : ''}`}>{t.desc}</p>
                <p className="text-sm text-gray-600">Date: {t.date} Time: {t.time}</p>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => editHandler(i)}
                  className="bg-blue-500 text-white px-4 py-2 shadow-md rounded font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(i)}
                  className="bg-red-500 text-white px-4 py-2 shadow-md rounded font-bold"
                >
                  Delete
                </button>
                <button
                  onClick={() => markAsDoneHandler(i)}
                  className={`px-4 py-2 shadow-md rounded font-bold ${t.completed ? 'bg-gray-500' : 'bg-green-500'} text-white`}
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
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <MotivationalQuoteButton />
      <div className="p-4 sm:p-8 bg-white rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="bg-gray-800 text-white p-5 text-2xl sm:text-4xl font-bold text-center rounded-t-md">Todo List for Today</h1>
        <form onSubmit={submitHandler} className="mt-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="w-full text-lg sm:text-xl border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors"
              placeholder="Enter a task here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="w-full text-lg sm:text-xl border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors"
              placeholder="Enter description here"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button className="w-full bg-gray-800 text-white px-4 py-2 text-lg sm:text-xl font-bold rounded mt-4 hover:bg-gray-700 transition-colors">
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
        </form>
        <hr className="my-4 border-gray-300" />
        <ProgressBar progress={calculateProgress()} />
        <div className="p-2 sm:p-4 bg-gray-100 mt-4">{renderTask}</div>
      </div>
    </div>
  );
};

export default Page;
