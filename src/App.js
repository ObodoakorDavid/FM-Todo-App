/** @format */

import logo from "./logo.svg";
import "./App.css";
import { useContext } from "react";
import TodoContext from "./context/TodoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AllTodos from "./Components/AllTodos";
import CompletedTodo from "./Components/CompletedTodo";
import Form from "./Components/Form";

function App() {
  const { data, loading, setLoading, handleSwitchCompleted } =
    useContext(TodoContext);

  return (
    <div className="App">
      <div className="main-content">
        <div className="top-half">
          <Form />
        </div>

        <div className="bottom-half rounded">
          {loading.all && <AllTodos />}
          {loading.completed && <CompletedTodo />}
          <div className="d-flex justify-content-between ps-3 pe-3 pt-3 pb-3 bg-white mt-1">
            <small>{data.uncompletedTodos.length} items left</small>
            <small>Clear Completed</small>
          </div>
          <div className="bottom-section mt-4 pt-3 bg-white">
            <p
              onClick={() => {
                setLoading({ ...loading, all: true, completed: false });
              }}
              className={loading.all ? "active fw-bold" : ""}
            >
              All
            </p>
            <p
              onClick={() => {
                setLoading({ ...loading, all: true, completed: false });
              }}
              className={loading.active ? "active fw-bold" : "fw-bold"}
            >
              Active
            </p>
            <p
              onClick={(e) => {
                console.log("happened");
                handleSwitchCompleted();
              }}
              className={loading.completed ? "active fw-bold" : "fw-bold"}
            >
              Completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
