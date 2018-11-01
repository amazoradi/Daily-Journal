// accessing our data through the object previously defined. we call the method that fetches the data from the object, then go through our all of our data and passing that all our data into our dom creation function 

API.getJournalEntries().then(entries => domCreation(entries))