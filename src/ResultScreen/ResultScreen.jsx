import { useLocation } from 'react-router-dom';
import './ResultScreenn.css'
function ResultScreen() {
  const location = useLocation();
  const { state } = location; // QuizScreen den "state" ile göderdiğimiz verilere erişmemizi sağlar.

  const { correctAnswers, incorrectAnswers, userAnswers } = state;

  return (
    <div className='result-screen'>
      <h1>Quiz Sonucu</h1>
      <p>Doğru Sayısı: {correctAnswers}</p>
      <p>Yanlış Sayısı: {incorrectAnswers}</p>
      <h2>Cevaplarınız</h2>
      <ul>
        {userAnswers.map((answer, index) => (
          <li key={index}>{`Soru ${index + 1}: ${answer ? answer : 'Cevap verilmedi'}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResultScreen;
