import validateEntry from "./formValidation"


function createEvent() {
  let recordButton = $("#record-button")
  $(recordButton).click(() => {
    let entryObject = {
      "date": $("#journalDate").val(),
      "concept": $("#conceptsCovered").val(),
      "entry": $("#journalEntry").val(),
      "moodId": +$("#moodSelect").val()
    }
    validateEntry(entryObject)
  })
}


export default createEvent