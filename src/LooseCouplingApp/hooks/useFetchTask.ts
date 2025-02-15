import useApi from "../provider/useApi";
import { useEffect, useState } from "react";
import { TodoItem } from "../api/types";

export const useFetchTask = (todosId: string) => {
  const { listTodo } = useApi();
  const [todo, setTodo] = useState<TodoItem>();

  useEffect(() => {
    listTodo(todosId).then((todo) => {
      setTodo(todo);
    });
  }, [listTodo, todosId]);
  return todo;
};
