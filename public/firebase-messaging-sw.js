// ✅ Firebase Cloud Messaging Service Worker
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBf06vLDIAMigl50cNSxUAv7BhI3GyHGgc",
  authDomain: "new-blood-26bf2.firebaseapp.com",
  projectId: "new-blood-26bf2",
  storageBucket: "new-blood-26bf2.firebasestorage.app",
  messagingSenderId: "96400267101",
  appId: "1:96400267101:web:6d54fc45c1390a1df33ab4",
  measurementId: "G-LNF0VER1YK",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Received background message: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
