import { Routes, Route } from "react-router";
import Home from "./pages/Home"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  )
}

export default App
