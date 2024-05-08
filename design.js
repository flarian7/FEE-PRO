const quizData = [
    {
      question: 'A software requirements specification (SRS) is a document or description of a software system to be developed. This document is written by which of the one given below?',
      options: ['Analyst' , 'Designer', 'Coder' , 'Any of these'],
      answer: 'Analyst',
    },
    {
        question: 'A black hole in a DFD is -',
        options: ['A data store with no in bound flows' , 'A data store with only in bound flows', 'A data store with more than one in bound flow' , 'None of these'],
        answer: 'A data store with only in bound flows',
      },
      {
        question: 'During the system study, the executive vice-president and the other managers exercise their responsibility of',
        options: ['planning' , 'directing', 'organizing' , 'controlling'],
        answer: 'controlling',
      },
      {
        question: 'Which one of the following would breach the integrity of a system?',
        options: ['Looking the room to prevent theft' , 'Fitting the system with an anti-theft device', 'Full access rights for all users' , 'Protecting the device against willful or accidental damage'],
        answer: 'Full access rights for all users',
      },
      {
        question: 'Function-oriented design techniques starts with functional requirements specified in',
        options: ['SDD (software design document)' , 'SRS (Software Requirements Specification)', 'All of the mentioned' , 'None of the mentioned'],
        answer: 'SRS (Software Requirements Specification)',
      },
      {
        question: 'A software requirements specification (SRS) document should avoid discussing which one of the following?',
        options: ['User interface issues' , 'Non-functional requirements', 'Design specification' , 'Interfaces with third party software'],
        answer: 'Design specification',
      },
      {
        question: 'Which of the following UML diagrams has a static view ?',
        options: ['Collaboration diagram' , 'Use-Case diagram', 'State chart diagram' , 'Activity diagram'],
        answer: 'Use-Case diagram',
      },
      {
        question: 'Which of the following is not a key strategy followed by the clean room approach to software development?',
        options: ['Formal specification' , 'Dynamic verification', 'Incremental development' , 'Statistical testing of the system'],
        answer: 'Dynamic verification',
      },
      {
        question: 'A software design pattern often used to restrict access to an object is:',
        options: ['adapter' , 'decorator', 'delegation' , 'proxy'],
        answer: 'proxy',
      },
      {
        question: 'A path made by a moving point.',
        options: ['Line' , 'Pattern', 'Shape' , 'Texture'],
        answer: 'Line',
      },
  ];

  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');

  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];

      const optionText = document.createTextNode(shuffledOptions[i]);

      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }

  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }

  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }

  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }

  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }

  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);

  displayQuestion();
