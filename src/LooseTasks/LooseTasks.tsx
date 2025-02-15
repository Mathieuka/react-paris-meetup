import React, { useEffect, useState } from "react";
import "../App.css";
import useApi from "./provider/useApi";
import { TodoItem } from "./api/types";
import TodoApiProvider from "./provider/TodoProvider";
import { TodoApi } from "./api/implementation";

function LooseTasks() {
  return <ListTodo />;
}

export const ListTodo = () => {
  const { listTodo } = useApi();
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    listTodo().then((todos) => setTodos(todos));
  }, [listTodo]);

  return (
    <TodoApiProvider apiImplementation={new TodoApi()}>
      <div>
        <h1>Todos</h1>

        {todos.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul>{todos?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
        )}
      </div>
    </TodoApiProvider>
  );
};

export default LooseTasks;
