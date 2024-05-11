import { createContext, useContext, useEffect, useState } from "react";
import API, { endpoints } from "../../configs/API";

export const HoidongContext = createContext();

// Trong component HoidongProvider, cung cấp giá trị cho HoidongContext.Provider
const HoidongProvider = ({ children }) => {
  const [glob, setGlob] = useState(null);
  useEffect(() => {
    const loadHoidong = async () => {
      try {
        let res = await API.get(endpoints["dshoidong"]);

        setGlob(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };
    loadHoidong();
  }, []);

  return (
    <HoidongContext.Provider value={{ glob, setGlob}}>
      {children}
    </HoidongContext.Provider>
  );
};

export default HoidongProvider;