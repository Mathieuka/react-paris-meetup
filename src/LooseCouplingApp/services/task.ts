import { TaskRepository, TaskItem } from "../core/types";

export class FakeTaskService implements TaskRepository {
  async findTask(id: string): Promise<TaskItem> {
    console.log(`Task id: ${id}`);

    return new Promise((resolve) => {
      resolve({
        userId: 1,
        id: 1,
        title: "Some title",
        completed: true,
      });
    });
  }
}

export class ProductionTaskService implements TaskRepository {
  async findTask(id: string): Promise<TaskItem> {
    try {
      const result = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
      );

      return result.json();
    } catch (e) {
      throw new Error(`Failed to fetch task with id ${id}`);
    }
  }
}

export class TaskService implements TaskRepository {
  constructor(private taskClient: TaskRepository) {}

  async findTask(id: string): Promise<TaskItem> {
    return this.taskClient.findTask(id);
  }
}
