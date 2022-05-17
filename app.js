let body = document.querySelector("body");
let popup = document.querySelector(".popup");
let inputSearch = document.getElementById("search");
let navData = document.querySelector(".nav__time");
let newTaskHeader = document.querySelector(".nav__add");
let newTaskToDo = document.querySelector(".todo-container__button");
let popupCancel = document.querySelector(".popup__button-cancel");
let popupCancelEdit = document.querySelector(".popup__button-cancel-edit");
let popupConfirm = document.querySelector(".popup__button-confirm");
let popupConfirmEdit = document.querySelector(".popup__button-confirm-edit");
let deleteAllTodo = document.querySelector(".done-container__button");
let deleteAllTodoCancel = document.querySelector(
  ".warning-delete__button-cancel"
);
let deleteAllTodoConfirm = document.querySelector(
  ".warning-delete__button-confirm"
);
let deleteWarning = document.querySelector(
  ".warning-in-progress__button-cancel"
);
let overlay = document.querySelector(".overlay");
let select = document.getElementById("select");
let selectEdit = document.getElementById("select-edit");
let todoWrapper = document.querySelector(".todo-wrapper");
let progressWrapper = document.querySelector(".in-progress-wrapper");
let doneWrapper = document.querySelector(".done-wrapper");
let popupTitle = document.getElementById("input-title");
let popupDescription = document.getElementById("input-description");
let popupDeadline = document.getElementById("input-deadline");
let popupUser = document.getElementById("select");
let popupTitleEdit = document.getElementById("input-title-edit");
let popupDescriptionEdit = document.getElementById("input-description-edit");
let popupDeadlineEdit = document.getElementById("input-deadline-edit");
let popupUserEdit = document.getElementById("select-edit");
let todoContTitle = document.querySelector(".todo-container__title");
let inprogContTitle = document.querySelector(".in-progress-container__title");
let doneContTitle = document.querySelector(".done-container__title");

let id = 0;
let data = [];
let localData = localStorage.getItem("data");
let localID = localStorage.getItem("dataID");
if (localData) {
  data = JSON.parse(localData);
  render();
}
if (localID) {
  id = JSON.parse(localID);
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => {
    addUsers(json);
    addUsersEdit(json);
  });

