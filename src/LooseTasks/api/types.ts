export interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Api {
  findTodo: (id: string) => Promise<TodoItem>;
}
