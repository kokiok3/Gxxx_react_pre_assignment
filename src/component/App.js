import {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./Search";
import BottomTab from "./BottomTab";
import SearchStyles from "./Search.module.css";
import AppStyles from "./App.module.css";
import { ReactComponent as SearchImg} from "../asset/Search.svg";

function App() {

    return (
      <div className={AppStyles.back}>
          <Search />
          <BottomTab />
      </div>
      // <Router>
      //   <Routes>
      //     <Route path="/detail/:id" element={< Detail / >}></Route>
      //     <Route path="/" element={< Home / >}></Route>
      //   </Routes>
      // </Router>
    );
}

export default App;
