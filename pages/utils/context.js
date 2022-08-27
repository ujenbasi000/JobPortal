import { createContext, useState } from "react";

export const CTX = createContext();

const Context = ({ data, children }) => {
  const [user, setUser] = useState({});
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  return (
    <CTX.Provider
      value={{ user, setUser, hasLoggedIn, setHasLoggedIn, ...data }}
    >
      {children}
    </CTX.Provider>
  );
};

export default Context;
