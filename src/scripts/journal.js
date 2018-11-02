// accessing our data through the object previously defined. we call the method that fetches the data from the object, then go through our all of our data and passing that all our data into our dom creation function 

API.getJournalEntries().then(entries => putOnDOM.domCreation(entries))


// add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

let recordButton = document.getElementById("record-button")
let dateJournal = document.getElementById("journalDate")
let conceptJournal =  document.getElementById("conceptsCovered")
let entryJournal = document.getElementById("journalEntry")
let moodJournal = document.getElementById("mood")
let counter = 4

function createEvent () {
recordButton.addEventListener("click", () => {
  console.log("click")
  let entryObject = {
    "date": dateJournal.value,
    "concept": conceptJournal.value,
    "entry": entryJournal.value,
    "mood": moodJournal.value,
    "id": counter
  }
  console.log(entryObject)
  //add function to apply logic 
  validateEntry()
  saveToEntries(entryObject)
  counter += 1
})}

createEvent()


  const saveToEntries = (data) => {
    return fetch(`http://localhost:8088/journalEntries/${counter}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
}



function validateEntry () {
 
  if (dateJournal.value === ""){
    console.log("Hold up")
    alert("Please fill out all sections")
  } 
  if (conceptJournal.value === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
}
  if (entryJournal.value === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
  } 
  if (moodJournal.value === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
  }
}
// Using required attribute to ensure no blank entries
// No characters other than letters, numbers, (), {}, :, and;
// let input = (document.queryselector("#input id")) if input.hasattribute('required') && input.value === ""{dont sumbit form} else {submit form}
