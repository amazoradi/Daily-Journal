import putOnDOM from "./entryComponent"

// creating an object that is fetching our data, both getting from our local database and posting new user input into our database
const API = {
  getJournalEntries() {
    return fetch("http://localhost:8088/journalEntries")
      .then(response => response.json())
  },
  addToJournal(newEntry) {
    return fetch("http://localhost:8088/journalEntries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEntry)
    }).then(data => data.json())
      .then(newEntry => putOnDOM.postNewEntry(newEntry))
  }
}

export default API