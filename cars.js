const quizData = [
    {
      question: 'Fastest car in the world',
      options: ['Bugatti Chiron Super Sport' , 'Hennessey Venom F5', 'Bugatti Veyron' , 'Bugatti Chiron'],
      answer: 'Bugatti Chiron Super Sport',
    },
    {
        question: 'Most expensive car ever',
        options: ['Pagani Zonda HP Barchetta' , 'SP Automotive Chaos', 'Bugatti La Voiture Noire' , 'Rolls Royce Boat Tail'],
        answer: 'Rolls Royce Boat Tail',
      },
      {
        question: 'First car made',
        options: ['Benz Patent Motor Car' , 'Grenville Steam Carriage.', 'Hammelvognen' , 'Duryea Car'],
        answer: 'Grenville Steam Carriage.',
      },
      {
        question: 'Who invented cars?',
        options: ['Alexander Winton' , 'Étienne Lenoir', 'Karl Benz' , 'George B. Selden'],
        answer: 'Karl Benz',
      },
      {
        question: 'What is the top speed ever reached by a terrestial vehicle?',
        options: ['400' , '403.10', '399.06' , '398.00'],
        answer: '403.10',
      },
      {
        question: 'In which of the following year was the first automobile built?',
        options: ['1735' , '1769', '1774' , '1724'],
        answer: '1769',
      },
      {
        question: 'Which of the following is a classification of IC Engine?',
        options: ['Otto cycle engine' , 'Four-stroke engines', 'S.I Engines' , 'All of the above'],
        answer: 'Otto cycle engine',
      },
      {
        question: 'Which of the following automobile has two/four doors?',
        options: ['Convertible' , 'Special purpose vehicles', 'Pickups' , 'Sedan'],
        answer: 'Sedan',
      },
      {
        question: 'Which of the following parts does not include an automobile chassis?',
        options: ['Differential' , 'Brakes', 'Steering system' , 'Shock absorbers'],
        answer: '',
      },
      {
        question: 'Which of the following cars is categorized as a compact executive car?',
        options: ['Mercedes-Benz E Class' , 'Mercedes-Benz S Class', 'Audi A8' , 'Audi A4'],
        answer: 'Audi A4',
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
