import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import ExploreAllCard from './ExploreAllCard';
import Header from './Header';
import MoviePlayCard from './MoviePlayCard';


const MoviePlay = (props) => {

    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [desc, setdesc] = useState();
    const [rating, setrating] = useState();
    const [release, setrelease] = useState();
    const [credit, setCredit] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);


    let { id } = useParams();

    const dispatch = useDispatch();

    const apiKey = "d5e4056f097f2068ae5f44246666ab84"
    const apiDomain = "https://api.themoviedb.org/3/"
    const apiPath = {
        fetchMovieDetail: `${apiDomain}movie/${id}?api_key=${apiKey}&language=en-US`,
        fetchCredits: `${apiDomain}movie/${id}/credits?api_key=${apiKey}&language=en-US`,
        fetchSimilar: `${apiDomain}movie/${id}/similar?api_key=${apiKey}&language=en-US&page=${page}`
    }
    const imgPath = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchMovieDetail = async () => {
            props.setProgress(10);
            const movieDetail = await axios.get(apiPath.fetchMovieDetail);
            setName(movieDetail.data.original_title);
            props.setProgress(80);
            setdesc(movieDetail.data.overview.slice(0, 250));
            setImg(`${movieDetail.data.backdrop_path ? imgPath + movieDetail.data.backdrop_path : imgPath + movieDetail.data.poster_path}`);
            setrating(movieDetail.data.vote_average.toFixed(1))
            setrelease(movieDetail.data.release_date)
            const creditArr = await axios.get(apiPath.fetchCredits);
            setCredit(creditArr.data.cast);
            const similarArr = await axios.get(apiPath.fetchSimilar);
            setSimilar(similarArr.data.results)
            setTotalResult(similarArr.data.total_results)
            props.setProgress(100)
        }
        fetchMovieDetail();
    }, [apiPath.fetchCredits, apiPath.fetchMovieDetail])

    const fetchdata = async () => {
        setPage(page + 1);
        const moviesArr = await axios.get(apiPath.fetchSimilar);
        setSimilar(similar.concat(moviesArr.data.results));
        setTotalResult(moviesArr.data.total_results)
    }

    const similarDisplay = () => {
        if (similar.length < 1) {
            toast.error("Not Available", {
                backgroundColor: '#f11946',
            })
            let similarcont = document.getElementById("similar");
            similarcont.style.display = "none"
        }
        else {
            console.log("fetched")
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const addToListHandler = (options) => {
        dispatch({
            type: "addToList",
            payload: options
        })
    }

    return (
        <>
            <Header pos={'sticky'} />
            <MoviePlayCard name={name} img={img} desc={desc} id={params.id} handler={addToListHandler} rating={rating} release={release}  />

            <section id='movieCredit' className='container'>
                <h2 id='creditHeading' className='gerneHeading' style={{ marginTop: '6rem', fontSize: '2rem' }}> Credits</h2>

                <section id="credits">

                    {
                        credit.map((i, index) => (
                            <div key={index} className="creditCont">
                                <figure style={{ backgroundImage: `url(${imgPath}${i.profile_path})` }} ></figure>
                                <h2>{i.original_name}</h2>
                                <h4>Charcter - {i.character}</h4>
                            </div>
                        ))
                    }
                </section>
            </section>

            <section id='similar' className='container'>

                <h2 className='gerneHeading' style={{ marginTop: '6rem', fontSize: '2rem' }}> Similar Movies</h2>

                <InfiniteScroll
                    dataLength={similar.length}
                    next={fetchdata}
                    hasMore={similar.length < totalResult}
                >
                    <div className='exploreNowCon'>
                        {
                            similar.map((movie, index) => (
                                <ExploreAllCard closeDisplay={"none"} scrollTop={scrollToTop} handler={addToListHandler} key={index} name={movie.title ? movie.title.slice(0, 15) + "..." : movie.name ? movie.name.slice(0, 15) + "..." : "Netflix"} id={movie.id} img={`${imgPath}${movie.poster_path}`} release={movie.release_date} rating={movie.vote_average.toFixed(1)} />
                            ))
                        }
                    </div>
                </InfiniteScroll>
            </section>
        </>
    )
}

export default MoviePlay
