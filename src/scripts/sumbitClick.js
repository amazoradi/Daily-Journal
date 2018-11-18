import validateEntry from "./formValidation"
import API from "./data"
// add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

function createEvent() {
  let recordButton = $("#record-button")
  $(recordButton).click(() => {
    // let moodIDs = 
    let mood = $("#mood").val()
    let MoodObj =API.getJournalMoods(mood)
    console.log("obj", MoodObj , "id", MoodObj.id)
    let entryObject = {
      "date": $("#journalDate").val(),
      "concept": $("#conceptsCovered").val(),
      "entry": $("#journalEntry").val(),
      "moodId": MoodObj.id
    }
    validateEntry(entryObject)
  })
}



export default createEvent