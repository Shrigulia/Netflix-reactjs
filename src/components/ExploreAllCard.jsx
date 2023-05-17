import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ExploreAllCard = ({ deleteHandler, plusDisplay, closeDisplay, scrollTop, id, name, img, release, rating, handler }) => {
    const [added, setadded] = useState(false);
    const plusclass = "fa fa-plus";
    const closeclass = "fa fa-check";

    return (
        <div className="movieCont" id="movieCont">
            <div className="movieRow">
                <Link to={`/${id}`}>
                    <div onClick={scrollTop} className="movieRowItem" id="movieRowItem">
                        <img src={img} alt="" />
                    </div>
                </Link>
                <div className="movieControlCont">
                    <div className="movieTitle">
                        <p>{name}</p>
                        <p>{rating}</p>
                    </div>
                    <div className="movieControl">
                        <i onClick={() => handler({ id, name, img, release, rating }, setadded(true))} className={added ? closeclass : plusclass} style={{ display: plusDisplay }} ></i>
                        <i onClick={() => deleteHandler(id)} className="fa fa-close" style={{ display: closeDisplay }} ></i>
                        <i className="fa fa-thumbs-up" id="addToList"></i>
                        <i className="fa fa-thumbs-down"></i>
                    </div>
                    <div style={{ marginTop: "20px", marginBottom: "4px" }} className="releaseDate">
                        Release | {release}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExploreAllCard