(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    let element = document.createElement("option");
    element.setAttribute("value", id);
    element.innerHTML = label;
    return element;
  }

};
var _default = elementCreator;
exports.default = _default;

},{}],2:[function(require,module,exports){
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

  _data.default.getJournalEntries().then(entries => _entryComponent.default.domCreation(entries));
}

var _default = clearAndAdd;
exports.default = _default;

},{"./data":3,"./entryComponent":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// creating an object that is fetching our data, both getting from our local database and posting new user input into our database
const API = {
  getJournalEntries() {
    return fetch("http://localhost:8088/journalEntries?_expand=mood&_expand=instructor").then(response => response.json());
  },

  addToJournal(newEntry) {
    return fetch("http://localhost:8088/journalEntries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEntry)
    }).then(data => data.json());
  },

  getMoods() {
    return fetch("http://localhost:8088/moods").then(response => response.json());
  },

  getInstructors() {
    return fetch("http://localhost:8088/instructors").then(response => response.json());
  }

};
var _default = API;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DOMElements = _interopRequireDefault(require("./DOMElements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let entryArt = document.querySelector(".entryLog"); // for reference the arguements of element factory are el, cont, clazz, id, ...children

const putOnDOM = {
  postNewEntry(entry) {
    let entryTitle = _DOMElements.default.elementFactory("h2", entry.concept, "entryTitle");

    let entryDate = _DOMElements.default.elementFactory("h3", `${entry.date}`, "entryDate");

    let entryMood = _DOMElements.default.elementFactory("h4", `My mood: ${entry.mood.label}.`, "entryMood");

    let entryContent = _DOMElements.default.elementFactory("p", `${entry.entry}. The instructor today was ${entry.instructor.firstName} ${entry.instructor.lastName}.`);

    let entryHolder = _DOMElements.default.elementFactory("section", null, "entrySection", `${entry.id}`, entryTitle, entryDate, entryMood, entryContent); //appending our new elements to the fragment then the fragment to or article  


    let fragment = document.createDocumentFragment();
    fragment.appendChild(entryHolder);
    entryArt.appendChild(fragment);
  },

  domCreation(entries) {
    entries.forEach(entry => {
      putOnDOM.postNewEntry(entry);
    });
  }

};
var _default = putOnDOM;
exports.default = _default;

},{"./DOMElements":1}],5:[function(require,module,exports){
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
    _data.default.addToJournal(entryObject).then(resposne => (0, _clearRepopDOM.default)());
  }
}

