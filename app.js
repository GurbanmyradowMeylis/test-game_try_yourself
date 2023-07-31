// import data from "./tests.json" assert { type: "json" };
// // let iterator = -1;
// let users = [];
// let currentUser = "";
// let currentDificulity = "";

// // ! inputs validation
// function validation() {
//   let username = document.getElementById("name").value;
//   if (
//     username.length <= 35 &&
//     username.length != 0 &&
//     isNaN(Number(username))
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

// // ! form Sign up
// function signUpValidation() {
//   let username = document.getElementById("name").value;
//   let dificulity = document.getElementById("inputOfDificulity").value;
//   if (users.length === 0) {
//     users.push({
//       username,
//     });
//     currentUser = username;
//     currentDificulity = dificulity;
//     startingTest();
//   } else if (users.every((item) => item.username !== username)) {
//     users.push({
//       username,
//     });
//     currentUser = username;
//     currentDificulity = dificulity;
//     startingTest();
//   } else {
//     alert("This name is taken");
//   }
// }
// document.getElementById("signUp").onclick = fromSignUp;
// function fromSignUp() {
//   if (validation()) {
//     signUpValidation();
//   } else {
//     alert("write symbols more than 0 and less than 35");
//   }
// }
// // ! form Sign in
// function signInValidation() {
//   let username = document.getElementById("name").value;
//   if (users.length > 0) {
//     let array = users.filter((item) => item.username === username);
//     if (array.length === 1) {
//       currentUser = array[0].username;
//       currentDificulity = document.getElementById("inputOfDificulity").value;
//       startingTest();
//     } else {
//       alert("Not found");
//     }
//   } else {
//     alert("Not found");
//   }
// }
// document.getElementById("signIn").onclick = fromSignIn;
// function fromSignIn() {
//   if (validation()) {
//     signInValidation();
//   } else {
//     alert("write symbols more than 0 and less than 35");
//   }
// }

// function startingTest() {
//   let sectionOfTests = document.getElementById("displayOfTest");
//   let form = document.getElementById("form");
//   form.style.display = "none";
//   sectionOfTests.style.display = "flex";
//   console.log(`username : ${currentUser}; dificulty : ${currentDificulity}`);
// }
let parent__list = document.getElementsByClassName("list__item").item(0);
let active = false;
parent__list.onclick = () => {
  let level = [
    {
      dificulty: "easy",
      points: 10,
    },
    {
      dificulty: "hard",
      points: 10,
    },
  ];
  let status = document.querySelector("svg").classList;
  let listItem = document.querySelector(".item__user").classList;
  active = active ? false : true;
  status.toggle("list__arrow-click");

  listItem.toggle("item__user-active");
  if (active) {
    let container = document.createElement("div");
    container.className = "item__results";
    container;
    container.id = `container-id`;
    level.forEach((item, index) => {
      let points = document.createElement("p");
      let paragraghs = document.createElement("p");
      points.innerText = item.points;
      paragraghs.innerText = item.dificulty;

      container.append(paragraghs);
      container.append(points);
    });
    parent__list.append(container);
  } else {
    document.getElementById("container-id").remove();
  }
};
