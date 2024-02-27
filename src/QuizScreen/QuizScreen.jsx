import { useEffect, useState } from 'react'
import './QuizScreenn.css'
import { questions } from '../Data/questions';
import { useNavigate } from 'react-router-dom';

function QuizScreen() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [showOptions, setShowOptions] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array.from({ length: questions.length }, () => null)); // Her soru için başlangıçta null cevaplar
  const [quizEnded, setQuizEnded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const currentQuestion = questions[index];
    if (currentQuestion) {
      setQuestion(currentQuestion.question);
      setOptions(currentQuestion.options);
      setSelectedOption(null);
      setIsAnswered(false);
      setCountdown(30);
      setShowOptions(false);

      // Seçenekleri on saniye bekler ve sonra gösterir.
      const optionsTimer = setTimeout(() => {
        setShowOptions(true);
      }, 10000);
      return () => clearTimeout(optionsTimer);
    }
  }, [index]);

  // Zaman aşımında yapılacak işlemleri tanımlayan kod.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAnswered) {
        setIncorrectAnswers(incorrectAnswers + 1);
        setIndex(index + 1);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [index, isAnswered, incorrectAnswers]);

  //Geri sayımı tanımlayan kod.
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0 && !isAnswered) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown, isAnswered]);

  // Kullanıcının bir seçenek seçtiğinde yapılacak işlemleri tanımlar.
  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
      setUserAnswers(prevAnswers => {
        const newAnswers = [...prevAnswers];
        newAnswers[index] = option;
        return newAnswers;
      });
  
      // Cevabın doğruluğunu kontrol eder ve doğru/yanlış sayılarını günceller.
      if (option === questions[index].answer) {
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setIncorrectAnswers(incorrectAnswers + 1);
      }
  
      // Sonraki soruya geçiş yapar veya quiz'in bittiğini belirler.
      if (index === questions.length - 1) {
        setQuizEnded(true);
      } else {
        const nextQuestionTimer = setTimeout(() => {
          setIndex(index + 1);
        }, );
        return () => clearTimeout(nextQuestionTimer);
      }
    }
  };
  
  // useEffect hook'u ile quiz'in bitiminde sonuç ekranına yönlendirme yapar.
  useEffect(() => {
    if (quizEnded) {
      navigate('/result', { state: { correctAnswers, incorrectAnswers, userAnswers } });
    }
  }, [quizEnded, correctAnswers, incorrectAnswers, userAnswers]);

  return (
    <div className='quiz-screen'>
      <div className='countdown'>{countdown}</div>
      <div className='question-container'>
        <h2>Soru {index + 1}</h2>
        {questions[index].media && <img src={questions[index].media} alt={questions[index].question} className='question-image' />}
        <p>{question}</p>
      </div>
      {showOptions && (
        <div className='options-container'>
          {options.map((option, optionIndex) => (
            <div key={optionIndex} className={`option ${selectedOption === option ? 'selected' : ''}`} onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}

export default QuizScreen;
