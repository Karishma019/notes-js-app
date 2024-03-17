const headerEle = document.querySelector('#header');
const greeting = document.querySelector('#greeting');
const todayDate = document.querySelector('#today-date');
const today = new Date();
const hours = today.getHours();


// Change Background Image and Greeting text according to time

if(hours <=12){
    headerEle.style.background = "url(img/morning.jpg)";
    headerEle.style.backgroundPosition = 0;
    headerEle.style.backgroundSize = "cover";
    greeting.innerText = "Good Morning";

}else if (hours >12 && hours <16){
    headerEle.style.background = "url(img/afternoon.jpg)"
    headerEle.style.backgroundPosition = 0;
    headerEle.style.backgroundSize = "cover";
    greeting.innerText = "Good Afternoon";

}else if (hours>=16 && hours<=18){
    headerEle.style.background = "url(img/evening.jpg)"
    headerEle.style.backgroundPosition = 0;
    headerEle.style.backgroundSize = "cover";
    greeting.innerText = "Good Evening";

}else if (hours>18 && hours<=24){
    headerEle.style.background = "url(img/night.jpg)"
    headerEle.style.backgroundPosition = 0;
    headerEle.style.backgroundSize = "cover";
    greeting.innerText = "Good Night";
}

// Formatted current date

const fDate = new Intl.DateTimeFormat("en-us",{
    dateStyle:"full"
})

const formatDate = fDate.format(today);
console.log(formatDate);
todayDate.innerText = formatDate;


const addBtn = document.querySelector('#add-btn');
const addNote = document.querySelector('#add-note');
const notesContainer = document.querySelector('.notes-container');
const saveBtn = document.querySelector('#save-btn');
const addTitle = document.querySelector('#add-title');
const addDescription = document.querySelector('#add-description');
const notesArray = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];

// Show note in notes container
notesArray.forEach(createNote);


// display add note container

addBtn.addEventListener('click' , function(){
   addNote.style.display = "block";
})

// save note to local storage

function saveNote(){
    const notesContent = {
        title : addTitle.value,
        description : addDescription.value,
        date : formatDate
    }
    notesArray.push(notesContent)
    localStorage.setItem("notes",JSON.stringify(notesArray));
    addTitle.value = "";
    addDescription.value = "";
    addNote.style.display = "none";
    location.reload();
}

saveBtn.addEventListener('click', saveNote);

const deleteBtn = document.getElementById('delete-note');

function createNote(notes , index){
        const note = document.createElement('div');
        note.classList.add("note-container");
        notesContainer.append(note);
         note.innerHTML = `
         <div class="note-header">
         <p>${notes.date}</p>
         <button onclick="deleteNote(this.id)" id="${index}">
         <i class="fa-solid fa-trash"></i>
       
    </div>
    <div class="note-content">
        <h2 id="note-title">${notes.title}</h2>
        <p id="note-description">${notes.description}</p>    
    </div>`

 
}


    // Delete notes from local storage

    function deleteNote(index){
        notesArray.splice(index,1);
        localStorage.setItem("notes",JSON.stringify(notesArray));
        location.reload();
     }



