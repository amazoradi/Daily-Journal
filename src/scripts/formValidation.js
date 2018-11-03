function validateEntry(entryObject) {

  if (entryObject.date.value === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
  } else if (entryObject.concept.value === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
  } else if (entryObject.entry.value === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
  } else if (entryObject.mood.value === "") {
    console.log("Hold up")
    alert("Please fill out all sections")
  } else {
    API.addToJournal(entryObject)
  }
}