const journalEntries = [
  {
    date: "10/01/2018",
    concept: "Into to NSS",
    entry: "Today was the first day of a new chapter; we now know what we are getting ourselves into.",
    mood: "excited"
  },
  {
    date: "10/18/2018",
    concept: "Intro to API",
    entry: "We looked at how to look at and get, use and change information from big JSON databases",
    mood: "overwhelmed"
  },
  {
    date: "10/19/2018",
    concept: "Lab Day",
    entry: "Ready to take on all the things. Challenges, come at me.",
    mood: "ready"
  }
];


let fragment = document.createDocumentFragment();
let entryArt = document.querySelector(".entryLog");


// this function creates a journal entry structure; the h2 and p tags and also says what, from our object, should go in each tag
const makeJournalEntries = (journalObject) => {
  let entryHolder = document.createElement("section");
  let entryTitle = document.createElement("h2");
  entryTitle.textContent = journalObject.concept
  let entryMeat = document.createElement("p")
  entryMeat.textContent = `${journalObject.entry} I am ${journalObject.mood}. ${journalObject.date}`
  entryHolder.appendChild(entryTitle)
  entryHolder.appendChild(entryMeat)
  return entryHolder
}
// This function calls the function creating an entry structure and fills it with the object at position [i] of our entry arry
// it then puts that populated entry in a fragment until it has gone through the entire array and puts the fragment on the DOm once called.
const renderedEntries = (array) => {
  for (let i =0; i < journalEntries.length; i++){
    let newEntry = makeJournalEntries(array[i]);
    fragment.appendChild(newEntry)
  } entryArt.appendChild(fragment)
}

renderedEntries(journalEntries)




  




































