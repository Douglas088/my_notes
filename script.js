const inputTitle = document.querySelector("#title");
const inputDescription = document.querySelector("#description");
const btnAdd = document.querySelector("#btn-add");
const notesContainer = document.querySelector(".notes-container");

//eventos

inputDescription.addEventListener("click", function showInputTitle() {
  inputTitle.style.display = "block";
});

btnAdd.addEventListener("click", () => {
  addNote();
  inputTitle.style.display = "none";
  inputTitle = ""
  inputDescription.value = ""
});

//funções

function addNote() {
  noteObject = {
    id: generationId(),
    title: inputTitle.value,
    description: inputDescription.value,
    fixed: false,
  };

  const noteElement = createNote(
    noteObject.id,
    noteObject.title,
    noteObject.description
  );
}

function generationId() {
  return Math.floor(Math.random() * 5000);
}

function createNote(id, title, description, fixed) {
  cardNote = document.createElement("div");

  cardNote.innerHTML = `
        <div class="note">
            <div class="title-box">
                <h4>${title}</h4>
                <i class="bi bi-pin-angle"></i>
                <i class="bi bi-pencil-square"></i>
                <i class="bi bi-trash3"></i>
            </div>
            <p>${description}</p>  
        </div>    
    `;

  notesContainer.appendChild(cardNote);
}
