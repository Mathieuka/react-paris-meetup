import { Api, TodoItem } from "./types";

type Stub = {
  findTask: TodoItem;
};

export class InMemoryTaskApi implements Api {
  private readonly findTaskStub: TodoItem;

  constructor(private stub: Stub) {
    this.findTaskStub = stub.findTask;
  }

  async findTask(): Promise<TodoItem> {
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
  async findTask(id: string): Promise<TodoItem> {
    const result = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );

    return result.json();
  }
}

const processTodo = (todo: TodoItem | undefined): TodoItem | undefined => {
  // Call s3 bucket
  console.log("LOG Process todo...⚙️");

  return todo;
};

export class TodoApiAdapter implements Api {
  constructor(private apiClient: Api) {}

  async findTask(id: string): Promise<TodoItem> {
    return this.apiClient.findTask(id);
  }
}
