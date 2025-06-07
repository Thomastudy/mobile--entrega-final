// App.js
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/store/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { initDB, fetchCartFromDB } from "./src/services/db";

export default function App() {
  useEffect(() => {
    initDB();
    fetchCartFromDB();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
