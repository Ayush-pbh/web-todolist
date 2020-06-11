//our approach is to have a default todolist item always available
//so that user can click on that and edit it to a custom one.
//after entering text, he/she has to press enter button.
//doing so will add the task to task list and create another default task bar for any new upcoming task.
//every item has input tag, which is removed when user is done.

//variables...
var taskList = Array("Click to edit(press enter whn done)","Click on the blank 1 to make new Task","");
var taskListStr = Array(0,1,2,3);
var list = document.querySelector('#list');
var updated = false;
//functions...
function addEvent(e,elem) {
    if(e.which == 13){
        //if user presses enter key hide input field
        hideInput(elem);
        var text = elem.value;
        if(!(text == "")){
            var textf = elem.nextElementSibling;
            var textprev = textf.innerHTML;
            taskList.forEach(elem => {
                if(textprev == elem && textprev != ""){
                    //agar pahle se hai to update kar do!
                    taskList[taskList.indexOf(elem)] = text;
                    updated = true;
                }
            });                    
            if(!updated){
                taskList[taskList.length-1] = text;
                taskList[taskList.length] = "";
                init_list();
            }
            updated = false;
            textf.innerHTML = text;
        }
    }
}
function edit(elem){
    showInput(elem.previousElementSibling);
}
function hideInput(elem){
        //the input field to hide is passed as elem
    elem.classList.remove('show');
}
function showInput(elem){
    //the input field to show is passed as elem
    elem.classList.add('show');
    //now focusing on input.
    elem.focus();
}
function init_list() {
    //initilaizing the list...
    var temp = '';
    for(var i=0;i<taskList.length;i++){
        temp+='<div id="item" class="item"><input type="text" class="input " onkeypress="addEvent(event,this)"><span id="text" onclick="edit(this)">'+taskList[i]+'</span><span id="remove" onclick="removeTask(this)">➖</span><span id="star">⭐</span></div>';
    }
    list.innerHTML = temp;
}
function removeTask(elem) {
    var mt = elem.previousElementSibling.innerHTML;
    taskList.forEach(el => {
        if(mt == el && mt != ""){
            //agar "" ye nhai to delete kar do!
            taskList.splice(taskList.indexOf(el),1);
            init_list();
        }
    });
}
window.onload = init_list();