import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { FaCirclePlay } from 'react-icons/fa6';
import YouTube from 'react-youtube';
import axios from 'axios';
import List_cards from '../components/List_cards';
import LoadingSpinner from '../components/Loading';
import API_URL from '../config/apiUrl';



const Play = () => {
    const [generaList, setGeneraList] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const movieData = location.state?.movieData;
    const genra_list = {
        28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
        80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
        14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
        9648: "Mystery", 10749: "Romance", 878: "Science Fiction",
        10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
    };
    useEffect(() => window.scrollTo(0, 0), []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const mediaType = movieData.first_air_date ? 'tvshow' : 'movies';
                const [
                    popularMoviesRes,
                    topMoviesRes,
                ] = await Promise.all([
                    axios.get(`${API_URL}/${mediaType}/popular`, config),
                    axios.get(`${API_URL}/${mediaType}/top`, config)
                ]);

                setPopularMovies(popularMoviesRes.data);
                setTopMovies(topMoviesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (movieData) {
            const genres = movieData.genre_ids.map((id) => genra_list[id]);
            setGeneraList(genres);
        }
    }, [movieData]);

    if (!movieData) {
        return <div>No movie data available</div>;
    }

    const videoOptions = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
        },
    };

    const handlePlayClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            const mediaType = movieData.first_air_date ? 'tv' : 'movie'; // Determine if it's a TV show or movie
            const res = await axios.get(`${API_URL}/${mediaType}/${movieData.id}/trailers`, config);
            if (res.data && res.data.length > 0) {
                setTrailerKey(res.data[0].key); // Use the first trailer
                setIsPlaying(true);
            } else {
                console.log('No trailer available');
            }
        } catch (err) {
            console.error('Error fetching trailer:', err);
        }
    };

    const handleExitClick = () => {
        setIsPlaying(false);
        setTrailerKey(null);
    };

    return (
        <div className='bg-black min-h-screen'>
            <NavBar />
            {loading && <LoadingSpinner />}
            <div className="relative w-full h-screen">
                {!isPlaying ? (
                    <>
                        <div className="absolute inset-0 z-0">
                            <img
                                src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
                                alt={movieData.title || movieData.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div style={{ backgroundColor: "rgba(0,0,0,0.7)" }} className="absolute inset-0 z-10 flex items-center justify-center">
                            <div className="mx-10 text-white">
                                <h1 className="text-5xl font-bold mb-4">{movieData.title || movieData.name}</h1>
                                <p><span className='font-bold text-lg'>Genres:</span> {generaList.join(', ')}</p>
                                <p className="text-xl w-3/5 mb-8">{movieData.overview}</p>
                                <button onClick={handlePlayClick} className="p-2 flex items-center gap-3 rounded-md text-lg bg-white text-black">
                                    <FaCirclePlay className="text-4xl" /> Play Trailer
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    trailerKey && (
                        <div className="w-full h-full relative">
                            <button onClick={handleExitClick} className="absolute top-20 right-4 z-20 p-2 bg-white text-black rounded-md">
                                Exit
                            </button>
                            <YouTube
                                videoId={trailerKey}
                                opts={videoOptions}
                                className="w-full h-full"
                            />
                        </div>
                    )
                )}
            </div>
            <List_cards setLoading={setLoading} title="Popular Movies" data={popularMovies} />
            <List_cards setLoading={setLoading} title="Top Rated Movies" data={topMovies} />
            <Footer />
        </div>
    );
};

export default Play;
