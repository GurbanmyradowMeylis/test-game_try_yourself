import data from "./tests.json" assert { type: "json" };

let users = [],
  currentUser = "",
  currentDificulity = "",
  currentId = 0,
  currentPoints = 0,
  passedTest = 0;

// ! inputs validation
function validation() {
  let username = document.getElementById("name").value;
  if (
    username.length <= 15 &&
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
    alert("write symbols more than 0 and less than 15");
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
    alert("write symbols more than 0 and less than 15");
  }
}

function startingTest() {
  informationOfUser();
  creatingInfo();
  popUpOfUserOpener();
  showingQuestions();
  document.getElementById("name").value = "";
}

// ! info dropdown
function creatingInfo() {
  if (users.length === 0) {
    let parent__list = document.getElementById("listOfUsersInfo"),
      info = document.createElement("p");
    info.innerText = "while no one is there";
    info.className = "list__item__nobody less-weight";
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
      itemUser.onclick = () => {
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
          tempArray.forEach((item1, index1) => {
            let wrapperOfInfo = document.createElement("div");
            let points = document.createElement("p");
            let dificulity = document.createElement("p");
            let rightAnswers = document.createElement("p");
            let spanOfPoints = document.createElement("span");
            let spanOfDificulity = document.createElement("span");
            let spanOfRightAnswers = document.createElement("span");
            let divider = document.createElement("div");

            points.className = "list__points";

            dificulity.className = "list__dificulity";
            spanOfDificulity.className = "less-weight";
            spanOfPoints.className = "less-weight";
            rightAnswers.className = "list__passed";
            spanOfRightAnswers.className = "less-weight";
            divider.className = "item__divider";
            spanOfDificulity.innerText = item1.dificulity;
            spanOfPoints.innerText = item1.points;
            spanOfRightAnswers.innerText = item1.rightAnswers;
            points.innerText = `Points : `;
            dificulity.innerText = `Dificulity : `;
            rightAnswers.innerText = `Right Answers : `;
            dificulity.append(spanOfDificulity);
            points.append(spanOfPoints);
            rightAnswers.append(spanOfRightAnswers);
            wrapperOfInfo.append(dificulity);
            wrapperOfInfo.append(points);
            wrapperOfInfo.append(rightAnswers);
            container.append(wrapperOfInfo);
            if (index1 !== tempArray.length - 1) container.append(divider);
          });
          listItem.append(container);
        } else {
          try {
            document.getElementById(`container-id-${index}`).remove();
          } catch (error) {}
        }
      };
      parent__list.append(listItem);
    });
  }
}

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
      let img = document.createElement("img");
      img.src = "./circle-check-regular.svg";
      img.className = "test__img";
      test__button.append(img);
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
    dataPusher();
    popUp();
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

// ! tops up info section
function informationOfUser() {
  let sectionOfTests = document.getElementById("wrapper");
  let form = document.getElementById("form");

  form.style.display = "none";
  sectionOfTests.style.display = "flex";

  let info__username = document.getElementById("username");
  let points = document.getElementById("points");
  let info__dificulity = document.getElementById("dificulity");
  let info__counterOfPassedTest = document.getElementById("passed");
  let preparedDificulity = currentDificulity.slice(0, 1).toUpperCase();
  let spanOfDificulity = document.createElement("span");

  preparedDificulity += currentDificulity.slice(1);
  spanOfDificulity.innerText = preparedDificulity;

  colorChanger(spanOfDificulity);
  info__username.innerText = currentUser;
  info__dificulity.innerText = `Dificulity : `;
  info__dificulity.append(spanOfDificulity);
  info__counterOfPassedTest.innerText = `Tests : ${passedTest} / ${
    gettingCurrentTest().length
  }`;
  points.innerText = `Points : ${currentPoints}`;
}

// ! to manage color of dificulity
function colorChanger(span) {
  if (currentDificulity == "easy") {
    span.style.color = "#149e0a";
  } else if (currentDificulity == "medium") {
    span.style.color = "#FFCF00";
  } else if (currentDificulity == "hard") {
    span.style.color = "#EC0000";
  }
}

// ! calc answers
function calculatingRightAnswers() {
  let passed = document.getElementById("passed");
  passed.innerText = `Tests : ${passedTest} / ${gettingCurrentTest().length}`;
  let points = document.getElementById("points");
  points.innerText = `Points : ${currentPoints}`;
}

