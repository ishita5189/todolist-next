## TO-DO List

This is a simple To-Do application built with Next JS. The app allows users to add, edit, delete, and mark tasks as completed. It also displays the date and time when each task was created or last edited. The tasks are stored in the browser's local storage, ensuring persistence across page reloads.

![To-Do App Screenshot](public\Todo-list.png)

## Features
1. Add Tasks: Add a new task with a title and description.
2. Edit Tasks: Edit the details of an existing task.
3. Delete Tasks: Remove a task from the list.
4. Mark as Done: Mark a task as completed or undo the completion status.
5. Local Storage: Tasks are saved in the browser's local storage.

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
git clone https://github.com/yourusername/todo-app.git
cd todo-app

2. Install dependencies: npm install

3. Start the development server: npm run dev

4. Open your browser and navigate to http://localhost:3000 to see the app in action.

## Usage

# Adding a Task
1. Enter a task title in the "Enter a task here" input field.

2. Optionally, enter a description in the "Enter description here" input field.

3. Click the "ADD TASK" button to add the task to the list.

# Editing a Task
1. Click the "Edit" button next to the task you want to edit.

2. The task's title and description will be loaded into the input fields.

3. Modify the details as needed and click the "UPDATE TASK" button to save changes.

# Deleting a Task
1. Click the "Delete" button next to the task you want to remove.

2. The task will be removed from the list and local storage.

# Marking a Task as Done
1. Click the "Done" button next to the task you want to mark as completed.

2. The task will be marked as completed and styled with a line-through.

3. Click the "Undo" button to revert the task to its incomplete status.

# Code Structure

src/: The source directory containing all the code files.

components/: Directory containing React components.

Page.tsx: Main component that handles the state and logic for the app.

index.tsx: Entry point for the React application.

App.tsx: Wrapper component for routing and context providers.

styles/: Directory containing CSS files.

index.css: Main stylesheet for the application.

public/: Contains static files like index.html.

package.json: Contains project metadata and dependencies.


# Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.