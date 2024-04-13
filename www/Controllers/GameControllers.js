const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / 30) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

var questions = [],
  time = 30,
  score = 0,
  currentQuestion,
  timer;

const startQuiz = () => {
    //     diff = difficulty.value;

    const url = `https://opentdb.com/api.php?amount=10&category=18&difficulty=${diff}&type=multiple`;
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

startQuiz();
quiz = document.querySelector(".quiz");

const showQuestion = (question) => {
    const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
    questionNumber = document.querySelector(".number");

    const timePerQuestion = 30;
    submitBtn.disabled = true;

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

    questionNumber.innerHTML = ` Question <span class="current">${
        questions.indexOf(question) + 1
    }</span>
    <span class="total">/${questions.length}</span>`;

    const answersDiv = document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
        answer.addEventListener("click", () => {
        if (!answer.classList.contains("checked")) {
            answersDiv.forEach((answer) => {
            answer.classList.remove("selected");
            });
            answer.classList.add("selected");
            submitBtn.disabled = false;
        }
        });
    });
    // Iniciar temporizador
    time = timePerQuestion;
    startTimer();
};

const startTimer = () => {
    time = 30;
    timer = setInterval(() => { 
        if (time >= 0) { 
        progress(time);
        time--; 
        } else { 
        checkAnswer(); 
        }
    }, 1000); 
};

const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

const checkAnswer = () => {
    clearInterval(timer); // Detener temporizador
    const selectedAnswer = document.querySelector(".answer.selected");
    if (selectedAnswer) {
        const answer = selectedAnswer.querySelector(".text").innerHTML;
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

nextBtn.addEventListener("click", () => {
    nextQuestion(); //
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
  });

const nextQuestion = () => {
    if (currentQuestion < questions.length) {
      currentQuestion++;
      showQuestion(questions[currentQuestion - 1]);
    } else {
      showScore();
    //   addCoins();
      addScore();
    }
  };

  // Elementos del DOM para la pantalla final
const endScreen = document.querySelector(".end-screen"),
finalScore = document.querySelector(".final-score"),
totalScore = document.querySelector(".total-score");

// Función para mostrar la puntuación final
const showScore = () => {
endScreen.classList.remove("hide"); // Mostrar pantalla final
quiz.classList.add("hide"); // Ocultar quiz
document.querySelector(".quiz").style.display = "none";
document.querySelector(".end-screen").style.display = "block";
finalScore.innerHTML = score; // Mostrar puntuación final
totalScore.innerHTML = `/ ${questions.length}`; // Mostrar el número total de preguntas
};

var coinsValue = parseInt(getLocalStorageValue("coins"));
var dataEmail = getLocalStorageValue("email");
var dataName = getLocalStorageValue("name");
var dataLastname = getLocalStorageValue("last_name");
var dataPassword = getLocalStorageValue("password");
var dataScore = getLocalStorageValue("score");

// Añadir monedas dependiendo del score
// const addCoins = () => {
//   if (!isNaN(coinsValue)) {
//       coinsValue += score;

//       window.localStorage.setItem("coins", coinsValue.toString());
  
//       console.log("Nuevo valor de 'coins':", coinsValue);
  
//       var formData = {
//           id_user: parseInt(getLocalStorageValue("id_user")),
//           email: dataEmail,
//           name: dataName,
//           last_name: dataLastname,
//           password: dataPassword,
//           score: dataScore,
//           coins: coinsValue
//       }
//       editUser(formData)
//   } else {
//       console.error("El valor de 'coins' no es un número válido.");
//   }
// }

const addScore = () => {
    var coinsValue = parseInt(getLocalStorageValue("coins"));
    var dataEmail = getLocalStorageValue("email");
    var dataName = getLocalStorageValue("name");
    var dataLastname = getLocalStorageValue("last_name");
    var dataPassword = getLocalStorageValue("password");
    var dataScore = parseInt(getLocalStorageValue("score"));

    if (!isNaN(dataScore)) {
        var newScore = dataScore + 1;

        window.localStorage.setItem("score", newScore);

        var formData = {
            id_user: parseInt(getLocalStorageValue("id_user")),
            email: dataEmail,
            name: dataName,
            last_name: dataLastname,
            password: dataPassword,
            score: newScore,
            coins: coinsValue
        }
        editUser(formData);
    } else {
        console.error("El valor de 'score' no es un número válido.");
    }
}

//clic reiniciar
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
window.location.reload(); // Recargar la página para reiniciar el quiz
});
