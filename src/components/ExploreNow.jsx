import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import InfiniteScroll from 'react-infinite-scroll-component';
import ExploreAllCard from './ExploreAllCard';
import { useDispatch } from 'react-redux';


const ExploreNow = (props) => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);


    const apiKey = "d5e4056f097f2068ae5f44246666ab84"
    const apiDomain = "https://api.themoviedb.org/3/"
    const apiPath = {
        fetchMovieList: (id) => `${apiDomain}discover/movie?api_key=${apiKey}&with_genres=${id}&page=${page}`,
        fetchTrending: `${apiDomain}trending/all/week?api_key=${apiKey}&page=${page}`,
        fetchTopRated: `${apiDomain}movie/top_rated?api_key=${apiKey}&page=${page}`,
        fetchUpcomming: `${apiDomain}movie/upcoming?api_key=${apiKey}&page=${page}`,
        fetchPopular: `${apiDomain}movie/popular?api_key=${apiKey}&page=${page}`,
    }
    const imgPath = "https://image.tmdb.org/t/p/original";

    let params = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllMovies = async () => {
            if (params.id == 82120998 && params.name == "Trending") {
                props.setProgress(10);
                const moviesArr = await axios.get(apiPath.fetchTrending);
                console.log(moviesArr)
                props.setProgress(70);
                setMovies(moviesArr.data.results);
                setTotalResult(moviesArr.data.total_results)
                props.setProgress(100);
            }
            else if (params.id == "nann" && params.name == "Top Rated") {
                props.setProgress(10);
                const moviesArr = await axios.get(apiPath.fetchTopRated);
                console.log(moviesArr)
                props.setProgress(70);
                setMovies(moviesArr.data.results);
                setTotalResult(moviesArr.data.total_results)
                props.setProgress(100);
            }
            else if (params.id == "nannn" && params.name == "Upcoming") {
                props.setProgress(10);
                const moviesArr = await axios.get(apiPath.fetchUpcomming);
                console.log(moviesArr)
                props.setProgress(70);
                setMovies(moviesArr.data.results);
                setTotalResult(moviesArr.data.total_results)
                props.setProgress(100);
            }
            else if (params.id == "nannnn" && params.name == "Popular") {
                props.setProgress(10);
                const moviesArr = await axios.get(apiPath.fetchPopular);
                props.setProgress(70);
                setMovies(moviesArr.data.results);
                setTotalResult(moviesArr.data.total_results)
                props.setProgress(100);
            }
            else {
                props.setProgress(10);
                const moviesArr = await axios.get(apiPath.fetchMovieList(params.id));
                props.setProgress(70);
                setMovies(moviesArr.data.results);
                setTotalResult(moviesArr.data.total_results)
                props.setProgress(100);
            }

        }
        fetchAllMovies();
    }, [params.id, params.name])

    const fetchdata = async () => {
        setPage(page + 1);
        const moviesArr = await axios.get(apiPath.fetchMovieList(params.id));
        console.log(moviesArr)
        setMovies(movies.concat(moviesArr.data.results));
        setTotalResult(moviesArr.data.total_results)
    }

    const addToListHandler = (options) => {
        dispatch({
            type: "addToList",
            payload: options
        });
    }


    return (
        <>
            <Header />
            <section id='exploreAllSec' className='container'>

                <h2 className='gerneHeading' style={{ marginTop: '6rem', fontSize: '2rem' }}> {params.name}</h2>

                <InfiniteScroll
                    dataLength={movies.length}
                    next={fetchdata}
                    hasMore={movies.length < totalResult}
                >
                    <div className='exploreNowCon'>
                        {
                            movies.map((movie, index) => (
                                <ExploreAllCard closeDisplay={"none"} handler={addToListHandler} key={index} name={movie.title ? movie.title.slice(0, 15) + "..." : movie.name ? movie.name.slice(0, 15) + "..." : "Netflix"} id={movie.id} img={`${imgPath}${movie.poster_path}`} release={movie.release_date} rating={movie.vote_average.toFixed(1)} />
                            ))
                        }
                    </div>
                </InfiniteScroll>
            </section>

        </>
    )
}

export default ExploreNow