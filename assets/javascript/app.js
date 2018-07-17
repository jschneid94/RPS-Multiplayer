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

$("#signIn").on("click", function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(result);
            console.log("Log in successful");
            $("#pageContent").show();
            $("#signIn").hide();
          }
    }).catch(function(err) {
        console.log(err);
        console.log("Log in failed");
    });

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            $("#pageContent").show();
            $("#signIn").hide();
        }
        var user = result.user;
    }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
    });
}); 




// When submit is pressed, push values into the database
$("#submit").on("click", function() {
    event.preventDefault();
    database.ref().push({
        name: $("#trainName").val().trim(),
        destination: $("#trainDestination").val().trim(),
        trainTime: moment($("#trainTime").val().trim(), "HH:mm").format("HH:mm"),
        trainFrequency: $("#trainFrequency").val().trim()
    });
    // Empty the input fields
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");
});

database.ref().on("child_added", function(snapshot) {
    var newTrain = snapshot.val();

    // Grab the first train time
    var firstTime = moment(newTrain.trainTime, "HH:mm");
    console.log("First train time: " + firstTime);

    // Calculate the difference in minutes since the first train time
    var timeDiff = moment().diff(moment(firstTime), "minutes");
    console.log("Time in minutes since first train: " + timeDiff);

    // Modulus to calculate the time since the most recent train time
    var timeRemainder = timeDiff % newTrain.trainFrequency;
    console.log(timeRemainder);
    
    // Minutes until train arrives
    var minToTrain = newTrain.trainFrequency - timeRemainder;

    // Arrival time is minutes until plus the current time
    var nextArrival = moment().add(minToTrain, "minutes").format("HH:mm");

    var newRow = $("<tr>");
    var newName = $("<td>").text(newTrain.name);
    var newDestination = $("<td>").text(newTrain.destination);
    var newFrequency = $("<td>").text(newTrain.trainFrequency + " min");
    var newArrival = $("<td>").text(nextArrival);
    var newMinLeft = $("<td>").text(minToTrain);


    $(newRow).append(newName, newDestination, newFrequency, newArrival, newMinLeft);
    $("#tableBody").append(newRow);

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});