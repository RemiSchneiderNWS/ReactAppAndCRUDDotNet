import { useContext } from "react";
import { createContext } from "react";

export const UserContext = createContext(null as any);

export function useUser() {
  const value = useContext(UserContext);
  return value;
}
