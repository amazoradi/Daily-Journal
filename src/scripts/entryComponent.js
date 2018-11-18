import elementCreator from "./DOMElements"

let entryArt = document.querySelector(".entryLog");

// for reference the arguements of element factory are el, cont, clazz, id, ...children

const putOnDOM = {
  postNewEntry(entry) {
    let entryTitle = elementCreator.elementFactory("h2", entry.concept, "entryTitle")
    let entryDate = elementCreator.elementFactory("h3", `${entry.date}`, "entryDate")
    let entryMood = elementCreator.elementFactory("h4", `My mood: ${entry.mood.label}.`, "entryMood")
    let entryContent = elementCreator.elementFactory("p", `${entry.entry}. The instructor today was ${entry.instructor.firstName} ${entry.instructor.lastName}.`)
    let entryHolder = elementCreator.elementFactory("section", null, "entrySection", `${entry.id}`, entryTitle, entryDate, entryMood, entryContent)
    //appending our new elements to the fragment then the fragment to or article  
    let fragment = document.createDocumentFragment()
    fragment.appendChild(entryHolder)
    entryArt.appendChild(fragment)
  },

  domCreation(entries) {
    entries.forEach(entry => {
      putOnDOM.postNewEntry(entry)

    })
  }
}


export default putOnDOM