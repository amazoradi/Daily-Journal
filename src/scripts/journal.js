const journalEntries = [
  {
    date: "10/01/2018",
    concept: "Into to NSS",
    entry: "Today was the first day of a new chapter; we now know what we are getting ourselves into.",
    mood: "excited"
  },
  {
    date: "10/18/2018",
    concept: "API",
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



//  let fragment = document.createDocumentFragment();


journalEntries.forEach(element => {
  let entryArt = document.querySelector(".entryLog");
  let entryHolder = document.createElement("section");
  entryArt.appendChild(entryHolder)
  let entryTitle = document.createElement("h2");
  let entryMeat = document.createElement("p")
  entryTitle.textContent = element.concept
  entryMeat.textContent = element.entry + " " + element.date
  entryHolder.appendChild(entryTitle)
  entryHolder.appendChild(entryMeat)
});



































