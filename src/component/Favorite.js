import {useState, useEffect} from "react";
import FavStyles from "./Favorite.module.css";
import ScrollStyles from "./Scroll.module.css";
import MovieListStyles from "./MovieList.module.css";

function Favorite(){
    return(
        <div>
            <div className={`${FavStyles.title}`}>내 즐겨찾기</div>
            <div className={FavStyles.content}>
                {/*{movies.map(v=> {*/}
                {/*    return(*/}
                {/*        <div id={v.imdbID} onClick={()=>doBookMark(v.imdbID, v.Title)} key={v.imdbID} className={SearchStyles.li}>*/}
                {/*            <div className={MovieListStyles.mvImg} style={get_img(v.Poster)}></div>*/}
                {/*            <div className={MovieListStyles.mvInfo}>*/}
                {/*                <span className={MovieListStyles.mvFtStrong}>{v.Title}</span>*/}
                {/*                <div className={MovieListStyles.mvFtSmallGroup}>*/}
                {/*                    <span className={MovieListStyles.mvFtSmall}>{v.Year}</span>*/}
                {/*                    <span className={MovieListStyles.mvFtSmall}>{v.Type}</span>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            {favList != null ?*/}
                {/*                (favList.map((favListVal)=>{*/}
                {/*                    return((favListVal.Id == v.imdbID)?*/}
                {/*                        <div key={`${favListVal.Id}`}>*/}
                {/*                            <BookmarkColoredImg className={MovieListStyles.bookMark} width='45' height='45' fill='#008aff' />*/}
                {/*                        </div>*/}
                {/*                        :*/}
                {/*                        null)*/}
                {/*                }))*/}
                {/*                :*/}
                {/*                null*/}
                {/*            }*/}
                {/*        </div>)*/}
                {/*})}*/}
                {/*/!*{movies == undefined || movies.length == 0 || totalPages < 11 ?*!/*/}
                {/*/!*    null*!/*/}
                {/*/!*    :*!/*/}
                {/*/!*    <Paging page={page} totalResults={totalPages} handlePageChange={handlePageChange}/>*!/*/}
                {/*/!*}*!/*/}
            </div>
        </div>
    );
}

export default Favorite;