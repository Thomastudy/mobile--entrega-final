# Ruralanas App (Proyecto Final)

## 🚀 Descripción
App móvil híbrida de e-commerce + red social para productos de lana merino, con:
- Autenticación Firebase (anónima).
- Catálogo, detalle, carrito offline (SQLite) y online (RTDB).
- Cámara integrada para compartir proyectos.
- Sincronización automática con Firebase Realtime Database.

## 📦 Tec Stack
- Expo (React Native)
- React Navigation
- Redux Toolkit
- expo-sqlite (persistencia offline)
- Firebase Auth + Realtime Database
- expo-camera

## 🔧 Instalación y ejecución
```bash
git clone <tu-repo-url>
cd entrega-final
npm install
# En emulador o Expo Go (no web):
npx expo start
# O para emulador Android/iOS:
npx expo run:android
npx expo run:ios
