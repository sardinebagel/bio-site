import { Routes, Route } from 'react-router-dom'
import TokenGate from './pages/TokenGate'
import Expired from './pages/Expired'

function App() {
  return (
    <Routes>
      <Route path="/t/:token" element={<TokenGate />} />
      <Route path="/expired" element={<Expired />} />
      <Route path="*" element={<Expired />} />
    </Routes>
  )
}

export default App
