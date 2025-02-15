import { useEffect, useState } from "react";

export interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const processTodo = (todo: TodoItem | undefined): TodoItem | undefined => {
  // Call s3 bucket
  console.log("LOG Process todo...⚙️");

  return todo;
};

export const useFetchTask = (todosId: string) => {
  const [todo, setTodo] = useState<TodoItem>();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todosId}`)
      .then((response) => response.json())
      .then((data) => setTodo(data));
  }, [todosId]);

  return processTodo(todo);
};
