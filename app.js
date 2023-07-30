import data from "./tests.json" assert { type: "json" };
// let iterator = -1;
let users = [{ username: "s" }];
let currentUser = "";

// ! inputs validation
function validation() {
  let username = document.getElementById("name").value;
  if (
    username.length <= 35 &&
    username.length != 0 &&
    isNaN(Number(username))
  ) {
    return true;
  } else {
    return false;
  }
}

// ! form Sign up
function signUpValidation() {
  let username = document.getElementById("name").value;
  if (users.length === 0) {
    users.push({
      username,
    });
    currentUser = username;
    console.log(users, currentUser);
  } else if (users.every((item) => item.username !== username)) {
    users.push({
      username,
    });
    currentUser = username;
    console.log(users, currentUser);
  } else {
    alert("This name is taken");
  }
}
document.getElementById("signUp").onclick = fromSignUp;
function fromSignUp() {
  if (validation()) {
    signUpValidation();
    startingTest();
  } else {
    alert("write symbols more than 0 and less than 35");
  }
}
// ! form Sign in
function signInValidation() {
  let username = document.getElementById("name").value;
  if (users.length > 0) {
    let array = users.filter((item) => item.username === username);
    if (array.length === 1) {
      currentUser = array[0].username;
    } else {
      alert("Not found");
    }
  } else {
    alert("Not found");
  }
}
document.getElementById("signIn").onclick = fromSignIn;
function fromSignIn() {
  if (validation()) {
    signInValidation();
    startingTest();
  } else {
    alert("write symbols more than 0 and less than 35");
  }
}

function startingTest() {
  let form = document.getElementById("form");
  form.remove();
  sectionOfTests.style.display = "flex";
}

{
  // {//  ! diplayOftests left side
  // //  h1Name id username
  // let h1Username = document.getElementById("username");
  // //  h1Dificulity id whichDificulityChose
  // let h1Dificulity = document.getElementById("whichDificulityChose");
  // //  H1test id howManyTestsPast
  // //  a id list
  // // h1Username.innerText = `username : ${username}`;
  // // h1Dificulity.innerText = `dificulity : ${dificulity}`;
  // // this side will be continued
  // // right side
  // let divOfQuestions = document.getElementById("centered");
  // }
  // if (dificulity == "easy") {
  //   let divOfButtons;
  //   for (let i = 0; i < 10; i++) {
  //     let h1 = document.createElement("h1");
  //     h1.className = "question";
  //     divOfQuestions.append(h1);
  //     let correctButtons = document.createElement("button");
  //     correctButtons.className = "answer";
  //     divOfButtons = document.createElement("div");
  //     divOfButtons.className = "answers";
  //     divOfButtons.append(correctButtons);
  //     divOfQuestions.append(divOfButtons);
  //     data.tests.easy.questions[i].answers.forEach((item) => {
  //       h1.innerHTML = item;
  //       child.onclick = () => {
  //         if (item.isRight) {
  //           console.log("Right answer");
  //         } else {
  //           console.log("wrong");
  //         }
  //       };
  //       parent.append(child);
  //     });
  //   }
  //   // let inCorrectButtons = document.createElement("button");
  //   // inCorrectButtons.className = "answer";
  //   // divOfQuestions.append(inCorrectButtons);
  //   // divOfButtons.append(inCorrectButtons);
  //   // divOfQuestions.append(divOfButtons);
  //   // if (correctButtons.click == true || inCorrectButtons.click == "true") {
  //   // correctButtons.onclick = () => {
  //   //   correctButtons.style.cssText = "background-color: #5cbf2a;";
  //   //   correctButtons.style.cssText = `
  //   //   background-color:#44c767;
  //   //   border:4px solid #18ab29;
  //   //   text-shadow:1px 0px 8px #2f6627;`;
  //   //   inCorrectButtons.style.backgroundColor = "red";
  //   //       };
  //   //       inCorrectButtons.onclick = () => {
  //   //         correctButtons.style.cssText = "background-color: #5cbf2a;";
  //   //         correctButtons.style.cssText = `
  //   //         background-color:#44c767;
  //   //         border:4px solid #18ab29;
  //   //         text-shadow:1px 0px 8px #2f6627;`;
  //   //         inCorrectButtons.style.backgroundColor = "red";
  //   //       };
  //   //     }
  //   //     if ((correctButtons.style.backgroundColor = "#44c767")) {
  //   //     }
  // }
  // if (dificulityInputValue == "medium") {
  // }
  // if (dificulityInputValue == "hard") {
  // }
}
