let tasklist = [];

const addToLocalStorage = (task) => {
  let existingTasks = JSON.parse(localStorage.getItem("myTask")) || [];
  existingTasks.push(...task);
  localStorage.setItem("myTask", JSON.stringify(existingTasks));
};

const displayTasks = () => {
  let parentDiv = document.getElementById("list");
  parentDiv.innerHTML = "";
  let newList = JSON.parse(localStorage.getItem("myTask"));
  if (newList) {
    newList.forEach((taskObj, index) => {
      let inputString = taskObj.data;
      let newSection = document.createElement("div");
      newSection.className = "task";
      newSection.innerHTML = inputString;

      if (taskObj.status) {
        newSection.style.backgroundColor = "lightgreen";
      }

      let currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth() + 1;
      let currentdate = currentDate.getDate();
      let dateToday = document.createElement("div");
      dateToday.className = "dateToday";
      dateToday.innerHTML = currentdate+"-"+currentMonth+"-"+currentYear;
      newSection.appendChild(dateToday);

      let donebutton = document.createElement("button");
      donebutton.className = "done";
      donebutton.innerHTML = "<img src='done.png' height='15px'>";
      donebutton.addEventListener("click", () => taskComplete(index));
      newSection.appendChild(donebutton);

      let deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.innerHTML = "<img src='delete.jpg' height='18px'>";
      deleteButton.addEventListener("click", () => deleteTask(index));
      newSection.appendChild(deleteButton);

      parentDiv.appendChild(newSection);
    });
  }
};

const taskComplete = (index) => {
  let newList = JSON.parse(localStorage.getItem("myTask")) || [];
  newList[index].status = true;
  localStorage.setItem("myTask", JSON.stringify(newList));
  displayTasks();
};

const deleteTask = (index) => {
  let newList = JSON.parse(localStorage.getItem("myTask")) || [];
  newList.splice(index, 1);
  localStorage.setItem("myTask", JSON.stringify(newList));
  displayTasks();
};

const addTask = () => {
  let inputstring = document.getElementById("gettext").value;
  if (inputstring !== "") {
    const task = {
      data: inputstring,
      status: false,
    };
    tasklist.push(task);
    addToLocalStorage([task]);
    displayTasks();
    document.getElementById("gettext").value = "";
  }
};

document.getElementById("add").addEventListener("click", addTask);

displayTasks();
