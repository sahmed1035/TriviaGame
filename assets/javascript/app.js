//making start button disapearning when clicked
$('#start').on('click', function () {
    $('#start').remove();

    triviaGame.displayQuestion();
})
//setting up click event so clicking on the button should tell if user chose the correct button or not.
/***using document selector so check the entire document. .answer-button dynamically created. */
$(document).on('click', '.answer-button', function (e) {
    triviaGame.compareUserclick(e);
})
//****************************************************************************************//

//  //Creating ajax function property url and method "GET"
//  function getMyGifAjax(urlstring) {
//     $.ajax({
//       url: urlstring,
//       method: "GET"
//     }).then(function (response) {
//       console.log(response);
//       response.data
//       for (var i = 0; i < response.data.length; i++) {
//         var myGif = response.data[i];
//         $("#gifs").append("<embed src='" + myGif.embed_url + "' />");
//       }
//     });

//   }

//****************************************************************************************//


//Setting up all the questions, choices and correct answers in the genZQuestions array.
var genZQuestions = [{
    question: "Generation-Z are?",
    choices: ["Children of the World War I generation","Vietnam and Korean War generation", "Children born between 1996-2012", "Children in the time of Great Depression"],
    correctAnswer: "Children born between 1996-2012",
    // image: getMyGifAjax("https://api.giphy.com/v1/gifs/search?q=you+did+it&api_key=dc6zaTOxFJmzC&limit=1"),
        }, 
    {
    question: "Generation-Z are also called?",
    choices: ["BOOMLETS","MILLENNIALS", "“latch-key kids”","Gen-X"],
    correctAnswer: "BOOMLETS",
    },
     {
    question: "Major Characteristics of Generation-Z are?",
    choices: ["expect the world to treat them the best","self-assured with strong views", "little verbal communication and interpersonal skills","Very much into labels and brand names"],
    correctAnswer: "little verbal communication and interpersonal skills",
    }, 
    {
    question: "Percentage of the world population  of Generation-Z?",
    choices: ["21%", "18%","100%"],
    correctAnswer: "18%",
    }, 
    {
    question: "Amount they spend annually?",
    choices: ["$51 billion + $170 billion spent by their parents ","$51 million + $170 million spent by their parents ", "$1 billion + $70 million spent by their parents ", "$12 billion spent by their parents "],
    correctAnswer: "$51 billion + $170 billion spent by their parents ",

}];


//****************************************************************************************//

//trivia game object
 var triviaGame = {
    genZQuestions: genZQuestions,
    currentQuestion: 0,
    counter: 30, //showing count for 30 seconds
    correctAnswer: 0,
    incorrectAnswer: 0,
    unAnswered: 0, //timeout and no click
    indexArray: 0,

    ///////Methods////////
    timerCountdown: function () {
        triviaGame.counter--; //starting from 30
        $('#counter').html(triviaGame.counter); //displaying counter on the html
        if (triviaGame.counter <= 0) {
            console.log("Time Up!");
            triviaGame.timeUp();
        }

    },

    displayQuestion: function () {
        //every second run the coundown method which is decrease the counter and display it.
        timer = setInterval(triviaGame.timerCountdown, 1000);
        //displaying the question to the html page under subwrapper
        $('#subwrapper').html('<h2>' + genZQuestions[triviaGame.currentQuestion].question + '</h2>');
        //displaying all the questions one by one in a loop
        for (var i = 0; i < genZQuestions[triviaGame.currentQuestion].choices.length; i++) {
            //appending all the choices as buttons in html
            $('#subwrapper').append('<button class= "answer-button" id="button-'+ i +' "data-name=" ' + genZQuestions[triviaGame.currentQuestion].choices[i] + '">'+ genZQuestions[triviaGame.currentQuestion].choices[i] + '</button>');

        }


    },

    timeUp: function () {

    },

    displayFinalResult: function () {

        //     for (var i = 0; i < questions.length ; i++) {
        //     currentQuestion = questions[i].correctAnswer;
        //     userAnswer = $(`input[name=question-${i}-option]:checked`).val();

        //       if (userAnswer === currentQuestion) {
        //         correct++;
        //         console.log("I think this is working right!")
        //       } else {console.log("wrong!")}
        //   }


    },
    // renderChoicesButton: function() {



    // Deleting the choices prior to adding new choices
    // (this is necessary otherwise we will have repeat buttons)
    // $("#buttons-choices").empty();

    // Looping through the array of choices
    // for (var i = 0; i < choices.length; i++) {

    // Then dynamicaly generating buttons for each choice in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    //   var a = $("<button>");
    // Adding a class
    //       a.addClass("answer-button");
    //       // Added a data-attribute
    //       a.attr("data-name", choices[i]);
    //       // Provided the initial button text
    //       a.text(choices[i]);
    //       // Added the button to the HTML
    //       $("#buttons-choices").append(a);
    //     }


    // },


    compareUserclick: function (e) {
        /*stopping the timer after user clicked*/
        clearInterval(timer);
        //checking if the user clicked the answer button. e=event
        if ($(e.target).data("name") == genZQuestions[triviaGame.currentQuestion].correctAnswer) {
            //if condition true than run the answeredCorrectly function.
            triviaGame.answeredCorrectly();
        }
        else {
            //else run the answeredincorrectly function.
            triviaGame.answeredIncorrectly();
        }


    },

    answeredCorrectly: function () {
        console.log("Correct Answer!");
    },

    answeredIncorrectly: function () {
        console.log("Incorrect Answer!");
    },

    resetGame: function () {

    }

}