var _default = validateEntry;
exports.default = _default;

},{"./clearRepopDOM":2,"./data":3}],6:[function(require,module,exports){
"use strict";

var _data = _interopRequireDefault(require("./data"));

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

var _radioButtonSelect = _interopRequireDefault(require("./radioButtonSelect"));

var _sumbitClick = _interopRequireDefault(require("./sumbitClick"));

var _DOMElements = _interopRequireDefault(require("./DOMElements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// accessing our data through the object previously defined. we call the method that fetches the data from the object, then go through our all of our data and passing that all our data into our dom creation function 
_data.default.getJournalEntries().then(entries => _entryComponent.default.domCreation(entries)); // showing only our selected journal entries


(0, _radioButtonSelect.default)(); // allows for user input to be saved to DOM

(0, _sumbitClick.default)(); // creates the mood dropdowns

_data.default.getMoods().then(objs => {
  objs.forEach(obj => {
    let newMoodOption = _DOMElements.default.dropdownFactory(obj.id, obj.label);

    let moodInput = document.getElementById("moodSelect");
    moodInput.appendChild(newMoodOption);
  });
});

_data.default.getInstructors().then(objs => {
  objs.forEach(obj => {
    let fullName = `${obj.firstName} ${obj.lastName}`;

    let newInstructorOption = _DOMElements.default.dropdownFactory(obj.id, fullName);

    let instructorInput = document.getElementById("instructorSelect");
    instructorInput.appendChild(newInstructorOption);
  });
});

},{"./DOMElements":1,"./data":3,"./entryComponent":4,"./radioButtonSelect":8,"./sumbitClick":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("./data"));

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterMood(moodlabel) {
  _data.default.getJournalEntries().then(responses => responses.filter(response => response.mood.label === moodlabel)).then(filteredEntry => _entryComponent.default.domCreation(filteredEntry));
}

var _default = filterMood;
exports.default = _default;

},{"./data":3,"./entryComponent":4}],8:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEvent() {
  let recordButton = $("#record-button");
  $(recordButton).click(() => {
    let entryObject = {
      "date": $("#journalDate").val(),
      "concept": $("#conceptsCovered").val(),
      "entry": $("#journalEntry").val(),
      "moodId": +$("#moodSelect").val(),
      "instructorId": +$("#instructorSelect").val()
    };
    (0, _formValidation.default)(entryObject);
  });
}

var _default = createEvent;
exports.default = _default;

},{"./formValidation":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTUVsZW1lbnRzLmpzIiwiLi4vc2NyaXB0cy9jbGVhclJlcG9wRE9NLmpzIiwiLi4vc2NyaXB0cy9kYXRhLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZm9ybVZhbGlkYXRpb24uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21vb2RGaWx0ZXIuanMiLCIuLi9zY3JpcHRzL3JhZGlvQnV0dG9uU2VsZWN0LmpzIiwiLi4vc2NyaXB0cy9zdW1iaXRDbGljay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0EsTUFBTSxjQUFjLEdBQUc7QUFDckIsRUFBQSxjQUFjLENBQUMsRUFBRCxFQUFLLElBQUwsRUFBVyxLQUFYLEVBQWtCLEVBQWxCLEVBQXNCLEdBQUcsUUFBekIsRUFBbUM7QUFDL0MsUUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsRUFBdkIsQ0FBZDtBQUNBLElBQUEsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXLElBQVgsQ0FBZ0IsSUFBSSxJQUFJLElBQXhCO0FBQ0EsSUFBQSxDQUFDLENBQUMsT0FBRCxDQUFELENBQVcsUUFBWCxDQUFvQixLQUFLLElBQUksSUFBN0I7QUFDQSxJQUFBLE9BQU8sQ0FBQyxZQUFSLENBQXFCLElBQXJCLEVBQTJCLEVBQUUsSUFBSSxJQUFqQztBQUNBLElBQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3hCLE1BQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsS0FBcEI7QUFDRCxLQUZELEVBTCtDLENBUS9DOztBQUNBLFdBQU8sT0FBUDtBQUNELEdBWG9COztBQWFyQixFQUFBLGVBQWUsQ0FBQyxFQUFELEVBQUssS0FBTCxFQUFZO0FBQ3pCLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENB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QixDQUFqSTtBQUNEOztlQUVjLFU7Ozs7Ozs7Ozs7O0FDUGY7Ozs7QUFHQSxTQUFTLGVBQVQsR0FBMkI7QUFDekIsRUFBQSxDQUFDLENBQUMsOEJBQUQsQ0FBRCxDQUFrQyxLQUFsQyxDQUF3QyxNQUFNO0FBQzVDLFFBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxzQ0FBRCxDQUFELENBQTBDLEdBQTFDLEVBQWhCO0FBQ0EsUUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGVBQUQsQ0FBaEI7QUFDQSxJQUFBLENBQUMsQ0FBQyxRQUFELENBQUQsQ0FBWSxRQUFaLENBQXFCLFFBQXJCO0FBQ0EsNkJBQVcsU0FBWDtBQUNELEdBTEQ7QUFNRDs7ZUFFYyxlOzs7Ozs7Ozs7OztBQ1pmOzs7O0FBR0EsU0FBUyxXQUFULEdBQXVCO0FBQ3JCLE1BQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxnQkFBRCxDQUFwQjtBQUNBLEVBQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixLQUFoQixDQUFzQixNQUFNO0FBQzFCLFFBQUksV0FBVyxHQUFHO0FBQ2hCLGNBQVEsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQixHQUFsQixFQURRO0FBRWhCLGlCQUFXLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCLEdBQXRCLEVBRks7QUFHaEIsZUFBUyxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CLEdBQW5CLEVBSE87QUFJaEIsZ0JBQVUsQ0FBQyxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCLEdBQWpCLEVBSks7QUFLaEIsc0JBQWdCLENBQUMsQ0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUIsR0FBdkI7QUFMRCxLQUFsQjtBQU9BLGlDQUFjLFdBQWQ7QUFDRCxHQVREO0FBVUQ7O2VBR2MsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhbnkgZWxlbWVudHMgKGVsKSB3aXRoIGFueSBjb250ZW50IChjb250IG9yIG51bGwpIGFuZCB5b3UgY2FuIGRlc2lnbmF0ZSBpZiBpdCBoYXMgYSBjaGlsZFxyXG5jb25zdCBlbGVtZW50Q3JlYXRvciA9IHtcclxuICBlbGVtZW50RmFjdG9yeShlbCwgY29udCwgY2xhenosIGlkLCAuLi5jaGlsZHJlbikge1xyXG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKVxyXG4gICAgJChlbGVtZW50KS5odG1sKGNvbnQgfHwgbnVsbClcclxuICAgICQoZWxlbWVudCkuYWRkQ2xhc3MoY2xhenogfHwgbnVsbClcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQgfHwgbnVsbClcclxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxyXG4gICAgfSlcclxuICAgIC8vIHJldHVybnMgb3VyIGNyZWF0ZWQgZWxlbWVudHMgd2hlbiBjYWxsZWRcclxuICAgIHJldHVybiBlbGVtZW50XHJcbiAgfSxcclxuXHJcbiAgZHJvcGRvd25GYWN0b3J5KGlkLCBsYWJlbCkge1xyXG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGlkKVxyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBsYWJlbFxyXG4gICAgcmV0dXJuIGVsZW1lbnRcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBlbGVtZW50Q3JlYXRvciIsImltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBwdXRPbkRPTSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXHJcblxyXG5mdW5jdGlvbiBjbGVhckFuZEFkZCgpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVudHJ5TG9nXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICBBUEkuZ2V0Sm91cm5hbEVudHJpZXMoKS50aGVuKGVudHJpZXMgPT4gcHV0T25ET00uZG9tQ3JlYXRpb24oZW50cmllcykpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsZWFyQW5kQWRkIiwiLy8gY3JlYXRpbmcgYW4gb2JqZWN0IHRoYXQgaXMgZmV0Y2hpbmcgb3VyIGRhdGEsIGJvdGggZ2V0dGluZyBmcm9tIG91ciBsb2NhbCBkYXRhYmFzZSBhbmQgcG9zdGluZyBuZXcgdXNlciBpbnB1dCBpbnRvIG91ciBkYXRhYmFzZVxyXG5jb25zdCBBUEkgPSB7XHJcbiAgXHJcbiAgZ2V0Sm91cm5hbEVudHJpZXMoKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvam91cm5hbEVudHJpZXM/X2V4cGFuZD1tb29kJl9leHBhbmQ9aW5zdHJ1Y3RvclwiKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgYWRkVG9Kb3VybmFsKG5ld0VudHJ5KSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvam91cm5hbEVudHJpZXNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3RW50cnkpXHJcbiAgICB9KS50aGVuKGRhdGEgPT4gZGF0YS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgZ2V0TW9vZHMoKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbW9vZHNcIilcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH0sXHJcbiAgZ2V0SW5zdHJ1Y3RvcnMoKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW5zdHJ1Y3RvcnNcIilcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiaW1wb3J0IGVsZW1lbnRDcmVhdG9yIGZyb20gXCIuL0RPTUVsZW1lbnRzXCJcclxuXHJcbmxldCBlbnRyeUFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW50cnlMb2dcIik7XHJcblxyXG4vLyBmb3IgcmVmZXJlbmNlIHRoZSBhcmd1ZW1lbnRzIG9mIGVsZW1lbnQgZmFjdG9yeSBhcmUgZWwsIGNvbnQsIGNsYXp6LCBpZCwgLi4uY2hpbGRyZW5cclxuXHJcbmNvbnN0IHB1dE9uRE9NID0ge1xyXG4gIHBvc3ROZXdFbnRyeShlbnRyeSkge1xyXG4gICAgbGV0IGVudHJ5VGl0bGUgPSBlbGVtZW50Q3JlYXRvci5lbGVtZW50RmFjdG9yeShcImgyXCIsIGVudHJ5LmNvbmNlcHQsIFwiZW50cnlUaXRsZVwiKVxyXG4gICAgbGV0IGVudHJ5RGF0ZSA9IGVsZW1lbnRDcmVhdG9yLmVsZW1lbnRGYWN0b3J5KFwiaDNcIiwgYCR7ZW50cnkuZGF0ZX1gLCBcImVudHJ5RGF0ZVwiKVxyXG4gICAgbGV0IGVudHJ5TW9vZCA9IGVsZW1lbnRDcmVhdG9yLmVsZW1lbnRGYWN0b3J5KFwiaDRcIiwgYE15IG1vb2Q6ICR7ZW50cnkubW9vZC5sYWJlbH0uYCwgXCJlbnRyeU1vb2RcIilcclxuICAgIGxldCBlbnRyeUNvbnRlbnQgPSBlbGVtZW50Q3JlYXRvci5lbGVtZW50RmFjdG9yeShcInBcIiwgYCR7ZW50cnkuZW50cnl9LiBUaGUgaW5zdHJ1Y3RvciB0b2RheSB3YXMgJHtlbnRyeS5pbnN0cnVjdG9yLmZpcnN0TmFtZX0gJHtlbnRyeS5pbnN0cnVjdG9yLmxhc3ROYW1lfS5gKVxyXG4gICAgbGV0IGVudHJ5SG9sZGVyID0gZWxlbWVudENyZWF0b3IuZWxlbWVudEZhY3RvcnkoXCJzZWN0aW9uXCIsIG51bGwsIFwiZW50cnlTZWN0aW9uXCIsIGAke2VudHJ5LmlkfWAsIGVudHJ5VGl0bGUsIGVudHJ5RGF0ZSwgZW50cnlNb29kLCBlbnRyeUNvbnRlbnQpXHJcbiAgICAvL2FwcGVuZGluZyBvdXIgbmV3IGVsZW1lbnRzIHRvIHRoZSBmcmFnbWVudCB0aGVuIHRoZSBmcmFnbWVudCB0byBvciBhcnRpY2xlICBcclxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZW50cnlIb2xkZXIpXHJcbiAgICBlbnRyeUFydC5hcHBlbmRDaGlsZChmcmFnbWVudClcclxuICB9LFxyXG5cclxuICBkb21DcmVhdGlvbihlbnRyaWVzKSB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xyXG4gICAgICBwdXRPbkRPTS5wb3N0TmV3RW50cnkoZW50cnkpXHJcblxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdXRPbkRPTSIsImltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBjbGVhckFuZEFkZCBmcm9tIFwiLi9jbGVhclJlcG9wRE9NXCJcclxuXHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUVudHJ5KGVudHJ5T2JqZWN0KSB7XHJcblxyXG4gIGlmIChlbnRyeU9iamVjdC5kYXRlID09PSBcIlwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhvbGQgdXBcIilcclxuICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IGFsbCBzZWN0aW9uc1wiKVxyXG4gIH0gZWxzZSBpZiAoZW50cnlPYmplY3QuY29uY2VwdCA9PT0gXCJcIikge1xyXG4gICAgY29uc29sZS5sb2coXCJIb2xkIHVwXCIpXHJcbiAgICBhbGVydChcIlBsZWFzZSBmaWxsIG91dCBhbGwgc2VjdGlvbnNcIilcclxuICB9IGVsc2UgaWYgKGVudHJ5T2JqZWN0LmVudHJ5ID09PSBcIlwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhvbGQgdXBcIilcclxuICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IGFsbCBzZWN0aW9uc1wiKVxyXG4gIH0gZWxzZSBpZiAoZW50cnlPYmplY3QubW9vZCA9PT0gXCJcIikge1xyXG4gICAgY29uc29sZS5sb2coXCJIb2xkIHVwXCIpXHJcbiAgICBhbGVydChcIlBsZWFzZSBmaWxsIG91dCBhbGwgc2VjdGlvbnNcIilcclxuICB9IGVsc2Uge1xyXG4gICAgQVBJLmFkZFRvSm91cm5hbChlbnRyeU9iamVjdClcclxuICAgICAgLnRoZW4ocmVzcG9zbmUgPT4gY2xlYXJBbmRBZGQoKSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlRW50cnkiLCJpbXBvcnQgQVBJIGZyb20gXCIuL2RhdGFcIlxyXG5pbXBvcnQgcHV0T25ET00gZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIlxyXG5pbXBvcnQgbW9vZEJ1dHRvblZhbHVlIGZyb20gXCIuL3JhZGlvQnV0dG9uU2VsZWN0XCJcclxuaW1wb3J0IGNyZWF0ZUV2ZW50IGZyb20gXCIuL3N1bWJpdENsaWNrXCJcclxuaW1wb3J0IGVsZW1lbnRDcmVhdG9yIGZyb20gXCIuL0RPTUVsZW1lbnRzXCJcclxuXHJcblxyXG5cclxuLy8gYWNjZXNzaW5nIG91ciBkYXRhIHRocm91Z2ggdGhlIG9iamVjdCBwcmV2aW91c2x5IGRlZmluZWQuIHdlIGNhbGwgdGhlIG1ldGhvZCB0aGF0IGZldGNoZXMgdGhlIGRhdGEgZnJvbSB0aGUgb2JqZWN0LCB0aGVuIGdvIHRocm91Z2ggb3VyIGFsbCBvZiBvdXIgZGF0YSBhbmQgcGFzc2luZyB0aGF0IGFsbCBvdXIgZGF0YSBpbnRvIG91ciBkb20gY3JlYXRpb24gZnVuY3Rpb24gXHJcblxyXG5BUEkuZ2V0Sm91cm5hbEVudHJpZXMoKS50aGVuKGVudHJpZXMgPT4gcHV0T25ET00uZG9tQ3JlYXRpb24oZW50cmllcykpXHJcblxyXG5cclxuLy8gc2hvd2luZyBvbmx5IG91ciBzZWxlY3RlZCBqb3VybmFsIGVudHJpZXNcclxubW9vZEJ1dHRvblZhbHVlKClcclxuXHJcbi8vIGFsbG93cyBmb3IgdXNlciBpbnB1dCB0byBiZSBzYXZlZCB0byBET01cclxuY3JlYXRlRXZlbnQoKVxyXG5cclxuXHJcbi8vIGNyZWF0ZXMgdGhlIG1vb2QgZHJvcGRvd25zXHJcbkFQSS5nZXRNb29kcygpLnRoZW4ob2JqcyA9PiB7XHJcbiAgb2Jqcy5mb3JFYWNoKG9iaiA9PiB7XHJcbiAgICBsZXQgbmV3TW9vZE9wdGlvbiA9IGVsZW1lbnRDcmVhdG9yLmRyb3Bkb3duRmFjdG9yeShvYmouaWQsIG9iai5sYWJlbClcclxuICAgIGxldCBtb29kSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vb2RTZWxlY3RcIilcclxuICAgIG1vb2RJbnB1dC5hcHBlbmRDaGlsZChuZXdNb29kT3B0aW9uKVxyXG4gIH0pO1xyXG59XHJcbilcclxuXHJcbkFQSS5nZXRJbnN0cnVjdG9ycygpLnRoZW4ob2JqcyA9PiB7XHJcbiAgb2Jqcy5mb3JFYWNoKG9iaiA9PiB7XHJcbiAgICBsZXQgZnVsbE5hbWUgPSBgJHtvYmouZmlyc3ROYW1lfSAke29iai5sYXN0TmFtZX1gXHJcbiAgICBsZXQgbmV3SW5zdHJ1Y3Rvck9wdGlvbiA9IGVsZW1lbnRDcmVhdG9yLmRyb3Bkb3duRmFjdG9yeShvYmouaWQsIGZ1bGxOYW1lKVxyXG4gICAgbGV0IGluc3RydWN0b3JJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5zdHJ1Y3RvclNlbGVjdFwiKVxyXG4gICAgaW5zdHJ1Y3RvcklucHV0LmFwcGVuZENoaWxkKG5ld0luc3RydWN0b3JPcHRpb24pXHJcbiAgfSk7XHJcbn1cclxuKVxyXG5cclxuIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9kYXRhXCJcclxuaW1wb3J0IHB1dE9uRE9NIGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCJcclxuXHJcbmZ1bmN0aW9uIGZpbHRlck1vb2QobW9vZGxhYmVsKSB7XHJcbiAgQVBJLmdldEpvdXJuYWxFbnRyaWVzKCkudGhlbihyZXNwb25zZXMgPT4gcmVzcG9uc2VzLmZpbHRlcihyZXNwb25zZSA9PiByZXNwb25zZS5tb29kLmxhYmVsID09PSBtb29kbGFiZWwpKS50aGVuKGZpbHRlcmVkRW50cnkgPT4gcHV0T25ET00uZG9tQ3JlYXRpb24oZmlsdGVyZWRFbnRyeSkpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZpbHRlck1vb2QiLCJpbXBvcnQgZmlsdGVyTW9vZCBmcm9tIFwiLi9tb29kRmlsdGVyXCJcclxuXHJcblxyXG5mdW5jdGlvbiBtb29kQnV0dG9uVmFsdWUoKSB7XHJcbiAgJChcImlucHV0W3R5cGU9cmFkaW9dW25hbWU9bW9vZF1cIikuY2xpY2soKCkgPT4ge1xyXG4gICAgbGV0IHJhZGlvTW9vZCA9ICQoXCJpbnB1dFt0eXBlPXJhZGlvXVtuYW1lPW1vb2RdOmNoZWNrZWRcIikudmFsKClcclxuICAgIGxldCBlbnRyeURpdiA9ICQoXCIuZW50cnlTZWN0aW9uXCIpXHJcbiAgICAkKGVudHJ5RGl2KS5hZGRDbGFzcyhcImhpZGRlblwiKVxyXG4gICAgZmlsdGVyTW9vZChyYWRpb01vb2QpXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9vZEJ1dHRvblZhbHVlXHJcbiIsImltcG9ydCB2YWxpZGF0ZUVudHJ5IGZyb20gXCIuL2Zvcm1WYWxpZGF0aW9uXCJcclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFdmVudCgpIHtcclxuICBsZXQgcmVjb3JkQnV0dG9uID0gJChcIiNyZWNvcmQtYnV0dG9uXCIpXHJcbiAgJChyZWNvcmRCdXR0b24pLmNsaWNrKCgpID0+IHtcclxuICAgIGxldCBlbnRyeU9iamVjdCA9IHtcclxuICAgICAgXCJkYXRlXCI6ICQoXCIjam91cm5hbERhdGVcIikudmFsKCksXHJcbiAgICAgIFwiY29uY2VwdFwiOiAkKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWwoKSxcclxuICAgICAgXCJlbnRyeVwiOiAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKSxcclxuICAgICAgXCJtb29kSWRcIjogKyQoXCIjbW9vZFNlbGVjdFwiKS52YWwoKSxcclxuICAgICAgXCJpbnN0cnVjdG9ySWRcIjogKyQoXCIjaW5zdHJ1Y3RvclNlbGVjdFwiKS52YWwoKVxyXG4gICAgfVxyXG4gICAgdmFsaWRhdGVFbnRyeShlbnRyeU9iamVjdClcclxuICB9KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRXZlbnQiXX0=
