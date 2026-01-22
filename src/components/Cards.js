import React, { useState, useEffect } from 'react';
import { FaPlay, FaHeart, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Cards = ({ data, type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data) {
    return null;
  }

  const title = type === 'movie' ? data.title : data.name;
  const releaseDate = type === 'movie' ? data.release_date : data.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const VoteDisplay = ({ voteAverage, voteCount }) => {
    const percentage = (voteAverage / 10) * 100;
    const circleColor = voteAverage >= 7 ? 'text-green-500' : voteAverage >= 5 ? 'text-yellow-500' : 'text-red-500';

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-12 h-12">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#444"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
              className={circleColor}
            />
            <text x="18" y="20.35" className="text-xs font-bold" textAnchor="middle" fill="white">
              {voteAverage.toFixed(1)}
            </text>
          </svg>
        </div>
        <div className="text-xs text-gray-400 mt-1">{voteCount} votes</div>
      </div>
    );
  };
  if (isMobile) {
    return (
      <div className="relative w-[40vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] aspect-[2/3] overflow-hidden shadow-lg transition-all duration-300 ease-in-out">
      {data.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={title}
          className="w-full h-full object-cover rounded-sm"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-sm">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
        <h3 className="text-white text-sm font-bold truncate">{title}</h3>
        <div className="flex justify-between items-center mt-1">
            <VoteDisplay voteAverage={data.vote_average} voteCount={data.vote_count} />
            <span className="text-white text-xs">{year}</span>
        </div>
      </div>

      <div className="absolute top-0 right-0 p-2">
        <button 
          className={`p-1 rounded-full transition-colors duration-300 ${
            isLiked 
              ? 'bg-red-600 text-white' 
              : 'bg-black bg-opacity-50 text-white'
          }`}
          onClick={handleLikeClick}
        >
          <FaHeart className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-2">
          <Link 
            to="/Play" 
            state={{ movieData: data }}
            className="bg-white text-black p-2 rounded-full hover:bg-opacity-80"
            onClick={scrollToTop}
          >
            <FaPlay className="w-4 h-4" />
          </Link>
          <Link 
            to="/details" 
            state={{ movieData: data }}
            className="bg-gray-700 text-white p-2 rounded-full hover:bg-opacity-80"
            onClick={scrollToTop}
          >
            <FaInfoCircle className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div 
      className="relative w-96 h-[15rem] overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {data.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={title}
          className="w-full h-full object-cover rounded-none"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-between p-4">
          <div>
            <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-300 text-sm mb-4">
              {data.overview ? `${data.overview.slice(0, 100)}...` : 'No overview available'}
            </p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <button className="bg-white text-black p-2 rounded-full hover:bg-opacity-80">
                  <Link 
                    to="/Play" 
                    state={{ movieData: data }}
                    className="flex items-center justify-center w-full h-full"
                    onClick={scrollToTop}
                  >
                    <FaPlay />
                  </Link>
                </button>
                <button 
                  className={`border border-gray-300 p-2 rounded-full transition-colors duration-300 ${
                    isLiked 
                      ? 'bg-red-600 text-white' 
                      : 'text-white hover:bg-white hover:text-black'
                  }`}
                  onClick={handleLikeClick}
                >
                  <FaHeart className={`transform transition-transform duration-300 ${isLiked ? 'scale-110' : 'scale-100'}`} />
                </button>
              </div>
              <VoteDisplay voteAverage={data.vote_average} voteCount={data.vote_count} />
            </div>
            
            <div className="text-white text-sm">
              <span className="mr-2">{year}</span>
              <span className="border border-white px-1">{data.adult ? '18+' : 'PG'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;