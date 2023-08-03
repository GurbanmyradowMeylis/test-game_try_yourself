import data from "./tests.json" assert { type: "json" };

let users = [
  {
    username: "serdar",
    easy: {
      questionsNumbers: 10,
      rightAnswers: 9,
      points: 27,
      dificulity: "easy",
    },
    medium: {
      questionsNumbers: 10,
      rightAnswers: 9,
      points: 27,
      dificulity: "easy",
    },
    hard: {
      questionsNumbers: 10,
      rightAnswers: 9,
      points: 27,
      dificulity: "easy",
    },
  },
  {
    username: "meylis",
    medium: {
      questionsNumbers: 10,
      rightAnswers: 5,
      points: 15,
      dificulity: "medium",
    },
  },
  {
    username: "jennet",
    hard: {
      questionsNumbers: 10,
      rightAnswers: 7,
      points: 21,
      dificulity: "hard",
    },
  },
  {
    username: "serdar",
    easy: {
      questionsNumbers: 10,
      rightAnswers: 9,
      points: 27,
      dificulity: "easy",
    },
  },
  {
    username: "meylis",
    medium: {
      questionsNumbers: 10,
      rightAnswers: 5,
      points: 15,
      dificulity: "medium",
    },
  },
  {
    username: "jennet",
    hard: {
      questionsNumbers: 10,
      rightAnswers: 7,
      points: 21,
      dificulity: "hard",
    },
  },
  {
    username: "serdar",
    easy: {
      questionsNumbers: 10,
      rightAnswers: 9,
      points: 27,
      dificulity: "easy",
    },
  },
  {
    username: "meylis",
    medium: {
      questionsNumbers: 10,
      rightAnswers: 5,
      points: 15,
      dificulity: "medium",
    },
  },
  {
    username: "jennet",
    hard: {
      questionsNumbers: 10,
      rightAnswers: 7,
      points: 21,
      dificulity: "hard",
    },
  },
];
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
    currentUser = username;
    currentDificulity = dificulity;
    startingTest();
  } else if (users.every((item) => item.username !== username)) {
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
  informationOfUser();
  creatingInfo();
  showingQuestions();
}
// ! info dropdown
function creatingInfo() {
  if (users.length === 0) {
    let parent__list = document.getElementById("listOfUsersInfo"),
      info = document.createElement("p");
    info.innerText = "while no one is there";
    parent__list.append(info);
  } else {
    let parent__list = document.getElementById("listOfUsersInfo");

    users.forEach((item, index) => {
      let listItem = document.createElement("li"),
        itemUser = document.createElement("div"),
        username = document.createElement("p"),
        arrow = document.createElement("img"),
        active = false;

      listItem.className = "list__item";
      listItem.id = `list__item-${index}`;
      itemUser.className = "item__user";
      itemUser.id = `item__user-${index}`;
      username.innerText = item.username;
      arrow.src = "./arrow.svg";
      arrow.className = "list__arrow";
      arrow.id = `item__arrow-${index}`;

      itemUser.append(username);
      itemUser.append(arrow);
      listItem.append(itemUser);

      // ! on click arrow
      listItem.onclick = () => {
        let status = document.querySelector(`#item__arrow-${index}`).classList;
        let itemUser1 = document.querySelector(
            `#item__user-${index}`
          ).classList,
          tempArray = [];
        active = active ? false : true;
        status.toggle("list__arrow-click");

        itemUser1.toggle("item__user-active");
        if (checkingUserProperty(item.easy)) tempArray.push(item.easy);
        if (checkingUserProperty(item.medium)) tempArray.push(item.medium);
        if (checkingUserProperty(item.hard)) tempArray.push(item.hard);

        if (active) {
          let container = document.createElement("div");
          container.className = "item__results";
          container.id = `container-id-${index}`;
          tempArray.forEach((item1) => {
            let points = document.createElement("p");
            let dificulity = document.createElement("p");
            let rightAnswers = document.createElement("p");
            let spanOfPoints = document.createElement("span");
            let spanOfDificulity = document.createElement("span");
            let spanOfRightAnswers = document.createElement("span");
            spanOfDificulity.innerText = item1.dificulity;
            spanOfPoints.innerText = item1.points;
            spanOfRightAnswers.innerText = item1.rightAnswers;
            points.innerText = `Points : `;
            dificulity.innerText = `Dificulity : `;
            rightAnswers.innerText = `Right Answers : `;
            dificulity.append(spanOfDificulity);
            points.append(spanOfPoints);
            rightAnswers.append(spanOfRightAnswers);
            container.append(dificulity);
            container.append(points);
            container.append(rightAnswers);
          });
          listItem.append(container);
        } else {
          document.getElementById(`container-id-${index}`).remove();
        }
      };
      parent__list.append(listItem);
    });
  }
}
// ! end info dropdown

