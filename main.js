// 유저가 값을 입력한다
// 플러스 버튼을 누르면 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 가운데 줄이 쭉 그어진다
// 1. check 버튼을 클릭하는 순간 true false
// 2. true 면 끝난거로 밑줄
// 3. false면 안 끝난거 그대로

// 진행중 끝남 탭을 누르면 언더바가 이동한다
// 끝난탭은 끝난 아이템만 진행중탭은 진행중이거만 보여진다
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

//날짜 넣기

let todayDate = document.getElementById("todayDate");
let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskTabs = document.querySelectorAll(".taskTabs div");
let underLine = document.getElementById("underLine");
let taskList = [];
let filterList = [];
let mode = 'all';

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

todayDate.textContent = `${year}년 ${month}월 ${date}일`;

addBtn.addEventListener("mousedown", addTask);
taskInput.addEventListener("keyup", function(event) {
  if(event.keyCode === 13) {
    addTask(event);
  }
});

for(let i=1; i<taskTabs.length; i++) {
  taskTabs[i].addEventListener("click", function(event){
    filter(event);
  });
}

function addTask() {
  let taskValue = taskInput.value;

  let taskObject = {
    id: randomIDGenerate(),
    taskContent: taskValue,
    isComplete: false
  }
  taskList.push(taskObject);
  taskInput.value = "";
  render();
}

function render() {
  let list = [];
  let resultHTML = "";

  if(mode == "all") {
    list = taskList;
  } else if(mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  for(let i=0; i<list.length; i++) {
    if(list[i].isComplete == true) {
      resultHTML += `<div class="taskBox taskDone">
        <span>${list[i].taskContent}</span>
        <div class="buttonBox">
          <button class="backBtn" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
          <button class="deleteBtn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="taskBox">
        <span>${list[i].taskContent}</span>
        <div class="buttonBox">
          <button class="checkBtn" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button class="deleteBtn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>`;
    }
  }
  document.getElementById("taskBoard").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for(let i=0; i<taskList.length; i++) {
    if(taskList[i].id == id ) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
  console.log(taskList);
}

function deleteTask(id) {
  for(let i=0; i<taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList.splice(i,1);
      break;
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.top = event.target.offsetTop + event.target.offsetHeight - 4 + "px";
    underLine.style.left = event.target.offsetLeft + "px";
  }

  filterList = [];
  if(mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for(let i=0; i<taskList.length; i++) {
      if(taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for(let i=0; i<taskList.length;i++) {
      if(taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

//고유 아이디 주는 함수
function randomIDGenerate() {
  return Math.random().toString(36).substring(2,9);
}