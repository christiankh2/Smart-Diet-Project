// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCbD2VUedW_qGf50Ov_LNL-tTGX9SSPtfY",
    authDomain: "dietrecommendation-d72e5.firebaseapp.com",
    projectId: "dietrecommendation-d72e5",
    storageBucket: "dietrecommendation-d72e5.appspot.com",
    messagingSenderId: "367741732672",
    appId: "1:367741732672:web:e939b7a9a12dbdc1fb5ca5",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUser"));
console.log("local storage", loggedInUserData);
const userId = loggedInUserData.email;
const userRef = doc(db, "users", userId);

const logOut = document.getElementById("logOutButton");

logOut.addEventListener("click", function () {
  console.log("storage Cleared !");
  localStorage.clear();
  // Redirect the user to the login page or perform any other logout actions
  window.location.href = "logIn.html";
});

const feedbackbtn = document.getElementById("feedbackbutton");

// Add an event listener to the button
feedbackbtn.addEventListener("click", function () {
  // Call your function here
  submitFeedback();
});

// BMR calculator
async function submitFeedback() {
  var rating = document.querySelector('input[name="rating"]:checked').value;
  var feedback = document.getElementById("feedbackField").value;

  console.log("feedback", feedback);
  const newData = {
    ratings: rating,
    feedback: feedback,
  };

  //Update the document with the new data
  try {
    await updateDoc(userRef, newData);
    console.log("User data updated successfully!");
    alert("Feedback Submitted Sucessfully!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error updating user data: ", error);
  }
}
