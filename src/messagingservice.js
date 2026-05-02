// src/messagingservice.js
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebaseConfig"; // ✅ updated import

const vapidKey = "BI_zahgAk2JNGO6YaPIc3Lar1sm3Kkl8gUCbW9D0QQ6k2gOd9HXOTL4GdEMjTj2e9YyGPOVamHM9JdQ95Br1j3E";

// ✅ Request notification permission and get token
export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey });
    console.log("✅ FCM Token:", token);
    return token;
  } catch (err) {
    console.error("❌ Token error details:", err);
    return null;
  }
};

// ✅ Foreground message listener
export const onMessageListener = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("📩 Foreground message received:", payload);
    if (callback) callback(payload);
  });
};


