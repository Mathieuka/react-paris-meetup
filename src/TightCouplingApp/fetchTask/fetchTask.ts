import { TaskItem } from "../hooks/useFetchTask";

export const fetchTask = async (taskId: string): Promise<TaskItem> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${taskId}`,
    );
    return await response.json();
  } catch (e) {
    throw new Error("Error fetching task");
  }
};
