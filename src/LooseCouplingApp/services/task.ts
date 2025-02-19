import { TaskRepository, TaskItem } from "../core/types";

type Stub = {
  stub: {
    findTask: TaskItem;
  };
};

export class FakeTaskService implements TaskRepository {
  private readonly findTaskStub: TaskItem;

  constructor(private param: Stub) {
    this.findTaskStub = param.stub.findTask;
  }

  async findTask(id: string): Promise<TaskItem> {
    console.log(`Task id: ${id}`);

    return new Promise((resolve) => {
      resolve(this.findTaskStub);
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