// ! checking is null
function checkingUserProperty(property) {
  if (property && typeof property !== "undefined") {
    return true;
  } else {
    return false;
  }
}

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
  let buttonsId = `container-${currentId}`;
  test__buttons.id = buttonsId;
  test__buttons.className = "test__buttons";

  item.answers.forEach((item1) => {
    let test__button = document.createElement("button");
    test__button.className = "test__button";
    test__button.innerText = item1.answer;
    test__button.onclick = () => {
      test__button.style.cssText = `
      transform: scale(1.2);
     `;
      // ! checking passed test if right ++
      if (item1.isRight) {
        passedTest++;
        // ! checking how many points get if right += 3
        currentPoints += 3;
        calculatingRightAnswers();
      }
      answerValidation(buttonsId, currentId);
      window.location.href = `#container-${currentId}`;
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
    // users.push({
    //   currentDificulity,
    //   questionsNumbers: gettingCurrentTest().length,
    //   rightAnswers: passedTest,
    //   points: currentPoints,
    // });
    dataPusher();
    popUp();

    currentUser = "";
    currentDificulity = "";
    currentId = 0;
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
  let points = document.getElementById("points");
  points.innerText = `Points : ${currentPoints}`;
}

function dataPusher() {
  users.every((item) => item.username != currentUser);
  let newUser = {
    username: currentUser,
  };
  if (currentDificulity === "easy") {
    newUser.easy = {
      questionsAnswers: gettingCurrentTest().length,
      rightAnswers: passedTest,
      points: currentPoints,
    };
  } else if (currentDificulity === "medium") {
    newUser.medium = {
      questionsAnswers: gettingCurrentTest().length,
      rightAnswers: passedTest,
      points: currentPoints,
    };
  } else if (currentDificulity === "hard") {
    newUser.hard = {
      questionsAnswers: gettingCurrentTest().length,
      rightAnswers: passedTest,
      points: currentPoints,
    };
  }
  users.push(newUser);
}

function popUp() {
  let popup = document.getElementById("popup1");
  popup.style.display = "block";

  let popUp__results = document.getElementById("popUp__results");
  let points = document.createElement("p");
  let dificulity = document.createElement("p");
  let username = document.createElement("p");
  let rightAnswers = document.createElement("p");

  points.innerText = `Points : ${currentPoints}`;
  dificulity.innerText = `Dificulity : ${currentDificulity}`;
  rightAnswers.innerText = `Right Answers : ${passedTest}`;
  username.innerText = `User name : ${currentUser}`;
  popUp__results.append(username);
  popUp__results.append(dificulity);
  popUp__results.append(points);
  popUp__results.append(rightAnswers);
  console.log(popUp__results);
  let closerPopUP = document.getElementById("close");
  closerPopUP.onclick = () => (popup.style.display = "none");
  let parentOfButtons = document.getElementById("popUp__buttons");
  let parentOfButtons__tryAgain = parentOfButtons
    .getElementsByTagName("button")
    .item(0);
  let parentOfButtons__goToForm = parentOfButtons
    .getElementsByTagName("button")
    .item(1);
}
