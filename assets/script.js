// Globals
let counter;//countdown tracker
const timerEl = document.getElementById("timer");
const gameEl = document.getElementById("gameArea");
const startButton = document.createElement("button");
startButton.setAttribute("class", "btn btn-lg btn-dark");
startButton.textContent = "Let's Do it";
//initial div on the page
const instructions = document.createElement("p");
instructions.setAttribute("class", "instructions");
//area for question to show up
const questionDiv = document.createElement("div");
questionDiv.setAttribute("id","question-div");
//area for answers to show up
const answersUl = document.createElement("ul");
answersUl.setAttribute("id","answers-ul");
//Begin again button
const startOver = document.createElement("button");
startOver.setAttribute("class","btn btn-lg btn-success");
startOver.textContent = "Try Again";
// extra variables
var highScores = document.getElementById("highScores");
var submitBtn = document.getElementById("Submit");
var initials = document.getElementById("initials");
var form = document.querySelector("form");
// short circuit
var scoreArray = JSON.parse(localStorage.getItem("savedScores")) || []

//alerts
const correctAlert = document.createElement("div");
correctAlert.setAttribute("class", "alert alert-success");
correctAlert.textContent = "You are correct!";
//alerts
const inCorrectAlert = document.createElement("div");
inCorrectAlert.setAttribute("class", "alert alert-danger");
inCorrectAlert.textContent = "That is Incorrect!";
//alerts timer
function clearAlert() {
    console.log("Clear alert called");
    
    setTimeout(()=>{
        inCorrectAlert.remove();
        correctAlert.remove(); 
    },1000)
}




//Game Object
const game = {
    timer: 10,
    questionIndex:0,
    getScore:function(){
       let score = "You got " + game.correct + " out of " + game.questions.length;
       return score;
    },
    correct: 0,
    questions: [
        {
            q: "What does DRY Means in coding?",
            a: [
                "Do not repeat yourself", "Doesn't matter",
                "Something is not wet"
            ],
            c: 0
        },
        {
            q: "Arrays in JavaScript can be used to store",
            a: [
                "Numbers and Strings",
                "Other arrays and booleans",
                "all of the above"
            ],
            c: 2
        },
        {
            q: "What is NaN? in coding",
            a: [
                "A value that is “not a number” and its type is: Number",
                "National Advance Nation",
                "How you take a code out"
            ],
            c: 0
        }
    ],
    init: function () {
        instructions.textContent = "Beat the timer and Answer the questions";
        gameEl.appendChild(instructions);
        gameEl.appendChild(startButton);
    },
    startGame: function () {
            game.correct = 0;
            game.timer = 10;
            game.questionIndex = 0;
            console.log(`Game Started`);
            //hide the instructions
            gameEl.innerHTML = "";
            //start the timer
            game.timerStart();
            //Show the next question
            game.showNextQuestion();
        
    },
    showNextQuestion: function () {
        clearAlert();
          //Check to see if we are out of questions
        // console.log(`Question # ${game.questionIndex}`);
        // console.log(`Total Questions # ${game.questions.length}`);


        if(game.questionIndex < game.questions.length){
            //empty the div
            questionDiv.innerHTML = "";
            answersUl.innerHTML = "";


            let currentQuestion = game.questions[game.questionIndex].q;
            // console.log(`Current Question is: ${currentQuestion}`);

            
            questionDiv.innerHTML =  "<h3>"+ currentQuestion + "</h3>";
            let content = document.getElementById("gameArea");
            content.appendChild(questionDiv);
            //Show the answers on the page
            for (let index = 0; index < game.questions[game.questionIndex].a.length; index++) {
                //get the anawer from the array
                const possibleAnswer = game.questions[game.questionIndex].a[index];
                const answerLi = document.createElement("li");
                //add the text to the div
                answerLi.textContent = possibleAnswer;
                //add all the needed attributes
                answerLi.setAttribute("class","answerLi");
                answerLi.setAttribute("data", index);
                //attache the answer to the page
                answersUl.appendChild(answerLi)
            }
            content.appendChild(answersUl);
          
        }else{
            console.log(`We are past the last question`);
            //empty the question area
            questionDiv.innerHTML = "";
            answersUl.innerHTML = "";
            game.timerStop();
            //add the start over button
            gameEl.appendChild(startOver);
            //get the final score and append it to the page
            let Finalscore = game.getScore();
            timerEl.textContent = Finalscore;
            highScores.removeAttribute("id");
        }

        
    },
    timerStart:function(){
        //make sure we have one timer
        clearInterval(counter);
        //our timer interval every second
        counter = setInterval(game.countDown, 1000);
        // console.log(`Timer Started.`);
    },
    timerStop:function () {
        // console.log(`Stopping Timer`);
        clearInterval(counter);
    },
    countDown: function(){
        //decrement the timer
        game.timer--;
        //show timer on the page
        timerEl.textContent = game.timer + " Seconds Left";
        //stop timer if it gets to Zero
        if(game.timer <= 0){
            questionDiv.innerHTML = "Times UP!!";
            game.timer = 10;
            game.questionIndex++;
            game.showNextQuestion();
        }  
    },


    

    
    getAnswer:function(e){
        //get the item we clicked on and check the data attribute
        if(e.target.matches("li")){
            // console.log("data attribute", e.target.getAttribute("data"));
            //see if it's the correct anser
            if(e.target.getAttribute("data") == game.questions[game.questionIndex].c){
                gameEl.appendChild(correctAlert);
                game.timer = 10;
                //move to the next question
                game.questionIndex++;
                game.correct++;
                game.showNextQuestion();
            }else{
                gameEl.appendChild(inCorrectAlert);
                game.timer = 10;
                game.questionIndex++;
                game.showNextQuestion();   
            }
        } 
    },

       
}

 function saveScore(event){

    // Check for LocalStorage support.
    
        event.preventDefault()
       
        var savedNewscore = {
            initials: initials.value, 
            score: game.correct
        }

        scoreArray.push(savedNewscore)

        // Save the name in localStorage.
        localStorage.setItem("savedScores", JSON.stringify(scoreArray) );

        window.location.href = "./highscores.html";


  
    }
  
  


//run when the page loads
game.init();
// ==== Event Handlers ==== //
startButton.addEventListener("click",game.startGame);
startOver.addEventListener("click",game.startGame);
answersUl.addEventListener("click", game.getAnswer);
form.addEventListener("submit", saveScore);