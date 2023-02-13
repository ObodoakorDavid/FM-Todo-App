/** @format */

import React, { useContext } from "react";
import TodoContext from "../context/TodoContext";
import lightIcon from "../images/icon-sun.svg";
import darkIcon from "../images/icon-moon.svg";

const Form = () => {
  const { HandleNewTodo, setInputValue } = useContext(TodoContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        HandleNewTodo();
      }}
    >
      <div className="d-flex align-items-center justify-content-between pt-5 pb-3">
        <h1>TODO</h1> <img src={darkIcon} alt="" />
      </div>
      <div className="d-flex justify-content-center gap-2 input-div ps-2 pe-2">
        <input type="checkbox" className="" />
        <input
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          type="text"
          className="todo-input"
        />
      </div>
    </form>
  );
};

export default Form;
