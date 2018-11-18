import API from "./data"
import putOnDOM from "./entryComponent"

function clearAndAdd() {
  document.getElementById("entryLog").innerHTML = ""
  API.getJournalEntries().then(entries => putOnDOM.domCreation(entries))
}

export default clearAndAdd