// App.js
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/store/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { initDB, fetchCartFromDB } from "./src/services/db";
import { auth, database } from "./src/services/firebase";
import { ref, onValue } from "firebase/database";
import { loadCart } from "./src/store/cartSlice";

export default function App() {
  useEffect(() => {
    initDB();
    fetchCartFromDB();
  }, []);

  useEffect(() => {
    // 1) Espera a la sesión
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) return;
      const uid = user.uid;

      // 2) Listener de RTDB
      const cartRef = ref(database, `carts/${uid}`);
      const unsubscribeDB = onValue(cartRef, (snapshot) => {
        const data = snapshot.val() || {};
        // 3) Transformación a array
        const items = Object.entries(data).map(([productId, { qty }]) => ({
          productId,
          qty,
        }));
        store.dispatch(loadCart(items));
      });

      // 4) Cleanup al desuscribir auth
      return () => {
        unsubscribeDB();
      };
    });
    return () => unsubscribeAuth();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