function addUsers(array) {
  array.forEach((el) => {
    let option = document.createElement("option");
    option.value = el.name;
    option.innerText = el.name;
    select.append(option);
  });
}
function addUsersEdit(array) {
  array.forEach((el) => {
    let option = document.createElement("option");
    option.value = el.name;
    option.innerText = el.name;
    selectEdit.append(option);
  });
}
function saveID() {
  setLocal("dataID", id);
}
function setLocal(key, value) {
  let string = JSON.stringify(value);
  localStorage.setItem(key, string);
}
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}
/* *  ADD TASK * */
popupConfirm.addEventListener("click", () => {
  let obj = {
    title: ucFirst(popupTitle.value),
    description: ucFirst(popupDescription.value),
    user: select.value,
    time: popupDeadline.value,
    id: ++id,
    status: "todo",
  };
  if (
    popupTitle.value === "" ||
    select.value === "" ||
    popupDeadline.value === ""
  ) {
    alert("Введите все данные!");
    return;
  }
  data.push(obj);
  setLocal("data", data);
  saveID();
  body.classList.remove("popup-opened");
  popupTitle.value = "";
  popupDescription.value = "";
  popupDeadline.value = "";
  popupUser.value = "";
  render();
});
function render(x = data) {
  todoWrapper.innerHTML = "";
  progressWrapper.innerHTML = "";
  doneWrapper.innerHTML = "";
  x.forEach((el) => {
    if (el.status == "todo") {
      let todo = document.createElement("div");
      todo.classList.add("todo");
      todo.setAttribute("data-id", el.id);
      let todoTitle = document.createElement("div");
      todoTitle.classList.add("todo__title");
      todoTitle.innerText = el.title;

      let todoDescription = document.createElement("div");
      todoDescription.classList.add("todo__description");
      todoDescription.innerText = el.description;

      let todoUser = document.createElement("div");
      todoUser.classList.add("todo__user");

      let todoUserName = document.createElement("span");
      todoUserName.innerText = el.user;

      let todoTime = document.createElement("span");
      todoTime.innerText = el.time;

      let todoAllBtn = document.createElement("div");
      todoAllBtn.classList.add("todo__button");

      let todoBtnEdit = document.createElement("button");
      todoBtnEdit.classList.add("todo__button-edit");
      todoBtnEdit.innerText = "edit";

      let todoBtnDelete = document.createElement("button");
      todoBtnDelete.classList.add("todo__button-delete");
      todoBtnDelete.innerText = "delete";

      let todoBtnNext = document.createElement("button");
      todoBtnNext.classList.add("todo__button-next");
      todoBtnNext.innerText = "›";

      todo.append(todoTitle);
      todo.append(todoDescription);
      todoUser.append(todoUserName);
      todoUser.append(todoTime);
      todo.append(todoUser);
      todoAllBtn.append(todoBtnEdit);
      todoAllBtn.append(todoBtnDelete);
      todoAllBtn.append(todoBtnNext);
      todo.append(todoAllBtn);
      todoWrapper.append(todo);
    }
    if (el.status == "in-progress") {
      let progress = document.createElement("div");
      progress.classList.add("in-progress");
      progress.setAttribute("data-id", el.id);
      let progressTitle = document.createElement("div");
      progressTitle.classList.add("in-progress__title");
      progressTitle.innerText = el.title;

      let progressDescription = document.createElement("div");
      progressDescription.classList.add("in-progress__description");
      progressDescription.innerText = el.description;

      let progressUser = document.createElement("div");
      progressUser.classList.add("in-progress__user");

      let progressUserName = document.createElement("span");
      progressUserName.innerText = el.user;

      let progressTime = document.createElement("span");
      progressTime.innerText = el.time;

      let progressAllBtn = document.createElement("div");
      progressAllBtn.classList.add("in-progress__button");

      let progressBtnBack = document.createElement("button");
      progressBtnBack.classList.add("in-progress__button-back");
      progressBtnBack.innerText = "back";

      let progressBtnCompleted = document.createElement("button");
      progressBtnCompleted.classList.add("in-progress__button-completed");
      progressBtnCompleted.innerText = "completed";

      progress.append(progressTitle);
      progress.append(progressDescription);
      progressUser.append(progressUserName);
      progressUser.append(progressTime);
      progress.append(progressUser);
      progressAllBtn.append(progressBtnBack);
      progressAllBtn.append(progressBtnCompleted);
      progress.append(progressAllBtn);
      progressWrapper.append(progress);
    }
    if (el.status == "done") {
      let done = document.createElement("div");
      done.classList.add("done");
      done.setAttribute("data-id", el.id);
      let doneTitle = document.createElement("div");
      doneTitle.classList.add("done__title");
      doneTitle.innerText = el.title;

      let doneDescription = document.createElement("div");
      doneDescription.classList.add("done__description");
      doneDescription.innerText = el.description;

      let doneUser = document.createElement("div");
      doneUser.classList.add("done__user");

      let doneUserName = document.createElement("span");
      doneUserName.innerText = el.user;

      let doneTime = document.createElement("span");
      doneTime.innerText = el.time;

      let doneAllBtn = document.createElement("div");
      doneAllBtn.classList.add("done__button");

      let doneBtnDelete = document.createElement("button");
      doneBtnDelete.classList.add("done__button-delete");
      doneBtnDelete.innerText = "delete";

      done.append(doneTitle);
      done.append(doneDescription);
      doneUser.append(doneUserName);
      doneUser.append(doneTime);
      done.append(doneUser);
      doneAllBtn.append(doneBtnDelete);

      done.append(doneAllBtn);
      doneWrapper.append(done);
    }
  });
}
/* * HEADER * */
navData.innerText = new Date().toLocaleTimeString().slice(0, -3);
navData.setAttribute("status", "time");
navData.addEventListener("click", (e) => {
  let target = e.target;
  let stat = target.getAttribute("status");
  console.log(stat);
  if (stat == "time") {
    navData.innerText = new Date().toLocaleDateString();
    navData.setAttribute("status", "data");
  }
  if (stat == "data") {
    navData.innerText = new Date().toLocaleTimeString().slice(0, -3);
    navData.setAttribute("status", "time");
  }
});
newTaskHeader.addEventListener("click", () =>
  body.classList.add("popup-opened")
);
newTaskToDo.addEventListener("click", () => body.classList.add("popup-opened"));
overlay.addEventListener("click", () => {
  body.classList.remove("popup-opened");
  body.classList.remove("popup__edit-opened");
  body.classList.remove("warning-delete-opened");
  body.classList.remove("warning-in-progress-opened");
});
inputSearch.addEventListener("input", ({ target }) => {
  if (target.value == "") {
    render();
  }
  let newArray = data.filter((el) => {
    let full = el.title + el.description + el.user;
    return full.toLocaleLowerCase().includes(target.value);
  });
  render(newArray);
});
/* * POPUP * */
popupCancel.addEventListener("click", () => {
  body.classList.remove("popup-opened");
});
popupCancelEdit.addEventListener("click", () => {
  body.classList.remove("popup__edit-opened");
});
/* * MAIN * */
deleteAllTodo.addEventListener("click", () =>
  body.classList.add("warning-delete-opened")
);
deleteAllTodoCancel.addEventListener("click", () => {
  body.classList.remove("warning-delete-opened");
});
deleteAllTodoConfirm.addEventListener("click", () => {
  let item = data.filter((e) => e.status == "done");
  data = data.filter((el) => !item.includes(el));
  setLocal("data", data);
  render();
  body.classList.remove("warning-delete-opened");
});
deleteWarning.addEventListener("click", () => {
  body.classList.remove("warning-in-progress-opened");
});
/* * TODO BUTTON * */
todoWrapper.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("todo__button-delete")) {
    let todo = target.getAttribute("data-id");
    let item = data.find((e) => e.id == todo);
    data.splice(data.indexOf(item), 1);
    setLocal("data", data);
    target.parentElement.parentElement.remove();
  }
});
todoWrapper.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("todo__button-edit")) {
    let todo = target.parentElement.parentElement.getAttribute("data-id");
    let item = data.find((e) => e.id == todo);
    body.classList.add("popup__edit-opened");
    popupTitleEdit.value = item.title;
    popupDescriptionEdit.value = item.description;
    popupDeadlineEdit.value = item.time;
    popupUserEdit.value = item.user;
    popupConfirmEdit.addEventListener("click", () => {
      let obj = {
        title: ucFirst(popupTitleEdit.value),
        description: ucFirst(popupDescriptionEdit.value),
        user: selectEdit.value,
        time: popupDeadlineEdit.value,
        id: item.id,
        status: "todo",
      };
      data.splice(data.indexOf(item), 1);
      data.push(obj);
      setLocal("data", data);
      saveID();
      body.classList.remove("popup__edit-opened");
      render();
    });
  }
});
todoWrapper.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("todo__button-next")) {
    let todo = target.parentElement.parentElement.getAttribute("data-id");
    let item = data.find((e) => e.id == todo);
    let calc = progressWrapper.children.length;
    if (calc > 5) {
      body.classList.add("warning-in-progress-opened");
    } else {
      item.status = "in-progress";
      setLocal("data", data);
      render();
    }
  }
});
/* * IN PROGRESS BUTTON * */
progressWrapper.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("in-progress__button-back")) {
    let progress = target.parentElement.parentElement.getAttribute("data-id");
    let item = data.find((e) => e.id == progress);
    item.status = "todo";
    setLocal("data", data);
    render();
  }
});
progressWrapper.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("in-progress__button-completed")) {
    let progress = target.parentElement.parentElement.getAttribute("data-id");
    let item = data.find((e) => e.id == progress);
    item.status = "done";
    setLocal("data", data);
    render();
  }
});
/* * DONE BUTTON * */
doneWrapper.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("done__button-delete")) {
    let done = target.getAttribute("data-id");
    let item = data.find((e) => e.id == done);
    data.splice(data.indexOf(item), 1);
    setLocal("data", data);
    target.parentElement.parentElement.remove();
  }
});
/* * MOBILE * */
todoContTitle.addEventListener("click", () => {
  if (todoWrapper.classList.contains("opened")) {
    todoWrapper.classList.remove("opened");
  } else {
    todoWrapper.classList.add("opened");
  }
});
inprogContTitle.addEventListener("click", () => {
  if (progressWrapper.classList.contains("opened")) {
    progressWrapper.classList.remove("opened");
  } else {
    progressWrapper.classList.add("opened");
  }
});
doneContTitle.addEventListener("click", () => {
  if (doneWrapper.classList.contains("opened")) {
    doneWrapper.classList.remove("opened");
  } else {
    doneWrapper.classList.add("opened");
  }
});
