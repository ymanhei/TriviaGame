var queryURL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";
var qaobject;
var current_question = 0;
var intervalId;
var correctnum = 0;
var wrongnum = 0;

        $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        qaobject = response;
        console.log(qaobject);
    populateqa (current_question,response);
    starttimer ();
    });


function populateqa (index,response) {
    if (current_question < 10) {
        $(".choices").empty();
        $(".questions").empty();
        $(".questions").html(response.results[index].question);

        var allanswers = response.results[index].incorrect_answers;
        allanswers.push(response.results[index].correct_answer);
        shuffle(allanswers);
        for (i=0; i< allanswers.length; i++ ){
            $(".choices").append('<br><input class="btn btn-primary" type="button" value="' + allanswers[i] + '">');
        }
        
    } 
    else {
        $(".choices").empty();
        $(".questions").empty();
        $(".questions").html("You have answered " + correctnum +" questions correctly!");
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
    event.preventDefault();
    var youranswer = this.value;

    if (youranswer == qaobject.results[current_question].correct_answer) {
        //alert("CORRECT");
        correctnum++;
        current_question++;
        populateqa(current_question,qaobject);
        resettimer();
    }
    else {
        //alert("WRONG");
        wrongnum++
        current_question++;
        populateqa(current_question,qaobject);
        resettimer();
    }
  })

  $(document).on("click", "#again", function(event) {

    event.preventDefault();
   
current_question = 0;
correctnum = 0;
wrongnum = 0;

        $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        qaobject = response;

    populateqa (current_question,response);
    starttimer ();
    });

  })

var totaltime = 30;
var interval = 1000;

function starttimer () {
    clearInterval(intervalId);
    intervalId = setInterval(decreasement,interval);
}

function decreasement () {
    if (totaltime > 0) {
      totaltime = totaltime - (interval/1000);

      $(".counter").html("<h1>" + totaltime + "</h1>");
    }
    else {
        wrongnum++
        current_question++;
        populateqa(current_question,qaobject);
        resettimer();
    }
  }

function resettimer() {
    
    totaltime = 30;
    clearInterval(intervalId);
    starttimer ();

}

function stop() {

    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
  
  }