let entryArt = document.querySelector(".entryLog");

const putOnDOM = {
 domCreation(entries) {
  entries.forEach(entry => {
    let entryTitle = elementCreator.elementFactory("h2", entry.concept)
    let entryContent = elementCreator.elementFactory("p", `${entry.entry} I am ${entry.mood}. ${entry.date}`)
    let entryHolder = elementCreator.elementFactory("section", null, entryTitle, entryContent)
    //appending our new elements to the fragment then the fragment to or article  
    let fragment = document.createDocumentFragment()
    fragment.appendChild(entryHolder)
    entryArt.appendChild(fragment)
  });
} 
}
