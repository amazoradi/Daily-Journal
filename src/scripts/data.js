// getting our data from the database
// fetch(" http://localhost:8088/journalEntries")
//   // convert or database data to javascript
//   .then(entry => entry.json())
//   .then(parsedEntry => {
//     // loop over the array of fetched data
//     parsedEntry.forEach((entry) => {
//       // creates DOM elements by calling our function
//       domCreation(entry)
//     })
//   })

const API = {
  getJournalEntries() {
    return fetch("http://localhost:8088/journalEntries")
      .then(response => response.json())
  }
}