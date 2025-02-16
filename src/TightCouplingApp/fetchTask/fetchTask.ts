import { TaskItem } from "../hooks/useFetchTask";

export const fetchTask = async (todosId: string): Promise<TaskItem> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todosId}`,
  );
  return await response.json();
};
