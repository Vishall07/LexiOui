import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Home from "./pages/home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Assessment from "./pages/Assessment";
import LanguageLesson from "./pages/Lessons";
import Test from "./pages/Test";
import Game from "./pages/Test1";

// login page // welcome page // assessment game page // lessons Page // testing games pages
function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/lessons" element={<LanguageLesson />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
