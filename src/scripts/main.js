import API from "./data"
import putOnDOM from "./entryComponent"
import moodButtonValue from "./radioButtonSelect"
import createEvent from "./sumbitClick"
import elementCreator from "./entriesDOM"



// accessing our data through the object previously defined. we call the method that fetches the data from the object, then go through our all of our data and passing that all our data into our dom creation function 

API.getJournalEntries().then(entries => putOnDOM.domCreation(entries))


// showing only our selected journal entries
moodButtonValue()

// allows for user input to be saved to DOM
createEvent()


// creates the mood dropdowns
API.getMoods().then(objs => {
  objs.forEach(obj => {
    let newMoodOption = elementCreator.dropdownFactory(obj.id, obj.label)
    let moodInput = document.getElementById("moodSelect")
    moodInput.appendChild(newMoodOption)
  });

}
)

