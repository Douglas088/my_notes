const inputDescription = document.querySelector("#description")
const inputTitle = document.querySelector("#title")
const btnAdd = document.querySelector(".bi-plus-square")
const notesContainer = document.querySelector(".notes-container")

inputDescription.addEventListener("click", () => {
  inputTitle.style.display = "block"
})

btnAdd.addEventListener("click", () => {
  if (btnAdd.getAttribute("data-editing-id")) {
    updateNote()
  } else {
    addNote()
  }
  inputTitle.style.display = "none"
})

const notes = []

function addNote() {
  if (inputTitle.value !== "" && inputDescription.value !== "") {
    const noteObject = {
      id: generationId(),
      title: inputTitle.value,
      description: inputDescription.value,
      isPinned: false,
    }

    notes.push(noteObject)
    inputTitle.value = ""
    inputDescription.value = ""
    renderNotes()
  }
}

function generationId() {
  return Math.floor(Math.random() * 5000)
}

function renderNotes() {
  notesContainer.innerHTML = ""

  const pinnedNotes = notes.filter(note => note.isPinned)
  const unPinnedNotes = notes.filter(note => !note.isPinned)
  const allNotes = [...pinnedNotes, ...unPinnedNotes]

  allNotes.forEach(note => {
    const noteElement = document.createElement("div")
    noteElement.classList.add("note")

    noteElement.innerHTML = `
      <div class="box-title">
        <h3>${note.title}</h3>
        <div>
          <i class="bi bi-pin-angle-fill" data-id="${note.id}" style="color: ${note.isPinned ? 'gold' : 'black'}"></i>
          <i class="bi bi-pencil-square" data-id="${note.id}"></i>
          <i class="bi bi-trash" data-id="${note.id}"></i>
        </div>
      </div>
      <p>${note.description}</p>
    `

    notesContainer.appendChild(noteElement)
  })

  document.querySelectorAll('.bi-trash').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const noteId = e.target.getAttribute("data-id")
      removeNote(noteId)
    })
  })

  document.querySelectorAll(".bi-pin-angle-fill").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const noteId = e.target.getAttribute("data-id")
      togglePin(noteId)
    })
  })

  document.querySelectorAll(".bi-pencil-square").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const noteId = e.target.getAttribute("data-id")
      loadNoteToEdit(noteId)
    })
  })
}

function removeNote(id) {
  const noteIndex = notes.findIndex(note => note.id == id)
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1)
    renderNotes()
  }
}

function togglePin(id) {
  const noteIndex = notes.findIndex(note => note.id == id)
  if (noteIndex !== -1) {
    notes[noteIndex].isPinned = !notes[noteIndex].isPinned
    renderNotes()
  }
}

function loadNoteToEdit(id) {
  const note = notes.find(note => note.id == id)
  if (note) {
    inputTitle.value = note.title
    inputDescription.value = note.description
    btnAdd.setAttribute("data-editing-id", id)
    inputTitle.style.display = "block"
  }
}

function updateNote() {
  const noteId = btnAdd.getAttribute("data-editing-id")
  const noteIndex = notes.findIndex(note => note.id == noteId)

  if (noteIndex !== -1) {
    notes[noteIndex].title = inputTitle.value
    notes[noteIndex].description = inputDescription.value
    btnAdd.removeAttribute("data-editing-id")
    clearInput()
    renderNotes()
  }
}

function clearInput() {
  inputTitle.value = ""
  inputDescription.value = ""
}
