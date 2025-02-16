import { useEffect, useState } from "react";
import { fetchTask } from "../fetchTask/fetchTask";

export interface TaskItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const useFetchTask = (todosId: string) => {
  const [task, setTask] = useState<TaskItem>();

  useEffect(() => {
    fetchTask(todosId).then(async (data) => {
      const task = applySomeLogic(data);
      await storeTask(task);

      setTask(task);
    });
  }, [todosId]);

  if (!task) {
    return;
  }

  return task;
};

const applySomeLogic = (task: TaskItem | undefined): TaskItem | undefined => {
  console.log("⚙️ Process... format task");

  return task;
};

const storeTask = async (
  todo: TaskItem | undefined,
): Promise<TaskItem | undefined> => {
  console.log("⚙️ Process... store task in storage");

  try {
    console.log("✅ Task processed");
  } catch (e) {
    throw new Error("Failed to process task");
  }

  return todo;
};
