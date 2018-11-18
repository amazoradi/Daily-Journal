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
    let entryTitle = _DOMElements.default.elementFactory("h2", entry.concept);

    let entryContent = _DOMElements.default.elementFactory("p", `${entry.entry} I am ${entry.mood.label}. The instructor today was ${entry.instructor.firstName} ${entry.instructor.lastName}. ${entry.date}`);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTUVsZW1lbnRzLmpzIiwiLi4vc2NyaXB0cy9jbGVhclJlcG9wRE9NLmpzIiwiLi4vc2NyaXB0cy9kYXRhLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZm9ybVZhbGlkYXRpb24uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21vb2RGaWx0ZXIuanMiLCIuLi9zY3JpcHRzL3JhZGlvQnV0dG9uU2VsZWN0LmpzIiwiLi4vc2NyaXB0cy9zdW1iaXRDbGljay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0EsTUFBTSxjQUFjLEdBQUc7QUFDckIsRUFBQSxjQUFjLENBQUMsRUFBRCxFQUFLLElBQUwsRUFBVyxLQUFYLEVBQWtCLEVBQWxCLEVBQXNCLEdBQUcsUUFBekIsRUFBbUM7QUFDL0MsUUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsRUFBdkIsQ0FBZDtBQUNBLElBQUEsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXLElBQVgsQ0FBZ0IsSUFBSSxJQUFJLElBQXhCO0FBQ0EsSUFBQSxDQUFDLENBQUMsT0FBRCxDQUFELENBQVcsUUFBWCxDQUFvQixLQUFLLElBQUksSUFBN0I7QUFDQSxJQUFBLE9BQU8sQ0FBQyxZQUFSLENBQXFCLElBQXJCLEVBQTJCLEVBQUUsSUFBSSxJQUFqQztBQUNBLElBQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3hCLE1BQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsS0FBcEI7QUFDRCxLQUZELEVBTCtDLENBUS9DOztBQUNBLFdBQU8sT0FBUDtBQUNELEdBWG9COztBQWFyQixFQUFBLGVBQWUsQ0FBQyxFQUFELEVBQUssS0FBTCxFQUFZO0FBQ3pCLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENB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LFFBQVEsR0FBRyxDQUFDLENBQUMsZUFBRCxDQUFoQjtBQUNBLElBQUEsQ0FBQyxDQUFDLFFBQUQsQ0FBRCxDQUFZLFFBQVosQ0FBcUIsUUFBckI7QUFDQSw2QkFBVyxTQUFYO0FBQ0QsR0FMRDtBQU1EOztlQUVjLGU7Ozs7Ozs7Ozs7O0FDWmY7Ozs7QUFHQSxTQUFTLFdBQVQsR0FBdUI7QUFDckIsTUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLGdCQUFELENBQXBCO0FBQ0EsRUFBQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCLEtBQWhCLENBQXNCLE1BQU07QUFDMUIsUUFBSSxXQUFXLEdBQUc7QUFDaEIsY0FBUSxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCLEdBQWxCLEVBRFE7QUFFaEIsaUJBQVcsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0IsR0FBdEIsRUFGSztBQUdoQixlQUFTLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUIsR0FBbkIsRUFITztBQUloQixnQkFBVSxDQUFDLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsR0FBakIsRUFKSztBQUtoQixzQkFBZ0IsQ0FBQyxDQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QixHQUF2QjtBQUxELEtBQWxCO0FBT0EsaUNBQWMsV0FBZDtBQUNELEdBVEQ7QUFVRDs7ZUFHYyxXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gZnVuY3Rpb24gdG8gY3JlYXRlIGFueSBlbGVtZW50cyAoZWwpIHdpdGggYW55IGNvbnRlbnQgKGNvbnQgb3IgbnVsbCkgYW5kIHlvdSBjYW4gZGVzaWduYXRlIGlmIGl0IGhhcyBhIGNoaWxkXHJcbmNvbnN0IGVsZW1lbnRDcmVhdG9yID0ge1xyXG4gIGVsZW1lbnRGYWN0b3J5KGVsLCBjb250LCBjbGF6eiwgaWQsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpXHJcbiAgICAkKGVsZW1lbnQpLmh0bWwoY29udCB8fCBudWxsKVxyXG4gICAgJChlbGVtZW50KS5hZGRDbGFzcyhjbGF6eiB8fCBudWxsKVxyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZCB8fCBudWxsKVxyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXHJcbiAgICB9KVxyXG4gICAgLy8gcmV0dXJucyBvdXIgY3JlYXRlZCBlbGVtZW50cyB3aGVuIGNhbGxlZFxyXG4gICAgcmV0dXJuIGVsZW1lbnRcclxuICB9LFxyXG5cclxuICBkcm9wZG93bkZhY3RvcnkoaWQsIGxhYmVsKSB7XHJcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgaWQpXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGxhYmVsXHJcbiAgICByZXR1cm4gZWxlbWVudFxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVsZW1lbnRDcmVhdG9yIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9kYXRhXCJcclxuaW1wb3J0IHB1dE9uRE9NIGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCJcclxuXHJcbmZ1bmN0aW9uIGNsZWFyQW5kQWRkKCkge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW50cnlMb2dcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gIEFQSS5nZXRKb3VybmFsRW50cmllcygpLnRoZW4oZW50cmllcyA9PiBwdXRPbkRPTS5kb21DcmVhdGlvbihlbnRyaWVzKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xlYXJBbmRBZGQiLCIvLyBjcmVhdGluZyBhbiBvYmplY3QgdGhhdCBpcyBmZXRjaGluZyBvdXIgZGF0YSwgYm90aCBnZXR0aW5nIGZyb20gb3VyIGxvY2FsIGRhdGFiYXNlIGFuZCBwb3N0aW5nIG5ldyB1c2VyIGlucHV0IGludG8gb3VyIGRhdGFiYXNlXHJcbmNvbnN0IEFQSSA9IHtcclxuICBcclxuICBnZXRKb3VybmFsRW50cmllcygpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllcz9fZXhwYW5kPW1vb2QmX2V4cGFuZD1pbnN0cnVjdG9yXCIpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG5cclxuICBhZGRUb0pvdXJuYWwobmV3RW50cnkpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllc1wiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdFbnRyeSlcclxuICAgIH0pLnRoZW4oZGF0YSA9PiBkYXRhLmpzb24oKSlcclxuICB9LFxyXG5cclxuICBnZXRNb29kcygpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tb29kc1wiKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgfSxcclxuICBnZXRJbnN0cnVjdG9ycygpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9pbnN0cnVjdG9yc1wiKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgZWxlbWVudENyZWF0b3IgZnJvbSBcIi4vRE9NRWxlbWVudHNcIlxyXG5cclxubGV0IGVudHJ5QXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbnRyeUxvZ1wiKTtcclxuXHJcbi8vIGZvciByZWZlcmVuY2UgdGhlIGFyZ3VlbWVudHMgb2YgZWxlbWVudCBmYWN0b3J5IGFyZSBlbCwgY29udCwgY2xhenosIGlkLCAuLi5jaGlsZHJlblxyXG5cclxuY29uc3QgcHV0T25ET00gPSB7XHJcbiAgcG9zdE5ld0VudHJ5KGVudHJ5KSB7XHJcbiAgICBsZXQgZW50cnlUaXRsZSA9IGVsZW1lbnRDcmVhdG9yLmVsZW1lbnRGYWN0b3J5KFwiaDJcIiwgZW50cnkuY29uY2VwdClcclxuICAgIGxldCBlbnRyeUNvbnRlbnQgPSBlbGVtZW50Q3JlYXRvci5lbGVtZW50RmFjdG9yeShcInBcIiwgYCR7ZW50cnkuZW50cnl9IEkgYW0gJHtlbnRyeS5tb29kLmxhYmVsfS4gVGhlIGluc3RydWN0b3IgdG9kYXkgd2FzICR7ZW50cnkuaW5zdHJ1Y3Rvci5maXJzdE5hbWV9ICR7ZW50cnkuaW5zdHJ1Y3Rvci5sYXN0TmFtZX0uICR7ZW50cnkuZGF0ZX1gKVxyXG4gICAgbGV0IGVudHJ5SG9sZGVyID0gZWxlbWVudENyZWF0b3IuZWxlbWVudEZhY3RvcnkoXCJzZWN0aW9uXCIsIG51bGwsIFwiZW50cnlTZWN0aW9uXCIsIGAke2VudHJ5LmlkfWAsIGVudHJ5VGl0bGUsIGVudHJ5Q29udGVudClcclxuICAgIC8vYXBwZW5kaW5nIG91ciBuZXcgZWxlbWVudHMgdG8gdGhlIGZyYWdtZW50IHRoZW4gdGhlIGZyYWdtZW50IHRvIG9yIGFydGljbGUgIFxyXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbnRyeUhvbGRlcilcclxuICAgIGVudHJ5QXJ0LmFwcGVuZENoaWxkKGZyYWdtZW50KVxyXG4gIH0sXHJcblxyXG4gIGRvbUNyZWF0aW9uKGVudHJpZXMpIHtcclxuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgIHB1dE9uRE9NLnBvc3ROZXdFbnRyeShlbnRyeSlcclxuXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1dE9uRE9NIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9kYXRhXCJcclxuaW1wb3J0IGNsZWFyQW5kQWRkIGZyb20gXCIuL2NsZWFyUmVwb3BET01cIlxyXG5cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlRW50cnkoZW50cnlPYmplY3QpIHtcclxuXHJcbiAgaWYgKGVudHJ5T2JqZWN0LmRhdGUgPT09IFwiXCIpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiSG9sZCB1cFwiKVxyXG4gICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBvdXQgYWxsIHNlY3Rpb25zXCIpXHJcbiAgfSBlbHNlIGlmIChlbnRyeU9iamVjdC5jb25jZXB0ID09PSBcIlwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhvbGQgdXBcIilcclxuICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IGFsbCBzZWN0aW9uc1wiKVxyXG4gIH0gZWxzZSBpZiAoZW50cnlPYmplY3QuZW50cnkgPT09IFwiXCIpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiSG9sZCB1cFwiKVxyXG4gICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBvdXQgYWxsIHNlY3Rpb25zXCIpXHJcbiAgfSBlbHNlIGlmIChlbnRyeU9iamVjdC5tb29kID09PSBcIlwiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhvbGQgdXBcIilcclxuICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgb3V0IGFsbCBzZWN0aW9uc1wiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBBUEkuYWRkVG9Kb3VybmFsKGVudHJ5T2JqZWN0KVxyXG4gICAgICAudGhlbihyZXNwb3NuZSA9PiBjbGVhckFuZEFkZCgpKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVFbnRyeSIsImltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBwdXRPbkRPTSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXHJcbmltcG9ydCBtb29kQnV0dG9uVmFsdWUgZnJvbSBcIi4vcmFkaW9CdXR0b25TZWxlY3RcIlxyXG5pbXBvcnQgY3JlYXRlRXZlbnQgZnJvbSBcIi4vc3VtYml0Q2xpY2tcIlxyXG5pbXBvcnQgZWxlbWVudENyZWF0b3IgZnJvbSBcIi4vRE9NRWxlbWVudHNcIlxyXG5cclxuXHJcblxyXG4vLyBhY2Nlc3Npbmcgb3VyIGRhdGEgdGhyb3VnaCB0aGUgb2JqZWN0IHByZXZpb3VzbHkgZGVmaW5lZC4gd2UgY2FsbCB0aGUgbWV0aG9kIHRoYXQgZmV0Y2hlcyB0aGUgZGF0YSBmcm9tIHRoZSBvYmplY3QsIHRoZW4gZ28gdGhyb3VnaCBvdXIgYWxsIG9mIG91ciBkYXRhIGFuZCBwYXNzaW5nIHRoYXQgYWxsIG91ciBkYXRhIGludG8gb3VyIGRvbSBjcmVhdGlvbiBmdW5jdGlvbiBcclxuXHJcbkFQSS5nZXRKb3VybmFsRW50cmllcygpLnRoZW4oZW50cmllcyA9PiBwdXRPbkRPTS5kb21DcmVhdGlvbihlbnRyaWVzKSlcclxuXHJcblxyXG4vLyBzaG93aW5nIG9ubHkgb3VyIHNlbGVjdGVkIGpvdXJuYWwgZW50cmllc1xyXG5tb29kQnV0dG9uVmFsdWUoKVxyXG5cclxuLy8gYWxsb3dzIGZvciB1c2VyIGlucHV0IHRvIGJlIHNhdmVkIHRvIERPTVxyXG5jcmVhdGVFdmVudCgpXHJcblxyXG5cclxuLy8gY3JlYXRlcyB0aGUgbW9vZCBkcm9wZG93bnNcclxuQVBJLmdldE1vb2RzKCkudGhlbihvYmpzID0+IHtcclxuICBvYmpzLmZvckVhY2gob2JqID0+IHtcclxuICAgIGxldCBuZXdNb29kT3B0aW9uID0gZWxlbWVudENyZWF0b3IuZHJvcGRvd25GYWN0b3J5KG9iai5pZCwgb2JqLmxhYmVsKVxyXG4gICAgbGV0IG1vb2RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9vZFNlbGVjdFwiKVxyXG4gICAgbW9vZElucHV0LmFwcGVuZENoaWxkKG5ld01vb2RPcHRpb24pXHJcbiAgfSk7XHJcbn1cclxuKVxyXG5cclxuQVBJLmdldEluc3RydWN0b3JzKCkudGhlbihvYmpzID0+IHtcclxuICBvYmpzLmZvckVhY2gob2JqID0+IHtcclxuICAgIGxldCBmdWxsTmFtZSA9IGAke29iai5maXJzdE5hbWV9ICR7b2JqLmxhc3ROYW1lfWBcclxuICAgIGxldCBuZXdJbnN0cnVjdG9yT3B0aW9uID0gZWxlbWVudENyZWF0b3IuZHJvcGRvd25GYWN0b3J5KG9iai5pZCwgZnVsbE5hbWUpXHJcbiAgICBsZXQgaW5zdHJ1Y3RvcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnN0cnVjdG9yU2VsZWN0XCIpXHJcbiAgICBpbnN0cnVjdG9ySW5wdXQuYXBwZW5kQ2hpbGQobmV3SW5zdHJ1Y3Rvck9wdGlvbilcclxuICB9KTtcclxufVxyXG4pXHJcblxyXG4iLCJpbXBvcnQgQVBJIGZyb20gXCIuL2RhdGFcIlxyXG5pbXBvcnQgcHV0T25ET00gZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIlxyXG5cclxuZnVuY3Rpb24gZmlsdGVyTW9vZChtb29kbGFiZWwpIHtcclxuICBBUEkuZ2V0Sm91cm5hbEVudHJpZXMoKS50aGVuKHJlc3BvbnNlcyA9PiByZXNwb25zZXMuZmlsdGVyKHJlc3BvbnNlID0+IHJlc3BvbnNlLm1vb2QubGFiZWwgPT09IG1vb2RsYWJlbCkpLnRoZW4oZmlsdGVyZWRFbnRyeSA9PiBwdXRPbkRPTS5kb21DcmVhdGlvbihmaWx0ZXJlZEVudHJ5KSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmlsdGVyTW9vZCIsImltcG9ydCBmaWx0ZXJNb29kIGZyb20gXCIuL21vb2RGaWx0ZXJcIlxyXG5cclxuXHJcbmZ1bmN0aW9uIG1vb2RCdXR0b25WYWx1ZSgpIHtcclxuICAkKFwiaW5wdXRbdHlwZT1yYWRpb11bbmFtZT1tb29kXVwiKS5jbGljaygoKSA9PiB7XHJcbiAgICBsZXQgcmFkaW9Nb29kID0gJChcImlucHV0W3R5cGU9cmFkaW9dW25hbWU9bW9vZF06Y2hlY2tlZFwiKS52YWwoKVxyXG4gICAgbGV0IGVudHJ5RGl2ID0gJChcIi5lbnRyeVNlY3Rpb25cIilcclxuICAgICQoZW50cnlEaXYpLmFkZENsYXNzKFwiaGlkZGVuXCIpXHJcbiAgICBmaWx0ZXJNb29kKHJhZGlvTW9vZClcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb29kQnV0dG9uVmFsdWVcclxuIiwiaW1wb3J0IHZhbGlkYXRlRW50cnkgZnJvbSBcIi4vZm9ybVZhbGlkYXRpb25cIlxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50KCkge1xyXG4gIGxldCByZWNvcmRCdXR0b24gPSAkKFwiI3JlY29yZC1idXR0b25cIilcclxuICAkKHJlY29yZEJ1dHRvbikuY2xpY2soKCkgPT4ge1xyXG4gICAgbGV0IGVudHJ5T2JqZWN0ID0ge1xyXG4gICAgICBcImRhdGVcIjogJChcIiNqb3VybmFsRGF0ZVwiKS52YWwoKSxcclxuICAgICAgXCJjb25jZXB0XCI6ICQoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbCgpLFxyXG4gICAgICBcImVudHJ5XCI6ICQoXCIjam91cm5hbEVudHJ5XCIpLnZhbCgpLFxyXG4gICAgICBcIm1vb2RJZFwiOiArJChcIiNtb29kU2VsZWN0XCIpLnZhbCgpLFxyXG4gICAgICBcImluc3RydWN0b3JJZFwiOiArJChcIiNpbnN0cnVjdG9yU2VsZWN0XCIpLnZhbCgpXHJcbiAgICB9XHJcbiAgICB2YWxpZGF0ZUVudHJ5KGVudHJ5T2JqZWN0KVxyXG4gIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFdmVudCJdfQ==
