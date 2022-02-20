import {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import SearchStyles from "./Search.module.css";
import ScrollStyles from "./Scroll.module.css";
import MovieListStyles from "./MovieList.module.css";
import { ReactComponent as SearchImg} from "../asset/Search.svg";
import { ReactComponent as SearchImgTwo} from "../asset/SearchImgTwo.svg";
import { ReactComponent as BookmarkColoredImg} from "../asset/Bookmark_colored.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Paging from "./Pagination"

function Search(){
    const [search, setSearch] = useState("");
    const [searchTemp, setSearchTemp] = useState("");
    const [btn, setBtn] = useState(false);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const scrollToContent = useRef();
    const movieLi = useRef();

    const onChange = (event)=>{
        setSearch(event.target.value);
    }
    const onClick = ()=>{
        // window.history.pushState(null, null, `#/s=${search}&page=1`);
        setSearchTemp(search);
        setBtn(true);
    }
    const onSubmit = (event)=>{
        event.preventDefault();
        setSearch("");
        setPage(1);
    }
    const getMovie = async ()=>{
        setMovies([]);;
        const json = await(await fetch(`https://www.omdbapi.com/?apikey=92e32667&s=${searchTemp}&page=${page}`)).json();
        setMovies(json.Search);
        setTotalPages(parseInt(json.totalResults));
    }
    const handlePageChange = (page)=> {
        setPage(page);
        // window.history.pushState(null, null, `#/s=${search}&page=${page}`);
        scrollToContent.current.scrollTop = 0;

    }
    useEffect(()=>{
        if(btn == true && search != ""){
            getMovie();
            setBtn(false);
            const getFav = localStorage.getItem("Favorite");
            setFavlist(JSON.parse(getFav));
            // console.log("getFav", JSON.parse(getFav));
        }
        else{
            setBtn(false);
        }
    }, [btn]);
    useEffect(getMovie, [page]);

    const get_img = (Poster)=>{
        if(Poster == "N/A"){
            return {backgroundImage: `url(./no-image.png)`,}
        }
        else{
            return {backgroundImage: `url(${Poster})`,}
        }
    }
    const [favList, setFavlist] = useState([]);
    const doBookMark = (id, title, year, type, img)=>{
        const childLen = document.getElementById(id).childElementCount;
        if(childLen === 2){
            addBookMark(id, title, year, type, img);
        }
        else if(childLen === 3){
            delBookMark(id, title, year, type, img);
        }
    }
    const MySwal = withReactContent(Swal);
    const addBookMark = (id, title, year, type, img)=>{
        MySwal.fire({
            width: 400,
            padding: '1rem',
            title: <p className={SearchStyles.swalTitle}>즐겨찾기에 추가하시겠습니까?</p>,
            showCancelButton: true,
            confirmButtonText: "네 :)",
            confirmButtonAriaLabel: "즐겨찾기에서 추가하기",
            cancelButtonText: "취소",
            cancelButtonAriaLabel: "즐겨찾기 추가 취소하기",
            confirmButtonColor: "#3085d6",
        }).then((result)=>{
            if (result.isConfirmed) {
                const favObj = {
                    Id: id,
                    Title: title,
                    Year: year,
                    Type: type,
                    Img: img,
                }
                favList != null ? setFavlist([favObj, ...favList]) : setFavlist([favObj]);
            }
        })
    }
    const delBookMark = (id, title, year, type, img)=>{
        MySwal.fire({
            width: 400,
            padding: '1rem',
            title: <p className={SearchStyles.swalTitle}>즐겨찾기에서 삭제하시겠습니까?</p>,
            showCancelButton: true,
            confirmButtonText: "네 T . T",
            confirmButtonAriaLabel: "즐겨찾기에서 삭제하기",
            cancelButtonText: "취소",
            cancelButtonAriaLabel: "즐겨찾기 삭제 취소하기",
            confirmButtonColor: "#d33",
        }).then((result)=>{
            if (result.isConfirmed) {
                const favObj = {
                    Id: id,
                    Title: title,
                    Year: year,
                    Type: type,
                    Img: img,
                }
                const rmFavList = favList.filter((v)=>{
                    console.log("아이디 다른거", v.Id, id);
                    return v.Id !== id;
                });
                setFavlist(rmFavList);
                if(rmFavList.length === 0){
                    localStorage.removeItem("Favorite");
                }
            }
        })
    }
    const saveLocal = ()=>{
        if(favList != null && favList.length != 0){
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
                    <SearchImgTwo width="150" height="150" />
                    <p>검색 결과가 없어요. T . T</p>
                </div>
                :
                <div ref={scrollToContent} className={SearchStyles.content}>
                    {movies.map(v=> {
                        return(
                        <div id={v.imdbID} onClick={()=>doBookMark(v.imdbID, v.Title, v.Year, v.Type, v.Poster)} key={v.imdbID} className={MovieListStyles.li}>
                            <div className={MovieListStyles.mvImg} style={get_img(v.Poster)}></div>
                            <div className={MovieListStyles.mvInfo}>
                                <span className={MovieListStyles.mvFtStrong}>{v.Title}</span>
                                <div className={MovieListStyles.mvFtSmallGroup}>
                                    <span className={MovieListStyles.mvFtSmall}>{v.Year}</span>
                                    <span className={MovieListStyles.mvFtSmall}>{v.Type}</span>
                                </div>
                            </div>
                            {favList != null ?
                                (favList.map((favListVal)=>{
                                    return((favListVal.Id == v.imdbID)?
                                        <div key={`${favListVal.Id}`}>
                                            <BookmarkColoredImg className={MovieListStyles.bookMark} width='45' height='45' fill='#008aff' />
                                        </div>
                                        :
                                        null)
                                }))
                                :
                                null
                            }
                        </div>)
                    })}
                    {movies == undefined || movies.length == 0 || totalPages < 11 ?
                        null
                        :
                        <Paging page={page} totalResults={totalPages} handlePageChange={handlePageChange}/>
                    }
                </div>
            }
        </div>
    );
}

export default Search;