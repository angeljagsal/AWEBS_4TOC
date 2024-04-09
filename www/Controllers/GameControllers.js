const startBtn = document.querySelector(".start")
//   numQuestions = document.querySelector("#num-questions"),
//   category = document.querySelector("#category"),
//   difficulty = document.querySelector("#difficulty")

let questions = [],
  time = 30,
  score = 0,
  currentQuestion,
  timer;

const startQuiz = () => {
    // const num = numQuestions.value,
    //     cat = category.value,
    //     diff = difficulty.value;

    const url = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`;
    // const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            questions = data.results;
            setTimeout(() => {
                currentQuestion = 1;
                showQuestion(questions[0]);
            }, 1000);
        });
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
    const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");

    questionText.innerHTML = question.question;

    const answers = [
        ...question.incorrect_answers,
        question.correct_answer.toString(),
    ];
    answersWrapper.innerHTML = "";
    answers.sort(() => Math.random() - 0.5);
    answers.forEach((answer) => {
        answersWrapper.innerHTML += `
        <div class="answer ">
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      </div>
    `;
    });
};

/*
const startTimer = (time) => {
    timer = setInterval(() => {
        if (time === 3) {
            playAdudio("countdown.mp3");
        }
        if (time >= 0) {
            progress(time);
            time--;
        } else {
            checkAnswer();
        }
    }, 1000);
};
*/

const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

const checkAnswer = () => {
    const selectedAnswer = document.querySelector(".answer.selected");
    if (selectedAnswer) {
        const answer = selectedAnswer.querySelector(".text").innerHTML;
        console.log(currentQuestion);
        if (answer === questions[currentQuestion - 1].correct_answer) {
            score++;
            selectedAnswer.classList.add("correct");
        } else {
            selectedAnswer.classList.add("wrong");
            const correctAnswer = document.querySelectorAll(".answer").forEach((answer) => {
                if (answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer) {
                    answer.classList.add("correct");
                }
            });
        }
    } else {
        const correctAnswer = document.querySelectorAll(".answer").forEach((answer) => {
            if (answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer) {
                answer.classList.add("correct");
            }
        });
    }
    const answersDiv = document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
        answer.classList.add("checked");
    });

    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
};

const nextQuestion = () => {
    if (currentQuestion < questions.length) {
        currentQuestion++;
        showQuestion(questions[currentQuestion - 1]);
    } else {
        showScore();
    }
};
