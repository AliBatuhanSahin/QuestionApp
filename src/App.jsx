import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroScreen from './IntroScreen/Introscreen';
import QuizScreen from './QuizScreen/QuizScreen';
import ResultScreen from './ResultScreen/ResultScreen';

function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/" exact element={< IntroScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/result" element={< ResultScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;