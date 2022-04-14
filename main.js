let form = document.forms[0];
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// localStorage.clear()
let arrTasks = [];

if (localStorage.getItem("task")) {
   arrTasks = JSON.parse(localStorage.getItem("task"));
}
getStorge();

tasksDiv.addEventListener("click", (e) => {
   if (e.target.classList.contains("close")) {
      delTask(e.target.parentElement.parentElement.getAttribute("data-id"));
      e.target.parentElement.parentElement.remove();
   }
   if (e.target.classList.contains("fa-solid")) {
      statusd(e.target.parentElement.parentElement.getAttribute("data-id"));
      e.target.parentElement.parentElement.classList.toggle("done");
      if (!e.target.classList.contains("done")) {
         e.target.classList.add("done");
         tasksDiv.append(e.target.parentElement.parentElement);
      } else {
         e.target.classList.remove("done");
         tasksDiv.prepend(e.target.parentElement.parentElement);
      }
      // e.target.classList.toggle("done");
      // tasksDiv.append(e.target.parentElement.parentElement);
   }
   if (e.target.classList.contains("star")) {
      fav(e.target.parentElement.parentElement.getAttribute("data-id"));
      if (!e.target.classList.contains("fav")) {
         e.target.classList.add("fav");
         tasksDiv.prepend(e.target.parentElement.parentElement);
      } else {
         e.target.classList.remove("fav");
         tasksDiv.append(e.target.parentElement.parentElement);
      }

      // if (e.target.classList.contains("fav")) {
      // }
   }
});

form.addEventListener("submit", (e) => {
   e.preventDefault();
   if (input.value !== "") {
      taskToArr(input.value);
      input.value = "";
   }
});

function taskToArr(taskTitle) {
   const task = {
      title: taskTitle,
      completed: false,
      id: Date.now(),
      fav: false,
   };
   arrTasks.push(task);
   addTaskToPage(arrTasks);
   addStorge(arrTasks);
}

function addTaskToPage(taskf) {
   tasksDiv.innerHTML = "";
   arrTasks.forEach((task) => {
      // Create Task Div
      let div = document.createElement("div");
      div.setAttribute("data-id", task.id);
      div.className = "task";
      if (task.completed) {
         div.className = "task done";
      }
      // Create Left
      let left = document.createElement("div");
      left.className = "left";
      let span = document.createElement("span");
      span.className = "gap";
      let i = document.createElement("i");
      i.className = "fa-solid fa-check";
      if (task.completed) {
         i.className = "done fa-solid fa-check ";
      }
      let p = document.createElement("p");
      p.appendChild(document.createTextNode(task.title));
      left.append(span);
      left.append(i);
      left.append(p);
      // Create Right
      let right = document.createElement("div");
      right.className = "right";
      let spanClose = document.createElement("span");
      spanClose.appendChild(document.createTextNode("close"));
      spanClose.className = "close material-icons-outlined";
      let spanStar = document.createElement("span");
      spanStar.appendChild(document.createTextNode("star_border"));
      spanStar.className = "star material-icons-outlined";
      if (task.fav) {
         spanStar.className = "star fav material-icons-outlined";
      }
      right.append(spanStar);
      right.append(spanClose);
      // Appened
      div.appendChild(left);
      div.appendChild(right);
      tasksDiv.appendChild(div);
      if (task.fav) {
         tasksDiv.prepend(div);
      }
      if (task.completed) {
         tasksDiv.append(div);
      }
   });
}

function addStorge(arr) {
   window.localStorage.setItem("task", JSON.stringify(arrTasks));
}

function getStorge() {
   let data = localStorage.getItem("task");
   if (data) {
      let task = JSON.parse(data);
      addTaskToPage(arrTasks);
   }
}

function delTask(id) {
   arrTasks = arrTasks.filter((task) => task.id != id);
   addStorge(arrTasks);
}

function statusd(taskId) {
   for (let i = 0; i < arrTasks.length; i++) {
      if (arrTasks[i].id == taskId) {
         arrTasks[i].completed == false
            ? (arrTasks[i].completed = true)
            : (arrTasks[i].completed = false);
      }
   }
   addStorge(arrTasks);
}

function fav(taskId) {
   for (let i = 0; i < arrTasks.length; i++) {
      if (arrTasks[i].id == taskId) {
         arrTasks[i].fav == false
            ? (arrTasks[i].fav = true)
            : (arrTasks[i].fav = false);
      }
   }
   addStorge(arrTasks);
}




