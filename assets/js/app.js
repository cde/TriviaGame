var timerRunning = false;
var intervalId;
var trivia = {
    count: 10,
    currentSet: 0,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    startGame: function(){
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(intervalId);
        $('.game-over').hide();

        // show timer
        $('#time-remaining').show();
        $('#time').text(trivia.count);

        // show your guesses
        $('.result').show();
        // remove start button
        $('.startGame').hide();

        trivia.askQuestion();
    },
    startTimer: function() {
        if(!timerRunning){
            intervalId = setInterval(trivia.countDown, 1000);
            timerRunning = true;
        }
    }, 
    stopTimer: function() {
        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        timerRunning = false;
      },
    countDown: function(){
        // Decrease number by one
        trivia.count--;
        $("#time").text(trivia.count); 

         // if timer still has time left and there are still questions left to ask
        if(trivia.count > -1 && trivia.currentSet < questions.length){
            if(trivia.count === 4){
                $('#time').addClass('text-danger');
            }
        }
        var question = questions[trivia.currentSet]
        //  Once number hits zero...
        if (trivia.count === 0) {
            trivia.unanswered++
            $('.unanswered').text(trivia.unanswered);
            trivia. stopTimer(); 

            $('.out-of-time').show()

            if(question !== undefined){
                $(".answer").text(question.answer);
                $('#correct-answer').show()
            }
            //  Alert the user that time is up.
            //  alert("Time Up!");
             // begin next question
             clearInterval(intervalId);
             resultId = setTimeout(trivia.guessResult, 1000);
             trivia.count = 10  ;
        
        }
        if(trivia.currentSet ==  questions.length) {
            trivia.stopTimer();
            trivia.count = 0;
            $('#time').text(trivia.count);
        }
      },
    askQuestion: function(){
        trivia.count = 10;
        $('#time').removeClass('text-danger');
        $('#time').text(trivia.count);
            
        // to prevent timer speed up
        trivia.startTimer();

        if(trivia.currentSet === questions.length) {
            $('.game-over').show();
            $('#question').remove();
            $('.startGame').text("Play Again");
            $('.startGame').show();
            return false;
        }
        var question = questions[trivia.currentSet];
        $('#question').text(question.id + ". " + question.text);
        var $options = $('.options')
        question.options.forEach(function(option){
            var $optionButton = $('<a>', {
                class: "btn list-group-item list-group-item-action option",
                id: option.id,
                text: option,
                "data-id": question.id,
                "data-answer": question.answer
            })
            $options.append($optionButton);
        })
    },
    checkAnswer: function(){
        var resultId;
        var $this = $(this)
        var questionId = $this.data("id")
        const result = questions.find( question => question.id === questionId );

        if(result.answer === $this.text()){
            $this.addClass("btn-success active")
            trivia.correct++;
            $('.correct').text(trivia.correct);
            $('.great-job').show();
        }
        else{
            $this.addClass("btn-danger active");
            trivia.incorrect++
            $('.incorrect').text(trivia.incorrect);
            $('#correct-answer').show();
            $('.answer').text(result.answer);
        }
        trivia.stopTimer();
        trivia.count = 11;

        // re-start timer
        // clearInterval(intervalId);
        resultId = setTimeout(trivia.guessResult, 1000);
  
    },
    // remove previous question\'s options
    guessResult : function(){
        // increment to next question set
        trivia.currentSet++;
        
        // remove the options and results
        $('.option').remove();
        $('#correct-answer').hide();
        $('.out-of-time').hide();
        $('.great-job').hide();

        // begin next question
        trivia.askQuestion();
    }

}
  var questions = [
    {   id: 1,
        text: 'Who won the F.I.F.A world cup in 2006?',
        answer: 'Italy',
        options: ['Italy', 'USA', 'France', 'Germany']},
    {   id: 2,
        text: 'Who won the F.I.F.A world cup in 1994?',
        answer: 'USA',
        options: [ 'Germany', 'USA', 'Italy','France']},
    {   id: 3,
        text: 'How Many players a team is on a soccer feild when playing?',
        answer: "11",
        options: [12, 9, 11, 10]}, 
    {   id: 4,
        text: "How many goals has all-time record World Cup goal scorer Miroslav Klose scored?",
        options: [14,15,16,17],
        answer: '16'
    },
    {   id: 5,
        text: "Who was the top goal scorer at the 1998 finals?",
        options: ["Gabriel Batistuta", "Christian Vieri", "Davor Suker", "Zinedine Zidane"],
        answer: "Davor Suker"
    },
    {   id: 6,
        text: "What is the furthest round an African nation has reached at the finals?",
        options: ["Second", "Quarter Finals", "Semi-finals", "Final",],
        answer: "Quarter Finals"
    },
    {   id: 7,
        text: "Who scored the winning goal for Germany in the 2014 World Cup?",
        options: ["Mario Götze", "André Schürrle", "Toni Kroos"],
        answer: "Mario Götze"
    },
    {
        id: 8,
        text: "In 2016, with which animal did Swiss keeper Yann Sommer pose for a photoshoot?",
        options: ["A marmot", "A llama", "A goat"],
        answer: "A llama"
    }
  ]

$(document).ready(function(){
    $("#remaining-time").hide();
    $(".startGame").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.checkAnswer);
})