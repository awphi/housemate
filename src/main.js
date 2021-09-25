/* eslint-disable no-unused-vars */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/tailwind.css";

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZf-eElfG06Vrf2yrK0ZYAMpitM6qm2BY",
  authDomain: "housemate-48c91.firebaseapp.com",
  databaseURL:
    "https://housemate-48c91-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "housemate-48c91",
  storageBucket: "housemate-48c91.appspot.com",
  messagingSenderId: "805291234428",
  appId: "1:805291234428:web:c98c807e12c8f1fe3565f9",
  measurementId: "G-SWQ14E9ZEL",
};

const firebaseApp = initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Le1p4ocAAAAAK2z8D8JhxbkXyq2OBRmGe9GdmFk"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

const app = createApp(App);

app.use(store).use(router);

app.mount("#app");
