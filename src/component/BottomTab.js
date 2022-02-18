import {useState, useEffect} from "react";
import BtmStyles from "./BottomTab.module.css";
import { ReactComponent as SearchImg} from "../asset/Search.svg";
import { ReactComponent as BookmarkImg} from "../asset/Bookmark.svg";

function BottomTab(){
    return (
        <div className={`${BtmStyles.tab}`}>
            <button className={`${BtmStyles.btn}`}><SearchImg width="40" height="40" fill="#fff" /></button>
            <button className={`${BtmStyles.btn}`}><BookmarkImg width="38" height="38" fill="#fff" /></button>
        </div>
    );
}

export default BottomTab;