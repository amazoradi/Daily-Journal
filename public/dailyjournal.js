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
    return fetch("http://localhost:8088/journalEntries?_expand=mood").then(response => response.json());
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
    let entryTitle = _DOMElements.default.elementFactory("h2", entry.concept);

    let entryContent = _DOMElements.default.elementFactory("p", `${entry.entry} I am ${entry.mood.label}. ${entry.date}`);

    let entryHolder = _DOMElements.default.elementFactory("section", null, "entrySection", `${entry.id}`, entryTitle, entryContent); //appending our new elements to the fragment then the fragment to or article  


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
      "moodId": +$("#moodSelect").val()
    };
    (0, _formValidation.default)(entryObject);
  });
}

var _default = createEvent;
exports.default = _default;

},{"./formValidation":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTUVsZW1lbnRzLmpzIiwiLi4vc2NyaXB0cy9jbGVhclJlcG9wRE9NLmpzIiwiLi4vc2NyaXB0cy9kYXRhLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZm9ybVZhbGlkYXRpb24uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21vb2RGaWx0ZXIuanMiLCIuLi9zY3JpcHRzL3JhZGlvQnV0dG9uU2VsZWN0LmpzIiwiLi4vc2NyaXB0cy9zdW1iaXRDbGljay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0EsTUFBTSxjQUFjLEdBQUc7QUFDckIsRUFBQSxjQUFjLENBQUMsRUFBRCxFQUFLLElBQUwsRUFBVyxLQUFYLEVBQWtCLEVBQWxCLEVBQXNCLEdBQUcsUUFBekIsRUFBbUM7QUFDL0MsUUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsRUFBdkIsQ0FBZDtBQUNBLElBQUEsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXLElBQVgsQ0FBZ0IsSUFBSSxJQUFJLElBQXhCO0FBQ0EsSUFBQSxDQUFDLENBQUMsT0FBRCxDQUFELENBQVcsUUFBWCxDQUFvQixLQUFLLElBQUksSUFBN0I7QUFDQSxJQUFBLE9BQU8sQ0FBQyxZQUFSLENBQXFCLElBQXJCLEVBQTJCLEVBQUUsSUFBSSxJQUFqQztBQUNBLElBQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3hCLE1BQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsS0FBcEI7QUFDRCxLQUZELEVBTCtDLENBUS9DOztBQUNBLFdBQU8sT0FBUDtBQUNELEdBWG9COztBQWFyQixFQUFBLGVBQWUsQ0FBQyxFQUFELEVBQUssS0FBTCxFQUFZO0FBQ3pCLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENB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QUdjLFciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBmdW5jdGlvbiB0byBjcmVhdGUgYW55IGVsZW1lbnRzIChlbCkgd2l0aCBhbnkgY29udGVudCAoY29udCBvciBudWxsKSBhbmQgeW91IGNhbiBkZXNpZ25hdGUgaWYgaXQgaGFzIGEgY2hpbGRcclxuY29uc3QgZWxlbWVudENyZWF0b3IgPSB7XHJcbiAgZWxlbWVudEZhY3RvcnkoZWwsIGNvbnQsIGNsYXp6LCBpZCwgLi4uY2hpbGRyZW4pIHtcclxuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbClcclxuICAgICQoZWxlbWVudCkuaHRtbChjb250IHx8IG51bGwpXHJcbiAgICAkKGVsZW1lbnQpLmFkZENsYXNzKGNsYXp6IHx8IG51bGwpXHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGlkIHx8IG51bGwpXHJcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZClcclxuICAgIH0pXHJcbiAgICAvLyByZXR1cm5zIG91ciBjcmVhdGVkIGVsZW1lbnRzIHdoZW4gY2FsbGVkXHJcbiAgICByZXR1cm4gZWxlbWVudFxyXG4gIH0sXHJcblxyXG4gIGRyb3Bkb3duRmFjdG9yeShpZCwgbGFiZWwpIHtcclxuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBpZClcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gbGFiZWxcclxuICAgIHJldHVybiBlbGVtZW50XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZWxlbWVudENyZWF0b3IiLCJpbXBvcnQgQVBJIGZyb20gXCIuL2RhdGFcIlxyXG5pbXBvcnQgcHV0T25ET00gZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIlxyXG5cclxuZnVuY3Rpb24gY2xlYXJBbmRBZGQoKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnRyeUxvZ1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgQVBJLmdldEpvdXJuYWxFbnRyaWVzKCkudGhlbihlbnRyaWVzID0+IHB1dE9uRE9NLmRvbUNyZWF0aW9uKGVudHJpZXMpKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGVhckFuZEFkZCIsIi8vIGNyZWF0aW5nIGFuIG9iamVjdCB0aGF0IGlzIGZldGNoaW5nIG91ciBkYXRhLCBib3RoIGdldHRpbmcgZnJvbSBvdXIgbG9jYWwgZGF0YWJhc2UgYW5kIHBvc3RpbmcgbmV3IHVzZXIgaW5wdXQgaW50byBvdXIgZGF0YWJhc2VcclxuY29uc3QgQVBJID0ge1xyXG4gIFxyXG4gIGdldEpvdXJuYWxFbnRyaWVzKCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2pvdXJuYWxFbnRyaWVzP19leHBhbmQ9bW9vZFwiKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgYWRkVG9Kb3VybmFsKG5ld0VudHJ5KSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvam91cm5hbEVudHJpZXNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3RW50cnkpXHJcbiAgICB9KS50aGVuKGRhdGEgPT4gZGF0YS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgZ2V0TW9vZHMoKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbW9vZHNcIilcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiaW1wb3J0IGVsZW1lbnRDcmVhdG9yIGZyb20gXCIuL0RPTUVsZW1lbnRzXCJcclxuXHJcbmxldCBlbnRyeUFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW50cnlMb2dcIik7XHJcblxyXG4vLyBmb3IgcmVmZXJlbmNlIHRoZSBhcmd1ZW1lbnRzIG9mIGVsZW1lbnQgZmFjdG9yeSBhcmUgZWwsIGNvbnQsIGNsYXp6LCBpZCwgLi4uY2hpbGRyZW5cclxuXHJcbmNvbnN0IHB1dE9uRE9NID0ge1xyXG4gIHBvc3ROZXdFbnRyeShlbnRyeSkge1xyXG4gICAgbGV0IGVudHJ5VGl0bGUgPSBlbGVtZW50Q3JlYXRvci5lbGVtZW50RmFjdG9yeShcImgyXCIsIGVudHJ5LmNvbmNlcHQpXHJcbiAgICBsZXQgZW50cnlDb250ZW50ID0gZWxlbWVudENyZWF0b3IuZWxlbWVudEZhY3RvcnkoXCJwXCIsIGAke2VudHJ5LmVudHJ5fSBJIGFtICR7ZW50cnkubW9vZC5sYWJlbH0uICR7ZW50cnkuZGF0ZX1gKVxyXG4gICAgbGV0IGVudHJ5SG9sZGVyID0gZWxlbWVudENyZWF0b3IuZWxlbWVudEZhY3RvcnkoXCJzZWN0aW9uXCIsIG51bGwsIFwiZW50cnlTZWN0aW9uXCIsIGAke2VudHJ5LmlkfWAsIGVudHJ5VGl0bGUsIGVudHJ5Q29udGVudClcclxuICAgIC8vYXBwZW5kaW5nIG91ciBuZXcgZWxlbWVudHMgdG8gdGhlIGZyYWdtZW50IHRoZW4gdGhlIGZyYWdtZW50IHRvIG9yIGFydGljbGUgIFxyXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbnRyeUhvbGRlcilcclxuICAgIGVudHJ5QXJ0LmFwcGVuZENoaWxkKGZyYWdtZW50KVxyXG4gIH0sXHJcblxyXG4gIGRvbUNyZWF0aW9uKGVudHJpZXMpIHtcclxuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgIHB1dE9uRE9NLnBvc3ROZXdFbnRyeShlbnRyeSlcclxuXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1dE9uRE9NIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9kYXRhXCJcclxuaW1wb3J0IGNsZWFyQW5kQWRkIGZyb20gXCIuL2NsZWFyUmVwb3BET01cIlxyXG5cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlRW50cnkoZW50cnlPYmplY3QpIHtcclxuXHJcbiAgaWYgKGVudHJ5T2JqZWN0LmRhdGUgPT09IFwiXCIpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiSG9sZCB1cFwiKVxyXG4gICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBvdXQgYWxsIHNlY3Rpb25zXCIpXHJcbiAgfSBlbHNlIGlmIChlbnRyeU9iamVjdC5jb25jZXB0ID09PSBcIlwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhvbGQgdXBcIilcclxuICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IGFsbCBzZWN0aW9uc1wiKVxyXG4gIH0gZWxzZSBpZiAoZW50cnlPYmplY3QuZW50cnkgPT09IFwiXCIpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiSG9sZCB1cFwiKVxyXG4gICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBvdXQgYWxsIHNlY3Rpb25zXCIpXHJcbiAgfSBlbHNlIGlmIChlbnRyeU9iamVjdC5tb29kID09PSBcIlwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhvbGQgdXBcIilcclxuICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IGFsbCBzZWN0aW9uc1wiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBBUEkuYWRkVG9Kb3VybmFsKGVudHJ5T2JqZWN0KVxyXG4gICAgICAudGhlbihyZXNwb3NuZSA9PiBjbGVhckFuZEFkZCgpKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVFbnRyeSIsImltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBwdXRPbkRPTSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXHJcbmltcG9ydCBtb29kQnV0dG9uVmFsdWUgZnJvbSBcIi4vcmFkaW9CdXR0b25TZWxlY3RcIlxyXG5pbXBvcnQgY3JlYXRlRXZlbnQgZnJvbSBcIi4vc3VtYml0Q2xpY2tcIlxyXG5pbXBvcnQgZWxlbWVudENyZWF0b3IgZnJvbSBcIi4vRE9NRWxlbWVudHNcIlxyXG5cclxuXHJcblxyXG4vLyBhY2Nlc3Npbmcgb3VyIGRhdGEgdGhyb3VnaCB0aGUgb2JqZWN0IHByZXZpb3VzbHkgZGVmaW5lZC4gd2UgY2FsbCB0aGUgbWV0aG9kIHRoYXQgZmV0Y2hlcyB0aGUgZGF0YSBmcm9tIHRoZSBvYmplY3QsIHRoZW4gZ28gdGhyb3VnaCBvdXIgYWxsIG9mIG91ciBkYXRhIGFuZCBwYXNzaW5nIHRoYXQgYWxsIG91ciBkYXRhIGludG8gb3VyIGRvbSBjcmVhdGlvbiBmdW5jdGlvbiBcclxuXHJcbkFQSS5nZXRKb3VybmFsRW50cmllcygpLnRoZW4oZW50cmllcyA9PiBwdXRPbkRPTS5kb21DcmVhdGlvbihlbnRyaWVzKSlcclxuXHJcblxyXG4vLyBzaG93aW5nIG9ubHkgb3VyIHNlbGVjdGVkIGpvdXJuYWwgZW50cmllc1xyXG5tb29kQnV0dG9uVmFsdWUoKVxyXG5cclxuLy8gYWxsb3dzIGZvciB1c2VyIGlucHV0IHRvIGJlIHNhdmVkIHRvIERPTVxyXG5jcmVhdGVFdmVudCgpXHJcblxyXG5cclxuLy8gY3JlYXRlcyB0aGUgbW9vZCBkcm9wZG93bnNcclxuQVBJLmdldE1vb2RzKCkudGhlbihvYmpzID0+IHtcclxuICBvYmpzLmZvckVhY2gob2JqID0+IHtcclxuICAgIGxldCBuZXdNb29kT3B0aW9uID0gZWxlbWVudENyZWF0b3IuZHJvcGRvd25GYWN0b3J5KG9iai5pZCwgb2JqLmxhYmVsKVxyXG4gICAgbGV0IG1vb2RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9vZFNlbGVjdFwiKVxyXG4gICAgbW9vZElucHV0LmFwcGVuZENoaWxkKG5ld01vb2RPcHRpb24pXHJcbiAgfSk7XHJcblxyXG59XHJcbilcclxuXHJcbiIsImltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBwdXRPbkRPTSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJNb29kKG1vb2RsYWJlbCkge1xyXG4gIEFQSS5nZXRKb3VybmFsRW50cmllcygpLnRoZW4ocmVzcG9uc2VzID0+IHJlc3BvbnNlcy5maWx0ZXIocmVzcG9uc2UgPT4gcmVzcG9uc2UubW9vZC5sYWJlbCA9PT0gbW9vZGxhYmVsKSkudGhlbihmaWx0ZXJlZEVudHJ5ID0+IHB1dE9uRE9NLmRvbUNyZWF0aW9uKGZpbHRlcmVkRW50cnkpKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaWx0ZXJNb29kIiwiaW1wb3J0IGZpbHRlck1vb2QgZnJvbSBcIi4vbW9vZEZpbHRlclwiXHJcblxyXG5cclxuZnVuY3Rpb24gbW9vZEJ1dHRvblZhbHVlKCkge1xyXG4gICQoXCJpbnB1dFt0eXBlPXJhZGlvXVtuYW1lPW1vb2RdXCIpLmNsaWNrKCgpID0+IHtcclxuICAgIGxldCByYWRpb01vb2QgPSAkKFwiaW5wdXRbdHlwZT1yYWRpb11bbmFtZT1tb29kXTpjaGVja2VkXCIpLnZhbCgpXHJcbiAgICBsZXQgZW50cnlEaXYgPSAkKFwiLmVudHJ5U2VjdGlvblwiKVxyXG4gICAgJChlbnRyeURpdikuYWRkQ2xhc3MoXCJoaWRkZW5cIilcclxuICAgIGZpbHRlck1vb2QocmFkaW9Nb29kKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vb2RCdXR0b25WYWx1ZVxyXG4iLCJpbXBvcnQgdmFsaWRhdGVFbnRyeSBmcm9tIFwiLi9mb3JtVmFsaWRhdGlvblwiXHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRXZlbnQoKSB7XHJcbiAgbGV0IHJlY29yZEJ1dHRvbiA9ICQoXCIjcmVjb3JkLWJ1dHRvblwiKVxyXG4gICQocmVjb3JkQnV0dG9uKS5jbGljaygoKSA9PiB7XHJcbiAgICBsZXQgZW50cnlPYmplY3QgPSB7XHJcbiAgICAgIFwiZGF0ZVwiOiAkKFwiI2pvdXJuYWxEYXRlXCIpLnZhbCgpLFxyXG4gICAgICBcImNvbmNlcHRcIjogJChcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsKCksXHJcbiAgICAgIFwiZW50cnlcIjogJChcIiNqb3VybmFsRW50cnlcIikudmFsKCksXHJcbiAgICAgIFwibW9vZElkXCI6ICskKFwiI21vb2RTZWxlY3RcIikudmFsKClcclxuICAgIH1cclxuICAgIHZhbGlkYXRlRW50cnkoZW50cnlPYmplY3QpXHJcbiAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUV2ZW50Il19
