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
    bgRef,
  } = useContext(TodoContext);

  const [checked, setChecked] = useState(false);
  let body = document.body;

  function handleChangeTheme() {
    if (darkMode == false) {
      body.classList.add("darkTheme");
      bgRef.current.classList.add("bgDarkTheme");
    } else {
      body.classList.remove("darkTheme");
      bgRef.current.classList.remove("bgDarkTheme");
    }
  }

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
        <input
          onChange={(e) => {
            setChecked(e.target.checked);
            console.log(e.target.checked);
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
