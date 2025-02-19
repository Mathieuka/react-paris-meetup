import { useEffect, useState } from "react";
import { fetchTask } from "../fetchTask/fetchTask";
import { storeMetaData } from "../storeMetada/storeMetadata";

export interface TaskItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const useFetchTask = ({ id }: { id: string }) => {
  const [task, setTask] = useState<TaskItem>();

  useEffect(() => {
    fetchTask(id).then(async (data) => {
      const task = applySomeLogic(data);
      await storeMetaData("Task metadata");

      setTask(task);
    });
  }, [id]);

  if (!task) {
    return;
  }

  return task;
};

const applySomeLogic = (task: TaskItem | undefined): TaskItem | undefined => {
  console.log("⚙️ Process... format task", task);

  return task;
};
