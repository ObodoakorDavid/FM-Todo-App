/** @format */

import React, { useContext } from "react";
import TodoContext from "../context/TodoContext";

const AAC = () => {
  const { loading, setLoading, handleSwitchCompleted } =
    useContext(TodoContext);
  return (
    <div className="bottom-section mt-4 pt-3 bg-white">
      <p
        onClick={() => {
          setLoading({ all: true, completed: false, active: false });
        }}
        className={loading.all ? "active fw-bold" : "fw-bold"}
      >
        All
      </p>
      <p
        onClick={() => {
          setLoading({
            active: true,
            completed: false,
            all: false,
          });
        }}
        className={loading.active ? "active fw-bold" : "fw-bold"}
      >
        Active
      </p>
      <p
        onClick={(e) => {
          handleSwitchCompleted();
          setLoading({
            active: false,
            completed: true,
            all: false,
          });
        }}
        className={loading.completed ? "active fw-bold" : "fw-bold"}
      >
        Completed
      </p>
    </div>
  );
};

export default AAC;
