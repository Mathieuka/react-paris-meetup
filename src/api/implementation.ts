import { Api } from "./types";

export class ApiImplementation implements Api {
  async listTodo() {
    const result = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    return result.json();
  }
}
