import logo from './logo.svg';
import './App.css';
import {Login} from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Quiz} from "./components/Quiz";
import {Manage} from "./components/Manage/Manage";
import {ManageQuestions} from "./components/Manage/ManageQuestions";
import {ManageOptions} from "./components/Manage/ManageOptions";
import Layout from "./components/Layout";
import {Result} from "./components/Result";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path="/" element={<Layout />}>
                  <Route path='/question' element={<Quiz/>}/>
                  <Route path='/manage' element={<Manage/>}/>
                  <Route path='/result' element={<Result/>}/>

              </Route>
              <Route path='/manage/question' element={<ManageQuestions/>}/>
              <Route path='/manage/options' element={<ManageOptions/>}/>
          </Routes>
      </BrowserRouter>

  );
}

export default App;
