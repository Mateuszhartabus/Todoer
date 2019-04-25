let webControler = (()=>{
    
    var list = function(id, list, minorTasks, listState){
        this.id = id;
        this.list = list;
        this.minorTasks = minorTasks;
        this.listState = listState;
    }; 

    let data = {
         allList : [],
    };

    function changeSubtaskValue(listId, cur, state, type){
      let subtaskLength =  data.allList[listId].minorTasks[cur].subtask.length;
      for(let i = 0;i<subtaskLength;i++){
          let subState, currentSubtask, currentLabel, currentCheckBox;
          
        subState = data.allList[listId].minorTasks[cur].subtask[i].subtaskState ;
        subState = state;

         if(type){
            this.listId = listId+1;
            currentSubtask = `${listId}-${cur}-${(i+1)}`;
         }
         currentSubtask = `${this.listId}-${cur}-${(i+1)}`;

         currentLabel = document.querySelector(`#label-${currentSubtask}`);
         currentCheckBox =document.querySelector(`#cb-${currentSubtask}`);

            if(subState === 2){
            currentLabel.style.color = "green";
            currentLabel.style.textDecoration = "line-through";
            currentCheckBox.checked = true;
            }else if(subState === 0){
            currentLabel.style.color = "black";
            currentLabel.style.textDecoration = "none";
            currentCheckBox.checked = false;
            }
        }
    };


    return{
        addItem: function(lis){
            let newItem, ID;
            ID = data.allList.length + 1;

           newItem = new list(ID, lis, minorTasks = [], listState = 0);
           data.allList.push(newItem);
           return newItem;
        },

        testing: ()=>{
            console.log(data);
        },

        addTask: (parent, val)=>{
            this.val = val;
            let parentID = parseInt(parent.slice(10,11))-1;
            data.allList[parentID].minorTasks.push({id:minorTasks.length, value:val,taskState:0,subtask:[]});
            
        },

        addSubtask:(parent, val)=>{
            this.val = val;
            this.parent = parent;

            let listId = parseInt(parent.slice(16,17))-1;
            let taskId = parseInt(parent.slice(18,19));
            data.allList[listId].minorTasks[taskId].subtask.push({id: data.allList[listId].minorTasks[taskId].subtask.length, value:val, subtaskState:0});
        },

        getTaskId:(pareId)=>{
            this.pareId = pareId;
            pareId = parseInt(pareId.slice(10,11))-1;
           return data.allList[pareId].minorTasks.length;
        },

        getSubtaskId:(parentId)=>{
            let listId = parseInt(parent.slice(16,17))-1;
            let taskId = parseInt(parent.slice(18,19));
            return data.allList[listId].minorTasks[taskId].subtask.length;

        },

        parseId(id){
            let idLength, listId, taskId, subtaskId;
            idLength = id.length;

                listId = parseInt(id.slice(0,1))-1;
                taskId = parseInt(id.slice(2,3));

                if(idLength === 5){
                    subtaskId = parseInt(id.slice(4,5))-1;
                    return{
                        idList:listId,
                        idTask:taskId,
                        idSubtask: subtaskId
                    }
                }
            
            return {
                idList:listId,
                idTask:taskId
            }

            
        },
        

        changeAllParameters:(listId, stateOfList)=>{
            this.listId = listId;
            let curListId = listId - 1;
            data.allList[curListId].listState = stateOfList;
            let minorTaskLength = data.allList[curListId].minorTasks.length;
            for(var i = 0; i < minorTaskLength; i++){
                changeSubtaskValue(curListId, i, stateOfList);
            }
            
        },

        checkIfParentIsChecked:(listId,stateOfList)=>{
            let mT  = data.allList[(listId-1)].minorTasks;
            let lengthOfmT = mT.length;
            if(stateOfList === 2){
                for(let i = 0;i<lengthOfmT;i++)
                    mT[i].taskState = stateOfList;
                    return {state:'checked', arrLength: lengthOfmT}
            }else if(stateOfList === 0){
                for(let i = 0;i<lengthOfmT;i++)
                    mT[i].taskState = stateOfList;
                    return {state:'unchecked', arrLength: lengthOfmT}
            }else if(stateOfList === 1){
                for(let i = 0;i<lengthOfmT;i++)
                    mT[i].taskState = stateOfList;
                    return {state:'middle', arrLength: lengthOfmT}
            }
        },

        changeStyleAndTaskValue:(atribute, values, listId, taskId)=>{

            let listSt = data.allList[listId].minorTasks[taskId].taskState;

           if(atribute.checked){
               atribute.readOnly= 1;
               document.querySelector(`#label-${values}`).style.color = "orangered";     
               listId= 1; 
           }else if( atribute.readOnly == 1 ){
               atribute.checked = true;
               document.querySelector(`#label-${values}`).style.color = "green";
               document.querySelector(`#label-${values}`).style.textDecoration = "line-through";
               atribute.readOnly = false;
               listId= 2;
           }else if(!atribute.readOnly){
               document.querySelector(`#label-${values}`).style.color = "black";
               document.querySelector(`#label-${values}`).style.textDecoration = "none";
               listId= 0;
           }
   
           return listId;
         },

         addTaskState:( currentState, listId, taskId)=>{
            data.allList[listId].minorTasks[taskId].taskState = currentState;
           let subtaskLength = data.allList[listId].minorTasks[taskId].subtask.length;

           for(let i = 0; i<subtaskLength;i++){
              changeSubtaskValue(listId, taskId, currentState, true);
           }

         },

         addSubtaskState:(listId, taskId, subtaskId, currentState)=>{
           
            data.allList[listId].minorTasks[taskId].subtask[subtaskId].subtaskState = currentState;

            var subtaskLength = data.allList[listId].minorTasks[taskId].subtask.length;
            if(subtaskLength>0){
                
                var sum = 0

                data.allList[listId].minorTasks[taskId].subtask.forEach(function output(item, index, array){
                    sum += item.subtaskState;
                });

                return {total:sum, length:subtaskLength*2}
                
            }
         },
        changeList:(listId, taskId)=>{
           let listLength = data.allList[listId].minorTasks.length;
           let sum = 0;
           currentLabel = document.querySelector(`#label-${listId+1}`);
           currentCheckBox =document.querySelector(`#cb-${listId+1}`);

           if(listLength>0){
                data.allList[listId].minorTasks.forEach(function output(item){               sum += item.taskState;
                 });

                 if(sum === listLength*2){
                    currentLabel.style.color = "green";
                    currentLabel.style.textDecoration = "line-through";
                    currentCheckBox.checked = true;
                    data.allList[listId].listState = 0;
                 }else if(sum >0){
                    currentLabel.style.color = "orangered";
                    currentLabel.style.textDecoration = "none";
                    data.allList[listId].listState = 1;
                 }else if(sum === 0){
                    currentLabel.style.color = "black";
                    currentLabel.style.textDecoration = "none";
                    currentCheckBox.checked = false;
                    data.allList[listId].listState = 2;
                 }
           }
           

        },

         changeParent:(currentSum, total, id, listId, taskId)=>{
            let currentLabel, parentId, currentCheckBox;
            parentId = id.slice(0,3);
            currentLabel = document.querySelector(`#label-${parentId}`);
            currentCheckBox =document.querySelector(`#cb-${parentId}`);
            if(currentSum === total){
                currentLabel.style.color = "green";
                currentLabel.style.textDecoration = "line-through";
                currentCheckBox.checked = true;
                data.allList[listId].minorTasks[taskId].taskState = 2;
            }else if(currentSum>0){
                currentLabel.style.color = "orangered";
                currentLabel.style.textDecoration = "none";
                data.allList[listId].minorTasks[taskId].taskState = 1;
            }else if(currentSum === 0){
                currentLabel.style.color = "black";
                currentLabel.style.textDecoration = "none";
                currentCheckBox.checked = false;
                data.allList[listId].minorTasks[taskId].taskState = 0;
            }

         },

    };

  
    
})();


