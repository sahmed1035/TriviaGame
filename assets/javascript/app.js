var timer;
var setTimeoutid;
//styling the start button
$('#start').css('background-color', 'black');
$('#start').css('font-size', '44px');
//making start button disapearning when clicked
$('#start').on('click', function () {
    $('#start').remove();

    triviaGame.displayQuestion();
})
//setting up click event so clicking on the button should tell if user chose the correct button or not.
/***using document selector so check the entire document. .answer-button dynamically created. */
$(document).on('click', ".answer-button", function (e) {
    triviaGame.compareUserclick(e);
})

//click event for Restart Button
$(document).on('click','#reset',function(){
    triviaGame.resetGame();
})



//****************************************************************************************//
//Setting up all the questions, choices and correct answers in the genZQuestions array.
//****************************************************************************************//

var genZQuestions = [{
    question: "Generation-Z are?",
    choices: ["Children of the World War I generation", "Vietnam and Korean War generation", "Children born between 1996-2012", "Children in the time of Great Depression"],
    correctAnswer: "Children born between 1996-2012",
    urlImage: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"
    
},
{
    question: "Generation-Z are also called?",
    choices: ["BOOMLETS", "MILLENNIALS", "latch-key-kids", "Gen-X"],
    correctAnswer: "BOOMLETS",
    urlImage: "https://media.giphy.com/media/CHSDx4xFXHKEw/giphy.gif"
},
{
    question: "Major Characteristics of Generation-Z are?",
    choices: ["expect the world to treat them the best", "self-assured with strong views", "little verbal communication and interpersonal skills", "Very much into labels and brand names"],
    correctAnswer: "little verbal communication and interpersonal skills",
    urlImage: "https://media.giphy.com/media/AGOPaltgJ2pBC/giphy.gif"
},
{
    question: "Percentage of the world population  of Generation-Z?",
    choices: ["21%","50%", "18%", "100%"],
    correctAnswer: "18%",
    urlImage:"https://media.giphy.com/media/14sy6VGAd4BdKM/giphy.gif"
},
{
    question: "Amount they spend annually?",
    choices: ["$51 billion + $170 billion spent by their parents ", "$51 million + $170 million spent by their parents ", "$1 billion + $70 million spent by their parents ", "$12 billion spent by their parents "],
    correctAnswer: "$51 billion + $170 billion spent by their parents ",
    urlImage:"https://media.giphy.com/media/r7Ql3VIg4x6WA/giphy.gif"

}];


//****************************************************************************************//

// function shuffle(a) {
//     var j, x, i;
//     for (i = genZQuestions.choices.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x =  genZQuestions.choices[i];
//         genZQuestions.choices[i] =  genZQuestions.choices[j];
//         genZQuestions.choices[j] = x;
//     }
//     return a;
// }





//trivia game object
//****************************************************************************************//


