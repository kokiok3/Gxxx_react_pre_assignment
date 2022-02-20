import {useState, useEffect} from "react";
import BottomTab from "./BottomTab";
import HomeStyles from "./Home.module.css";

function Home() {
    return (
        <div className={HomeStyles.back}>
            <BottomTab />
        </div>
    );
}

export default Home;
