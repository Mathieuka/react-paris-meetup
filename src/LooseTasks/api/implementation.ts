import { Api, TodoItem } from "./types";

type TodoApiData = {
  initialTodos: Promise<TodoItem>;
};

export class InMemoryTodoApi implements Api {
  private readonly findTodoResult: Promise<TodoItem>;

  constructor(private initialData: TodoApiData) {
    this.findTodoResult = initialData.initialTodos;
  }

  async findTodo(): Promise<TodoItem> {
    return this.findTodoResult;
  }
}

export class TodoApi implements Api {
  async findTodo(id: string): Promise<TodoItem> {
    const result = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );

    return result.json();
  }
}

export class TodoApiAdapter implements Api {
  constructor(private apiClient: Api) {}

  async findTodo(id: string): Promise<TodoItem> {
    return this.apiClient.findTodo(id);
  }
}