var UIControler = (()=>{
    let stringsDOM = {
        inputBtn: `.add__btn`,
        inputList: '.add__list',
        inputTask: '.add__task',
        changeMonth: '.changeMonth',
        changeYear: '.changeYear',
        tasksContainer: '.tasks',
    };
    return{
        getInput: function(){
            return{
                list :document.querySelector(stringsDOM.inputList).value,
             //   task: document.querySelector(stringsDOM.inputTask).value
            };
            
        },

        changeDate: ()=>{
            let now, year, month, day;

            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            day = now.getDate();

            const months = ['January', 'Febuary', 'March', 'April', 'May', 'June','July','August','September','October', 'November','December'];

            document.querySelector(stringsDOM.changeMonth).textContent = months[month] + " " + day;
            document.querySelector(stringsDOM.changeYear).textContent = year;
        },
        getDOMstrings: function() {
           return stringsDOM;
        },

        clearFields: function(){
            document.querySelector(stringsDOM.inputList).value = "";
        },

        addListItem: function(obj){
            //Create html string with placeholder text
            let html, newHTML, element, countAmmountOfId;
            element = stringsDOM.tasksContainer;
             html = '<div class="task" id="list-%id%"><label id="label-%id%" class="list__box"><input type="checkbox" id="cb-%id%" onclick="controler.changeListStyle(this)" class="list__box--checkbox"><span class="task__box--text">%value%</span></label><div id="current-%id%" class="subtask"></div><div class="task__hidden"><div class="task__delete"><input type="text" id="task__field-%id%" placeholder="Add task" class="task__hidden--input"><button id="task__btn-%id%" class="task__hidden--btn" onclick="controler.addTaskToCurrentList(this.id, document.querySelector(`#task__field-${parseInt(this.id.slice(10,11))}`).value)"><i class="ion-ios-checkmark-outline"></i></button></div></div></div>';

            countAmmountOfId = (((html.search('%id%')+1)/4)-1);
            newHTML = html.replace('%id%', obj.id);

             for(let i = 0;i<countAmmountOfId;i++){
                newHTML = newHTML.replace('%id%',obj.id);
             }
             
             newHTML = newHTML.replace('%value%', obj.list);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
        addTaskItem: function(parId, val, tasId){
            this.parId = parId;
            this.val = val;
            this.tasId = tasId;
            let taskID = tasId-1;
            let currentParrent =  parseInt(parId.slice(10,11));
            
            let subtask ='<div id="task-%task%" class="subtask__item"><label id="label-%parent%-%task%" class="subtask__box"><input type="checkbox" id="cb-%parent%-%task%" onclick="controler.changeTaskStyle(this)" class="subtask__box--checkbox"><span class="task__box--text">%CSS%</span></label><div id="current-%parent%-%task%" class="subtask__minor"><div class="subtask__hidden"><input id="subtaskInput-%task%" type="text" placeholder="Add subtask" class="subtask__hidden--input"><button id="button__subtask-%parent%-%task%"class="subtask__hidden--btn" onclick="controler.addSubtask(this.id, document.querySelector(`#subtaskInput-${parseInt(this.id.slice(18,19))}`).value)"><i class="ion-ios-checkmark-outline"></i></button></div></div></div>';

            
            subtask = subtask.replace('%CSS%',val);

            for(i = 0; i<6;i++){
                subtask = subtask.replace('%task%', taskID);
            }
            
            for(i = 0; i<4;i++){
                subtask = subtask.replace('%parent%', currentParrent);
            }
            
             document.querySelector(`#current-${currentParrent}`).insertAdjacentHTML('beforeend', subtask);            
        },

        addSubtaskItem:(id, val, currentId)=>{
            this.id = id;
            this.val = val;
            let listId, taskId, element;
            listId = parseInt(id.slice(16,17));
            taskId = parseInt(id.slice(18,19));
            console.log(id, val);
            element = '<div class="subtask__minor-%task%"><label id="label-%list%-%taskid%-%curr%" class="subtask__box"><input id="cb-%list%-%taskid%-%curr%" type="checkbox" onclick="controler.changeSubtaskStyle(this)" class="task__box--checkbox"><span class="task__box--text">%text%</span></label></div></div>';
    
            element = element.replace('%task%', listId);
            for(let i=0;i<2;i++){
                element = element.replace('%list%', listId);
                element = element.replace('%taskid%', taskId);
                element = element.replace('%curr%', currentId);
            }
            element = element.replace('%text%', val);
            document.querySelector(`#current-${listId}-${taskId}`).insertAdjacentHTML('beforeend', element);

        },

    };
})();



var controler = ((webCtrl, UICtrl)=>{

    const setUpEventListners = function(){
        let DOM = UICtrl.getDOMstrings();
    
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', (event)=>{
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });

    };

    
    let ctrlAddItem = function(){
         let input, newItem;
         input = UICtrl.getInput();
        if(input.list !== ""){
            newItem = webCtrl.addItem(input.list);
            webCtrl.testing();
            UICtrl.addListItem(newItem);
            UICtrl.clearFields();
        }
    };

     function changeStyle (atribute, values){
         let currentState = this.listState;

        if(atribute.checked){
            atribute.readOnly= 1;
            document.querySelector(`#label-${values}`).style.color = "orangered";     
            currentState = 1; 
        }else if( atribute.readOnly == 1 ){
            atribute.checked = true;
            document.querySelector(`#label-${values}`).style.color = "green";
            document.querySelector(`#label-${values}`).style.textDecoration = "line-through";
            atribute.readOnly = false;
            currentState = 2;
        }else if(!atribute.readOnly){
            document.querySelector(`#label-${values}`).style.color = "black";
            document.querySelector(`#label-${values}`).style.textDecoration = "none";
            currentState = 0;
        }

        return currentState;
      };

    function selectAll(id, state, len){

        if(state === "checked"){
            for(let i = 0; i<len; i++){
                document.querySelector(`#label-${id}-${i}`).style.color="green";
                document.querySelector(`#label-${id}-${i}`).style.textDecoration = "line-through";
                document.querySelector(`#cb-${id}-${i}`).checked = true;
            }
        }else if(state === "unchecked"){
            for(let i = 0; i<len; i++){
                document.querySelector(`#label-${id}-${i}`).style.color="black";
                document.querySelector(`#label-${id}-${i}`).style.textDecoration = "none";
                document.querySelector(`#cb-${id}-${i}`).checked = false;
            }
        }
        
    };

    
  
   
    return{
        addTaskToCurrentList : (givenId, givenText)=>{
            if(givenText !== ""){
                webCtrl.addTask(givenId, givenText);
                UICtrl.addTaskItem(givenId, givenText,webCtrl.getTaskId(givenId));
            }
        },

        addSubtask : (id, val)=>{
            if(val !==""){
                webCtrl.addSubtask(id, val);
                UICtrl.addSubtaskItem(id, val, webCtrl.getSubtaskId(id));
            }            
        },

         changeListStyle :(atribute)=>{
            let val = parseInt(atribute.id.slice(3,4));
            let state = changeStyle(atribute, val);
            webCtrl.changeAllParameters(val,state);   
            let listObj = webCtrl.checkIfParentIsChecked(val, state);   
            selectAll(val, listObj.state, listObj.arrLength);  
          },
        
          changeTaskStyle: (atribute)=>{
            let val, getId, taskState;

             val = atribute.id.slice(3,6);
             getId = webCtrl.parseId(val);
             taskState = webCtrl.changeStyleAndTaskValue(atribute, val, getId.idList, getId.idTask);
             webCtrl.addTaskState( taskState, getId.idList, getId.idTask);
             webCtrl.changeList(getId.idList, getId.idTask);
           
          },

          changeSubtaskStyle: (atribute)=>{
              let val, getId, taskState, total;
              val = atribute.id.slice(3,8);
              getId = webCtrl.parseId(val);
              taskState = webCtrl.changeStyleAndTaskValue(atribute,val, getId.idList, getId.idTask);
              total = webCtrl.addSubtaskState(getId.idList, getId.idTask, getId.idSubtask, taskState);
              webCtrl.changeParent(total.total, total.length, val, getId.idList,getId.idTask, getId.idSubtask);
              webCtrl.changeList(getId.idList, getId.idTask);
          },

        init: ()=>{
            setUpEventListners();
            UICtrl.changeDate();
        }
    };
    
})(webControler, UIControler);


controler.init();
