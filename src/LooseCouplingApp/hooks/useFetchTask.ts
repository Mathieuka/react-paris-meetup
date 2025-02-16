import useApi from "../provider/useApi";
import { useEffect, useState } from "react";
import { TaskItem } from "../core/types";

export const useFetchTask = (taskId: string) => {
  const { findTask } = useApi();
  const [task, setTask] = useState<TaskItem>();

  useEffect(() => {
    findTask(taskId).then((todo) => {
      setTask(todo);
    });
  }, [findTask, taskId]);

  return task;
};
