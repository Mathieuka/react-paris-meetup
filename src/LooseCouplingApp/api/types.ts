export interface TaskItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Api {
  findTask: (id: string) => Promise<TaskItem>;
}
