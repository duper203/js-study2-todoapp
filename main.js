// 유저가 입력
// + 버트 누르면 추가
// delete 누르면 삭제
// 체크 버튼 누르면 끝나고 줄 그어짐
// 1. 체크 하는 순간 true -> false
// 2. true 라면 끝나걸로 간주하고 밑줄 보여즉;
// 3. false 이면 안끝난걸로 간주하고 그대로

// 탭 누를때마다 언더라인 바귐
// all 탭
// 끝난 탭 only
// 진행 중 탭 only


let taskInput=document.getElementById("task-input");
let addButton=document.getElementById("add-button");
addButton.addEventListener("click", addTask);

let taskList=[];

function addTask(){
    let taskContent=taskInput.value;
    let task={
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHtml="";

    for (let i=0; i<taskList.length;i++){
        if (taskList[i].isComplete == true){
            resultHtml+=`<div class="task task-complete">
                    <div class="task-done">${taskList[i].taskContent}</div>
                    <div class="task-buttons">
                        <button class="icon-btn" onclick="toggleComplete('${taskList[i].id}')" title="되돌리기">
                            <i class="fa-solid fa-arrow-rotate-right" style="color: rgb(177, 151, 252);"></i>
                        </button>
                        <button class="icon-btn" onclick="deleteTask('${taskList[i].id}')" title="삭제">
                            <i class="fa-solid fa-delete-left" style="color: rgb(177, 151, 252);"></i>
                        </button>
                    </div>
                </div>`;

        }else{
            resultHtml+=`<div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div class="task-buttons">
                        <button class="icon-btn" onclick="toggleComplete('${taskList[i].id}')" title="완료">
                            <i class="fa-solid fa-check" style="color: rgb(177, 151, 252);"></i>
                        </button>
                        <button class="icon-btn" onclick="deleteTask('${taskList[i].id}')" title="삭제">
                            <i class="fa-solid fa-delete-left" style="color: rgb(177, 151, 252);"></i>
                        </button>
                    </div>
                </div>`;
        }
    }

    document.getElementById("task-board").innerHTML=resultHtml;
}

function toggleComplete(id){
    // 어떤 아이템의 버튼을 누른건지..!
    console.log("id:", id);
    for (let i=0;i<taskList.length;i++){
        if (taskList[i].id==id){
            taskList[i].isComplete=!taskList[i].isComplete;
            break;
        }
    }
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
    console.log("id:", id);
    for (let i=0;i<taskList.length;i++){
        if (taskList[i].id==id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}