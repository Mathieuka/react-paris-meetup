import { TaskProvider, TaskItem } from "../core/types";

type Stub = {
  stub: {
    findTask: TaskItem;
  };
};

export class FakeTaskService implements TaskProvider {
  private readonly findTaskStub: TaskItem;

  public calls: number = 0;
  public isCalledWith: TaskItem | undefined;

  constructor(private param: Stub) {
    this.findTaskStub = param.stub.findTask;
  }

  async findTask(id: string): Promise<TaskItem> {
    console.log(`Task id: ${id}`);
    this.calls += 1;
    this.isCalledWith = this.findTaskStub;

    return new Promise((resolve) => {
      resolve(this.findTaskStub);
    });
  }
}

export class ProductionTaskService implements TaskProvider {
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

export class TaskService implements TaskProvider {
  constructor(private taskClient: TaskProvider) {}

  async findTask(id: string): Promise<TaskItem> {
    return this.taskClient.findTask(id);
  }
}
