import logo from './logo.svg';
import './App.css';
import {Login} from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Quiz} from "./components/Quiz";
import {Manage} from "./components/Manage/Manage";
import {ManageQuestions} from "./components/Manage/ManageQuestions";
import {ManageOptions} from "./components/Manage/ManageOptions";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/question' element={<Quiz/>}/>
              <Route path='/manage' element={<Manage/>}/>
              <Route path='/manage/question' element={<ManageQuestions/>}/>
              <Route path='/manage/options' element={<ManageOptions/>}/>
              {/*<Route path='/option' element={}/>*/}
          </Routes>
      </BrowserRouter>

  );
}

export default App;
