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
let tabs=document.querySelectorAll(".task-tabs div");
let underLine=document.getElementById("under-line");
let taskList=[];
let mode="all";
let filterList=[];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event){
    if (event.key==="Enter"){
        addTask();
    }
});

for (let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}

function addTask(){
    let task={
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false,
    }
    if (taskInput.value===""){
        alert("할일을 입력해주세요!");
        return;
    }
    taskList.push(task);
    taskInput.value=""
    console.log(taskList);
    render();
}

function render(){
    // 1. 내가 선택한 탭에 따라서
    // 2. 리스트를 달리 보여준다
    // 3. all taskList
    let list=[];
    if (mode==="all"){
        //all 
        console.log('all')
        list=taskList;
    }else if (mode==="ongoing"){
        list=taskList.filter(task => task.isComplete===false);
    }else if(mode==="done"){
        list=taskList.filter(task => task.isComplete===true);
    }
    let resultHtml="";
    for (let i=0; i<list.length;i++){
        if (list[i].isComplete == true){
            
            resultHtml+=`<div class="task task-complete">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div class="task-buttons">
                        <button class="icon-btn" onclick="toggleComplete('${list[i].id}')" title="되돌리기">
                            <i class="fa-solid fa-arrow-rotate-right" style="color: rgb(177, 151, 252);"></i>
                        </button>
                        <button class="icon-btn" onclick="deleteTask('${list[i].id}')" title="삭제">
                            <i class="fa-solid fa-delete-left" style="color: rgb(177, 151, 252);"></i>
                        </button>
                    </div>
                </div>`;

        }else{
            resultHtml+=`<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div class="task-buttons">
                        <button class="icon-btn" onclick="toggleComplete('${list[i].id}')" title="완료">
                            <i class="fa-solid fa-check" style="color: rgb(177, 151, 252);"></i>
                        </button>
                        <button class="icon-btn" onclick="deleteTask('${list[i].id}')" title="삭제">
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

function filter(event){
    console.log("filter", event.target.id);
    mode = event.target.id;
    // under-line 이동
    underLine.style.left=event.target.offsetLeft+"px";
    underLine.style.width=event.target.offsetWidth+"px";
    filterList=[];
    if(mode==="all"){
        //전체리스트
        render()
    }else if(mode==="ongoing"){
        // 진행중인 아이템을 보여준다
        // task.isComplete=false
        for (let i=0;i<taskList.length;i++){
            if (taskList[i].isComplete===false){
                filterList.push(taskList[i]);
            }
        }
        console.log("진행중:", filterList);
        render()
    }else if(mode==="done"){
        // 끝나는 케이스
        // task.isComplete=true
        for (let i=0;i<taskList.length;i++){
            if (taskList[i].isComplete===true){
                filterList.push(taskList[i]);
            }
        }
        console.log("끝:", filterList);
        render()
    }
}