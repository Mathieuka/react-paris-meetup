import { Api } from "./types";

export class fakeImplementation implements Api {
  async listTodo(): Promise<string[]> {
    return new Promise((resolve) => {
      resolve(["Todo 1", "Todo 2", "Todo 3", "Todo 4", "Todo 5"]);
    });
  }
}
