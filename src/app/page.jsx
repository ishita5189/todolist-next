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
  };

  let renderTask = <h2 className="text-center text-lg">No tasks available</h2>;
  if (mainTask.length > 0) {
    renderTask = (
      <ul>
        {mainTask.map((t, i) => (
          <li key={i} className={`flex flex-col mb-4 ${t.completed ? 'bg-gray-200' : ''}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 w-full">
              <div className="flex flex-col sm:w-2/3">
                <h5 className={`text-lg sm:text-xl font-medium ${t.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{t.title}</h5>
                <p className={`text-sm sm:text-base font-light ${t.completed ? 'line-through text-gray-500' : 'text-gray-600'}`}>{t.desc}</p>
                <p className="text-xs text-gray-500">Date: {t.date} Time: {t.time}</p>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => editHandler(i)}
                  className="bg-blue-400 text-white px-3 py-1 rounded text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(i)}
                  className="bg-red-400 text-white px-3 py-1 rounded text-sm font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => markAsDoneHandler(i)}
                  className={`px-3 py-1 rounded text-sm font-medium ${t.completed ? 'bg-gray-400' : 'bg-green-400'} text-white`}
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <MotivationalQuoteButton />
      <div className="p-4 sm:p-6 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800">TodoList for Today</h1>
        <form onSubmit={submitHandler} className="mt-4">
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              className="w-full text-base border-gray-300 border px-3 py-2 rounded"
              placeholder="Enter a task here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="w-full text-base border-gray-300 border px-3 py-2 rounded"
              placeholder="Enter description here"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button className="w-full bg-gray-800 text-white px-4 py-2 text-base font-medium rounded mt-4">
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
        </form>
        <hr className="my-4" />
        <div className="p-2 bg-gray-100">{renderTask}</div>
      </div>
    </div>
  );
};

export default Page;
