import { useContext } from "react";
import { APIProviderContext } from "./TodoProvider";

const useApi = () => useContext(APIProviderContext);

export default useApi;
