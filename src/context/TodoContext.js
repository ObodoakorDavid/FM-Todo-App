/** @format */

import { createContext, useState } from "react";
import uuid from "react-uuid";

const TodoContext = createContext();

export default TodoContext;

export const TodoProvider = ({ children }) => {
  const [data, setData] = useState({
    todos: [],
    completedTodos: [],
    uncompletedTodos: [],
  });

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState({
    all: true,
    completed: false,
  });

  let HandleNewTodo = () => {
    let newTodo = {
      id: uuid(),
      todoName: inputValue,
      completed: false,
      active: true,
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
    setLoading({ ...loading, all: false, completed: true });
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
  };

  return (
    <TodoContext.Provider value={TodoData}>{children}</TodoContext.Provider>
  );
};
