const questionSet = [
    {
        question:"Capital of Delhi?",
        answers:[
            {text:"Mumbai",correct:false},
            {text:"Delhi",correct:true},
            {text:"Kochi",correct:false},
            {text:"Kolkata",correct:false}
        ]
    },
    {
        question:"Capital of Maharashtra?",
        answers:[
            {text:"Kochi",correct:false},
            {text:"Delhi",correct:false},
            {text:"Kolkata",correct:false},
            {text:"Mumbai",correct:true}
        ]
    },
    {
        question:"Capital of Kerala?",
        answers:[
            {text:"Thiruvanathapuram",correct:true},
            {text:"Mumbai",correct:false},
            {text:"Kochi",correct:false},
            {text:"Kolkata",correct:false}
        ]
    },
    {
        question:"Capital of Mizoram?",
        answers:[
            {text:"Mumbai",correct:false},
            {text:"Kochi",correct:false},
            {text:"Aizwal",correct:true},
            {text:"Kolkata",correct:false}
        ]
    }
]

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answerBtn");
const nextButton=document.getElementById("next-btn");
const quizHead=document.getElementById("quizHead");


let currentQuestionIndex = 0;
let score = 0;
let attempt=1;

function startQuiz()
{
   currentQuestionIndex = 0;
   score=0;
   quizHead.innerHTML="Simple Quiz"
   nextButton.innerHTML="Next"
   showQuestion() 
}


function showQuestion()
{
    resetState()
    let currentQuestion = questionSet[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;

    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        let button = document.createElement('button')
        button.innerHTML=answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)
        console.log(button)
        if(answer.correct)
        {
            button.dataset.correct=answer.correct
            console.log(button.dataset)
        }
        button.addEventListener('click',selectAnswer)
    })

//   nextButton.style.display="block"

}

function resetState()
{
    nextButton.style.display="none"
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct==="true"

    if(isCorrect)
    {
        selectedBtn.classList.add('correct')
        score++
    }
    else
    {
        selectedBtn.classList.add('incorrect')
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==='true')
        {
            button.classList.add('correct')
        }
        button.disabled=true
    })
    // button.disabled=true

    nextButton.style.display="block"
    
}

function nextAttempt()
{
    if(score<4 && attempt==2)
    {
        quizHead.innerHTML="Sorry!!!"
        questionElement.innerHTML=`You Are Out Of Attempt`
        nextButton.style.display='none'
    }
}

function stopQuiz()
{
    if(score==4)
    {
        quizHead.innerHTML="Hurrah ! ! !"
        // questionElement.innerHTML=`You Are Out Of Attempt`
        nextButton.style.display='none'
    }
    else
    {
        nextAttempt()
    }
}

function showScore()
{
    resetState()
    quizHead.innerHTML="Your Result"
    questionElement.innerHTML=`You have scored ${score} out of ${questionSet.length}`
    nextButton.innerHTML="Play Again"
    nextButton.style.display="block"
    stopQuiz()
    attempt++
}

function handleNextButton()
{
    currentQuestionIndex++
    if(currentQuestionIndex<questionSet.length)
    {
        showQuestion()
    }
    else
    {
        showScore()
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questionSet.length)
    {
       handleNextButton()
    }
    else
    {
       startQuiz()
    }
})

startQuiz()

