import useApi from "../provider/useApi";
import { useEffect, useState } from "react";
import { TaskItem } from "../api/types";

export const useFetchTask = (todosId: string) => {
  const { listTask } = useApi();
  const [todo, setTodo] = useState<TaskItem>();

  useEffect(() => {
    listTask(todosId).then((todo) => {
      setTodo(todo);
    });
  }, [listTask, todosId]);
  return todo;
};
