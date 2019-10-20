var queryURL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";
var qaobject;
var current_question = 1;
var intervalId;
var correctnum = 0;
var wrongnum = 0;
var isclicked = false;
var timesup = false;
var totaltime = 3;
var interval = 1000;

function initquestions () {

    current_question = 1;
correctnum = 0;
wrongnum = 0;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          qaobject = response;
          //console.log(qaobject);
      populateqa ();
      starttimer ();
      });

}
        


function populateqa () {
    if (current_question < 11) {
        $(".choices").empty();
        $(".results").empty();
        $(".questions").empty();
        console.log("current_question " + current_question);
       // console.log(qaobject.results);
        $(".questions").html("Question " + current_question + ". " + qaobject.results[current_question-1].question);
        isclicked = false;
        

        var allanswers = qaobject.results[current_question-1].incorrect_answers;
        allanswers.push(qaobject.results[current_question-1].correct_answer);
        shuffle(allanswers);
        for (i=0; i< allanswers.length; i++ ){
            $(".choices").append('<br><input class="btn btn-primary" type="button" value="' + allanswers[i] + '">');
        }
        resettimer();
    } 
    else {
        $(".choices").empty();
        $(".questions").empty();
        $(".results").empty();
        $(".questions").html("You have " + correctnum +" correct answer and " + wrongnum + " incorrect answer.");
        $(".choices").html('<input class="btn-success" type="button" id="again" value="Try Again?">');
        stop();
    }
}
    
//Solution from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  $(document).on("click", ".btn", function(event) {
    //event.preventDefault();
    if (isclicked == false) {
        var youranswer = this.value;
        isclicked = true;
        stop();
        if (youranswer == qaobject.results[current_question-1].correct_answer) {
            //alert("CORRECT");
            correctnum++;
            current_question++;
            //console.log(current_question);
            $(".results").html("<h2>Congratulations! Your answer is correct! </h2>");
            loadnextquestion ();   
        }
        else {
            //alert("WRONG");
            wrongnum++
            current_question++;
            //console.log(current_question);
            $(".results").html("<h2>Sorry! Your answer is incorrect! </h2>");
            loadnextquestion ();
          
        }

    }
    
  })

  $(document).on("click", "#again", function(event) {

    initquestions();

  })



function starttimer () {
    clearInterval(intervalId);
    intervalId = setInterval(decreasement,interval);
}

function decreasement () {
    if (totaltime > 0) {
      totaltime = totaltime - (interval/1000);
        console.log(timesup);
      $(".counter").html("<h1>" + totaltime + "</h1>");
    }
    else if (totaltime == 0 || totaltime < 0) {
        if (timesup == false) {
        timesup = true;
        wrongnum++
        current_question++;
        $(".results").html("<h2>Time's up! </h2>");
        loadnextquestion ();
        }
        
    }
  }

function resettimer() {
    timesup = false;
    totaltime = 3;
    clearInterval(intervalId);
    starttimer ();

}

function stop() {

    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
  
  }

  function loadnextquestion () {
    setTimeout(function func() {
        populateqa ();      
      }, 3000);
  }




  initquestions ();