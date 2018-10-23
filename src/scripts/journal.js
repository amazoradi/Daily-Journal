let fragment = document.createDocumentFragment();
let entryArt = document.querySelector(".entryLog");


// function to create any elements (el) with any content (cont or null) and you can designate if it has a child
const elementFactory = (el, cont, ...children) => {
  let element = document.createElement(el)
  element.innerHTML = cont || null
  children.forEach(child => {
    element.appendChild(child)
  })
  // returns our created elements when called
  return element
}

// getting our data from the database
fetch(" http://localhost:8088/journalEntries")
  // convert or database data to javascript
  .then(entry => entry.json())
  .then(parsedEntry => {
    // loop over the array
    parsedEntry.forEach((entry) => {
      // creates DOM elements by calling our function
      let entryTitle = elementFactory("h2", entry.concept)
      let entryContent = elementFactory("p", `${entry.entry} I am ${entry.mood}. ${entry.date}`)
      let entryHolder = elementFactory("section", null, entryTitle, entryContent)
      //appending our new elements to the fragment then the fragment to or article  
      fragment.appendChild(entryHolder)
      entryArt.appendChild(fragment)
    })
  })
















