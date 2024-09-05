import "./TaskForm.css";
import { useEffect, useState } from "react";

export default function TaskForm({ tasks,onAdd, isEditing, editIndex, saveEditedTask }) {
  /* input variable value */
  const [newTask, setNewTask] = useState("");
  const [discription, setDiscription] = useState("");
  /* validation message */
  const [message, setMessage] = useState("");
/* fills in form fields with task details when editing */
  useEffect(() => {
    if (isEditing) {
      const taskToEdit = tasks[editIndex];
      setNewTask(taskToEdit.name);
      setDiscription(taskToEdit.description);
    } else {
      setNewTask("");
      setDiscription("");
    }
  }, [isEditing, editIndex]);
/* function to handle the add action and edit and for the form validation  */
  function handleAddTask(e) {
    e.preventDefault();
    if (newTask.trim() !== "" && discription.trim() !== "") {
      if (isEditing) {
        saveEditedTask(newTask, discription);
      } else {
        onAdd(newTask, discription);
      }
      setNewTask("");
      setDiscription("");
      setMessage("");
    } else {
      setMessage("Please fill both name and description fields");
    }
  }

  return (
    <form onSubmit={handleAddTask}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Task-name"
      />
      <textarea
        name="text"
        value={discription}
        placeholder="Task-discription"
        onChange={(e) => setDiscription(e.target.value)}
      ></textarea>
      {/* displaying validation message */}
      {message && (
        <p style={{ color: "red", marginBottom: "10px", fontSize: "13px" }}>
          {message}
        </p>
      )}
      <button type="submit">{isEditing ? "Save" : "Add"}</button>
    </form>
  );
}