// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"; // Import from version 10.11.1
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

const db = getFirestore(app);

// Submit Button
const submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
  //inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  event.preventDefault();

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const userRef = doc(db, "users", email); // users is collection name
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      try {
        await setDoc(userRef, userData);
        console.log("User data added successfully!");
      } catch (error) {
        console.error("Error adding user data: ", error);
      }
      // Signed up
      const user = userCredential.user;
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Creating account!!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
    });
});
