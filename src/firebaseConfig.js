import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
const {initializeAppCheck, ReCaptchaV3Provider} = require("firebase/app-check");

const firebaseConfig = {
    apiKey: "AIzaSyBSzTIHXReb7pwdeuCnmFfx3347QPmcBSQ",
    authDomain: "orders-9e335.firebaseapp.com",
    projectId: "orders-9e335",
    storageBucket: "orders-9e335.appspot.com",
    messagingSenderId: "316608889773",
    appId: "1:316608889773:web:2f1f7e0e19cd64a1b05724",
};

const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
        "6LfzZ1gfAAAAAIy21ha17CWH8XSlWHUb9z63jCOy"
    ),
    isTokenAutoRefreshEnabled: true,
});
export const db = getFirestore(app);
