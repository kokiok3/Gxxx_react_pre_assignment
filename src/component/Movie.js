import {useState, useEffect} from "react";
import SearchStyles from "./Search.module.css";

function Movie({movies, id, img, title, year, type}){
    const get_img = ()=>{
        if(img == "N/A"){
            return {backgroundImage: `url(./no-image.png)`,}
        }
        else{
            return {backgroundImage: `url(${img})`,}
        }
    }
    return(
        <div className={SearchStyles.li}>
            <div className={SearchStyles.mvImg} style={get_img()}></div>
            <div className={SearchStyles.mvInfo}>
                <span className={SearchStyles.mvFtStrong}>{title}</span>
                <div className={SearchStyles.mvFtSmallGroup}>
                    <span className={SearchStyles.mvFtSmall}>{year}</span>
                    <span className={SearchStyles.mvFtSmall}>{type}</span>
                </div>
            </div>
        </div>
    );
}

export default Movie;