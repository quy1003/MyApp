import React, { createContext, useState } from "react";

export const ListStateContext = createContext();

export const ListStateProvider = ({ children }) => {
  const [listState, setListState] = useState(false); // Trạng thái toàn cục


  return (
    <ListStateContext.Provider value={{ listState, setListState }}>
      {children}
    </ListStateContext.Provider>
  );
};