import { useContext } from "react";
import { CTX } from "../utils/context";

const useContextHook = () => {
  return useContext(CTX);
};

export default useContextHook;
