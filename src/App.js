import React, { useContext, useReducer, useState, useEffect } from "react";
import PagesContext from "./context";
import PagesReducer from "./reducer";
import Axios from "axios";
import PageList from "./components/PageList";
import CreatePage from "./components/CreatePage";
const useAPI = endpoint => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await Axios.get(endpoint);
    setData(response.data.pages);
  };

  return data;
};

const App = () => {
  const initialState = useContext(PagesContext);
  const [state, dispatch] = useReducer(PagesReducer, initialState);
  const savedPages = useAPI("http://localhost:4000/pages");
  useEffect(() => {
    dispatch({
      type: "GET_PAGES",
      payload: savedPages
    });
  }, [savedPages]);

  return (
    <PagesContext.Provider value={{ state, dispatch }}>
      <PageList />
      <CreatePage />
    </PagesContext.Provider>
  );
};

export default App;
