import {useState, useEffect} from "react";
import SearchStyles from "./Search.module.css";

function Movie(){
    const getMovie = async ()=>{
        const json = await(await fetch(`https://www.omdbapi.com/?apikey=92e32667&s=${}`)).json());

    }
    useEffect(getMovie(), []);
    return(
        <div>

        </div>
    );
}

export default Movie;