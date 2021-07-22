console.log('script.js loaded');




var events = [];
const eventList = document.querySelector('#event-list');
const completedEventList = document.querySelector('#completed-event-list');
const input = document.querySelector('#input-field');
const addEventButton = document.querySelector('#add-button');
input.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter") {
        ev.preventDefault();
        addEventButton.click();
    }
});

const addEventFromLocalStorage = (event) =>{
    console.log(event.item);
}

for(let i = 0 ; i < localStorage.length; ++i){
    var item = localStorage.getItem("event" + i);
    if(item == undefined || item == null){
        continue;
    }else{
        events.push({index:i,item:item});
        console.log(events[i]);
        addEventFromLocalStorage(events[i]);
    }
    
}




const onClickAddEvent = () =>{
    if(input.value != ""){
        // Each Item
        const newEvent = document.createElement('div');
        newEvent.setAttribute('class', 'grid grid-cols-5');

        // Text
        const text = document.createElement('div');
        text.setAttribute('class', 'break-all col-span-4 flex px-1');
        text.innerHTML = "• " + input.value;
        input.value = "";
        newEvent.append(text);

        // Buttons
        newEvent.addEventListener('mouseenter', onMouseEnterCreateButtons)
        newEvent.addEventListener('mouseleave', onMouseLeaveRemoveButtons)

        localStorage.setItem("event" + events.length, newEvent);
        events.push(newEvent);

        if(eventList.childElementCount == 0){
            eventList.append(newEvent);
        }else{
            eventList.insertBefore(newEvent, eventList.firstChild);
        }
        
    }else{
        alert("Task cannot be empty.")
    }
}

const onMouseEnterCreateButtons = (ev) => {
    // Container
    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'col-span-1 flex justify-center');

    // Done Button : will not appear if already done
    if(ev.target.firstChild.style.textDecoration != "line-through"){
        const doneButtonContainer = document.createElement('div');
        doneButtonContainer.setAttribute('class', "align-self-center");
    
        const doneButton = document.createElement('button');
        doneButton.setAttribute('class', 'group mx-2 text-green-500');
        doneButton.setAttribute('style', 'outline:0;');
        doneButton.addEventListener('click', onClickMarkDone);
    
        const doneButtonInnerDiv = document.createElement('div');
        doneButtonInnerDiv.setAttribute('class', "font-style-opensans text-lg ring-1 rounded-full ring-white group-hover:bg-white group-hover:text-gray-900 px-2 align-middle");
        doneButtonInnerDiv.innerHTML="✔"
    
        doneButton.append(doneButtonInnerDiv);
        doneButtonContainer.append(doneButton);
        buttonContainer.append(doneButtonContainer);
    }
    

    // Delete Button
    const deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.setAttribute('class', "align-self-center");

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'group mx-2 text-green-500');
    deleteButton.setAttribute('style', 'outline:0;');
    deleteButton.addEventListener('click', onClickDelete);

    const deleteButtonInnerDiv = document.createElement('div');
    deleteButtonInnerDiv.setAttribute('class', "font-style-opensans text-lg ring-1 rounded-full ring-white group-hover:bg-white group-hover:text-gray-900 px-1 align-middle");
    deleteButtonInnerDiv.innerHTML="❌"

    deleteButton.append(deleteButtonInnerDiv);
    deleteButtonContainer.append(deleteButton);
    buttonContainer.append(deleteButtonContainer);

    ev.target.append(buttonContainer);
}

const onMouseLeaveRemoveButtons = (ev) => {
    if(ev.target.childNodes.length >= 1){
        ev.target.removeChild(ev.target.childNodes[1]);
    }else{
        console.log("ERROR onMouseLeaveRemoveButtons: Index out of range.")
    }
}

const onClickMarkDone = (ev) => {
    const text = ev.target.parentNode.parentNode.parentNode.previousSibling;
    if(text == null){
        console.log("ERROR onClickMarkDone: Don't click on the rings!");
        return;
    }
    if(text.style.textDecoration == "line-through"){
        text.style.textDecoration = "";
    }else{
        text.style.textDecoration = "line-through";
    }

    const thisEvent = ev.target.parentNode.parentNode.parentNode.parentNode;
    const thisEventParent = thisEvent.parentNode;
    thisEventParent.removeChild(thisEvent);
    addToCompletedEventList(thisEvent);
}

const onClickDelete = (ev) => {
    const thisEvent = ev.target.parentNode.parentNode.parentNode.parentNode;
    const index = events.findIndex(x => x == thisEvent);
    //events.splice(index);
    localStorage.removeItem("event"+index);
    const thisEventParent = thisEvent.parentNode;
    thisEventParent.removeChild(thisEvent);
}

const addToCompletedEventList = (event) =>{
    if(completedEventList.childElementCount == 0){
        completedEventList.append(event);
    }else{
        completedEventList.insertBefore(event, completedEventList.firstChild);
    }
}