import { useEffect, useState } from "react";
import { TodoItem } from "../../LooseTasks/api/types";

const processTodo = (todo: TodoItem | undefined): TodoItem | undefined => {
  console.log("LOG Process todo...⚙️");

  return todo;
};

export const useFetchTodo = (todosId: string) => {
  const [todo, setTodo] = useState<TodoItem>();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todosId}`)
      .then((response) => response.json())
      .then((data) => setTodo(data));
  }, [todosId]);

  return processTodo(todo);
};
