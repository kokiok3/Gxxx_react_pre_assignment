import {useState, useEffect} from "react";
import SearchStyles from "./Search.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MovieListStyles from "./MovieList.module.css";
import { ReactComponent as BookmarkColoredImg} from "../asset/Bookmark_colored.svg";

function Movie({movie, id, img, title, year, type}){
    const [favList, setFavlist] = useState([]);
    const get_img = (Poster)=>{
        if(Poster == "N/A"){
            return {backgroundImage: `url(./no-image.png)`,}
        }
        else{
            return {backgroundImage: `url(${Poster})`,}
        }
    }
    const doBookMark = (id, title)=>{
        const childLen = document.getElementById(id).childElementCount;
        if(childLen === 2){
            addBookMark(id, title);
        }
        else if(childLen === 3){
            delBookMark(id, title);
        }
    }
    const MySwal = withReactContent(Swal);
    const addBookMark = (id, title)=>{
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
                }
                favList != null ? setFavlist([favObj, ...favList]) : setFavlist([favObj]);
            }
        })
    }
    const delBookMark = (id, title)=>{
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
                }
                const rmFavList = favList.filter((v)=>{
                    return v.Id !== id;
                    console.log(v.Id, id);
                });
                setFavlist(rmFavList);
            }
        })
    }
    const saveLocal = (id)=>{
        if(favList != null && favList.length != 0){
            localStorage.setItem("Favorite", JSON.stringify(favList));
        }
    }
    useEffect(saveLocal, [favList]);
    return(
        <div id={id} onClick={()=>doBookMark(id, title)} key={id} className={MovieListStyles.li}>
                <div className={MovieListStyles.mvImg} style={get_img(img)}></div>
                <div className={MovieListStyles.mvInfo}>
                    <span className={MovieListStyles.mvFtStrong}>{title}</span>
                    <div className={MovieListStyles.mvFtSmallGroup}>
                        <span className={MovieListStyles.mvFtSmall}>{year}</span>
                        <span className={MovieListStyles.mvFtSmall}>{type}</span>
                    </div>
                </div>
                {movie != null ?
                    (movie.map((movieVal)=>{
                        return((movieVal.Id == id)?
                            <div key={`${movieVal.Id}`}>
                                <BookmarkColoredImg className={MovieListStyles.bookMark} width='45' height='45' fill='#008aff' />
                            </div>
                            :
                            null)
                    }))
                    :
                    null
                }
        </div>);
}

export default Movie;