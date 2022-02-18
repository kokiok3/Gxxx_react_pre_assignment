import {useState, useEffect} from "react";
import SearchStyles from "./Search.module.css";
import { ReactComponent as SearchImg} from "../asset/Search.svg";
import Movie from "./Movie";


function Search(){
    const [search, setSearch] = useState("");
    const [btn, setBtn] = useState(false);
    const [movies, setMovies] = useState([]);
    const onChange = (event)=>{
        setSearch(event.target.value);
        console.log(event.target.value);
    }
    const onClick = ()=>{
        setBtn(true);
    }
    const onSubmit = (event)=>{
        event.preventDefault();
        setSearch("");
    }
    const getMovie = async ()=>{
        setMovies([]);
        const json = await(await fetch(`https://www.omdbapi.com/?apikey=92e32667&s=${search}`)).json();
        await (console.log("HI",json.Search))
        setMovies(json.Search);
    }
    useEffect(()=>{
        console.log("um", btn, search);
        if(btn == true && search != ""){
            console.log("y", btn, search);
            getMovie();
            setBtn(false);
        }
        else{
            console.log("no", btn, search);
            setBtn(false);
        }
    }, [btn]);
    console.log("무비: ",movies);
    return (
        <div>
            <form onSubmit={onSubmit} className={`${SearchStyles.search_bar}`}>
                <input onChange={onChange} value={search} className={`${SearchStyles.search}`} type="text" placeholder="Search"/>
                <button onClick={onClick} className={`${SearchStyles.btn}`}><SearchImg width="24" height="24" fill="#fff" /></button>
            </form>
            {movies == [] || movies == undefined ?
                <div className={`${SearchStyles.nothing}`}>
                    <SearchImg width="250" height="250" />
                    <p>검색 결과가 없습니다. T . T</p>
                </div>
                :
                <div className={SearchStyles.content}>
                    {console.log("메롱", movies)}
                    {movies.map(v=>
                        <Movie  key={v.imdbID}
                            movie={movies}
                            id={v.imdbID}
                            img={v.Poster}
                            title={v.Title}
                            year={v.Year}
                            type={v.Type}
                        />
                    )}
                </div>
            }
        </div>
    );
}

export default Search;