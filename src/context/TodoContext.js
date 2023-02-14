/** @format */

import { createContext, useState } from "react";
import uuid from "react-uuid";

const TodoContext = createContext();

export default TodoContext;

export const TodoProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState({
    todos: [],
    completedTodos: [],
    uncompletedTodos: [],
  });

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState({
    all: true,
    completed: false,
    active: false,
  });

  let HandleNewTodo = () => {
    let newTodo = {
      id: uuid(),
      todoName: inputValue,
      completed: false,
    };

    console.log(newTodo.id);

    setData({ ...data, todos: [...data.todos, newTodo] });
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

    console.log(data.completedTodos);
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
  };

  return (
    <TodoContext.Provider value={TodoData}>{children}</TodoContext.Provider>
  );
};
