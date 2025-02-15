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
      resolve({
        userId: 1,
        id: 1,
        title: "Fake implementation",
        completed: false,
      });
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

const processTodo = (todo: TaskItem | undefined): TaskItem | undefined => {
  // Call s3 bucket
  console.log("LOG Process todo...⚙️");

  return todo;
};

export class TaskApiAdapter implements Api {
  constructor(private apiClient: Api) {}

  async findTask(id: string): Promise<TaskItem> {
    return this.apiClient.findTask(id);
  }
}
