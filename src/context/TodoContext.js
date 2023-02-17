/** @format */

import { createContext, useEffect, useRef, useState, useCallback } from "react";
import uuid from "react-uuid";

const TodoContext = createContext();

export default TodoContext;

export const TodoProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const bgRef = useRef(null);
  const [data, setData] = useState(() => {
    const tempData = JSON.parse(localStorage.getItem("data"));
    return (
      tempData || {
        todos: [],
        completedTodos: [],
        uncompletedTodos: [],
      }
    );
  });

  const [loading, setLoading] = useState({
    all: true,
    completed: false,
    active: false,
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  let handleSetItem = () => {
    localStorage.setItem("data", JSON.stringify(data));
  };

  let HandleNewTodo = (checkedState) => {
    if (inputValue == "") {
      return;
    }
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
    setInputValue("");
  };

  let handleSwitchCompleted = () => {
    let filteredTodos = data.todos.filter((todo) => todo.completed == true);
    setData({
      ...data,
      completedTodos: filteredTodos,
    });
    setLoading({ active: false, all: false, completed: true });
    // handleSetItem();
  };

  let handleSwitchActive = () => {
    let filteredTodos = data.todos.filter((todo) => todo.completed == false);
    setData({
      ...data,
      uncompletedTodos: filteredTodos,
    });
    setLoading({ active: true, all: false, completed: false });
    // handleSetItem();
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
    // handleSetItem();
  };

  let handleRemoveTodo = (IncomingTodo) => {
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

  let handleClearCompleted = () => {
    let updatedTodos = data.todos.filter((todo) => todo.completed == false);
    setData({
      ...data,
      todos: updatedTodos,
      completedTodos: updatedTodos.filter((todo) => todo.completed === true),
      uncompletedTodos: updatedTodos.filter((todo) => todo.completed === false),
    });
  };

  let TodoData = {
    HandleNewTodo,
    inputValue,
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
    handleClearCompleted,
    bgRef,
  };

  return (
    <TodoContext.Provider value={TodoData}>{children}</TodoContext.Provider>
  );
};
