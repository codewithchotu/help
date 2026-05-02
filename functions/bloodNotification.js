// functions/bloodNotification.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

/**
 * Cloud Function to send notifications when a new blood request is created.
 */
exports.sendBloodRequestNotification = functions.firestore
  .document("bloodRequests/{requestId}")
  .onCreate(async (snapshot, context) => {
    const requestData = snapshot.data();

    const bloodGroup = requestData.bloodGroup;
    const city = requestData.city;

    console.log("🩸 New blood request received:", requestData);

    // 🔍 Get all donors with matching bloodGroup and city
    const tokensSnapshot = await db
      .collection("fcmTokens")
      .where("bloodGroup", "==", bloodGroup)
      .where("city", "==", city)
      .get();

    if (tokensSnapshot.empty) {
      console.log("No donors found for", bloodGroup, city);
      return null;
    }

    const tokens = tokensSnapshot.docs.map(doc => doc.data().token);

    const payload = {
      notification: {
        title: "Urgent Blood Request 🩸",
        body: `Need ${bloodGroup} blood in ${city}! Please help if you can.`,
      },
    };

    // 🚀 Send notifications to all tokens
    const response = await admin.messaging().sendToDevice(tokens, payload);
    console.log("✅ Notifications sent:", response.successCount);

    return null;
  });
