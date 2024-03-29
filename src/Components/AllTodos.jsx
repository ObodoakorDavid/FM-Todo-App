/** @format */

import React, {useContext } from "react";
import TodoContext from "../context/TodoContext";

const AllTodos = () => {
  const { data, handleComplete, handleRemoveTodo } = useContext(TodoContext);

  return (
    <div className="all-todo d-flex flex-column">
      {data.todos.map((todo) => {
        return (
          <div className="each-todo p-2 ps-3 pe-3 border-bottom" key={todo.id}>
            <input
              onChange={(e) => {
                console.log(e.target.checked);
                handleComplete(todo, e.target.checked);
              }}
              type="checkbox"
              checked={todo.completed ? true : false}
            />
            <p className={todo.completed ? "todo-active ps-3 m-0" : "ps-3 m-0"}>
              {todo.todoName}
            </p>
            <p
              onClick={() => {
                handleRemoveTodo(todo);
              }}
              className="m-0 close-btn"
            >
              X
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AllTodos;
