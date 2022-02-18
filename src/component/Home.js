import {useState, useEffect} from "react";
import Search from "./Search";
import BottomTab from "./BottomTab";
import HomeStyles from "./Home.module.css";

function Home() {
    return (
        <div className={HomeStyles.back}>
            <Search />
            <BottomTab />
        </div>
    );
}

export default Home;
