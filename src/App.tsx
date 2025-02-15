import React, { useEffect, useState } from "react";
import "./App.css";
import TodoApiProvider from "./provider/TodoProvider";
import useApi from "./provider/useApi";
import { TodoItem } from "./api/types";
import { TodoApi } from "./api/implementation";

function App() {
  return (
    <TodoApiProvider apiImplementation={new TodoApi()}>
      <ListTodo />
    </TodoApiProvider>
  );
}

export const ListTodo = () => {
  const { listTodo } = useApi();
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    listTodo().then((todos) => setTodos(todos));
  }, [listTodo]);

  return (
    <div>
      <h1>Todos</h1>

      {todos.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>{todos?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
      )}
    </div>
  );
};

export default App;
