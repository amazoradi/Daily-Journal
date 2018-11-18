import API from "./data"
import clearAndAdd from "./clearRepopDOM"


function validateEntry(entryObject) {

  if (entryObject.date === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
  } else if (entryObject.concept === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
  } else if (entryObject.entry === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
  } else if (entryObject.mood === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
  } else {
    API.addToJournal(entryObject)
      .then(resposne => clearAndAdd())
  }
}

export default validateEntry