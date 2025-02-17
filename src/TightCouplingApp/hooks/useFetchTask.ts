import { useEffect, useState } from "react";
import { fetchTask } from "../fetchTask/fetchTask";

export interface TaskItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const useFetchTask = (taskId: string) => {
  const [task, setTask] = useState<TaskItem>();

  useEffect(() => {
    fetchTask(taskId).then(async (data) => {
      const task = applySomeLogic(data);
      await storeMetaData("Task metadata");

      setTask(task);
    });
  }, [taskId]);

  if (!task) {
    return;
  }

  return task;
};

const applySomeLogic = (task: TaskItem | undefined): TaskItem | undefined => {
  console.log("⚙️ Process... format task", task);

  return task;
};

const storeMetaData = async (
  metadata: string | undefined,
): Promise<string | undefined> => {
  console.log("⚙️ Process... store task in storage");

  try {
    console.log("✅ Task processed");
  } catch (e) {
    throw new Error("Failed to process task");
  }

  return metadata;
};
