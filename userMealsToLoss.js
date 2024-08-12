// To import the functions from SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
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

const userDoc = await getDoc(doc(db, "users", userId)); // Assuming "users" is your Firestore collection name
const userData = userDoc.data();
console.log("user docs", userData.weightLossMeals);

const logOut = document.getElementById("logOutButton");

logOut.addEventListener("click", function () {
  console.log("storage Cleared !");
  localStorage.clear();
  // Redirect the user to the login page 
  window.location.href = "logIn.html";
});

const mealTypeSelect = document.getElementById("meal-type");
const mealOptionsContainer = document.getElementById("meal-options");
var mealList = [];

mealTypeSelect.addEventListener("change", function () {
  const selectedMeal = this.value;
  const selectedOptions = userData?.weightLossMeals[selectedMeal];

  mealOptionsContainer.innerHTML = "";

  selectedOptions.forEach((option) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <h3>${option.name}</h3>
            <img src="${option.image}" alt="${option.name}">
            <p><strong>Ingredients:</strong> ${option.ingredients}</p>
            <p><strong>Calories:</strong> ${option.calories}</p>
            <p> </p>
            <button class="feedback-button" id="feedback">Give Feedback</button>
            <p> </p>
        `;
    mealOptionsContainer.appendChild(card);
  });
});

mealOptionsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("feedback-button")) {
    // Handle the click event for the feedback button
    window.location.href = "Feedback.html";
    console.log("Feedback button clicked!");
  }
});
