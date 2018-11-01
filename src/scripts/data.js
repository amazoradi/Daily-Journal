// creating an objec that is fetching our data
const API = {
  getJournalEntries() {
    return fetch("http://localhost:8088/journalEntries")
      .then(response => response.json())
  }
}