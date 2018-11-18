(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("./data"));

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clearAndAdd() {
  document.getElementById("entryLog").innerHTML = "";

  _data.default.getJournalEntries().then(entries => {
    _entryComponent.default.postNewEntry(entries);
  });
}

var _default = clearAndAdd;
exports.default = _default;

},{"./data":2,"./entryComponent":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clearRepopDOM = _interopRequireDefault(require("./clearRepopDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// creating an object that is fetching our data, both getting from our local database and posting new user input into our database
const API = {
  getJournalEntries() {
    return fetch("http://localhost:8088/journalEntries").then(response => response.json());
  },

  addToJournal(newEntry) {
    return fetch("http://localhost:8088/journalEntries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEntry)
    }).then(data => data.json()) // .then(newEntry => putOnDOM.postNewEntry(newEntry))
    .then((0, _clearRepopDOM.default)());
  },

  getJournalMoods() {
    return fetch("http://localhost:8088/journalEntries?_expand=mood").then(response => response.json());
  },

  getJournalMoodIds(mood) {
    return fetch(`http://localhost:8088/moods?id=${mood}`).then(response => response.json());
  }

};
var _default = API;
exports.default = _default;

},{"./clearRepopDOM":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// function to create any elements (el) with any content (cont or null) and you can designate if it has a child
const elementCreator = {
  elementFactory(el, cont, clazz, id, ...children) {
    let element = document.createElement(el);
    $(element).html(cont || null);
    $(element).addClass(clazz || null);
    element.setAttribute("id", id || null);
    children.forEach(child => {
      element.appendChild(child);
    }); // returns our created elements when called

    return element;
  },

  dropdownFactory(id, label) {
    let holder = document.createElement("select");
    let element = document.createElement("option");
    element.setAttribute("value", id);
    element.innerHTML = label;
    holder.appendChild(element);
  }

};
var _default = elementCreator;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entriesDOM = _interopRequireDefault(require("./entriesDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let entryArt = document.querySelector(".entryLog"); // el, cont, clazz, id, ...children

const putOnDOM = {
  postNewEntry(entry) {
    let entryTitle = _entriesDOM.default.elementFactory("h2", entry.concept);

    let entryContent = _entriesDOM.default.elementFactory("p", `${entry.entry} I am MMMOOOODODOD. ${entry.date}`); // let entryContent = elementCreator.elementFactory("p", `${entry.entry} I am ${entry.mood.label}. ${entry.date}`)


    let entryHolder = _entriesDOM.default.elementFactory("section", null, "entrySection", `${entry.id}`, entryTitle, entryContent); //appending our new elements to the fragment then the fragment to or article  


    let fragment = document.createDocumentFragment();
    fragment.appendChild(entryHolder);
    entryArt.appendChild(fragment);
  },

  domCreation(entries) {
    entries.forEach(entry => {
      putOnDOM.postNewEntry(entry);
    });
  },

  moodDropdown(mood) {
    let moodOption = _entriesDOM.default.elementFactory("option", `${mood.label}`, "moodOption", `mood__${mood.id}`);

    let dropDownField = _entriesDOM.default.elementFactory("select", null, "journal-input", "mood", "mood__dropdown", moodOption);

    let dropdownHolder = document.getElementById("moodDiv");
    dropdownHolder.appendChild(dropDownField);
  },

  putDropdownOnDOM(moods) {}

}; // < div class="mood" >
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

var _default = putOnDOM;
exports.default = _default;

},{"./entriesDOM":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("./data"));

var _clearRepopDOM = _interopRequireDefault(require("./clearRepopDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateEntry(entryObject) {
  if (entryObject.date === "") {
    console.log("Hold up");
    alert("Please fill out all sections");
  } else if (entryObject.concept === "") {
    console.log("Hold up");
    alert("Please fill out all sections");
  } else if (entryObject.entry === "") {
    console.log("Hold up");
    alert("Please fill out all sections");
  } else if (entryObject.mood === "") {
    console.log("Hold up");
    alert("Please fill out all sections");
  } else {
    _data.default.addToJournal(entryObject);
  }
}

var _default = validateEntry;
exports.default = _default;

},{"./clearRepopDOM":1,"./data":2}],6:[function(require,module,exports){
"use strict";

var _data = _interopRequireDefault(require("./data"));

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

var _radioButtonSelect = _interopRequireDefault(require("./radioButtonSelect"));

var _sumbitClick = _interopRequireDefault(require("./sumbitClick"));

var _entriesDOM = _interopRequireDefault(require("./entriesDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// accessing our data through the object previously defined. we call the method that fetches the data from the object, then go through our all of our data and passing that all our data into our dom creation function 
_data.default.getJournalMoods().then(entries => _entryComponent.default.domCreation(entries)); // API.getJournalMoods()
// showing only our selected journal entries


(0, _radioButtonSelect.default)(); // allows for user input to be saved to DOM

(0, _sumbitClick.default)(); // API.getJournalMoods().then(moods => putOnDOM.moodDropdown(moods))

_data.default.getJournalMoods().then(objs => {
  objs.forEach(obj => {
    _entriesDOM.default.dropdownFactory(obj.id, obj.label);
  });
});

},{"./data":2,"./entriesDOM":3,"./entryComponent":4,"./radioButtonSelect":8,"./sumbitClick":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("./data"));

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterMood(moodlabel) {
  _data.default.getJournalMoods().then(responses => responses.filter(response => response.mood.label === moodlabel)).then(filteredEntry => _entryComponent.default.domCreation(filteredEntry));
}

var _default = filterMood;
exports.default = _default;

},{"./data":2,"./entryComponent":4}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moodFilter = _interopRequireDefault(require("./moodFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function moodButtonValue() {
  $("input[type=radio][name=mood]").click(() => {
    let radioMood = $("input[type=radio][name=mood]:checked").val();
    let entryDiv = $(".entrySection");
    $(entryDiv).addClass("hidden");
    (0, _moodFilter.default)(radioMood);
  });
}

var _default = moodButtonValue;
exports.default = _default;

},{"./moodFilter":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formValidation = _interopRequireDefault(require("./formValidation"));

var _data = _interopRequireDefault(require("./data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.
function createEvent() {
  let recordButton = $("#record-button");
  $(recordButton).click(() => {
    // let moodIDs = 
    let mood = $("#mood").val();

    let MoodObj = _data.default.getJournalMoods(mood);

    console.log("obj", MoodObj, "id", MoodObj.id);
    let entryObject = {
      "date": $("#journalDate").val(),
      "concept": $("#conceptsCovered").val(),
      "entry": $("#journalEntry").val(),
      "moodId": MoodObj.id
    };
    (0, _formValidation.default)(entryObject);
  });
}

var _default = createEvent;
exports.default = _default;

},{"./data":2,"./formValidation":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NsZWFyUmVwb3BET00uanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VudHJpZXNET00uanMiLCIuLi9zY3JpcHRzL2VudHJ5Q29tcG9uZW50LmpzIiwiLi4vc2NyaXB0cy9mb3JtVmFsaWRhdGlvbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbW9vZEZpbHRlci5qcyIsIi4uL3NjcmlwdHMvcmFkaW9CdXR0b25TZWxlY3QuanMiLCIuLi9zY3JpcHRzL3N1bWJpdENsaWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOztBQUNBOzs7O0FBRUEsU0FBUyxXQUFULEdBQXVCO0FBQ3JCLEVBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0MsU0FBcEMsR0FBZ0QsRUFBaEQ7O0FBQ0EsZ0JBQUksaUJBQUosR0FDRyxJQURILENBQ1EsT0FBTyxJQUFJO0FBQ2YsNEJBQVMsWUFBVCxDQUFzQixPQUF0QjtBQUNELEdBSEg7QUFJRDs7ZUFFYyxXOzs7Ozs7Ozs7OztBQ1hmOzs7O0FBRUE7QUFDQSxNQUFNLEdBQUcsR0FBRztBQUNWLEVBQUEsaUJBQWlCLEdBQUc7QUFDbEIsV0FBTyxLQUFLLENBQUMsc0NBQUQsQ0FBTCxDQUNKLElBREksQ0FDQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEYixDQUFQO0FBRUQsR0FKUzs7QUFLVixFQUFBLFlBQVksQ0FBQyxRQUFELEVBQVc7QUFDckIsV0FBTyxLQUFLLENBQUMsc0NBQUQsRUFBeUM7QUFDbkQsTUFBQSxNQUFNLEVBQUUsTUFEMkM7QUFFbkQsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVCxPQUYwQztBQUtuRCxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFFBQWY7QUFMNkMsS0FBekMsQ0FBTCxDQU1K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QyxDQUF3QyxNQUFNO0FBQzVDLFFBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxzQ0FBRCxDQUFELENBQTBDLEdBQTFDLEVBQWhCO0FBQ0EsUUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGVBQUQsQ0FBaEI7QUFDQSxJQUFBLENBQUMsQ0FBQyxRQUFELENBQUQsQ0FBWSxRQUFaLENBQXFCLFFBQXJCO0FBQ0EsNkJBQVcsU0FBWDtBQUNELEdBTEQ7QUFNRDs7ZUFFYyxlOzs7Ozs7Ozs7OztBQ1pmOztBQUNBOzs7O0FBQ0E7QUFFQSxTQUFTLFdBQVQsR0FBdUI7QUFDckIsTUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLGdCQUFELENBQXBCO0FBQ0EsRUFBQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCLEtBQWhCLENBQXNCLE1BQU07QUFDMUI7QUFDQSxRQUFJLElBQUksR0FBRyxDQUFDLENBQUMsT0FBRCxDQUFELENBQVcsR0FBWCxFQUFYOztBQUNBLFFBQUksT0FBTyxHQUFFLGNBQUksZUFBSixDQUFvQixJQUFwQixDQUFiOztBQUNBLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLE9BQW5CLEVBQTZCLElBQTdCLEVBQW1DLE9BQU8sQ0FBQyxFQUEzQztBQUNBLFFBQUksV0FBVyxHQUFHO0FBQ2hCLGNBQVEsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQixHQUFsQixFQURRO0FBRWhCLGlCQUFXLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCLEdBQXRCLEVBRks7QUFHaEIsZUFBUyxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CLEdBQW5CLEVBSE87QUFJaEIsZ0JBQVUsT0FBTyxDQUFDO0FBSkYsS0FBbEI7QUFNQSxpQ0FBYyxXQUFkO0FBQ0QsR0FaRDtBQWFEOztlQUljLFciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQVBJIGZyb20gXCIuL2RhdGFcIlxyXG5pbXBvcnQgcHV0T25ET00gZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIlxyXG5cclxuZnVuY3Rpb24gY2xlYXJBbmRBZGQoKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnRyeUxvZ1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgQVBJLmdldEpvdXJuYWxFbnRyaWVzKClcclxuICAgIC50aGVuKGVudHJpZXMgPT4ge1xyXG4gICAgICBwdXRPbkRPTS5wb3N0TmV3RW50cnkoZW50cmllcylcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsZWFyQW5kQWRkIiwiaW1wb3J0IGNsZWFyQW5kQWRkIGZyb20gXCIuL2NsZWFyUmVwb3BET01cIlxyXG5cclxuLy8gY3JlYXRpbmcgYW4gb2JqZWN0IHRoYXQgaXMgZmV0Y2hpbmcgb3VyIGRhdGEsIGJvdGggZ2V0dGluZyBmcm9tIG91ciBsb2NhbCBkYXRhYmFzZSBhbmQgcG9zdGluZyBuZXcgdXNlciBpbnB1dCBpbnRvIG91ciBkYXRhYmFzZVxyXG5jb25zdCBBUEkgPSB7XHJcbiAgZ2V0Sm91cm5hbEVudHJpZXMoKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvam91cm5hbEVudHJpZXNcIilcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH0sXHJcbiAgYWRkVG9Kb3VybmFsKG5ld0VudHJ5KSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvam91cm5hbEVudHJpZXNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3RW50cnkpXHJcbiAgICB9KS50aGVuKGRhdGEgPT4gZGF0YS5qc29uKCkpXHJcbiAgICAgIC8vIC50aGVuKG5ld0VudHJ5ID0+IHB1dE9uRE9NLnBvc3ROZXdFbnRyeShuZXdFbnRyeSkpXHJcbiAgICAgIC50aGVuKGNsZWFyQW5kQWRkKCkpIFxyXG4gIH0sXHJcbiAgIGdldEpvdXJuYWxNb29kcygpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllcz9fZXhwYW5kPW1vb2RcIilcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKSAgXHJcbiAgfSwgZ2V0Sm91cm5hbE1vb2RJZHMobW9vZCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvbW9vZHM/aWQ9JHttb29kfWApXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgXHJcbn1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiLy8gZnVuY3Rpb24gdG8gY3JlYXRlIGFueSBlbGVtZW50cyAoZWwpIHdpdGggYW55IGNvbnRlbnQgKGNvbnQgb3IgbnVsbCkgYW5kIHlvdSBjYW4gZGVzaWduYXRlIGlmIGl0IGhhcyBhIGNoaWxkXHJcbmNvbnN0IGVsZW1lbnRDcmVhdG9yID0ge1xyXG4gIGVsZW1lbnRGYWN0b3J5KGVsLCBjb250LCBjbGF6eiwgaWQsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpXHJcbiAgICAkKGVsZW1lbnQpLmh0bWwoY29udCB8fCBudWxsKVxyXG4gICAgJChlbGVtZW50KS5hZGRDbGFzcyhjbGF6eiB8fCBudWxsKVxyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZCB8fCBudWxsKVxyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXHJcbiAgICB9KVxyXG4gICAgLy8gcmV0dXJucyBvdXIgY3JlYXRlZCBlbGVtZW50cyB3aGVuIGNhbGxlZFxyXG4gICAgcmV0dXJuIGVsZW1lbnRcclxuICB9LFxyXG4gIGRyb3Bkb3duRmFjdG9yeShpZCwgbGFiZWwpIHtcclxuICAgIGxldCBob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpXHJcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgaWQpXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9bGFiZWxcclxuICAgIGhvbGRlci5hcHBlbmRDaGlsZChlbGVtZW50KVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVsZW1lbnRDcmVhdG9yIiwiaW1wb3J0IGVsZW1lbnRDcmVhdG9yIGZyb20gXCIuL2VudHJpZXNET01cIlxyXG5cclxubGV0IGVudHJ5QXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbnRyeUxvZ1wiKTtcclxuXHJcbi8vIGVsLCBjb250LCBjbGF6eiwgaWQsIC4uLmNoaWxkcmVuXHJcblxyXG5jb25zdCBwdXRPbkRPTSA9IHtcclxuICBwb3N0TmV3RW50cnkoZW50cnkpIHtcclxuICAgIGxldCBlbnRyeVRpdGxlID0gZWxlbWVudENyZWF0b3IuZWxlbWVudEZhY3RvcnkoXCJoMlwiLCBlbnRyeS5jb25jZXB0KVxyXG4gICAgbGV0IGVudHJ5Q29udGVudCA9IGVsZW1lbnRDcmVhdG9yLmVsZW1lbnRGYWN0b3J5KFwicFwiLCBgJHtlbnRyeS5lbnRyeX0gSSBhbSBNTU1PT09PRE9ET0QuICR7ZW50cnkuZGF0ZX1gKVxyXG4gICAgLy8gbGV0IGVudHJ5Q29udGVudCA9IGVsZW1lbnRDcmVhdG9yLmVsZW1lbnRGYWN0b3J5KFwicFwiLCBgJHtlbnRyeS5lbnRyeX0gSSBhbSAke2VudHJ5Lm1vb2QubGFiZWx9LiAke2VudHJ5LmRhdGV9YClcclxuICAgIGxldCBlbnRyeUhvbGRlciA9IGVsZW1lbnRDcmVhdG9yLmVsZW1lbnRGYWN0b3J5KFwic2VjdGlvblwiLCBudWxsLCBcImVudHJ5U2VjdGlvblwiLCBgJHtlbnRyeS5pZH1gLCBlbnRyeVRpdGxlLCBlbnRyeUNvbnRlbnQpXHJcbiAgICAvL2FwcGVuZGluZyBvdXIgbmV3IGVsZW1lbnRzIHRvIHRoZSBmcmFnbWVudCB0aGVuIHRoZSBmcmFnbWVudCB0byBvciBhcnRpY2xlICBcclxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZW50cnlIb2xkZXIpXHJcbiAgICBlbnRyeUFydC5hcHBlbmRDaGlsZChmcmFnbWVudClcclxuICB9LFxyXG4gIGRvbUNyZWF0aW9uKGVudHJpZXMpIHtcclxuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgIHB1dE9uRE9NLnBvc3ROZXdFbnRyeShlbnRyeSlcclxuXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgbW9vZERyb3Bkb3duKG1vb2QpIHtcclxuICAgIGxldCBtb29kT3B0aW9uID1lbGVtZW50Q3JlYXRvci5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCBgJHttb29kLmxhYmVsfWAsIFwibW9vZE9wdGlvblwiLCBgbW9vZF9fJHttb29kLmlkfWApXHJcbiAgICBsZXQgZHJvcERvd25GaWVsZCA9IGVsZW1lbnRDcmVhdG9yLmVsZW1lbnRGYWN0b3J5KFwic2VsZWN0XCIsIG51bGwsIFwiam91cm5hbC1pbnB1dFwiLCBcIm1vb2RcIiwgXCJtb29kX19kcm9wZG93blwiLCBtb29kT3B0aW9uKVxyXG4gICAgbGV0IGRyb3Bkb3duSG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb29kRGl2XCIpXHJcbiAgICBkcm9wZG93bkhvbGRlci5hcHBlbmRDaGlsZChkcm9wRG93bkZpZWxkKVxyXG4gIH0sXHJcbiAgcHV0RHJvcGRvd25PbkRPTSAobW9vZHMpIHtcclxuXHJcbiAgfVxyXG59XHJcblxyXG5cclxuICAvLyA8IGRpdiBjbGFzcz1cIm1vb2RcIiA+XHJcbiAgLy8gICA8Zm9ybSBhY3Rpb249XCJcIj5cclxuICAvLyAgICAgPGZpZWxkc2V0PlxyXG4gIC8vICAgICAgIDxsYWJlbCBmb3I9XCJtb29kXCI+TW9vZCBvZiB0aGUgRGF5IDwvbGFiZWw+XHJcbiAgLy8gICAgICAgPHNlbGVjdCB0eXBlPVwic2VsZWN0XCIgbmFtZT1cIm1vb2RzXCIgaWQ9XCJtb29kXCIgY2xhc3M9XCJqb3VybmFsLWlucHV0XCIgcmVxdWlyZWQ+XHJcbiAgLy8gICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSGFwcHlcIj5IYXBweTwvb3B0aW9uPlxyXG4gIC8vICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNhZFwiPlNhZDwvb3B0aW9uPlxyXG4gIC8vICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlN0b2tlZFwiPlN0b2tlZDwvb3B0aW9uPlxyXG4gIC8vICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFueGlvdXNcIj5Bbnhpb3VzPC9vcHRpb24+XHJcbiAgLy8gICAgICAgICA8b3B0aW9uIHZhbHVlPVwiT3ZlcndoZWxtZWRcIj5PdmVyd2hlbG1lZDwvb3B0aW9uPlxyXG4gIC8vICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlJlYWR5XCI+UmVhZHk8L29wdGlvbj5cclxuICAvLyAgICAgICA8L3NlbGVjdD5cclxuICAvLyAgICAgPC9maWVsZHNldD5cclxuICAvLyAgIDwvZm9ybT5cclxuICAvLyAgICAgPC9kaXYgPlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHV0T25ET00iLCJpbXBvcnQgQVBJIGZyb20gXCIuL2RhdGFcIlxyXG5pbXBvcnQgY2xlYXJBbmRBZGQgZnJvbSBcIi4vY2xlYXJSZXBvcERPTVwiXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlRW50cnkoZW50cnlPYmplY3QpIHtcclxuXHJcbiAgaWYgKGVudHJ5T2JqZWN0LmRhdGUgPT09IFwiXCIpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiSG9sZCB1cFwiKVxyXG4gICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBvdXQgYWxsIHNlY3Rpb25zXCIpXHJcbiAgfSBlbHNlIGlmIChlbnRyeU9iamVjdC5jb25jZXB0ID09PSBcIlwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhvbGQgdXBcIilcclxuICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IGFsbCBzZWN0aW9uc1wiKVxyXG4gIH0gZWxzZSBpZiAoZW50cnlPYmplY3QuZW50cnkgPT09IFwiXCIpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiSG9sZCB1cFwiKVxyXG4gICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBvdXQgYWxsIHNlY3Rpb25zXCIpXHJcbiAgfSBlbHNlIGlmIChlbnRyeU9iamVjdC5tb29kID09PSBcIlwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhvbGQgdXBcIilcclxuICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IGFsbCBzZWN0aW9uc1wiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBBUEkuYWRkVG9Kb3VybmFsKGVudHJ5T2JqZWN0KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVFbnRyeSIsImltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBwdXRPbkRPTSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXHJcbmltcG9ydCBtb29kQnV0dG9uVmFsdWUgZnJvbSBcIi4vcmFkaW9CdXR0b25TZWxlY3RcIlxyXG5pbXBvcnQgY3JlYXRlRXZlbnQgZnJvbSBcIi4vc3VtYml0Q2xpY2tcIlxyXG5pbXBvcnQgZWxlbWVudENyZWF0b3IgZnJvbSBcIi4vZW50cmllc0RPTVwiXHJcblxyXG5cclxuXHJcblxyXG4vLyBhY2Nlc3Npbmcgb3VyIGRhdGEgdGhyb3VnaCB0aGUgb2JqZWN0IHByZXZpb3VzbHkgZGVmaW5lZC4gd2UgY2FsbCB0aGUgbWV0aG9kIHRoYXQgZmV0Y2hlcyB0aGUgZGF0YSBmcm9tIHRoZSBvYmplY3QsIHRoZW4gZ28gdGhyb3VnaCBvdXIgYWxsIG9mIG91ciBkYXRhIGFuZCBwYXNzaW5nIHRoYXQgYWxsIG91ciBkYXRhIGludG8gb3VyIGRvbSBjcmVhdGlvbiBmdW5jdGlvbiBcclxuXHJcbkFQSS5nZXRKb3VybmFsTW9vZHMoKS50aGVuKGVudHJpZXMgPT4gcHV0T25ET00uZG9tQ3JlYXRpb24oZW50cmllcykpXHJcbi8vIEFQSS5nZXRKb3VybmFsTW9vZHMoKVxyXG5cclxuLy8gc2hvd2luZyBvbmx5IG91ciBzZWxlY3RlZCBqb3VybmFsIGVudHJpZXNcclxubW9vZEJ1dHRvblZhbHVlKClcclxuXHJcbi8vIGFsbG93cyBmb3IgdXNlciBpbnB1dCB0byBiZSBzYXZlZCB0byBET01cclxuY3JlYXRlRXZlbnQoKVxyXG5cclxuLy8gQVBJLmdldEpvdXJuYWxNb29kcygpLnRoZW4obW9vZHMgPT4gcHV0T25ET00ubW9vZERyb3Bkb3duKG1vb2RzKSlcclxuXHJcbkFQSS5nZXRKb3VybmFsTW9vZHMoKS50aGVuKCBvYmpzID0+IHtcclxuICBvYmpzLmZvckVhY2gob2JqID0+IHtcclxuICAgIGVsZW1lbnRDcmVhdG9yLmRyb3Bkb3duRmFjdG9yeShvYmouaWQsIG9iai5sYWJlbClcclxuICAgIFxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuKSIsImltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBwdXRPbkRPTSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJNb29kKG1vb2RsYWJlbCkge1xyXG4gIEFQSS5nZXRKb3VybmFsTW9vZHMoKS50aGVuKHJlc3BvbnNlcyA9PiByZXNwb25zZXMuZmlsdGVyKHJlc3BvbnNlID0+IHJlc3BvbnNlLm1vb2QubGFiZWwgPT09IG1vb2RsYWJlbCkpLnRoZW4oZmlsdGVyZWRFbnRyeSA9PiBwdXRPbkRPTS5kb21DcmVhdGlvbihmaWx0ZXJlZEVudHJ5KSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmlsdGVyTW9vZCIsImltcG9ydCBmaWx0ZXJNb29kIGZyb20gXCIuL21vb2RGaWx0ZXJcIlxyXG5cclxuXHJcbmZ1bmN0aW9uIG1vb2RCdXR0b25WYWx1ZSgpIHtcclxuICAkKFwiaW5wdXRbdHlwZT1yYWRpb11bbmFtZT1tb29kXVwiKS5jbGljaygoKSA9PiB7XHJcbiAgICBsZXQgcmFkaW9Nb29kID0gJChcImlucHV0W3R5cGU9cmFkaW9dW25hbWU9bW9vZF06Y2hlY2tlZFwiKS52YWwoKVxyXG4gICAgbGV0IGVudHJ5RGl2ID0gJChcIi5lbnRyeVNlY3Rpb25cIilcclxuICAgICQoZW50cnlEaXYpLmFkZENsYXNzKFwiaGlkZGVuXCIpXHJcbiAgICBmaWx0ZXJNb29kKHJhZGlvTW9vZClcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb29kQnV0dG9uVmFsdWVcclxuIiwiaW1wb3J0IHZhbGlkYXRlRW50cnkgZnJvbSBcIi4vZm9ybVZhbGlkYXRpb25cIlxyXG5pbXBvcnQgQVBJIGZyb20gXCIuL2RhdGFcIlxyXG4vLyBhZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgUmVjb3JkIEpvdXJuYWwgRW50cnkgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgeW91ciBmb3JtLiBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCB5b3UgbmVlZCB0byBjcmVhdGUgYSBuZXcgZW50cnkgaW4geW91ciBBUEkuIFRoZSBIVFRQIG1ldGhvZCB0aGF0IHlvdSB1c2UgdG8gY3JlYXRlIHJlc291cmNlcyBpcyBQT1NULiBHdWlkYW5jZSBvbiBzeW50YXggaXMgcHJvdmlkZWQgYmVsb3cuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFdmVudCgpIHtcclxuICBsZXQgcmVjb3JkQnV0dG9uID0gJChcIiNyZWNvcmQtYnV0dG9uXCIpXHJcbiAgJChyZWNvcmRCdXR0b24pLmNsaWNrKCgpID0+IHtcclxuICAgIC8vIGxldCBtb29kSURzID0gXHJcbiAgICBsZXQgbW9vZCA9ICQoXCIjbW9vZFwiKS52YWwoKVxyXG4gICAgbGV0IE1vb2RPYmogPUFQSS5nZXRKb3VybmFsTW9vZHMobW9vZClcclxuICAgIGNvbnNvbGUubG9nKFwib2JqXCIsIE1vb2RPYmogLCBcImlkXCIsIE1vb2RPYmouaWQpXHJcbiAgICBsZXQgZW50cnlPYmplY3QgPSB7XHJcbiAgICAgIFwiZGF0ZVwiOiAkKFwiI2pvdXJuYWxEYXRlXCIpLnZhbCgpLFxyXG4gICAgICBcImNvbmNlcHRcIjogJChcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsKCksXHJcbiAgICAgIFwiZW50cnlcIjogJChcIiNqb3VybmFsRW50cnlcIikudmFsKCksXHJcbiAgICAgIFwibW9vZElkXCI6IE1vb2RPYmouaWRcclxuICAgIH1cclxuICAgIHZhbGlkYXRlRW50cnkoZW50cnlPYmplY3QpXHJcbiAgfSlcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFdmVudCJdfQ==
