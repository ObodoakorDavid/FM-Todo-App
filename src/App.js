/** @format */
import "./App.css";
import { useContext } from "react";
import TodoContext from "./context/TodoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AllTodos from "./Components/AllTodos";
import CompletedTodo from "./Components/CompletedTodo";
import Form from "./Components/Form";
import AAC from "./Components/AAC";
import ActiveTodos from "./Components/ActiveTodos";

function App() {
  const { data, loading, handleClearCompleted, bgRef } =
    useContext(TodoContext);

  return (
    <div className="App">
      <div className="main-content">
        <div ref={bgRef} className="top-half">
          <Form />
        </div>

        <div className="bottom-half rounded">
          {loading.all && <AllTodos />}
          {loading.completed && <CompletedTodo />}
          {loading.active && <ActiveTodos />}
          <div className="d-flex justify-content-between ps-3 pe-3 pt-3 pb-3 mt-1">
            <small>{data.uncompletedTodos.length} items left</small>
            <small
              onClick={() => {
                handleClearCompleted();
              }}
              style={{ cursor: "pointer" }}
            >
              Clear Completed
            </small>
          </div>
          <AAC />
        </div>
      </div>
    </div>
  );
}

export default App;
