import data from "./tests.json" assert { type: "json" };
let iterator = -1;
let sectionOfTests = document.getElementById("displayOfTest");
sectionOfTests.style.display = "none";
// ! got to remove
let form = document.getElementById("form");
document.getElementById("submit").onclick = () => {
  let nameInputValue = document.getElementById("name").value;

  let dificulityInputValue = document.getElementById("inputOfDificulity").value;

  if (validation(nameInputValue) && validation(dificulityInputValue)) {
    form.remove();
    sectionOfTests.style.display = "block";
  }
  console.log(nameInputValue.trim(), dificulityInputValue);
  //  ! diplayOftests left side
  //  h1Name id username
  let h1Username = document.getElementById("username");
  //  h1Dificulity id whichDificulityChose
  let h1Dificulity = document.getElementById("whichDificulityChose");
  //  H1test id howManyTestsPast
  let h1TestsPast = document.getElementById("howManyTestsPast");
  //  a id list
  let linkList = document.getElementById("list");

  h1Username.innerText = `username : ${nameInputValue}`;

  h1Dificulity.innerText = `dificulity : ${dificulityInputValue}`;

  // this side will be continued
  // right side
  let divOfQuestions = document.getElementById("centered");

  if (dificulityInputValue == "easy") {
    let divOfButtons,
      j = 0;

    for (let i = 0; i < 10; i++) {
      let h1 = document.createElement("h1");

      h1.innerText = data.tests.easy;

      h1.className = "question";

      divOfQuestions.append(h1);

      let correctButtons = document.createElement("button");

      correctButtons.innerText = data.tests.easy.correctAnswer[i];

      correctButtons.className = "answer";

      divOfButtons = document.createElement("div");
      divOfButtons.className = "answers";
      divOfButtons.append(correctButtons);
      divOfQuestions.append(divOfButtons);

      for (let c = 0; c < 2; c++) {
        let inCorrectButtons = document.createElement("button");
        inCorrectButtons.innerText = data.tests.easy.answer[j];
        inCorrectButtons.className = "answer";
        divOfQuestions.append(inCorrectButtons);
        divOfButtons.append(inCorrectButtons);
        divOfQuestions.append(divOfButtons);
        j++;
        if (correctButtons.click == true || inCorrectButtons.click == "true") {
          correctButtons.onclick = () => {
            correctButtons.style.cssText = "background-color: #5cbf2a;";
            correctButtons.style.cssText = `
            background-color:#44c767;
            border:4px solid #18ab29;
            text-shadow:1px 0px 8px #2f6627;`;
            inCorrectButtons.style.backgroundColor = "red";
          };
          inCorrectButtons.onclick = () => {
            correctButtons.style.cssText = "background-color: #5cbf2a;";
            correctButtons.style.cssText = `
            background-color:#44c767;
            border:4px solid #18ab29;
            text-shadow:1px 0px 8px #2f6627;`;
            inCorrectButtons.style.backgroundColor = "red";
          };
        }
        if ((correctButtons.style.backgroundColor = "#44c767")) {
        }
      }
    }
  }
  // if (dificulityInputValue == "medium") {
  // }
  // if (dificulityInputValue == "hard") {
  // }

  // let parent = document.querySelector("div");
  // data.tests.questions[0].answers.forEach((item) => {
  //   let child = document.createElement("h1");
  //   child.innerHTML = item.answer;
  //   child.onclick = () => {
  //     if (item.isRight) {
  //       console.log("Right answer");
  //     } else {
  //       console.log("wrong");
  //     }
  //   };
  //   parent.append(child);
  // });
};

// ! inputs validation
function validation(inputValue) {
  if (
    inputValue.length <= 35 &&
    inputValue.length != 0 &&
    isNaN(Number(inputValue))
  ) {
    return true;
  } else {
    alert("you didnt write a normal text. Am i right?");
  }
}

// document.forms["gamesForm"].addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevents the default form submission behavior

//   // You can perform any necessary processing or validation here

//   // If you want to submit the form programmatically without changing the path,
//   // you can make an AJAX request instead
//   var xhr = new XMLHttpRequest();
//   // Configure the request
//   xhr.open("POST", "/your-form-endpoint", true);
//   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//   // Send the form data
//   xhr.send(new FormData(event.target));
// });
