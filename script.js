const startBtn = document.getElementById('start-btn')
const questionID = document.getElementById('question')
const questionOutOf = document.getElementById('question-out-of')
const scoreID = document.getElementById('score')
const answerUL = document.getElementById('btn-ul')
const completionMeter = document.getElementById('completion-meter')
const finalText = document.getElementById('final-text')
const finalScore = document.getElementById('final-score')
const restartBtn = document.getElementById('restart-btn')

const frontPage = document.getElementById('front-page')
const questionPage = document.getElementById('question-page')
const resultPage = document.getElementById('result-page')

const choice0 = document.getElementById('choice-0')
const choice1 = document.getElementById('choice-1')
const choice2 = document.getElementById('choice-2')
const choice3 = document.getElementById('choice-3')

// Start and Restart Button

startBtn.addEventListener('click', () => {
  frontPage.classList.add('hide')
  questionPage.classList.remove('hide')
})

restartBtn.addEventListener('click', () =>{
  reset()
})

// Question Logic

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "HyperTool Multi Language", correct: false },
      { text: "Hyper Transfer Markup Language", correct: false }
    ]
  },
  {
    question: "Which of the following is not a programming language?",
    options: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: false },
      { text: "HTML", correct: true },
      { text: "C++", correct: false }
    ]
  },
  {
    question: "What is the correct symbol for a single-line comment in JavaScript?",
    options: [
      { text: "#", correct: false },
      { text: "//", correct: true },
      { text: "<!-- -->", correct: false },
      { text: "/* */", correct: false }
    ]
  },
  {
    question: "Which of these methods converts JSON text to a JavaScript object?",
    options: [
      { text: "JSON.parse()", correct: true },
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.convert()", correct: false },
      { text: "JSON.objectify()", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    options: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Creative Style System", correct: false },
      { text: "Computer Style Syntax", correct: false },
      { text: "Colorful Style Setup", correct: false }
    ]
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: [
      { text: "let", correct: false },
      { text: "var", correct: false },
      { text: "constant", correct: false },
      { text: "const", correct: true }
    ]
  },
  {
    question: "In Python, which symbol is used for exponentiation?",
    options: [
      { text: "^", correct: false },
      { text: "**", correct: true },
      { text: "^^", correct: false },
      { text: "//", correct: false }
    ]
  },
  {
    question: "Which of the following is a backend framework?",
    options: [
      { text: "React", correct: false },
      { text: "Angular", correct: false },
      { text: "Django", correct: true },
      { text: "Vue", correct: false }
    ]
  },
  {
    question: "What is the output of 'typeof null' in JavaScript?",
    options: [
      { text: "'null'", correct: false },
      { text: "'object'", correct: true },
      { text: "'undefined'", correct: false },
      { text: "'number'", correct: false }
    ]
  },
  {
    question: "What is the default port number for HTTP?",
    options: [
      { text: "8080", correct: false },
      { text: "21", correct: false },
      { text: "80", correct: true },
      { text: "443", correct: false }
    ]
  }
];

const questionLength = questions.length

let score = 0
let currentQuestionIndex = 0

scoreMeter(currentQuestionIndex)

function showQuestion(currentQuestionIndex){
  const currentQuestion = questions[currentQuestionIndex]
  questionID.textContent = currentQuestion.question
  answerUL.innerHTML = ""

  currentQuestion.options.forEach((option, i) =>{
    let answerBtn = document.createElement('button')
    answerBtn.className = 'answer-btn'
    answerBtn.id = `choice-${i}`
    answerBtn.innerText = option.text
    answerUL.append(answerBtn)

    answerBtn.addEventListener('click', ()=> checkAnswer(currentQuestionIndex, `choice-${i}`))
  })
}

function showInfo(currentQuestionIndex){
  questionOutOf.textContent = `Question ${currentQuestionIndex+1} out of ${questionLength}`
  scoreID.textContent = `Score: ${score}`
}

function updateScore(currentQuestionIndex, score){
  questionOutOf.textContent = `Question ${currentQuestionIndex+1} out of ${questionLength}`
  scoreID.textContent = `Score: ${score}`
}

function checkAnswer(currentQuestionIndex, choice){
  const index = choice.split('-')[1]
  const choiceID = document.getElementById(`choice-${index}`)
  const correct = questions[currentQuestionIndex].options[index].correct


  if(correct){
    choiceID.style.backgroundColor = 'green'
    score++
    if(currentQuestionIndex < questionLength-1){
      currentQuestionIndex++
      setTimeout(()=>{
        scoreMeter(currentQuestionIndex)
        showQuestion(currentQuestionIndex)
        updateScore(currentQuestionIndex, score)
      }, 1000)
    }
    else{
      currentQuestionIndex++
      scoreMeter(currentQuestionIndex)
      setTimeout(()=>{
        updateFinalScore()
        questionPage.classList.add('hide')
        resultPage.classList.remove('hide')
      }, 1000)
    }
  }
  else {
    choiceID.style.backgroundColor = 'red'
    let correctIndex
    questions[currentQuestionIndex].options.forEach((op, i)=>{
      if(op.correct) correctIndex = i 
    })
    const otherID = document.getElementById(`choice-${correctIndex}`)
    otherID.style.backgroundColor = 'green'
    if(currentQuestionIndex < questionLength-1){
      currentQuestionIndex++
      setTimeout(()=>{
        scoreMeter(currentQuestionIndex)
        showQuestion(currentQuestionIndex)
        updateScore(currentQuestionIndex, score)
      }, 1000)
    }
    else{
      currentQuestionIndex++
      scoreMeter(currentQuestionIndex)
      setTimeout(()=>{
        updateFinalScore()
        questionPage.classList.add('hide')
        resultPage.classList.remove('hide')
      }, 1000)
    }
  }
}

function updateFinalScore(){
  finalScore.textContent = `You Scored ${score} out of ${questionLength}`
}


function reset(){
  score = 0
  currentQuestionIndex = 0
  scoreMeter(currentQuestionIndex)
  questionPage.classList.remove('hide')
  resultPage.classList.add('hide')
  answerUL.innerHTML = ""
  showQuestion(currentQuestionIndex)
  showInfo(currentQuestionIndex)
}


function scoreMeter(currentQuestionIndex){
  console.log(currentQuestionIndex)
  const jump = `${(100/questionLength)*currentQuestionIndex}%`
  console.log(jump)
  completionMeter.style.width = jump
}

showInfo(currentQuestionIndex)
showQuestion(currentQuestionIndex)