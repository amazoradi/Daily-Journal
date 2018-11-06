// accessing our data through the object previously defined. we call the method that fetches the data from the object, then go through our all of our data and passing that all our data into our dom creation function 

API.getJournalEntries().then(entries => putOnDOM.domCreation(entries))


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

createEvent()


function moodButtonValue() {
  $("input[type=radio][name=mood]").click(() => {
    let radioMood = $("input[type=radio][name=mood]:checked").val()
    let entryDiv = $(".entrySection")
    $(entryDiv).addClass("hidden")
    filterMood(radioMood)
  })
}

moodButtonValue()


function filterMood(mood) {
  API.getJournalEntries().then(responses => responses.filter(response => response.mood === mood)).then(filteredEntry => putOnDOM.domCreation(filteredEntry))
}


// Using required attribute to ensure no blank entries
// No characters other than letters, numbers, (), {}, :, and;
// let input = (document.queryselector("#input id")) if input.hasattribute('required') && input.value === ""{dont sumbit form} else {submit form}
