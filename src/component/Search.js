import {useState, useEffect} from "react";
import SearchStyles from "./Search.module.css";
import { ReactComponent as SearchImg} from "../asset/Search.svg";


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
        const json = await(await fetch(`https://www.omdbapi.com/?apikey=92e32667&s=${search}`)).json();
        await (console.log("HI",json.Search))
        setMovies(json.Search);
    }
    console.log(movies);
    useEffect(()=>{
        if(btn == true && search != ""){
            getMovie();
            setBtn(false);
        }
        else{
            console.log("no");
        }
    }, [btn]);
    return (
        <div>
            <form onSubmit={onSubmit} className={`${SearchStyles.search_bar}`}>
                <input onChange={onChange} value={search} className={`${SearchStyles.search}`} type="text" placeholder="Search"/>
                <button onClick={onClick} className={`${SearchStyles.btn}`}><SearchImg width="24" height="24" fill="#fff" /></button>
            </form>
            <div className={SearchStyles.content}>
                {movies.length === 0 ?
                    <div className={`${SearchStyles.nothing}`}>
                        <SearchImg width="250" height="250" />
                        <p>검색 결과가 없습니다. T . T</p>
                    </div>
                    :
                    movies.map((v) => {
                        return (
                            <div key={v.imdbID} className={SearchStyles.li}>
                                <div>
                                    <img className={SearchStyles.mvImg} src={v.Poster} alt={v.Title}/>
                                </div>
                                <div className={SearchStyles.mvInfo}>
                                    <span className={SearchStyles.mvFtStrong}>{v.Title}</span>
                                    <div className={SearchStyles.mvFtSmallGroup}>
                                        <span className={SearchStyles.mvFtSmall}>{v.Year}</span>
                                        <span className={SearchStyles.mvFtSmall}>{v.Type}</span>
                                    </div>
                                </div>
                            </div>
                        );
                        // return <Movie key={v.id} id={v.id} coverImage={v.medium_cover_image} title={v.title} summary={v.summary} genres={v.genres}/>
                    })}
                }
            </div>
        </div>
    );
}

export default Search;