// ! pushes data to users
function dataPusher() {
  let array = users.filter((item) => item.username === currentUser);
  if (array.length === 1) {
    let itemIndex = users.indexOf(array[0]);

    if (currentDificulity === "easy") {
      users[itemIndex].easy = {
        questionsAnswers: gettingCurrentTest().length,
        rightAnswers: passedTest,
        points: currentPoints,
        dificulity: currentDificulity,
      };
    } else if (currentDificulity === "medium") {
      users[itemIndex].medium = {
        questionsAnswers: gettingCurrentTest().length,
        rightAnswers: passedTest,
        points: currentPoints,
        dificulity: currentDificulity,
      };
    } else if (currentDificulity === "hard") {
      users[itemIndex].hard = {
        questionsAnswers: gettingCurrentTest().length,
        rightAnswers: passedTest,
        points: currentPoints,
        dificulity: currentDificulity,
      };
    }
  } else {
    let newUser = {
      username: currentUser,
    };

    if (currentDificulity === "easy") {
      newUser.easy = {
        questionsAnswers: gettingCurrentTest().length,
        rightAnswers: passedTest,
        points: currentPoints,
        dificulity: currentDificulity,
      };
    } else if (currentDificulity === "medium") {
      newUser.medium = {
        questionsAnswers: gettingCurrentTest().length,
        rightAnswers: passedTest,
        points: currentPoints,
        dificulity: currentDificulity,
      };
    } else if (currentDificulity === "hard") {
      newUser.hard = {
        questionsAnswers: gettingCurrentTest().length,
        rightAnswers: passedTest,
        points: currentPoints,
        dificulity: currentDificulity,
      };
    }
    users.push(newUser);
  }
}

// ! popUp
function popUp() {
  let popup = document.getElementById("popup1");
  popup.style.display = "flex";

  let popUp__results = document.getElementById("popUp__results");
  let content = document.createElement("div");
  let points = document.createElement("p");
  let dificulity = document.createElement("p");
  let username = document.createElement("p");
  let rightAnswers = document.createElement("p");

  content.className = "try-again__pop-up___content";
  points.innerText = `Points : ${currentPoints}`;
  dificulity.innerText = `Dificulity : ${currentDificulity}`;
  rightAnswers.innerText = `Right Answers : ${passedTest}`;
  username.innerText = `Username : ${currentUser}`;
  content.append(username);
  content.append(dificulity);
  content.append(points);
  content.append(rightAnswers);
  popUp__results.append(content);
  let parentOfButtons = document.getElementById("popUp__buttons");
  let parentOfButtons__tryAgain = parentOfButtons
    .getElementsByTagName("button")
    .item(0);
  let parentOfButtons__goToForm = parentOfButtons
    .getElementsByTagName("button")
    .item(1);
  parentOfButtons__goToForm.onclick = () => {
    document.getElementById("wrapper").style.display = "none";
    popup.style.display = "none";
    document.getElementById("form").style.display = "flex";
    // !
    nullingAllGlobalVars(false);
    removingPopUpDetails();
    removingInfoAndQuestions();
  };
  // ! try again clicked pop up
  parentOfButtons__tryAgain.onclick = () => {
    let tryAgainPopUp = document.getElementById("tryAgainPopUp");
    popup.style.display = "none";
    tryAgainPopUp.style.display = "flex";
  };
  let startTryAgain = document.getElementById("PopUPStart");
  // ! start clicked in try again pop up
  startTryAgain.onclick = () => {
    let inputDifficulty = document.getElementById("tryAgainDificulity").value;
    tryAgainPopUp.style.display = "none";
    nullingAllGlobalVars(true);
    currentDificulity = inputDifficulty;
    removingPopUpDetails();
    removingInfoAndQuestions();
    startingTest();
  };
}

// ! for popUp this function makes passed tests disappear
function removingInfoAndQuestions() {
  let test = document.getElementsByClassName("test").item(0);
  let test__content = document.createElement("div");
  let listOfUsersInfo = document.createElement("ol"),
    listOfUsersInfoParent = document.querySelector(".info__list");
  test.getElementsByClassName("test__content").item(0).remove();
  test__content.className = "test__content";
  test.append(test__content);

  document.getElementById("listOfUsersInfo").remove();
  listOfUsersInfo.id = "listOfUsersInfo";
  listOfUsersInfo.className = "list__lists";
  listOfUsersInfoParent.append(listOfUsersInfo);
}

