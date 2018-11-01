// getting our data from the database
fetch(" http://localhost:8088/journalEntries")
  // convert or database data to javascript
  .then(entry => entry.json())
  .then(parsedEntry => {
    // loop over the array
    parsedEntry.forEach((entry) => {
      // creates DOM elements by calling our function

      domCreation(entry)
    })
  })