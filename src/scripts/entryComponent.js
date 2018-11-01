let entryArt = document.querySelector(".entryLog");

function domCreation(entry) {
  let entryTitle = elementFactory("h2", entry.concept)
  let entryContent = elementFactory("p", `${entry.entry} I am ${entry.mood}. ${entry.date}`)
  let entryHolder = elementFactory("section", null, entryTitle, entryContent)
  //appending our new elements to the fragment then the fragment to or article  
  let fragment = document.createDocumentFragment()
  fragment.appendChild(entryHolder)
  entryArt.appendChild(fragment)
}