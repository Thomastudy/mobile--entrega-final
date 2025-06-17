// src/services/db.js
import { openDatabaseSync } from "expo-sqlite";
import store from "../store/store";
import { loadCart } from "../features/cartSlice";

const db = openDatabaseSync("ruralanas.db");

// Inicializa la tabla
export function initDB() {
  if (!db) return;
  db.isInTransactionAsync((tx) =>
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS cart (productId TEXT PRIMARY KEY, qty INTEGER);",
      [],
      () => {},
      (_, err) => console.error("initDB error:", err)
    )
  );
}

// Lee el carrito y lo carga al store
export function fetchCartFromDB() {
  if (!db) return;
  db.isInTransactionAsync((tx) =>
    tx.executeSql(
      "SELECT * FROM cart;",
      [],
      (_, result) => {
        const items = result.rows._array || [];
        store.dispatch(loadCart(items));
      },
      (_, err) => console.error("fetchCart error:", err)
    )
  );
}

// Añade o incrementa un item
export function saveItem(productId) {
  if (!db) return;
  db.isInTransactionAsync((tx) =>
    tx.executeSql(
      `INSERT OR REPLACE INTO cart 
         (productId, qty) 
       VALUES 
         (?, COALESCE((SELECT qty FROM cart WHERE productId = ?), 0) + 1);`,
      [productId, productId],
      () => {},
      (_, err) => console.error("saveItem error:", err)
    )
  );
}

// borrar item
export function deleteItem(productId) {
  if (!db) return;
  db.isInTransactionAsync((tx) =>
    tx.executeSql(
      "DELETE FROM cart WHERE productId = ?;",
      [productId],
      () => {},
      (_, err) => console.error("deleteItem error:", err)
    )
  );
}

//  vaciar todo el carrito
export function clearCartDB() {
  if (!db) return;
  db.isInTransactionAsync((tx) =>
    tx.executeSql(
      "DELETE FROM cart;",
      [],
      () => {},
      (_, err) => console.error("clearCartDB error:", err)
    )
  );
}
