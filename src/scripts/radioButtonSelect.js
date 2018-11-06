import filterMood from "./moodFilter"

function moodButtonValue() {
  $("input[type=radio][name=mood]").click(() => {
    let radioMood = $("input[type=radio][name=mood]:checked").val()
    let entryDiv = $(".entrySection")
    $(entryDiv).addClass("hidden")
    filterMood(radioMood)
  })
}

export default moodButtonValue
