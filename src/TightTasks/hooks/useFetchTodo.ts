import { useEffect, useState } from "react";
import { TodoItem } from "../../LooseTasks/api/types";

export const useFetchTodo = (todosId: string) => {
  const [todos, setTodos] = useState<TodoItem>();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todosId}`)
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, [todosId]);

  return todos;
};
