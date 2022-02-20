import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import BtmStyles from "./BottomTab.module.css";
import { ReactComponent as SearchImg} from "../asset/Search.svg";
import { ReactComponent as BookmarkImg} from "../asset/Bookmark.svg";
import Search from "./Search";

function BottomTab(){
    const [activeIndex, setActiveIndex] = useState(0);

    const tabArr=[
        {
            tabTitle:(
                <SearchImg width="40" height="40" fill="#ffffff80" />
            ),
            tabCont:(
                <div> <Search /> </div>
            )
        },
        {
            tabTitle:(
                <BookmarkImg width="38" height="38" fill="#ffffff80" />
            ),
            tabCont:(
                <div> 즐겨찾기 </div>
            )
        }
    ];

    const tabClickHandler=(index)=>{
        const resultUrl = index === 0 ? "home" : "favorite";
        window.history.pushState(null, null, `#/${resultUrl}`);
        setActiveIndex(index);

    }

    return (
        <div>
            <ul className={`${BtmStyles.tab}`}>
                {tabArr.map((section, index)=>{
                    return (
                        <li key={index} onClick={()=> {
                            tabClickHandler(index);
                            if(index === 0){
                                window.location.replace("/");
                            }
                        }} className={activeIndex === index ? BtmStyles.btnActive : ""}>
                            {section.tabTitle}
                        </li>)
                })}
            </ul>
            <div>
                {tabArr[activeIndex].tabCont}
            </div>
        </div>
    );
}

export default BottomTab;