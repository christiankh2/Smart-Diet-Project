// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"; // Import from version 10.11.1


 // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCbD2VUedW_qGf50Ov_LNL-tTGX9SSPtfY",
    authDomain: "dietrecommendation-d72e5.firebaseapp.com",
    projectId: "dietrecommendation-d72e5",
    storageBucket: "dietrecommendation-d72e5.appspot.com",
    messagingSenderId: "367741732672",
    appId: "1:367741732672:web:e939b7a9a12dbdc1fb5ca5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Submit Button
const submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
  //inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("email", email);
  event.preventDefault();

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Logged In Successfully!!");
      window.location.href = "index.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
      // ..
    });
});
