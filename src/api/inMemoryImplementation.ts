import { Api, TodoItem } from "./types";

export class fakeImplementation implements Api {
  async listTodo(): Promise<TodoItem[]> {
    return new Promise((resolve) => {
      resolve([
        {
          userId: 1,
          id: 1,
          title: "delectus aut autem",
          completed: false,
        },
      ]);
    });
  }
}
