// Initialize Firebase
var config = {
    apiKey: "AIzaSyCLyVohjCI_nhmtem90f0tMRn6i3qhFk5k",
    authDomain: "train-scheduler-8fbb1.firebaseapp.com",
    databaseURL: "https://train-scheduler-8fbb1.firebaseio.com",
    projectId: "train-scheduler-8fbb1",
    storageBucket: "train-scheduler-8fbb1.appspot.com",
    messagingSenderId: "383504353278"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function() {
    event.preventDefault();
    database.ref().push({
        name: $("#trainName").val().trim(),
        destination: $("#trainDestination").val().trim(),
        trainTime: $("#trainTime").val().trim(),
        trainFrequency: $("#trainFrequency").val().trim()
    });
});

database.ref().on("child_added", function(snapshot) {
    var newTrain = snapshot.val();


    var time = moment(newTrain.trainTime);
    var frequency = moment(newTrain.trainFrequency, "m mm");
    time.add(frequency);
    console.log(time);
    

    var newRow = $("<tr>");
    var newName = $("<td>").text(newTrain.name);
    var newDestination = $("<td>").text(newTrain.destination);
    var newFrequency = $("<td>").text(newTrain.trainFrequency);
    //var employeeMonths = $("<td>").text();
    //var employeeRate = $("<td>").text();

    $(newRow).append(newName, newDestination, newFrequency);
    $("#tableBody").append(newRow);

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});