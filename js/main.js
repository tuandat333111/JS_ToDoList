
var TodoList=[];
const getEle=(id)=>document.getElementById(id);
class task{
    constructor(_id,_taskname,_isComplete){
        this.id=_id;
        this.taskname=_taskname;
        this.isComplete=_isComplete;
    }
    
}
const renderList=(data)=>{
    let contentTodo="";
    let contentCompleted="";
    data.forEach((task) => {
        if(task.isComplete==="false"){
            contentTodo+=`
            <li>
                <p id="taskname${task.id}">${task.taskname}</p>
                <p style="display:flex;">
                    <button id="delete${task.id}" onclick="deleteTask(${task.id})" style="cursor:pointer;text-decoration:none;color:black;margin: 0 5px;border: 1px solid transparent;background-color:white;"><i class="fa-solid fa-trash-can"></i></button>
                    <button id="complete${task.id}" onclick="getComplete(${task.id})" style="cursor:pointer;text-decoration:none;color:black;border: 1px solid transparent;background-color:white;"><i class="fa-regular fa-circle-check"></i></button>
                </p>
                
            </li>
        `;        
        }
        else{
            contentCompleted+=`
            <li>
                <p id="taskname${task.id}" style="color:green">${task.taskname}</p>
                <p style="display:flex;">
                    <button id="delete${task.id}" onclick="deleteTask(${task.id})" style="cursor:pointer;text-decoration:none;color:black;margin: 0 5px;border: 1px solid transparent;background-color:white;"><i class="fa-solid fa-trash-can"></i></button>
                    <button id="complete${task.id}" onclick="getIncomplete(${task.id})" style="cursor:pointer;text-decoration:none;color:black;border: 1px solid transparent;background-color:white;"><i class="fa-regular fa-circle-check" style="color:green;"></i></button>
                </p>
                
            </li>
        `;        
        }
        let check=getEle(`complete${task.id}`);
        let taskName=getEle(`taskname${task.id}`);
        if(taskName){
            taskName.style.color="green";
        }
        if(check){
            check.style.color="green";
        }
    });
    
    let showtodo=getEle("todo");
    if(showtodo){
        showtodo.innerHTML=contentTodo;
    }
    let showcompleted=getEle("completed");
    if(showcompleted){
        showcompleted.innerHTML=contentCompleted;
        
    }
    
    
    
}

const addItem=getEle("addItem");
if(addItem){
    addItem.addEventListener("click",()=>{
        let id=-1;
        if(TodoList.length===0){
            id=1;
        }
        else if(TodoList.length>0){
            id=TodoList[TodoList.length-1].id+1;       
        }        
        let taskname=getEle("newTask").value;
        let isComplete="false";
        let valid=new validation();
        let isValid=true;
        isValid&=valid.checkEmpty(taskname,"tbtaskname","(*) Please fill in task name");
        if(!isValid) return
        let newtask=new task(id,taskname,isComplete);        
        TodoList.push(newtask);
        getEle("newTask").value="";
        setLocalStorage();
        getLocalStorage();
        
    })   
}
const setLocalStorage=()=>{
    let stringdata=JSON.stringify(TodoList);
    localStorage.setItem("TDL",stringdata);
}
const getLocalStorage=()=>{
    if(localStorage.getItem("TDL")){
        let data=localStorage.getItem("TDL");
        TodoList=JSON.parse(data);
        renderList(TodoList);
    }
}
getLocalStorage();
const findIndex=(id)=>{
    var index=null;
    for(let i=0;i<TodoList.length;i++){
        if(TodoList[i].id===id){
            index=i;                             
        }
    }
    return index; 
}

const deleteTask=(id)=>{
    let index=findIndex(id);
    TodoList.splice(index,1);
    setLocalStorage();
    getLocalStorage();
    
    
}
const getComplete=(id)=>{
    let index=findIndex(id);
    TodoList[index].isComplete="true";
    
    let check=getEle(`complete${id}`);
    let taskName=getEle(`taskname${id}`);
    if(taskName){
        taskName.style.color="green";
    }
    if(check){
        check.style.color="green";
    }
    setTimeout(()=>{
        setLocalStorage();
        getLocalStorage();
    },200)
    
    

}
const getIncomplete=(id)=>{
    let index=findIndex(id);
    TodoList[index].isComplete="false";
    setLocalStorage();
    getLocalStorage();
    
}
getEle("two").addEventListener("click",()=>{
    for (let i=0;i<TodoList.length-1;i++){
        for(let j=i+1;j<TodoList.length;j++){
            if(TodoList[i].taskname>TodoList[j].taskname){
                let temp=TodoList[i].taskname;
                TodoList[i].taskname=TodoList[j].taskname;
                TodoList[j].taskname=temp;
            }
        }
    }
    console.log(TodoList);
    setLocalStorage();
    getLocalStorage();
    
    
})
getEle("three").addEventListener("click",()=>{
    for (let i=0;i<TodoList.length-1;i++){
        for(let j=i+1;j<TodoList.length;j++){
            if(TodoList[i].taskname<TodoList[j].taskname){
                let temp=TodoList[i].taskname;
                TodoList[i].taskname=TodoList[j].taskname;
                TodoList[j].taskname=temp;
            }
        }
    }
    console.log(TodoList);
    setLocalStorage();
    getLocalStorage();
    
    
})




