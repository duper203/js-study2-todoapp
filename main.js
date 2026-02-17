// 유저가 입력
// + 버트 누르면 추가
// delete 누르면 삭제
// 체크 버튼 누르면 끝나고 줄 그어짐
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
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render(){
    let resultHtml="";

    for (let i=0; i<taskList.length;i++){
        resultHtml+=`<div class="task">
                    <div>${taskList[i]}</div>
                    <div>
                        <button>check</button>
                        <button>delete</button>
                    </div>
                </div>`;
    }

    document.getElementById("task-board").innerHTML=resultHtml;
}