// ! for popUp resets all the global variables
function nullingAllGlobalVars(isTryAgain) {
  if (isTryAgain) {
    currentId = 0;
    currentPoints = 0;
    passedTest = 0;
  } else {
    currentDificulity = "";
    currentId = 0;
    currentUser = "";
    currentPoints = 0;
    passedTest = 0;
  }
}

function removingPopUpDetails() {
  let popUp__results = document.getElementById("popUp__results");
  popUp__results.remove();
  let popUp__results1 = document.createElement("div");
  popUp__results1.id = "popUp__results";
  popUp__results1.className = "popUp__results";
  document.getElementsByClassName("content").item(0).append(popUp__results1);
}

function popUpOfUserOpener() {
  if (window.innerWidth <= 480) {
    users.forEach((item, index) => {
      let itemUser = document.getElementById(`item__user-${index}`);

      // ! on click arrow
      itemUser.onclick = () => {
        infoSideBarOpener();
        document.getElementById("popUpOfUsers").style.display = "flex";
        let tempArray = [];
        if (checkingUserProperty(item.easy)) tempArray.push(item.easy);
        if (checkingUserProperty(item.medium)) tempArray.push(item.medium);
        if (checkingUserProperty(item.hard)) tempArray.push(item.hard);
        console.log(tempArray);
        let username = document
          .getElementsByClassName("pop-up__header")
          .item(2);
        tempArray.forEach((item1) => {
          let tests = document.createElement("p"),
            dificulity = document.createElement("p"),
            points = document.createElement("p"),
            parent = document.createElement("li"),
            parentOfPassedTests = document.createElement("div"),
            parentOfPoints = document.createElement("div"),
            testsImg = document.createElement("img"),
            pointsImg = document.createElement("img"),
            divider = document.createElement("hr");
          username.innerText = item.username;
          testsImg.src = "./tick.svg";

          pointsImg.src = "./circle.svg";
          parent.className = "pop-up__list___item";
          parentOfPassedTests.className = "pop-up__passed-tests";
          parentOfPoints.className = "pop-up__points";

          if (item1.dificulity == "easy") {
            dificulity.style.color = "#149e0a";
          } else if (item1.dificulity == "medium") {
            dificulity.style.color = "#FFCF00";
          } else if (item1.dificulity == "hard") {
            dificulity.style.color = "#EC0000";
          }

          dificulity.className = "pop-up__dificulity";
          points.className = "content__points";
          tests.className = "content__test";
          dificulity.innerText = item1.dificulity;
          points.innerText = item1.points;
          tests.innerText = item1.rightAnswers;
          document.getElementById("listOfUsersInPopUp").append(parent);
          parent.append(
            dificulity,
            parentOfPassedTests,
            divider,
            parentOfPoints
          );
          parentOfPassedTests.append(testsImg, tests);
          parentOfPoints.append(pointsImg, points);
        });
      };
    });

    document.getElementById("closer").onclick = () => {
      document.getElementsByClassName("pop-up__list___item").item(0).remove();
      let parent = document.createElement("li");
      parent.className = "pop-up__list___item";
      document.getElementById("popUpOfUsers").style.display = "none";
    };
    document.getElementById("popUpOfUsers").onclick = () => {
      document.getElementsByClassName("pop-up__list___item").item(0).remove();
      let parent = document.createElement("li");
      parent.className = "pop-up__list___item";
      document.getElementById("popUpOfUsers").style.display = "none";
    };
  }
}

function infoSideBarOpener() {
  let infoSideBar = document.getElementById("infoSideBar");
  let infoArrow = document.getElementById("infoArrow");
  infoSideBar.classList.toggle("left");
  let infoArrowChild = infoArrow.getElementsByTagName("img").item(0);
  if (infoArrowChild.className != "info__arrow-rotate") {
    infoArrowChild.className = "info__arrow-rotate";
  } else {
    infoArrowChild.className = "info__arrow-default";
  }
}

document.getElementById("infoArrow").onclick = infoSideBarOpener;
