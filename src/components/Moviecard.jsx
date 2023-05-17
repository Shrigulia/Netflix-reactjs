import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Moviecard = ({ handler, id, img, name, rating, release}) => {
    const [added, setadded] = useState(false);
    const plusclass = "fa fa-plus";
    const closeclass = "fa fa-check";
    return (
        <>
            <div className="movieCont" id="movieCont">
                <div className="movieRow">
                    <Link to={`/${id}`}>
                        <div className="movieRowItem" id="movieRowItem">
                            <img src={img} alt={name} />
                        </div>
                    </Link>
                    <div className="movieControlCont">
                        <div className="movieTitle">
                            <p>{name}</p>
                            <p>{rating}</p>
                        </div>
                        <div className="movieControl">
                            <i onClick={() => handler({ name, img, id, rating, release },setadded(true))} className={added ? closeclass : plusclass} id="addToList"></i>
                            <i className="fa fa-thumbs-up" ></i>
                            <i className="fa fa-thumbs-down"></i>
                        </div>
                        <div style={{ marginTop: "20px", marginBottom: "4px" }} className="releaseDate">
                            Release | {release}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Moviecard