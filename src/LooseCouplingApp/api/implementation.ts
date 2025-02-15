import { Api, TaskItem } from "./types";

type Stub = {
  findTask: TaskItem;
};

export class InMemoryTaskApi implements Api {
  private readonly findTaskStub: TaskItem;

  constructor(private stub: Stub) {
    this.findTaskStub = stub.findTask;
  }

  async findTask(): Promise<TaskItem> {
    return new Promise((resolve) => {
      resolve(this.findTaskStub);
    });
  }
}

export class TaskApi implements Api {
  async findTask(id: string): Promise<TaskItem> {
    const result = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );

    return result.json();
  }
}

export class TaskApiAdapter implements Api {
  constructor(private apiClient: Api) {}

  async findTask(id: string): Promise<TaskItem> {
    return this.apiClient.findTask(id);
  }
}
