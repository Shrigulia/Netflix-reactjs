import axios from 'axios';
import React, { useState, useEffect, Component, useCallback } from 'react';
import BannerCard from './BannerCard';

const Banner = ({ setbanner }) => {
    const [banner, setBanner] = useState([]);
    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [desc, setDesc] = useState();
    const [rating, setRating] = useState();
    const [release, setRelease] = useState();
    const [id, setId] = useState();
    const [page, setPage] = useState(1);





    const apiKey = "d5e4056f097f2068ae5f44246666ab84"
    const apiDomain = "https://api.themoviedb.org/3/"
    const apiPath = {
        fetchTrending: `${apiDomain}trending/all/week?api_key=${apiKey}&page=${page}`,
    }
    const imgPath = "https://image.tmdb.org/t/p/original";


    useEffect(() => {
        let isCancel = false;
        const fetchingBanner = async () => {
            if (!isCancel) {
                const trending = await axios.get(apiPath.fetchTrending);
                setBanner(trending.data.results);
                const trendingArr = await trending.data.results;
                const randomIndex = Math.floor(Math.random() * trendingArr.length)
                setName(trendingArr[randomIndex].title)
                setImg(`${imgPath}${trendingArr[randomIndex].backdrop_path}`);
                setDesc(trendingArr[randomIndex].overview.slice(0, 100))
                setRating(trendingArr[randomIndex].vote_average.toFixed(1))
                setRelease(trendingArr[randomIndex].release_date)
                setId(trendingArr[randomIndex].id)
            }
            // movie.title ? movie.title : movie.name ? movie.name : "Netflix"
            // setName(trendingArr.title ? trendingArr[randomIndex].title : trendingArr.name ? trendingArr[randomIndex].name : "Netflix Original")

        }
        fetchingBanner();
        return () => {
            isCancel = true;
        }
    }, [])



    return (
        <>
            <BannerCard id={id} name={name} img={img} desc={desc} rating={rating} release={release} />
        </>
    );
}

export default Banner