import "./App.css";
import { useEffect, useState } from 'react';
import TaskList from './component/TaskList/TaskList';
import TaskForm from './component/TaskForm/TaskForm';

export default function App() {
  /* state to store data (tasks) in an object */
  const [tasks, setTasks] = useState([]);
  /* state to indicate if a task is being edited  */
  const [isEditing, setIsEditing] = useState(false);
  /* state to grab the tasks index that will be edited */
  const [editIndex, setEditIndex] = useState(null);
  /* local Storage */
  /* using the first useEffect to grab the value when its first loads */
  useEffect(() => {
    const data = localStorage.getItem('tasks');
    setTasks(data ? JSON.parse(data) : []);
  }, []);
  /* using useEffect to send the value every time tasks changes  */
  useEffect(() => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  /* function to add a task */
  function addTask(name, description) {
    setTasks((t) => [...t, { name, description, completed: false }]);
  }
  /* function to delet a task */
  function deleteTask(index) {
    setTasks((t) => {
      const updatedTasks = [...t];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  }
    /* function to set the task editing and store his index  */
  function editTask(index) {
    setIsEditing(true);
    setEditIndex(index);
  }
 /* function to save the edited task and resets the editing state */
  function saveEditedTask(name, description) {
    setTasks((t) => {
      const updatedTasks = [...t];
      updatedTasks[editIndex] = { ...updatedTasks[editIndex], name, description };
      setIsEditing(false);
      setEditIndex(null);
      return updatedTasks;
    });
  }
/* function to mark tasks as completed */
  function completeTask(index) {
    setTasks((t) => {
      const updatedTasks = [...t];
      updatedTasks[index].completed = true;
      return updatedTasks;
    });
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TaskForm onAdd={addTask}  isEditing={isEditing} tasks={tasks}
        editIndex={editIndex}
        saveEditedTask={saveEditedTask}/>
      <TaskList tasks={tasks}  onDelete={deleteTask} completeTask={completeTask} editTask={editTask}/>
    </div>
  );
}