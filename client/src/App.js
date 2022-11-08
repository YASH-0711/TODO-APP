
import './App.css';
import Todo from './components/Todo';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
// import Details from './components/Details';
import {Routes, Route} from "react-router-dom";
function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/todo" element={<Todo/>} />
      </Routes>
    </>
  );
}

export default App;
