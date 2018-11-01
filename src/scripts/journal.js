// Now that you've defined an object whose responsibility is to access the data, you need to write code in src/scripts/journal.js to use that object and get the data. Once you know you have the data, pass it along to the renderJournalEntries function that now lives in src/scripts/entriesDom.js.

// Put this comment in src / scripts / journal.js.Then write the main logic that uses the code in the helper modules.

//   /*
//       Main application logic that uses the functions and objects
//       defined in the other JavaScript files.
  
//       Change the fake variable names below to what they should be
//       to get the data and display it.
//   */
//   objectWithGetterMethod.methodToGetData().then(functionThatRendersData)

console.log(API)
// API.then(parsedEntry => {
//     // loop over the array of fetched data
//     parsedEntry.forEach((entry) => {
//       // creates DOM elements by calling our function
//       domCreation(entry)
//     })})


API.getJournalEntries().then(entries => domCreation(entries))