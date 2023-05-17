import React from 'react';
import { Link } from 'react-router-dom';


const MoviePlayCard = ({display, name, desc, img, id, handler, rating, release }) => {
    return (
        <section  id='movieplay' className="movieCont">
            <div style={{overflowY:'auto'}} className="movieDetailCont">
                <div style={{ marginTop: "3rem" }} className="titleCont">
                    <h2 id="title">{name}</h2>
                    <p id="overview">{desc} </p>
                </div>
                <div className="controlsCont">
                    <Link to={`/movieplay/${id}`} href="playingMovie.html">
                        <h2>Play trailer</h2>
                    </Link>
                    <a href="#similar">
                        <h2>Show more like this</h2>
                    </a>
                    <a href="#movieCredit">
                        <h2>Credits</h2>
                    </a>
                    <a className='addToList' href="#" onClick={() => handler({ id, name, img, rating, release })}>
                        <h2>Add TO My List</h2>
                    </a>
                    <Link to="/">
                        <h2>This is not for me</h2>
                    </Link>
                </div>
            </div>
            <div style={{ backgroundImage: `url(${img})` }} className="movieImgCont" id="Img">
                <div className="fadeLeft"></div>
            </div>
        </section>
    )
}

export default MoviePlayCard