import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MovieCard from './Moviecard';
import OtherGernes from './OtherGernes';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

const Movie = (props) => {
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);

    const apiKey = "d5e4056f097f2068ae5f44246666ab84"
    const apiDomain = "https://api.themoviedb.org/3/"
    const apiPath = {
        fetchAllCategories: `${apiDomain}genre/movie/list?api_key=${apiKey}`,
        fetchMovieList: (id) => `${apiDomain}discover/movie?api_key=${apiKey}&with_genres=${id}&page=${page}`,
        fetchTrending: `${apiDomain}trending/all/week?api_key=${apiKey}`,
    }
    const imgPath = "https://image.tmdb.org/t/p/original";

    const dispatch = useDispatch();

    useEffect(() => {
        let isCancel = false;
        const fetchingCategories = async () => {
            if (!isCancel) {
                props.setProgress(10)
                const category = await axios.get(apiPath.fetchAllCategories);
                setGenres(category.data.genres);
                const moviesByGenre = await Promise.all(genres.map(async (genre) => {
                    const movieUrl = await axios.get(apiPath.fetchMovieList(genre.id));
                    return {
                        genreName: genre.name,
                        gerneId: genre.id,
                        movies: movieUrl.data.results,
                    };
                }));
                props.setProgress(70)
                setMovies(moviesByGenre);
                props.setProgress(100)
            }
        }
        fetchingCategories();

        return () => {
            isCancel = true;
        }
    }, [[]])

    const addToListHandler = (options) =>{
        dispatch({
            type: "addToList",
            payload: options,
        });
    }

    return (
        <>
            <Header pos={"sticky"} />
            <section className="container" id="movieSec">
                <OtherGernes />
                {movies.map((genre, index) => (
                    <>
                        <h2 className='gerneHeading' style={{ marginBottom: 0 }} key={index} >{genre.genreName}
                            <Link className='exploreNow' to={`/${genre.gerneId}/${genre.genreName}`} >Explore now</Link>
                        </h2>
                        <div key={index + 1} className="movieList">
                            {genre.movies.map((movie) => (
                                <MovieCard handler={addToListHandler} id={movie.id} key={movie.id} img={`${imgPath}${movie.poster_path}`} name={movie.title ? movie.title : movie.name ? movie.name : "Netflix"} rating={movie.vote_average} release={movie.release_date} />
                            ))}
                        </div>
                    </>
                ))}
            </section>
        </>
    )
}

export default Movie