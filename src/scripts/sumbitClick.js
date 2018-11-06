import validateEntry from "./formValidation"
// add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

function createEvent() {
  let recordButton = $("#record-button")
  $(recordButton).click(() => {
    let entryObject = {
      "date": $("#journalDate").val(),
      "concept": $("#conceptsCovered").val(),
      "entry": $("#journalEntry").val(),
      "mood": $("#mood").val()
    }
    validateEntry(entryObject)
  })
}



export default createEvent