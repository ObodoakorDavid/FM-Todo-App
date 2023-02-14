/** @format */

import React, { useContext } from "react";
import TodoContext from "../context/TodoContext";
import lightIcon from "../assets/icons/icon-sun.svg";
import darkIcon from "../assets/icons/icon-moon.svg";

const Form = () => {
  const { HandleNewTodo, setInputValue, darkMode, setDarkMode } =
    useContext(TodoContext);
  let body = document.body;

  function handleChangeTheme() {
    console.log(body);
    if (darkMode == true) {
      body.classList.add("darkTheme");
    } else {
      body.classList.remove("darkTheme");
    }
    console.log(body);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        HandleNewTodo();
      }}
    >
      <div className="d-flex align-items-center justify-content-between pt-5 pb-3">
        <h1>TODO</h1>
        {darkMode ? (
          <img
            onClick={() => {
              setDarkMode(false);
              handleChangeTheme();
            }}
            src={lightIcon}
          />
        ) : (
          <img
            onClick={() => {
              setDarkMode(true);
              handleChangeTheme();
            }}
            src={darkIcon}
          />
        )}
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
