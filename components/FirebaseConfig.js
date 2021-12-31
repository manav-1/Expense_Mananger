import firebase from "firebase";

const FirebaseConfig = {
  apiKey: "AIzaSyCKJO29cykxufeTNh7SALb_T61Z33VZ3K8",
  authDomain: "zomato-app-trial.firebaseapp.com",
  projectId: "zomato-app-trial",
  storageBucket: "zomato-app-trial.appspot.com",
  messagingSenderId: "298744699635",
  appId: "1:298744699635:web:37141453747d7f9a3b7586",
  measurementId: "G-CV3G7MNHDK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
export default firebase;
