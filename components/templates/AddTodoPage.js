import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { useState } from "react";

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle /> Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <div className="todo">
            <label htmlFor="todo">
              <BsAlignStart />
              todo
            </label>
            <input
              type="radio"
              id="todo"
              value="todo"
              checked={status === "todo"}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoPage;
