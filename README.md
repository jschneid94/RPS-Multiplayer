# Train-Scheduler

Deployed Page:
https://jschneid94.github.io/Train-Scheduler/

Train Scheduler is a web app that lists train schedules and allows the user to input new schedules; these inputs are stored using Google Firebase. The goal of this projcet was to gather and store user input somewhere besides local storage.

My approach for this project was to first grab user inputs using javascript and firebase commands to store those values into an object on the database. I then used a function that pushed these values into a table, some of which were not input and required calculating new values from user input. For instance, users can enter a start time, but the output on the page would also calculate when the next train would arrive based on the original start time. With these values being stored on firebase, the content will remain on the page upon return.
