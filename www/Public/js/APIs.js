import { openTrivia } from './config.js';

const url = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

async function showQuestions() {
  const response = await openTrivia.getQuestionsFromURL(url);

  // Manejar la respuesta de la API aquí

  if (response.success) {
    // Mostrar las preguntas
    const questions = response.results;
    for (const question of questions) {
      console.log(question.question);
      for (const option of question.incorrect_answers) {
        console.log(` - ${option}`);
      }
      console.log(` - ${question.correct_answer}`);
    }
  } else {
    // Mostrar un mensaje de error
    console.error(response.error);
  }
}

showQuestions();