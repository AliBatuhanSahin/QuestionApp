import React from 'react';
import './Introscreenn.css'
import { useNavigate } from 'react-router-dom';

function IntroScreen() {
  const navigate = useNavigate();

  const onStartButtonClick = () => {
    navigate('/quiz'); // '/quiz' path'ine geçiş yapmamızı sağlayan navigate kodu.
  };

  return (
    <div className="intro-screen">
      <h1>Quiz Uygulaması</h1>
      <p>Dünyanın en zor genel kültür testine hoş geldiniz! Bu test 10 sorudan oluşmaktadır.</p>
      <p>Sorular ekranda en fazla 30 saniye kalacak ve cevap şıkları 10 saniye sonra görünecektir.</p>
      <p>Test bitiminde verdiğiniz cevapları ve doğru yanlış sayınızı kontrol etmeyi unutmayınız.</p>
      <button id="start" onClick={onStartButtonClick}>Teste Başla</button>
    </div>
  );
}

export default IntroScreen;
