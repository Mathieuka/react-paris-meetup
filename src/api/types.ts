export interface Api {
  listTodo: () => Promise<string[]>;
}
