import API from "./data"
import putOnDOM from "./entryComponent"

function filterMood(mood) {
  API.getJournalEntries().then(responses => responses.filter(response => response.mood === mood)).then(filteredEntry => putOnDOM.domCreation(filteredEntry))
}

export default filterMood