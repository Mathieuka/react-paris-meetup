import { useContext } from "react";
import { APIProviderContext } from "./TaskProvider";

const useApi = () => useContext(APIProviderContext);

export default useApi;
