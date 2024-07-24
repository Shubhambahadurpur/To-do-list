var taskList = [];

// creating the element
function create() {
    
    var parent = document.querySelector(".showList");
    parent.innerHTML = ""; // Clear laast content
    taskList.forEach(function(taskId) {
        var task = JSON.parse(localStorage.getItem(taskId));
        var div = document.createElement("div");
        div.innerHTML = `
         <div class="divv task">
            <input type="checkbox" class="taskCheckbox"  />            
            <h4 class="taskText">${task.name}</h4>       
            <button class="deleteBtn" id="${taskId}" onclick="dlete(this)">X</button>
        </div>
        `;
        const headingTask=div.querySelector('h4')
        const inputTask=div.querySelector('input');
        var iid = headingTask.nextElementSibling.getAttribute("id");
        var object = JSON.parse(localStorage.getItem(iid));

        if(object.checke == true){
            headingTask.classList.add('cuut');
        }
        else
        {
            headingTask.classList.remove('cuut');
        }

        inputTask.addEventListener('click',()=>{

            // headingTask.classList.toggle('cuut');
           

            if(object.checke == false){
                object.checke = true;
                localStorage.removeItem(iid);
                localStorage.setItem(iid,JSON.stringify(object));
            }
            else{
                object.checke = false;
                localStorage.removeItem(iid);
                localStorage.setItem(iid,JSON.stringify(object));
                
            }
        

        })
        parent.appendChild(div);
    });
}

// add task
document.getElementById("inputt").addEventListener("keyup", function(event) {
    if(event.code === "Enter")
    var input = document.getElementById("inputt");
    if(input.value.trim() !== ""){
        var taskId = Date.now().toString();
        var task = {
            name: input.value,
            checke: false
        };
        localStorage.setItem(taskId, JSON.stringify(task));
        taskList.push(taskId);
        create();
        input.value = ""; 
    }
    }
);


function dlete(event){
    var taskId = event.getAttribute("id");
        localStorage.removeItem(taskId);
        taskList = taskList.filter(function(id) {
            return id !== taskId;
        });
        create();
}




// Load task from local storage
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (!isNaN(key)) { 
        taskList.push(key);
        // taskList.reverse();
    }
}
localStorage.setItem("taskslists",taskList);
create();
