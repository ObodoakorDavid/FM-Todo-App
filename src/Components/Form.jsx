/** @format */

import React, { useContext, useState } from "react";
import TodoContext from "../context/TodoContext";
import lightIcon from "../assets/icons/icon-sun.svg";
import darkIcon from "../assets/icons/icon-moon.svg";

const Form = () => {
  const {
    HandleNewTodo,
    inputValue,
    setInputValue,
    darkMode,
    setDarkMode,
  } = useContext(TodoContext);

  const [checked, setChecked] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        HandleNewTodo(checked);
      }}
    >
      <div className="d-flex align-items-center justify-content-between pt-5 pb-3">
        <h1>TODO</h1>
        {darkMode ? (
          <img
            onClick={() => {
              setDarkMode(false);
            }}
            src={lightIcon}
            alt="light-icon"
          />
        ) : (
          <img
            onClick={() => {
              setDarkMode(true);
            }}
            src={darkIcon}
            alt="dark-icon"
          />
        )}
      </div>
      <div className="d-flex justify-content-center gap-2 input-div ps-2 pe-2">
        <input
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
          type="checkbox"
        />
        <input
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          type="text"
          value={inputValue}
          className={checked ? "todo-active todo-input" : "todo-input"}
        />
      </div>
    </form>
  );
};

export default Form;
