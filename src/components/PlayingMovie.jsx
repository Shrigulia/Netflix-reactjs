import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const PlayingMovie = () => {
    let params = useParams();

    let navigate = useNavigate();

    const [key, setKey] = useState()

    const apiKey = "d5e4056f097f2068ae5f44246666ab84"
    const apiDomain = "https://api.themoviedb.org/3/"
    const apiPath = {
        fetchVideo: `${apiDomain}movie/${params.id}/videos?api_key=${apiKey}&language=en-US`,
    }
    useEffect(() => {
        const fetchingTrailer = async () => {
            const trailer = await axios.get(apiPath.fetchVideo);
            let ok = trailer.data.results;
            if (ok.length < 1) {
                toast.success("Trailer Not available", {
                    style: {
                        background: "#f11946",
                        color: "white",
                        fontWeight: 700
                    }
                });
                navigate(`/${params.id}`)
            }
            else {
                let num = ok.filter((i) => i.type === "Teaser" || i.type === "Trailer" || i.type === "Clip");
                console.log(num)
                if (num.length > 0) {
                    setKey(`https://www.youtube.com/embed/${num[0]['key']}?autoplay=1&modestbranding=1&loop=1&rel=1`)
                }
                else {
                    console.log("key not found")
                }
            }
        }
        fetchingTrailer();
    }, [apiPath.fetchVideo])



    return (
        <iframe id="trailerLink" src={key} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
    )
}

export default PlayingMovie