import { useEffect, useState } from "react";
import { TodoItem } from "../api/types";

export const useFetchTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  return todos;
};
