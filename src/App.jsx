import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import QuestionPage from './pages/QuestionPage'
import SuccessPage from './pages/SuccessPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  )
}

export default App
