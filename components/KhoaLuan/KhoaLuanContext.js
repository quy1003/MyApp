import React, { createContext, useState } from "react";

export const KLStateContext = createContext();

export const KLStateProvider = ({ children }) => {
  const [KLState, setKLState] = useState(false); // Trạng thái toàn cục


  return (
    <KLStateContext.Provider value={{ KLState, setKLState }}>
      {children}
    </KLStateContext.Provider>
  );
};