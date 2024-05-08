const quizData = [
    {
      question: 'Who wrote the book “the History of the Loss of Vietnam?',
      options: ['Ho Chi Minh' , 'Bao-Dai ', 'Phan Boi Chau' , 'None of the above'],
      answer: 'Phan Boi Chau',
    },
    {
        question: 'Who wrote "Rajatarangini"?',
        options: ['Megasthenes' , 'Kalhana', 'Al-beruni ' , 'More than one of the above'],
        answer: 'Kalhana',
      },
      {
        question: 'Mein Kampf is the autobiography of________.',
        options: ['Benito Mussolini' , 'Adolf Hitler', 'Joseph Stalin' , 'None of the above'],
        answer: 'Adolf Hitler',
      },
      {
        question: 'The author of world famous Harry Potter series is',
        options: ['Arundhati Roy' , 'J K Rowling', 'Taslima Nasrin' , 'Salman Rushdie'],
        answer: 'J K Rowling',
      },
      {
        question: 'Who wrote Discovery of India?',
        options: ['Mahatma Gandhi' , 'Sardar Vallabhbhai Patel', 'Indira Gandhi' , 'Jawaharlal Nehru'],
        answer: 'Jawaharlal Nehru',
      },
      {
        question: 'Who among the following cricketers has authored the book "Straight from the Heart : An Autobiography ?"',
        options: ['Sunil Gavaskar' , 'Sourav Ganguly', 'Sachin Tendulkar' , 'Kapil Dev'],
        answer: 'Kapil Dev',
      },
      {
        question: 'Who is the author of the book "Kerala: God`s Own Country"?',
        options: ['Shashi Tharoor' , 'Jeet Thayil', 'Sudha Murthy' , 'Thakazhi Sivasankara Pillai'],
        answer: 'Shashi Tharoor',
      },
      {
        question: 'Who is the author of the book named “Oliver Twist”?',
        options: ['Benazir Habib' , 'Charles Dickens', 'Paul Kennedy' , 'Eric Segal'],
        answer: 'Charles Dickens',
      },
      {
        question: 'Who among the following is the author of the book ‘Unaccustomed Earth’?',
        options: ['Shobha De' , 'Arundhati Roy', 'Anita Nair' , 'Jhumpa Lahiri'],
        answer: 'Jhumpa Lahiri',
      },
      {
        question: 'The timeless Indian novel ‘Devdas’ was written by:',
        options: ['Rabindranath Tagore' , 'Bankim Chandra Chatterjee', 'Mirza Ghalib' , 'Sarat Chandra Chattopadhyay'],
        answer: 'Sarat Chandra Chattopadhyay',
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
