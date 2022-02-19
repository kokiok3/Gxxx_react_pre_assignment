import {useState, useEffect} from "react";
import SearchStyles from "./Search.module.css";
import { ReactComponent as SearchImg} from "../asset/Search.svg";
// import Movie from "./Movie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function Search(){
    const [search, setSearch] = useState("");
    const [btn, setBtn] = useState(false);
    const [movies, setMovies] = useState([]);
    const onChange = (event)=>{
        setSearch(event.target.value);
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
        setMovies(json.Search);
    }
    useEffect(()=>{
        if(btn == true && search != ""){
            getMovie();
            setBtn(false);
        }
        else{
            setBtn(false);
        }
    }, [btn]);

    const get_img = (Poster)=>{
        if(Poster == "N/A"){
            return {backgroundImage: `url(./no-image.png)`,}
        }
        else{
            return {backgroundImage: `url(${Poster})`,}
        }
    }
    const [favList, setFavlist] = useState([]);

    const MySwal = withReactContent(Swal);
    const onAlert = (id, title)=>{
        MySwal.fire({
            width: 400,
            padding: '1rem',
            title: <p className={SearchStyles.swalTitle}>즐겨찾기에 추가하시겠습니까?</p>,
            showCancelButton: true,
            confirmButtonText: "네 :)",
            confirmButtonAriaLabel: "즐겨찾기 추가하기",
            cancelButtonText: "취소 T . T",
            cancelButtonAriaLabel: "즐겨찾기 취소하기",
            confirmButtonColor: "#3085d6",
        }).then((result)=>{
            if (result.isConfirmed) {
                const favObj = {
                    Id: id,
                    Title: title,
                }
                setFavlist([favObj, ...favList]);
            }
        })
    }
    const saveLocal = ()=>{
        if(favList != null){
            // console.log("hi", favList);
            localStorage.setItem("Favorite", JSON.stringify(favList));
        }
    }
    useEffect(saveLocal, [favList]);

    return (
        <div>
            <form onSubmit={onSubmit} className={`${SearchStyles.search_bar}`}>
                <input onChange={onChange} value={search} className={`${SearchStyles.search}`} type="text" placeholder="Search"/>
                <button onClick={onClick} className={`${SearchStyles.btn}`}><SearchImg width="24" height="24" fill="#fff" /></button>
            </form>
            {movies == undefined || movies.length == 0 ?
                <div className={`${SearchStyles.nothing}`}>
                    <SearchImg width="250" height="250" />
                    <p>검색 결과가 없습니다. T . T</p>
                </div>
                :
                <div className={SearchStyles.content}>
                    {movies.map(v=> {
                        return(
                        <div onClick={()=>onAlert(v.imdbID, v.Title)} key={v.imdbID} className={SearchStyles.li}>
                            <div className={SearchStyles.mvImg} style={get_img(v.Poster)}></div>
                            <div className={SearchStyles.mvInfo}>
                                <span className={SearchStyles.mvFtStrong}>{v.Title}</span>
                                <div className={SearchStyles.mvFtSmallGroup}>
                                    <span className={SearchStyles.mvFtSmall}>{v.Year}</span>
                                    <span className={SearchStyles.mvFtSmall}>{v.Type}</span>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            }
        </div>
    );
}

export default Search;