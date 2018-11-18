import API from "./data"
import putOnDOM from "./entryComponent"

function filterMood(moodlabel) {
  API.getJournalEntries().then(responses => responses.filter(response => response.mood.label === moodlabel)).then(filteredEntry => putOnDOM.domCreation(filteredEntry))
}

export default filterMood