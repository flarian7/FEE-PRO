const quizData = [
    {
      question: 'The Slowest Animal In The World is',
      options: ['Sloth' , 'Snail', 'Owl' , 'none of the above'],
      answer: 'Sloth',
    },
    {
      question: 'What is the fastest land animal??',
      options: ['Falcon', 'Tiger', 'Blue wildest', 'Cheetah'],
      answer: 'Cheetah',
    },
    {
      question: 'Which is the heaviest and tallest Penguin?',
      options: ['Prince Penguin', 'King Penguin', 'Servant Penguin', 'Emperor Penguin'],
      answer: 'Emperor Penguin',
    },
    {
      question: 'Electroreception skills are shown by which creature?',
      options: ['Sharks', 'Ti-Liger', 'Seneca White Deer', 'Saola'],
      answer: 'Saola',
    },
    {
      question: 'From a standing position, the puma has been known to jump how many feet vertically?',
      options: [
        '18 feet',
        '14 feet',
        '17 feet',
        '15 feet',
      ],
      answer: '15 feet',
    },
    {
      question: 'What is Australia tallest bird?',
      options: ['Ostrich', 'Emu', 'kiwi', 'Cassowary'],
      answer: 'Ostrich',
    },
    {
      question: 'What is the fastest water animal?',
      options: [
        'Porpoise',
        'Sailfish',
        'Tuna',
        'Flying fish',
      ],
      answer: 'Sailfish',
    },
    {
      question: 'How many species of wild cats are there?',
      options: ['60', '104', '100', '41'],
      answer: '41',
    },
    {
      question: 'Which animal has the Strongest Bite in the Animal Kingdom?',
      options: [
        'Deinosuchus Crocodile',
        'Spotted Hyena',
        'Megalodon Shark',
        'Jaguar',
      ],
      answer: 'Megalodon Shark',
    },
    {
      question: 'The biggest predator (prey) in the animal kingdome?',
      options: ['Grizzly Bear', 'Lion', 'Killer Whale', 'Crocodile'],
      answer: 'Crocodile',
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
