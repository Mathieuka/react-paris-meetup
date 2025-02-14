import { Api, TodoItem } from "./types";

export class InMemoryTodoApi implements Api {
  async listTodo(): Promise<TodoItem[]> {
    return new Promise((resolve) => {
      resolve([
        {
          userId: 1,
          id: 1,
          title: "Fake implementation",
          completed: false,
        },
      ]);
    });
  }
}

export class HttpTodoApi implements Api {
  async listTodo(): Promise<TodoItem[]> {
    const result = await fetch("https://jsonplaceholder.typicode.com/todos");

    return result.json();
  }
}

export class TodoApiAdapter implements Api {
  constructor(private apiClient: Api) {}

  async listTodo(): Promise<TodoItem[]> {
    return this.apiClient.listTodo();
  }
}
