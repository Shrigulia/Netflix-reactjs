import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MovieCard from './Moviecard';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Trending = () => {
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);

    const apiKey = "d5e4056f097f2068ae5f44246666ab84"
    const apiDomain = "https://api.themoviedb.org/3/"
    const apiPath = {
        fetchTrending: `${apiDomain}trending/all/week?api_key=${apiKey}&page=${page}`,
        fetchTopRated: `${apiDomain}movie/top_rated?api_key=${apiKey}&page=${page}`,
        fetchUpcomming: `${apiDomain}movie/upcoming?api_key=${apiKey}&page=${page}`,
        fetchPopular: `${apiDomain}movie/popular?api_key=${apiKey}&page=${page}`,
    }
    const imgPath = "https://image.tmdb.org/t/p/original";



    useEffect(() => {
        const fetchingTrendingSection = async () => {
            try {
                const trending = await axios.get(apiPath.fetchTrending);
                setTrending(trending.data.results);
                const toprated = await axios.get(apiPath.fetchTopRated);
                setTopRated(toprated.data.results);
                const upcoming = await axios.get(apiPath.fetchUpcomming);
                setUpcoming(upcoming.data.results);
                const popular = await axios.get(apiPath.fetchPopular);
                setPopular(popular.data.results);
            } catch (error) {
                console.log('trending error');
            }
        };
        fetchingTrendingSection();
    }, [])

    const dispatch = useDispatch();

    const addToListHandler = (options) =>{
        dispatch({
            type: "addToList",
            payload: options,
        });
    }

    return (
        <>
            <h2 className='gerneHeading' style={{ marginBottom: 0 }}> Trending Now
                <Link to={"/82120998/Trending"} className='exploreNow' >Explore now</Link>
            </h2>
            <div className="movieList">
                {
                    trending.map((movie, index) => (
                        <MovieCard handler={addToListHandler} id={movie.id} key={index} img={`${imgPath}/${movie.poster_path}`} name={movie.title} rating={movie.vote_average.toFixed(1)} release={movie.release_date} />
                    ))
                }
            </div>
            <h2 className='gerneHeading' style={{ marginBottom: 0 }}>Top Rated
                <Link to={"/nann/Top Rated"} className='exploreNow' >Explore now</Link>
            </h2>
            <div className="movieList">
                {
                    topRated.map((movie, index) => (
                        <MovieCard handler={addToListHandler} key={index} id={movie.id} img={`${imgPath}/${movie.poster_path}`} name={movie.title} rating={movie.vote_average.toFixed(1)} release={movie.release_date} />
                    ))
                }
            </div>
            <h2 className='gerneHeading' style={{ marginBottom: 0 }}>Upcomming
                <Link to={"/nannn/Upcoming"} className='exploreNow' >Explore now</Link>

            </h2>
            <div className="movieList">
                {
                    upcoming.map((movie, index) => (
                        <MovieCard handler={addToListHandler} key={index} id={movie.id} img={`${imgPath}/${movie.poster_path}`} name={movie.title} rating={movie.vote_average.toFixed(1)} release={movie.release_date} />
                    ))
                }
            </div>
            <h2 className='gerneHeading' style={{ marginBottom: 0 }}>Popular
                <Link to={"/nannnn/Popular"} className='exploreNow' >Explore now</Link>
            </h2>
            <div className="movieList">
                {
                    popular.map((movie, index) => (
                        <MovieCard handler={addToListHandler} key={index} id={movie.id} img={`${imgPath}/${movie.poster_path}`} name={movie.title} rating={movie.vote_average.toFixed(1)} release={movie.release_date} />
                    ))
                }
            </div>
        </>
    )
}

export default Trending