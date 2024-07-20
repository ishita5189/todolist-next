"use client";
import React, { useState, FormEvent, useEffect } from 'react';

interface Task {
  title: string;
  desc: string;
  date: string; // Added date
  time: string; // Added time
  completed: boolean; // Added completion status
}

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null); // State for the index of the task being edited

  useEffect(() => {
    // Load tasks from local storage when component mounts
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setMainTask(JSON.parse(savedTasks));
    }
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString(); // Format: MM/DD/YYYY
    const time = now.toLocaleTimeString(); // Format: HH:MM:SS AM/PM
    return { date, time };
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Title is required.");
      return;
    }

    const { date, time } = getCurrentDateTime();

    let updatedTasks: Task[];
    if (editIndex !== null) {
      // Edit existing task
      updatedTasks = mainTask.map((task, index) => 
        index === editIndex ? { title, desc, date, time, completed: task.completed } : task
      );
      setEditIndex(null); // Reset edit index
    } else {
      // Add new task
      updatedTasks = [...mainTask, { title, desc, date, time, completed: false }];
    }

    setMainTask(updatedTasks);

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTitle("");
    setDesc("");
    setError("");
  };

  const deleteHandler = (i: number) => {
    const updatedTasks = mainTask.filter((_, index) => index !== i);
    setMainTask(updatedTasks);

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editHandler = (i: number) => {
    setTitle(mainTask[i].title);
    setDesc(mainTask[i].desc);
    setEditIndex(i); // Set the index of the task being edited
  };

  const markAsDoneHandler = (i: number) => {
    const updatedTasks = mainTask.map((task, index) =>
      index === i ? { ...task, completed: !task.completed } : task
    );
    setMainTask(updatedTasks);

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 sm:p-8 bg-white rounded shadow-lg w-full max-w-xl">
        <h1 className="bg-slate-800 text-white p-5 text-3xl sm:text-5xl font-bold self-center text-center">TodoList for Today</h1>
        <form onSubmit={submitHandler} className="mt-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="w-full text-lg sm:text-2xl border-zinc-800 border-2 px-2 py-2 font-bold"
              placeholder="Enter a task here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="w-full text-lg sm:text-2xl border-zinc-800 border-2 px-2 py-2 font-italic"
              placeholder="Enter description here"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button className="w-full bg-black text-white px-4 py-3 text-lg sm:text-2xl font-bold rounded mt-4">
            {editIndex !== null ? "UPDATE TASK" : "ADD TASK"}
          </button>
        </form>
        <hr className="my-4" />
        <div className="p-2 sm:p-4 bg-slate-200">{renderTask}</div>
      </div>
    </div>
  );
};

export default Page;
