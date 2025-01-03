import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  return (
    <AppContext.Provider value={{ isBottomSheetVisible, setBottomSheetVisible }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);