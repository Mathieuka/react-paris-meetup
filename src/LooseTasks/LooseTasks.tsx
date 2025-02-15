import React, { useEffect, useState } from "react";
import "../App.css";
import useApi from "./provider/useApi";
import { TodoItem } from "./api/types";
import TodoApiProvider from "./provider/TodoProvider";
import { TodoApi } from "./api/implementation";

function LooseTasks() {
  return (
    <TodoApiProvider apiImplementation={new TodoApi()}>
      <ListTodo />
    </TodoApiProvider>
  );
}

export const ListTodo = () => {
  const { listTodo } = useApi();
  const [todo, setTodo] = useState<TodoItem>();

  useEffect(() => {
    listTodo("1").then((todo) => {
      setTodo(todo);
    });
  }, [listTodo]);

  return (
    <div>
      <h1>Todos</h1>

      {!todo && <p>Loading...</p>}
      {todo && <li key={todo.id}>{todo.title}</li>}
    </div>
  );
};

export default LooseTasks;
