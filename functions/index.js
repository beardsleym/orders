const functions = require("firebase-functions");
const log = require("firebase-functions/lib/logger");
const admin = require("firebase-admin");
const axios = require("axios");

// Error deploying, Firebase app already exists
!admin.apps.length ? admin.initializeApp() : admin.app();

// When new order created - cloud functions
exports.ordersOnCreate = functions.firestore
    .document("orders/{id}")
    .onCreate((snap, context) => {
        const order = snap.data();
        log.log({order});
        // Send slack message
        axios.post(
            `https://hooks.slack.com/services/${process.env.SLACK_HOOK}`,
            JSON.stringify({
                text: `✨ \`${order.type}\` order from ${order.name} \n ${order.text} \n https://orders-pit.pages.dev`,
            })
        );
    });
