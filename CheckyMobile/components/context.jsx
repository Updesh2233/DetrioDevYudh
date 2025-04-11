import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState([]);
  // 🔹 Load data from local storage when app starts
  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem("cartData");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    };
    loadData();
  }, []);

  // 🔹 Save data to local storage whenever data changes
  useEffect(() => {
    AsyncStorage.setItem("cartData", JSON.stringify(data));
  }, [data]);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};
