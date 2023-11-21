const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const resultElement = document.getElementById('result');

const correctAnswer = 'la pera';

submitBtn.addEventListener('click', checkAnswer);

function checkAnswer() {
  const userAnswer = answerInput.value.toLowerCase();
  if (userAnswer === correctAnswer) {
    resultElement.textContent = '¡Correcto! ¡Adivinaste!';
    resultElement.style.color = 'green';
  } else {
    resultElement.textContent = 'Respuesta incorrecta. ¡Inténtalo de nuevo!';
    resultElement.style.color = 'red';
  }
  answerInput.value = '';
}