import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-[9999]">
      <div className="w-[50px] h-[40px] text-center text-[10px]">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`inline-block h-full w-[6px] mr-[3px] bg-[#e50914] animate-[spinnerDelay_1.2s_ease-in-out_infinite] ${
              index === 1 ? 'animate-delay-[-1.1s]' :
              index === 2 ? 'animate-delay-[-1.0s]' :
              index === 3 ? 'animate-delay-[-0.9s]' :
              index === 4 ? 'animate-delay-[-0.8s]' : ''
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;