// accessing our data through the object previously defined. we call the method that fetches the data from the object, then go through our all of our data and passing that all our data into our dom creation function 

API.getJournalEntries().then(entries => putOnDOM.domCreation(entries))


// add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

let recordButton = document.getElementById("record-button")

function createEvent () {
recordButton.addEventListener("click", () => {
  console.log("click")
  let entryObject = {
    "date": document.getElementById("journalDate").value,
    "concept": document.getElementById("conceptsCovered").value,
    "entry": document.getElementById("journalEntry").value,
    "mood": document.getElementById("mood").value
  }
  console.log(entryObject)
//  saveToEntries(entryObject)
})}

createEvent()

// const saveToEntries = (data) => {
//   return fetch("http://localhost:8088/journalEntries", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })
// }
