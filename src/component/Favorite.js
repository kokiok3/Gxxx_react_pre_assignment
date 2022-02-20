import {useState, useEffect} from "react";
import FavStyles from "./Favorite.module.css";
import ScrollStyles from "./Scroll.module.css";
import MovieListStyles from "./MovieList.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ReactComponent as BookmarkColoredImg} from "../asset/Bookmark_colored.svg";


function Favorite(){
    const [favList, setFavlist] = useState(JSON.parse(localStorage.getItem("Favorite")));

    const get_img = (Poster)=>{
        if(Poster == "N/A"){
            return {backgroundImage: `url(./no-image.png)`,}
        }
        else{
            return {backgroundImage: `url(${Poster})`,}
        }
    }

    const MySwal = withReactContent(Swal);
    const delBookMark = (id, title, year, type, img)=>{
        MySwal.fire({
            width: 400,
            padding: '1rem',
            title: <p className={MovieListStyles.swalTitle}>즐겨찾기에서 삭제하시겠습니까?</p>,
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
                    return v.Id !== id;
                });
                console.log(rmFavList);
                setFavlist(rmFavList);
                localStorage.setItem("Favorite", JSON.stringify(favList));
                if(rmFavList.length === 0){
                    localStorage.removeItem("Favorite");
                }
            }
        })
    }
    return(
        <div>
            <div className={FavStyles.title}>내 즐겨찾기</div>
            <div className={FavStyles.content}>
                {favList == undefined || favList.length == 0 ?
                    null
                    :
                    favList.map((val, index)=>{
                        return(
                            <div id={val.Id} onClick={()=>delBookMark(val.Id, val.Title, val.Year, val.Type, val.Img)} key={val.Id} className={MovieListStyles.li}>
                                <div className={MovieListStyles.mvImg} style={get_img(val.Img)}></div>
                                <div className={MovieListStyles.mvInfo}>
                                    <span className={MovieListStyles.mvFtStrong}>{val.Title}</span>
                                    <div className={MovieListStyles.mvFtSmallGroup}>
                                        <span className={MovieListStyles.mvFtSmall}>{val.Year}</span>
                                        <span className={MovieListStyles.mvFtSmall}>{val.Type}</span>
                                    </div>
                                </div>
                                <BookmarkColoredImg className={MovieListStyles.bookMark} width='45' height='45' fill='#008aff' />
                            </div>
                        );
                    })
                }
            </div>
        </div>

    );
}

export default Favorite;