import { useContext } from "react";
import { TaskProviderContext } from "./TaskProvider";

const useTaskService = () => useContext(TaskProviderContext);

export default useTaskService;
