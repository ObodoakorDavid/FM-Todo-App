/** @format */

import React, { useContext } from "react";
import TodoContext from "../context/TodoContext";

const AAC = () => {
  const { loading, setLoading, handleSwitchCompleted, handleSwitchActive } =
    useContext(TodoContext);
  return (
    <div className="bottom-section mt-4 pt-3">
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
          handleSwitchActive();
        }}
        className={loading.active ? "active fw-bold" : "fw-bold"}
      >
        Active
      </p>
      <p
        onClick={(e) => {
          handleSwitchCompleted();
        }}
        className={loading.completed ? "active fw-bold" : "fw-bold"}
      >
        Completed
      </p>
    </div>
  );
};

export default AAC;
