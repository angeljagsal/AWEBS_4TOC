//Barra de progreso
const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

// Función para actualizar la barra de progreso
const progress = (value) => {
  const percentage = (value / 30) * 100; // Calcula el porcentaje completado
  progressBar.style.width = `${percentage}%`; // Actualiza el ancho de la barra de progreso
  progressText.innerHTML = `${value}`; // Actualiza el texto de progreso mostrando el tiempo restante
};

// Declaración de variables
let questions = [],
  time = 0,
  score = 0,
  currentQuestion,
  timer;

// Elementos del DOM
const startBtn = document.querySelector(".start"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

// Función para iniciar el quiz
const startQuiz = () => {
  loadingAnimation(); // Inicia la animación de carga
  const url = `https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple`; // URL de la API de preguntas
  fetch(url) // Realiza una solicitud GET a la API
    .then((res) => res.json()) // Convierte la respuesta en formato JSON
    .then((data) => { // Función de callback para manejar los datos recibidos
      questions = data.results; // Almacena las preguntas en la variable questions
      setTimeout(() => { 
        startScreen.classList.add("hide"); // Oculta la pantalla de inicio
        quiz.classList.remove("hide"); // Muestra el quiz
        currentQuestion = 1; 
        showQuestion(questions[0]); // Muestra la primera pregunta
      }, 1000); // Retardo de 1 segundo para mostrar el quiz
    });
};

// Listener de clic para iniciar el quiz
startBtn.addEventListener("click", startQuiz);

// Función para mostrar una pregunta
const showQuestion = (question) => {
  // Obtener elementos del DOM
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper"),
    questionNumber = document.querySelector(".number");

  // Inicializar variables y estado de los botones
  const timePerQuestion = 30;
  submitBtn.disabled = true; //El botón submit se deshabilita al inicio de cada pregunta

  // Actualizar contenido de la pregunta y respuestas
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

  // Mostrar número de la pregunta actual
  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;

  // EventListener de las respuestas
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

// Función para iniciar el temporizador
const startTimer = () => {
  time = 30; // Establecer tiempo a 30 segundos
  timer = setInterval(() => { 
    if (time >= 0) { 
      progress(time);
      time--; 
    } else { 
      checkAnswer(); 
    }
  }, 1000); 
};

// Función para animación de carga
const loadingAnimation = () => {
  startBtn.innerHTML = "Loading"; // Cambiar texto del botón de inicio a "Loading"
  const loadingInterval = setInterval(() => { // Iniciar intervalo de animación
    if (startBtn.innerHTML.length === 10) { 
      startBtn.innerHTML = "Loading"; 
    } else { 
      startBtn.innerHTML += "."; // Añadir un punto al texto
    }
  }, 500); 
};

// Obtener elementos del DOM para botones de submit y next
const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");

// Event Listener para botón de submit
submitBtn.addEventListener("click", () => {
  checkAnswer(); // Comprobar respuesta
});

// EventListener para botón de next
nextBtn.addEventListener("click", () => {
  nextQuestion(); // Ir a la siguiente pregunta
  submitBtn.style.display = "block"; // Mostrar botón de submit
  nextBtn.style.display = "none"; // Ocultar botón de next
});

// Función para comprobar respuesta
const checkAnswer = () => {
  clearInterval(timer); // Detener temporizador
  const selectedAnswer = document.querySelector(".answer.selected"); // Obtener respuesta seleccionada
  if (selectedAnswer) { 
    const answer = selectedAnswer.querySelector(".text").innerHTML; // Obtener texto de la respuesta seleccionada
    if (answer === questions[currentQuestion - 1].correct_answer) { // Si la respuesta es correcta
      score++; // Incrementar puntuación
      selectedAnswer.classList.add("correct");
    } else { // Si la respuesta es incorrecta
      selectedAnswer.classList.add("wrong"); 
      const correctAnswer = document // Obtener respuesta correcta  
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });
    }
  } else { // Si no hay respuesta seleccionada
    const correctAnswer = document // Obtener respuesta correcta
      .querySelectorAll(".answer")
      .forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }
  const answersDiv = document.querySelectorAll(".answer"); // Obtener todas las respuestas
  answersDiv.forEach((answer) => { // Añadir clase de estilo para mostrar que las respuestas han sido revisadas
    answer.classList.add("checked");
  });

  // Mostrar botón de next y ocultar botón de submit
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

// Función para mostrar la siguiente pregunta
const nextQuestion = () => {
  if (currentQuestion < questions.length) { // Si hay más preguntas
    currentQuestion++; // Ir a la siguiente pregunta
    showQuestion(questions[currentQuestion - 1]); // Mostrar la siguiente pregunta
  } else { // Si no hay más preguntas
    showScore(); // Mostrar puntuación final
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
  finalScore.innerHTML = score; // Mostrar puntuación final
  totalScore.innerHTML = `/ ${questions.length}`; // Mostrar el número total de preguntas
};

//clic reiniciar
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload(); // Recargar la página para reiniciar el quiz
});
