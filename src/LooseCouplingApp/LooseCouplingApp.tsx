import React, { useEffect, useState } from "react";
import useApi from "./provider/useApi";
import { TodoItem } from "./api/types";
import TaskApiProvider from "./provider/TodoProvider";
import { TaskApi } from "./api/implementation";
import "./LooseCouplingApp.css";

function LooseCouplingApp() {
  return (
    <TaskApiProvider apiImplementation={new TaskApi()}>
      <LooseTask />
    </TaskApiProvider>
  );
}
const useFetchTodo = (todosId: string) => {
  const { listTodo } = useApi();
  const [todo, setTodo] = useState<TodoItem>();

  useEffect(() => {
    listTodo(todosId).then((todo) => {
      setTodo(todo);
    });
  }, [listTodo, todosId]);
  return todo;
};

export const LooseTask = () => {
  const todo = useFetchTodo("1");

  return (
    <div>
      <h1>Loose Tasks</h1>

      {!todo && <p>Loading...</p>}
      {todo && <li key={todo.id}>{todo.title}</li>}
    </div>
  );
};

export default LooseCouplingApp;
