import { Api, TodoItem } from "./types";

type TodoApiData = {
  initialTodos: Promise<TodoItem[]>;
};

export class InMemoryTodoApi implements Api {
  private readonly listTodoResult: Promise<TodoItem[]>;

  constructor(private initialData: TodoApiData) {
    this.listTodoResult = initialData.initialTodos;
  }

  async listTodo(): Promise<TodoItem[]> {
    return this.listTodoResult;
  }
}

export class TodoApi implements Api {
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
