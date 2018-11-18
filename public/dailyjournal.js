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

  _data.default.getJournalEntries().then(entries => _entryComponent.default.domCreation(entries));
}

var _default = clearAndAdd;
exports.default = _default;

},{"./data":2,"./entryComponent":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entriesDOM = _interopRequireDefault(require("./entriesDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let entryArt = document.querySelector(".entryLog"); // for reference the arguements of element factory are el, cont, clazz, id, ...children

const putOnDOM = {
  postNewEntry(entry) {
    let entryTitle = _entriesDOM.default.elementFactory("h2", entry.concept);

    let entryContent = _entriesDOM.default.elementFactory("p", `${entry.entry} I am ${entry.mood.label}. ${entry.date}`);

    let entryHolder = _entriesDOM.default.elementFactory("section", null, "entrySection", `${entry.id}`, entryTitle, entryContent); //appending our new elements to the fragment then the fragment to or article  


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
    _data.default.addToJournal(entryObject).then(resposne => (0, _clearRepopDOM.default)());
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
_data.default.getJournalEntries().then(entries => _entryComponent.default.domCreation(entries)); // showing only our selected journal entries


(0, _radioButtonSelect.default)(); // allows for user input to be saved to DOM

(0, _sumbitClick.default)(); // creates the mood dropdowns

_data.default.getMoods().then(objs => {
  objs.forEach(obj => {
    let newMoodOption = _entriesDOM.default.dropdownFactory(obj.id, obj.label);

    let moodInput = document.getElementById("moodSelect");
    moodInput.appendChild(newMoodOption);
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
  _data.default.getJournalEntries().then(responses => responses.filter(response => response.mood.label === moodlabel)).then(filteredEntry => _entryComponent.default.domCreation(filteredEntry));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NsZWFyUmVwb3BET00uanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VudHJpZXNET00uanMiLCIuLi9zY3JpcHRzL2VudHJ5Q29tcG9uZW50LmpzIiwiLi4vc2NyaXB0cy9mb3JtVmFsaWRhdGlvbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbW9vZEZpbHRlci5qcyIsIi4uL3NjcmlwdHMvcmFkaW9CdXR0b25TZWxlY3QuanMiLCIuLi9zY3JpcHRzL3N1bWJpdENsaWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOztBQUNBOzs7O0FBRUEsU0FBUyxXQUFULEdBQXVCO0FBQ3JCLEVBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0MsU0FBcEMsR0FBZ0QsRUFBaEQ7O0FBQ0EsZ0JBQUksaUJBQUosR0FBd0IsSUFBeEIsQ0FBNkIsT0FBTyxJQUFJLHdCQUFTLFdBQVQsQ0FBcUIsT0FBckIsQ0FBeEM7QUFDRDs7ZUFFYyxXOzs7Ozs7Ozs7O0FDUmY7QUFDQSxNQUFNLEdBQUcsR0FBRztBQUVWLEVBQUEsaUJBQWlCLEdBQUc7QUFDbEIsV0FBTyxLQUFLLENBQUMsbURBQUQsQ0FBTCxDQUNKLElBREksQ0FDQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEYixDQUFQO0FBRUQsR0FMUzs7QUFPVixFQUFBLFlBQVksQ0FBQyxRQUFELEVBQVc7QUFDckIsV0FBTyxLQUFLLENBQUMsc0NBQUQsRUFBeUM7QUFDbkQsTUFBQSxNQUFNLEVBQUUsTUFEMkM7QUFFbkQsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVCxPQUYwQztBQUtuRCxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFFBQWY7QUFMNkMsS0FBekMsQ0FBTCxDQU1KLElBTkksQ0FNQyxJQUFJ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R2MsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBwdXRPbkRPTSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXHJcblxyXG5mdW5jdGlvbiBjbGVhckFuZEFkZCgpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVudHJ5TG9nXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICBBUEkuZ2V0Sm91cm5hbEVudHJpZXMoKS50aGVuKGVudHJpZXMgPT4gcHV0T25ET00uZG9tQ3JlYXRpb24oZW50cmllcykpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsZWFyQW5kQWRkIiwiLy8gY3JlYXRpbmcgYW4gb2JqZWN0IHRoYXQgaXMgZmV0Y2hpbmcgb3VyIGRhdGEsIGJvdGggZ2V0dGluZyBmcm9tIG91ciBsb2NhbCBkYXRhYmFzZSBhbmQgcG9zdGluZyBuZXcgdXNlciBpbnB1dCBpbnRvIG91ciBkYXRhYmFzZVxyXG5jb25zdCBBUEkgPSB7XHJcbiAgXHJcbiAgZ2V0Sm91cm5hbEVudHJpZXMoKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvam91cm5hbEVudHJpZXM/X2V4cGFuZD1tb29kXCIpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG5cclxuICBhZGRUb0pvdXJuYWwobmV3RW50cnkpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllc1wiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdFbnRyeSlcclxuICAgIH0pLnRoZW4oZGF0YSA9PiBkYXRhLmpzb24oKSlcclxuICB9LFxyXG5cclxuICBnZXRNb29kcygpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tb29kc1wiKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEkiLCIvLyBmdW5jdGlvbiB0byBjcmVhdGUgYW55IGVsZW1lbnRzIChlbCkgd2l0aCBhbnkgY29udGVudCAoY29udCBvciBudWxsKSBhbmQgeW91IGNhbiBkZXNpZ25hdGUgaWYgaXQgaGFzIGEgY2hpbGRcclxuY29uc3QgZWxlbWVudENyZWF0b3IgPSB7XHJcbiAgZWxlbWVudEZhY3RvcnkoZWwsIGNvbnQsIGNsYXp6LCBpZCwgLi4uY2hpbGRyZW4pIHtcclxuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbClcclxuICAgICQoZWxlbWVudCkuaHRtbChjb250IHx8IG51bGwpXHJcbiAgICAkKGVsZW1lbnQpLmFkZENsYXNzKGNsYXp6IHx8IG51bGwpXHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGlkIHx8IG51bGwpXHJcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZClcclxuICAgIH0pXHJcbiAgICAvLyByZXR1cm5zIG91ciBjcmVhdGVkIGVsZW1lbnRzIHdoZW4gY2FsbGVkXHJcbiAgICByZXR1cm4gZWxlbWVudFxyXG4gIH0sXHJcblxyXG4gIGRyb3Bkb3duRmFjdG9yeShpZCwgbGFiZWwpIHtcclxuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBpZClcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gbGFiZWxcclxuICAgIHJldHVybiBlbGVtZW50XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZWxlbWVudENyZWF0b3IiLCJpbXBvcnQgZWxlbWVudENyZWF0b3IgZnJvbSBcIi4vZW50cmllc0RPTVwiXHJcblxyXG5sZXQgZW50cnlBcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVudHJ5TG9nXCIpO1xyXG5cclxuLy8gZm9yIHJlZmVyZW5jZSB0aGUgYXJndWVtZW50cyBvZiBlbGVtZW50IGZhY3RvcnkgYXJlIGVsLCBjb250LCBjbGF6eiwgaWQsIC4uLmNoaWxkcmVuXHJcblxyXG5jb25zdCBwdXRPbkRPTSA9IHtcclxuICBwb3N0TmV3RW50cnkoZW50cnkpIHtcclxuICAgIGxldCBlbnRyeVRpdGxlID0gZWxlbWVudENyZWF0b3IuZWxlbWVudEZhY3RvcnkoXCJoMlwiLCBlbnRyeS5jb25jZXB0KVxyXG4gICAgbGV0IGVudHJ5Q29udGVudCA9IGVsZW1lbnRDcmVhdG9yLmVsZW1lbnRGYWN0b3J5KFwicFwiLCBgJHtlbnRyeS5lbnRyeX0gSSBhbSAke2VudHJ5Lm1vb2QubGFiZWx9LiAke2VudHJ5LmRhdGV9YClcclxuICAgIGxldCBlbnRyeUhvbGRlciA9IGVsZW1lbnRDcmVhdG9yLmVsZW1lbnRGYWN0b3J5KFwic2VjdGlvblwiLCBudWxsLCBcImVudHJ5U2VjdGlvblwiLCBgJHtlbnRyeS5pZH1gLCBlbnRyeVRpdGxlLCBlbnRyeUNvbnRlbnQpXHJcbiAgICAvL2FwcGVuZGluZyBvdXIgbmV3IGVsZW1lbnRzIHRvIHRoZSBmcmFnbWVudCB0aGVuIHRoZSBmcmFnbWVudCB0byBvciBhcnRpY2xlICBcclxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZW50cnlIb2xkZXIpXHJcbiAgICBlbnRyeUFydC5hcHBlbmRDaGlsZChmcmFnbWVudClcclxuICB9LFxyXG5cclxuICBkb21DcmVhdGlvbihlbnRyaWVzKSB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xyXG4gICAgICBwdXRPbkRPTS5wb3N0TmV3RW50cnkoZW50cnkpXHJcblxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdXRPbkRPTSIsImltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBjbGVhckFuZEFkZCBmcm9tIFwiLi9jbGVhclJlcG9wRE9NXCJcclxuXHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUVudHJ5KGVudHJ5T2JqZWN0KSB7XHJcblxyXG4gIGlmIChlbnRyeU9iamVjdC5kYXRlID09PSBcIlwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhvbGQgdXBcIilcclxuICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IGFsbCBzZWN0aW9uc1wiKVxyXG4gIH0gZWxzZSBpZiAoZW50cnlPYmplY3QuY29uY2VwdCA9PT0gXCJcIikge1xyXG4gICAgY29uc29sZS5sb2coXCJIb2xkIHVwXCIpXHJcbiAgICBhbGVydChcIlBsZWFzZSBmaWxsIG91dCBhbGwgc2VjdGlvbnNcIilcclxuICB9IGVsc2UgaWYgKGVudHJ5T2JqZWN0LmVudHJ5ID09PSBcIlwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhvbGQgdXBcIilcclxuICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IGFsbCBzZWN0aW9uc1wiKVxyXG4gIH0gZWxzZSBpZiAoZW50cnlPYmplY3QubW9vZCA9PT0gXCJcIikge1xyXG4gICAgY29uc29sZS5sb2coXCJIb2xkIHVwXCIpXHJcbiAgICBhbGVydChcIlBsZWFzZSBmaWxsIG91dCBhbGwgc2VjdGlvbnNcIilcclxuICB9IGVsc2Uge1xyXG4gICAgQVBJLmFkZFRvSm91cm5hbChlbnRyeU9iamVjdClcclxuICAgICAgLnRoZW4ocmVzcG9zbmUgPT4gY2xlYXJBbmRBZGQoKSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlRW50cnkiLCJpbXBvcnQgQVBJIGZyb20gXCIuL2RhdGFcIlxyXG5pbXBvcnQgcHV0T25ET00gZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIlxyXG5pbXBvcnQgbW9vZEJ1dHRvblZhbHVlIGZyb20gXCIuL3JhZGlvQnV0dG9uU2VsZWN0XCJcclxuaW1wb3J0IGNyZWF0ZUV2ZW50IGZyb20gXCIuL3N1bWJpdENsaWNrXCJcclxuaW1wb3J0IGVsZW1lbnRDcmVhdG9yIGZyb20gXCIuL2VudHJpZXNET01cIlxyXG5cclxuXHJcblxyXG4vLyBhY2Nlc3Npbmcgb3VyIGRhdGEgdGhyb3VnaCB0aGUgb2JqZWN0IHByZXZpb3VzbHkgZGVmaW5lZC4gd2UgY2FsbCB0aGUgbWV0aG9kIHRoYXQgZmV0Y2hlcyB0aGUgZGF0YSBmcm9tIHRoZSBvYmplY3QsIHRoZW4gZ28gdGhyb3VnaCBvdXIgYWxsIG9mIG91ciBkYXRhIGFuZCBwYXNzaW5nIHRoYXQgYWxsIG91ciBkYXRhIGludG8gb3VyIGRvbSBjcmVhdGlvbiBmdW5jdGlvbiBcclxuXHJcbkFQSS5nZXRKb3VybmFsRW50cmllcygpLnRoZW4oZW50cmllcyA9PiBwdXRPbkRPTS5kb21DcmVhdGlvbihlbnRyaWVzKSlcclxuXHJcblxyXG4vLyBzaG93aW5nIG9ubHkgb3VyIHNlbGVjdGVkIGpvdXJuYWwgZW50cmllc1xyXG5tb29kQnV0dG9uVmFsdWUoKVxyXG5cclxuLy8gYWxsb3dzIGZvciB1c2VyIGlucHV0IHRvIGJlIHNhdmVkIHRvIERPTVxyXG5jcmVhdGVFdmVudCgpXHJcblxyXG5cclxuLy8gY3JlYXRlcyB0aGUgbW9vZCBkcm9wZG93bnNcclxuQVBJLmdldE1vb2RzKCkudGhlbihvYmpzID0+IHtcclxuICBvYmpzLmZvckVhY2gob2JqID0+IHtcclxuICAgIGxldCBuZXdNb29kT3B0aW9uID0gZWxlbWVudENyZWF0b3IuZHJvcGRvd25GYWN0b3J5KG9iai5pZCwgb2JqLmxhYmVsKVxyXG4gICAgbGV0IG1vb2RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9vZFNlbGVjdFwiKVxyXG4gICAgbW9vZElucHV0LmFwcGVuZENoaWxkKG5ld01vb2RPcHRpb24pXHJcbiAgfSk7XHJcblxyXG59XHJcbilcclxuXHJcbiIsImltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBwdXRPbkRPTSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJNb29kKG1vb2RsYWJlbCkge1xyXG4gIEFQSS5nZXRKb3VybmFsRW50cmllcygpLnRoZW4ocmVzcG9uc2VzID0+IHJlc3BvbnNlcy5maWx0ZXIocmVzcG9uc2UgPT4gcmVzcG9uc2UubW9vZC5sYWJlbCA9PT0gbW9vZGxhYmVsKSkudGhlbihmaWx0ZXJlZEVudHJ5ID0+IHB1dE9uRE9NLmRvbUNyZWF0aW9uKGZpbHRlcmVkRW50cnkpKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaWx0ZXJNb29kIiwiaW1wb3J0IGZpbHRlck1vb2QgZnJvbSBcIi4vbW9vZEZpbHRlclwiXHJcblxyXG5cclxuZnVuY3Rpb24gbW9vZEJ1dHRvblZhbHVlKCkge1xyXG4gICQoXCJpbnB1dFt0eXBlPXJhZGlvXVtuYW1lPW1vb2RdXCIpLmNsaWNrKCgpID0+IHtcclxuICAgIGxldCByYWRpb01vb2QgPSAkKFwiaW5wdXRbdHlwZT1yYWRpb11bbmFtZT1tb29kXTpjaGVja2VkXCIpLnZhbCgpXHJcbiAgICBsZXQgZW50cnlEaXYgPSAkKFwiLmVudHJ5U2VjdGlvblwiKVxyXG4gICAgJChlbnRyeURpdikuYWRkQ2xhc3MoXCJoaWRkZW5cIilcclxuICAgIGZpbHRlck1vb2QocmFkaW9Nb29kKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vb2RCdXR0b25WYWx1ZVxyXG4iLCJpbXBvcnQgdmFsaWRhdGVFbnRyeSBmcm9tIFwiLi9mb3JtVmFsaWRhdGlvblwiXHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRXZlbnQoKSB7XHJcbiAgbGV0IHJlY29yZEJ1dHRvbiA9ICQoXCIjcmVjb3JkLWJ1dHRvblwiKVxyXG4gICQocmVjb3JkQnV0dG9uKS5jbGljaygoKSA9PiB7XHJcbiAgICBsZXQgZW50cnlPYmplY3QgPSB7XHJcbiAgICAgIFwiZGF0ZVwiOiAkKFwiI2pvdXJuYWxEYXRlXCIpLnZhbCgpLFxyXG4gICAgICBcImNvbmNlcHRcIjogJChcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsKCksXHJcbiAgICAgIFwiZW50cnlcIjogJChcIiNqb3VybmFsRW50cnlcIikudmFsKCksXHJcbiAgICAgIFwibW9vZElkXCI6ICskKFwiI21vb2RTZWxlY3RcIikudmFsKClcclxuICAgIH1cclxuICAgIHZhbGlkYXRlRW50cnkoZW50cnlPYmplY3QpXHJcbiAgfSlcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUV2ZW50Il19
