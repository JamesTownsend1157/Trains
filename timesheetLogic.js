// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDnzMpGGuQ8f_v9YF9EtssydYSl4Uy_J8s",
    authDomain: "trains-dc01f.firebaseapp.com",
    databaseURL: "https://trains-dc01f.firebaseio.com",
    projectId: "trains-dc01f",
    storageBucket: "trains-dc01f.appspot.com",
    messagingSenderId: "1067478489429"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var finalDestination = $("#destination-input").val().trim();
  var firstTrain = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm a");
  var frequencyRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain
 = {
    name: trainName,
    destination: finalDestination,
    start: firstTrain,
    rate: frequencyRate
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var TrainName = childSnapshot.val().name;
  var finalDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().start;
  var frequencyRate = childSnapshot.val().rate;

  // train Info
  console.log(TrainName);
  console.log(finalDestination);
  console.log(firstTrain);
  console.log(frequencyRate);

// We start with the first train time and we compare it to current time
 
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract( 1, "years");
    console.log("TIME CONVERTED: " + firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var timeRemaining = diffTime % frequencyRate;
    console.log(timeRemaining);

    var minTilTrain = frequencyRate - timeRemaining;
    console.log("MINUTES TILL TRAIN: " + minTilTrain);

    var nextTrain = moment().add(minTilTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));










  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(TrainName),
    $("<td>").text(finalDestination),
    $("<td>").text(frequencyRate + " Mins"),
    $("<td>").text(nextTrain),
    $("<td>").text(minTilTrain),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
