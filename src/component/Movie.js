import {useState, useEffect} from "react";
import SearchStyles from "./Search.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function Movie({movies, id, img, title, year, type}){
    const get_img = ()=>{
        if(img == "N/A"){
            return {backgroundImage: `url(./no-image.png)`,}
        }
        else{
            return {backgroundImage: `url(${img})`,}
        }
    }
    const onClick = ()=>{
        console.log("클릭");
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
            // cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("wow!");
                // MySwal.fire({
                //         title:"즐겨찾기 성공!",
                //         text: "즐겨찾기탭에서 확인해보세요.",
                //         confirmButtonText: "확인",
                // });
            }
        });
    }
    const MySwal = withReactContent(Swal);

    return(
        <div onClick={onClick} className={SearchStyles.li}>
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