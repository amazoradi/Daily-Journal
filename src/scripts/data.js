// creating an objec that is fetching our data
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