import { Task, TaskItem } from "../core/types";

type Stub = {
  findTask: TaskItem;
};

export class FakeTaskService implements Task {
  private readonly findTaskStub: TaskItem;

  constructor(private stub: Stub) {
    this.findTaskStub = stub.findTask;
  }

  async findTask(id: string): Promise<TaskItem> {
    console.log(`Task id: ${id}`);
    return new Promise((resolve) => {
      resolve(this.findTaskStub);
    });
  }
}

export class ProductionTaskService implements Task {
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

export class TaskService implements Task {
  constructor(private apiClient: Task) {}

  async findTask(id: string): Promise<TaskItem> {
    return this.apiClient.findTask(id);
  }
}