var triviaGame = {
    // genZQuestions: genZQuestions,
    currentQuestion: 0,
    counter: 30, //showing count for 30 seconds
    correctAnswer: 0,
    incorrectAnswer: 0,
    unAnswered: 0, //timeout and no click

    ///////Methods////////
    timerCountdown: function () {
        
        triviaGame.counter--; //starting from 30
        $('#counter').html(triviaGame.counter); //displaying counter on the html
        if (triviaGame.counter === 0) {
            // console.log("Time Up!");
            triviaGame.timeUp();
        }

    },

    displayQuestion: function () {
        clearInterval(timer);
        //every second run the coundown method which is decrease the counter and display it.
        timer = setInterval(triviaGame.timerCountdown, 1000);
        //displaying the timer
        $('#subwrapper').html("<h3>TIME REMAINING: <span id = 'counter'>30</span> seconds</h3>");
        //displaying the question to the html page under subwrapper
        $('#subwrapper').append('<h2>' + genZQuestions[triviaGame.currentQuestion].question + '</h2>');
        //displaying all the questions one by one in a loop
        for (var i = 0; i < genZQuestions[triviaGame.currentQuestion].choices.length; i++) {
            //appending all the choices as buttons in html
            $('#subwrapper').append('<button class= "answer-button" id="button-' + i + ' "data-name=" ' + genZQuestions[triviaGame.currentQuestion].choices[i] + '">' + genZQuestions[triviaGame.currentQuestion].choices[i] + '</button>');

        }


    },

    timeUp: function () {
        //clear the timer other will give negative numbers
        // clearInterval(timer);
        //if the time is up then add 1 to unAnswered counter.
        triviaGame.unAnswered++; 
        //ran out of time message on the html
        $('#subwrapper').html("<h2>OUT OF TIME!</h2>");
        //showing what correct answer would've been if they had got it right.
        $('#subwrapper').append("<h3> The Correct Answer Was: "+ genZQuestions[triviaGame.currentQuestion].correctAnswer+'</h3>');
        //checking if it was the last question.
        clearTimeout(setTimeoutid);
        if (triviaGame.currentQuestion == genZQuestions.length - 1) {
            
            setTimeoutid=  setTimeout(triviaGame.displayFinalResult, 3000); //wait for 3 sec and go to result screen 
        }
        else //else taking to the next question
        {
           
            setTimeoutid= setTimeout(triviaGame.nextQuestion, 3000) //nextQuestion Function after 3 sec.
        }

    },

    displayFinalResult: function () {
        //clearing timer interval
        // clearInterval(timer);
        //text for game over.
        $('#subwrapper').html("<h2>ALL DONE!</h2>");
        //displaying number of correct, incorrect and un-answered answers.
        $('#subwrapper').append("<h3>Correct: "+triviaGame.correctAnswer+'</h3>');
        $('#subwrapper').append("<h3>Incorrect: "+triviaGame.incorrectAnswer+'</h3>');
        $('#subwrapper').append("<h3> Un-Answered: "+triviaGame.unAnswered+'</h3>');
        //appending the Restart Game button.
        $('#subwrapper').append("<button id='reset'>Restart Game </button>");

    },  

    compareUserclick: function (e) {
        /*stopping the timer after user clicked*/
        // clearInterval(timer);
        //checking if the user clicked the answer button. e=event
        if ($(e.target).data('name').trim() === genZQuestions[triviaGame.currentQuestion].correctAnswer.trim()) {
            //if condition true than run the answeredCorrectly function.
            triviaGame.answeredCorrectly();
        }
        else {
            //else run the answeredincorrectly function.
            triviaGame.answeredIncorrectly();
        }


    },

    answeredCorrectly: function () {
        // clearInterval(timer);
        triviaGame.correctAnswer++; //adding 1 to the correctAnswer counter
        //displaying on the html under subwrapper
        $("#subwrapper").html("<h2>YOU GOT IT RIGHT!</h2>");
        $("#subwrapper").append("<img  src =" +genZQuestions[triviaGame.currentQuestion].urlImage+ " width='300px'>" );
        //checking if we're on the last question 
        //if at the last question true then go to the resultScreen
        if (triviaGame.currentQuestion == genZQuestions.length-1) {
            clearTimeout(setTimeoutid);
            setTimeoutid= setTimeout(triviaGame.displayFinalResult, 3000); //wait for 3 sec and go to result screen 
        }
        else //else taking to the next question
        {
            clearTimeout(setTimeoutid);
            setTimeoutid= setTimeout(triviaGame.nextQuestion, 3000) //nextQuestion Function after 3 sec.
        }

    },

    answeredIncorrectly: function () {

        // clearInterval(timer);
        triviaGame.incorrectAnswer++; //adding 1 to the  incorrectAnswer counter
        //displaying on the html under subwrapper
        $("#subwrapper").html("<h2>YOU GOT IT WRONG!</h2>");
        //displaying the correct answer.
        $('#subwrapper').append("<h3> The Correct Answer Was: "
        + genZQuestions[triviaGame.currentQuestion].correctAnswer+'</h3>');
       
    
        //checking if we're on the last question 
        //if at the last question true then go to the resultScreen
        if (triviaGame.currentQuestion == genZQuestions.length - 1) {
           clearTimeout(setTimeoutid);
            setTimeoutid= setTimeout(triviaGame.displayFinalResult, 3000); //wait for 3 sec and go to result screen 
        }
        else //else taking to the next question
        {
            clearTimeout(setTimeoutid);
           setTimeoutid= setTimeout(triviaGame.nextQuestion, 3000) //nextQuestion Function after 3 sec.
        }

    },

    
    nextQuestion: function() {
        // clearInterval(timer);
        //setting the counter back to 30
        triviaGame.counter = 30;
        //displaying on the html
        $('#counter').html(triviaGame.counter);
        triviaGame.currentQuestion++; //to go to the next question. otherwise looping over the same question.
        //displayQuestion again
        triviaGame.displayQuestion();
    },

    resetGame: function () {
        // clearInterval(timer);
        
        //when the restart game button is clicked. reset all the counters.
        triviaGame.currentQuestion =0;
        triviaGame.counter =30;
        triviaGame.correctAnswer =0;
        triviaGame.incorrectAnswer = 0;
        triviaGame.unAnswered = 0;
        
        //displayQuestions function
        triviaGame.displayQuestion();

    }

}