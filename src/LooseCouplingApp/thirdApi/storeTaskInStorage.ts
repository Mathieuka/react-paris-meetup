// Consider applying the Dependency Inversion Principle here to increase flexibility and maintainability.
// This would involve decoupling the high-level processTodo function from low-level storage details,
// allowing for easier changes to storage mechanisms in the future.

import { TaskItem } from "../api/types";

export const processTodo = (todo: TaskItem): void => {
  console.log(`⚙️...Process todo, store task in storage with id : ${todo.id}`);
};
