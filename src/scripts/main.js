import API from "./data"
import putOnDOM from "./entryComponent"
import moodButtonValue from "./radioButtonSelect"
import createEvent from "./sumbitClick"



// accessing our data through the object previously defined. we call the method that fetches the data from the object, then go through our all of our data and passing that all our data into our dom creation function 

API.getJournalEntries().then(entries => putOnDOM.domCreation(entries))

// showing only our selected journal entries
moodButtonValue()

// allows for user input to be saved to DOM
createEvent()
