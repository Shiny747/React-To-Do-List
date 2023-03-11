import { useState, useEffect } from "react";

import { Button } from "./components/Button/Button";
import { Toggle } from "./components/Toggle/Toggle";
import { nanoid } from "nanoid";

import "./App.css";

export function App() {
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [inputMode, setInputMode] = useState("tasks"); //search \\ tasks
  const [tasks, setTasks] = useState([]);
  const [searchTasks, setSearchTasks] = useState([]);

  useEffect(() => {
    const localTask = localStorage.getItem("task");
    if (localTask) {
      const parsed = JSON.parse(localTask);
      setTasks(parsed);
    } else {
      localStorage.setItem("task", JSON.stringify([]));
    }
  }, []);

  function handleChangeEnter({ key }) {
    if (key === "Enter") {
      handleAddTask();
    }
  }

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddTask = () => {
    if (inputText !== "") {
      const newTask = {
        id: nanoid(),
        text: inputText,
        checked: false,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("task", JSON.stringify([...tasks, newTask]));
      setInputText("");
    } else{
      alert('No Task!')
    }
  };

  const handleDelete = (taskIndex) => {
    const filteredTasks = tasks.filter((task) => {
      if (taskIndex !== task.id) return task;
    });
    setTasks(filteredTasks);
    setSearchTasks(filteredTasks);
    localStorage.setItem("task", JSON.stringify(filteredTasks));
  };

  const handleCheck = (taskIndex) => {
    const checkedTasks = tasks.map((task) => {
      if (taskIndex === task.id) {
        task.checked = !task.checked;
        return task;
      }
      return task;
    });
    setTasks(checkedTasks);
    setSearchTasks(checkedTasks);
    localStorage.setItem("task", JSON.stringify(checkedTasks));
  };

  const handleDeleteAll = () => {
    localStorage.clear("task");
    setTasks([]);
  };

  const toggleSearch = () => {
    if (inputMode === "tasks") {
      setSearchTasks(tasks);
      setInputMode("search");
    }
    if (inputMode === "search") setInputMode("tasks");
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);

    const filteredTasks = tasks.filter((task) => {
      if (task.text.includes(event.target.value)) return task;
    });
    setSearchTasks(filteredTasks);
  };

  const inputValue = inputMode === "tasks" ? inputText : searchText;
  const handleInput = inputMode === "tasks" ? handleChange : handleSearchChange;
  const currentTasks = inputMode === "tasks" ? tasks : searchTasks;

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className="todo-actions">
        <Toggle onClick={toggleSearch} label="Search" toggled={true} />
        <input
          type="text"
          value={inputValue}
          className="input-text"
          onChange={handleInput}
          onKeyUp={handleChangeEnter}
        />
        {inputMode === "tasks" && (
          <div className="buttons">
            <Button buttonType="add" onClick={handleAddTask}>
              Add Task
            </Button>
            <Button buttonType="deleteAll" onClick={handleDeleteAll}>
              Delete All
            </Button>
          </div>
        )}
      </div>
      <div className="task">
        <ol className="tasks">
        {currentTasks.map((task, index) =>
          task.checked ? (
            <li className="list-item" key={task.id}>
              <del>
                {index + 1}. {task.text}
              </del>
              <div className="buttons">
              <Button onClick={() => handleCheck(task.id)} buttonType="checked">
                Complete
              </Button>
              <Button onClick={() => handleDelete(task.id)} buttonType="delete">
                Delete
              </Button>
              </div>
            </li>
          ) : (
            <li className="list-item" key={task.id}>
              {index + 1}. {task.text}
              <div className="buttons">
              <Button onClick={() => handleCheck(task.id)} buttonType="checker">
                Ready?
              </Button>
              <Button onClick={() => handleDelete(task.id)} buttonType="delete">
                Delete
              </Button>
              </div>
            </li>
          )
        )}
        </ol>
      </div>
    </div>
  );
}
