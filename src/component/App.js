import {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactComponent as SearchImg} from "../asset/Search.svg";
import Home from "./Home";

function App() {
    return (
      <Router>
        <Routes>
          {/*<Route path="/detail/:id" element={< Detail / >}></Route>*/}
          <Route path="/" element={< Home / >}></Route>
        </Routes>
      </Router>
    );

}
export default App;