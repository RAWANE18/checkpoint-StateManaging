import { MdOutlineDelete, MdOutlineDoneOutline} from "react-icons/md";
import "./TaskList.css";
import { FaRegEdit } from "react-icons/fa";

export default function TaskList({ tasks, onDelete, completeTask, editTask }) {
  return (
    <ol>
        {/* map on Tasks to display them all */}
      {tasks.map((task, index) => (
        <li key={index}>
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.name}
          </span>
          <div className="btn">
            <button onClick={() => completeTask(index)}>
              <MdOutlineDoneOutline />
            </button>
            <button onClick={() => editTask(index)}>
            <FaRegEdit />
            </button>
            <button onClick={() => onDelete(index)} style={{ marginRight: "10px" }}>
              <MdOutlineDelete />
            </button>
          </div>
        </li>
      ))}
    </ol>
  );
}