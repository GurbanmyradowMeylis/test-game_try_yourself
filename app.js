import data from "./tests.json" assert { type: "json" };

let users = [];
// {
//   username: '',
//   easy : {
//     questionsNumbers : 10,
//     rightAnswers : 7
//   }
// }

let currentUser = "";
let currentDificulity = "";
let currentId = 0;
let currentPoints = 0;
let passedTest = 0;
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
  let dificulity = document.getElementById("inputOfDificulity").value;
  if (users.length === 0) {
    users.push({
      username,
    });
    currentUser = username;
    currentDificulity = dificulity;
    startingTest();
  } else if (users.every((item) => item.username !== username)) {
    users.push({
      username,
    });
    currentUser = username;
    currentDificulity = dificulity;
    startingTest();
  } else {
    alert("This name is taken");
  }
}
document.getElementById("signUp").onclick = fromSignUp;
function fromSignUp() {
  if (validation()) {
    signUpValidation();
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
      currentDificulity = document.getElementById("inputOfDificulity").value;
      startingTest();
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
  } else {
    alert("write symbols more than 0 and less than 35");
  }
}

function startingTest() {
  showingQuestions();
  informationOfUser();
}
// ! info dropdown
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
// ! end info dropdown

// ! showes tests
function showingQuestions() {
  let item = gettingCurrentTest()[currentId];
  let test__content = document.getElementsByClassName("test__content").item(0);
  let test__section = document.createElement("div");
  let test__question = document.createElement("h1");

  test__section.className = "test__section";
  test__question.className = "test__question";
  test__question.innerText = item.question;

  test__section.append(test__question);

  let test__buttons = document.createElement("div");
  let buttonsId = `container-of-buttons-${currentId}`;
  test__buttons.id = buttonsId;
  test__buttons.className = "test__buttons";

  item.answers.forEach((item1) => {
    let test__button = document.createElement("button");
    test__button.className = "test__button";
    test__button.innerText = item1.answer;
    test__button.onclick = () => {
      // ! checking passed test if right ++
      if (item1.isRight) {
        passedTest++;
        calculatingRightAnswers();
      }
      if (item1.isRight) {
        currentPoints += 3;
        calculatingRightAnswersOfpoints();
      }
      answerValidation(buttonsId, currentId);
      window.location.href = `#container-of-buttons-${currentId}`;
    };
    test__buttons.append(test__button);
  });

  test__section.append(test__buttons);
  test__content.append(test__section);
}

// ! showes wich is right by clicking one button and others will be show yourself's background color
function answerValidation(id) {
  let children = document.getElementById(id).getElementsByTagName("button");
  let answers = eval(
    `data.tests.${currentDificulity}.questions[${currentId}].answers`
  );
  for (let i = 0; i < children.length; i++) {
    children.item(i).disabled = true;
    if (answers[i].isRight) {
      children.item(i).className = "green-answer";
    } else {
      children.item(i).className = "red-answer";
    }
  }
  // ?  validating isLast question of test
  if (gettingCurrentTest().length - 1 === currentId) {
    currentUser = "";
    currentDificulity = "";
    currentId = 0;
    console.log(currentUser);
    console.log(currentDificulity);
    console.log(currentId);
    console.log(users);
  } else {
    // ? increment current id
    currentId++;
    showingQuestions();
  }
}

// ! getting static difficulties array from json
function gettingCurrentTest() {
  if (currentDificulity === "easy") {
    return data.tests.easy.questions;
  } else if (currentDificulity === "medium") {
    return data.tests.medium.questions;
  } else if (currentDificulity === "hard") {
    return data.tests.hard.questions;
  }
}

// ! end shower tests and here ends function which is has name : answerValidation()

function informationOfUser() {
  let sectionOfTests = document.getElementById("wrapper");
  let form = document.getElementById("form");

  form.style.display = "none";
  sectionOfTests.style.display = "flex";

  let info__username = document.getElementById("username");
  let points = document.getElementById("points");
  let info__dificulity = document.getElementById("dificulity");
  let info__counterOfPassedTest = document.getElementById("passed");
  let preparedUsername = currentUser.slice(0, 1).toUpperCase();
  let preparedDificulity = currentDificulity.slice(0, 1).toUpperCase();
  let spanOfDificulity = document.createElement("span");

  preparedDificulity += currentDificulity.slice(1);
  preparedUsername += currentUser.slice(1);
  spanOfDificulity.innerText = preparedDificulity;

  let answers = eval(
    `data.tests.${currentDificulity}.questions[${currentId}].answers`
  );

  colorChanger(spanOfDificulity);
  info__username.innerText = preparedUsername;
  info__dificulity.innerText = `Dificulity : `;
  info__dificulity.append(spanOfDificulity);
  info__counterOfPassedTest.innerText = `Tests : ${passedTest} / ${
    gettingCurrentTest().length
  }`;
  points.innerText = `Points : ${currentPoints}`;
  console.log(`username : ${currentUser}; dificulty : ${currentDificulity}`);
}

function colorChanger(span) {
  if (currentDificulity == "easy") {
    span.className = "green";
  } else if (currentDificulity == "medium") {
    span.className = "yellow";
  } else if (currentDificulity == "hard") {
    span.className = "red";
  }
}

// ! calc answers
function calculatingRightAnswers() {
  let passed = document.getElementById("passed");
  passed.innerText = `Tests : ${passedTest} / ${gettingCurrentTest().length}`;
}

function calculatingRightAnswersOfpoints() {
  let points = document.getElementById("points");
  points.innerText = `Points : ${currentPoints}`;
}
