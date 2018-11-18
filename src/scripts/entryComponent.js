import elementCreator from "./entriesDOM"

let entryArt = document.querySelector(".entryLog");

// el, cont, clazz, id, ...children

const putOnDOM = {
  postNewEntry(entry) {
    let entryTitle = elementCreator.elementFactory("h2", entry.concept)
    let entryContent = elementCreator.elementFactory("p", `${entry.entry} I am MMMOOOODODOD. ${entry.date}`)
    // let entryContent = elementCreator.elementFactory("p", `${entry.entry} I am ${entry.mood.label}. ${entry.date}`)
    let entryHolder = elementCreator.elementFactory("section", null, "entrySection", `${entry.id}`, entryTitle, entryContent)
    //appending our new elements to the fragment then the fragment to or article  
    let fragment = document.createDocumentFragment()
    fragment.appendChild(entryHolder)
    entryArt.appendChild(fragment)
  },
  domCreation(entries) {
    entries.forEach(entry => {
      putOnDOM.postNewEntry(entry)

    })
  },
  moodDropdown(mood) {
    let moodOption =elementCreator.elementFactory("option", `${mood.label}`, "moodOption", `mood__${mood.id}`)
    let dropDownField = elementCreator.elementFactory("select", null, "journal-input", "mood", "mood__dropdown", moodOption)
    let dropdownHolder = document.getElementById("moodDiv")
    dropdownHolder.appendChild(dropDownField)
  },
  putDropdownOnDOM (moods) {

  }
}


  // < div class="mood" >
  //   <form action="">
  //     <fieldset>
  //       <label for="mood">Mood of the Day </label>
  //       <select type="select" name="moods" id="mood" class="journal-input" required>
  //         <option value="Happy">Happy</option>
  //         <option value="Sad">Sad</option>
  //         <option value="Stoked">Stoked</option>
  //         <option value="Anxious">Anxious</option>
  //         <option value="Overwhelmed">Overwhelmed</option>
  //         <option value="Ready">Ready</option>
  //       </select>
  //     </fieldset>
  //   </form>
  //     </div >

export default putOnDOM