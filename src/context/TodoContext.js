/** @format */

import { createContext, useEffect, useState } from "react";
import uuid from "react-uuid";

const TodoContext = createContext();

export default TodoContext;

export const TodoProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [onMount, setOnMount] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState({
    todos: [],
    completedTodos: [],
    uncompletedTodos: [],
  });

  const [loading, setLoading] = useState({
    all: true,
    completed: false,
    active: false,
  });

  // useEffect(() => {
  //   // let todos = localStorage.setItem("todos", JSON.stringify(data));

  //   let existingTodos = JSON.parse(localStorage.getItem("todos"));

  //   if (existingTodos) {
  //     setData(existingTodos);
  //     console.log(existingTodos);
  //   }
  //   console.log("get");
  // }, []);

  // useEffect(() => {
  //   if (onMount) {
  //     localStorage.setItem("todos", JSON.stringify(data));
  //     setOnMount(true);
  //     console.log("sett");
  //   }
  // }, [data]);

  let HandleNewTodo = (checkedState) => {
    let newTodo = {
      id: uuid(),
      todoName: inputValue,
      completed: checkedState,
    };
    if (newTodo.completed == false) {
      setData({
        ...data,
        todos: [...data.todos, newTodo],
        uncompletedTodos: [...data.uncompletedTodos, newTodo],
      });
    } else {
      setData({
        ...data,
        todos: [...data.todos, newTodo],
        completedTodos: [...data.completedTodos, newTodo],
      });
    }

    console.log(newTodo.id);
    console.log(newTodo);
  };

  let handleSwitchCompleted = () => {
    let filteredTodos = data.todos.filter((todo) => todo.completed == true);
    setData({
      ...data,
      completedTodos: filteredTodos,
    });
    setLoading({ active: false, all: false, completed: true });
  };
  let handleSwitchActive = () => {
    let filteredTodos = data.todos.filter((todo) => todo.completed == false);
    setData({
      ...data,
      uncompletedTodos: filteredTodos,
    });
    setLoading({ active: true, all: false, completed: false });
  };

  let handleComplete = (IncomingTodo, completedState) => {
    const updatedTodos = data.todos.map((todo) => {
      if (IncomingTodo.id == todo.id) {
        return { ...todo, completed: completedState };
      } else {
        return todo;
      }
    });

    setData({
      ...data,
      todos: updatedTodos,
      completedTodos: updatedTodos.filter((todo) => todo.completed === true),
      uncompletedTodos: updatedTodos.filter((todo) => todo.completed === false),
    });
  };

  let handleRemoveTodo = (IncomingTodo) => {
    console.log(IncomingTodo);
    let updatedTodos = data.todos.filter(
      (existingTodo) => existingTodo.id !== IncomingTodo.id
    );
    setData({
      ...data,
      todos: updatedTodos,
      completedTodos: updatedTodos.filter((todo) => todo.completed === true),
      uncompletedTodos: updatedTodos.filter((todo) => todo.completed === false),
    });
  };

  let TodoData = {
    HandleNewTodo,
    setInputValue,
    data,
    setData,
    loading,
    setLoading,
    handleSwitchCompleted,
    handleComplete,
    handleSwitchActive,
    darkMode,
    setDarkMode,
    handleRemoveTodo,
  };

  return (
    <TodoContext.Provider value={TodoData}>{children}</TodoContext.Provider>
  );
};
