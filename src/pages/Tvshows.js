import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import YouTube from 'react-youtube';
import List_cards from '../components/List_cards';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import LoadingSpinner from '../components/Loading';
import API_URL from '../config/apiUrl';





const Tvshows = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [topTVShows, setTopTVShows] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [main, setMain] = useState({});
  const [trailerkey, setTrailerKey] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [loading, setLoading] = useState(true);

  const genreMap = {
    action: 28,
    animation: 16,
    comedy: 35,
    crime: 80,
    drama: 18,
    western: 37,
    war: 10752,
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const hasSeenIntro = localStorage.getItem('hasSeenIntro');
      if (!hasSeenIntro) {
        setShowIntro(true);
        localStorage.setItem('hasSeenIntro', 'true');
      }
    }

    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch popular and top rated movies/TV shows
        const [popularTVShowsRes, topTVShowsRes] = await Promise.all([
          axios.get(`${API_URL}/tvshow/popular`, config),
          axios.get(`${API_URL}/tvshow/top`, config),
        ]);

        setPopularTVShows(popularTVShowsRes.data);
        setTopTVShows(topTVShowsRes.data);

        // Fetch movies for each genre
        const genrePromises = Object.keys(genreMap).map((genre) =>
          axios.get(`${API_URL}/tvshow/${genre}`, config)
        );

        const genreResponses = await Promise.all(genrePromises);
        const genreMoviesData = {};
        Object.keys(genreMap).forEach((genre, index) => {
          genreMoviesData[genre] = genreResponses[index].data;
        });

        setGenreMovies(genreMoviesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const trailer = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        };
        const mediaType = main.first_air_date ? 'tv' : 'movie'; // Determine if it's a TV show or movie
        const res = await axios.get(`${API_URL}/${mediaType}/${main.id}/trailers`, config);
        if (res.data && res.data.length > 0) {
          setTrailerKey(res.data[0].key);
        } else {
          console.log('No trailer available');
        }
      } catch (err) {
        console.error('Error fetching trailer:', err);
      }
    }
    trailer();
    fetchData();
  }, [genreMap]);


  const videoOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      loop: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      mute: 1,
    },
  };

  const video_trailer = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      mute: 1,
    },
  };

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 6000);

    return () => clearTimeout(introTimer);
  }, []);

  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    if (popularTVShows.length > 0) {
      setMain(popularTVShows[randomNumber]);
    }
  }, [popularTVShows, randomNumber]);

  if (showIntro) {
    return (
      <div className="w-full h-screen bg-black">
        <YouTube
          videoId="GV3HUDMQ-F8"
          opts={videoOptions}
          onEnd={handleIntroEnd}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-white px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Netflix</h1>
          <p className="text-lg md:text-xl mb-8">Please login to access the content.</p>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-lg md:text-xl">
            <a href="/login">Login</a>
          </button>
        </div>
      </div>
    );
  }
  const handleReady = (event) => {
    setPlayer(event.target);
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = (e) => {
    e.preventDefault();
    // Prevent any default behavior or propagation
    e.stopPropagation();
  };

  const toggleOverview = () => {
    setShowFullOverview(!showFullOverview);
  };

  const truncateOverview = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  console.log(main);
  return (
    <div className="bg-black">
      <NavBar />
      {loading && <LoadingSpinner />}
      <div className="relative">
        <div className="absolute inset-0 z-0" onClick={handleVideoClick}>
          <YouTube
            videoId={trailerkey}
            opts={video_trailer}
            onReady={handleReady}
            style={{ height: '120vh' }}
            className="w-full object-cover"
          />
        </div>
        <div style={{ backgroundColor: 'rgba(4, 4, 4, 0.75)' }} className="text-white relative z-10 min-h-screen flex items-center pl-10 px-4 py-16 md:py-0">
          <div className="max-w-4xl hidden sm:block">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{main.name}</h1>
            <div className="text-base md:text-xl w-full md:w-4/5 lg:w-3/5 mb-8">
              {main.overview && (
                <p>
                  {showFullOverview ? main.overview : truncateOverview(main.overview, 30)}
                  {main.overview.length > 30 && (
                    <button
                      onClick={toggleOverview}
                      className="ml-2 text-blue-400 hover:text-blue-300 focus:outline-none"
                    >
                      {showFullOverview ? 'Less' : 'More'}
                    </button>
                  )}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <button className="bg-white text-black p-2 rounded-full hover:bg-opacity-80">
                <Link
                  to="/Play"
                  state={{ movieData: main }}
                  className="flex items-center justify-center w-full h-full"
                >
                  <span className='text-bold p-1 text-lg'>Play Movie</span>
                </Link>
              </button>
              <button
                className="bg-gray-600 text-white p-2 rounded-full hover:bg-opacity-80"
                onClick={toggleMute}
              >
                {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <List_cards title="Popular TV Shows" setLoading={setLoading} data={popularTVShows} />
        <List_cards title="Top Rated TV Shows" setLoading={setLoading} data={topTVShows} />
        {Object.entries(genreMovies).map(([genre, movies]) => (
          <List_cards key={genre} setLoading={setLoading} title={`${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`} data={movies} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Tvshows;


