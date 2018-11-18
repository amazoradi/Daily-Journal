// creating an object that is fetching our data, both getting from our local database and posting new user input into our database
const API = {
  
  getJournalEntries() {
    return fetch("http://localhost:8088/journalEntries?_expand=mood&_expand=instructor")
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
  },

  getMoods() {
    return fetch("http://localhost:8088/moods")
      .then(response => response.json())
  },
  getInstructors() {
    return fetch("http://localhost:8088/instructors")
      .then(response => response.json())
  }
}

export default API