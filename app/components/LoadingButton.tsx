import { useState } from 'react';

const LoadingButton = ({ onClick, children }:any) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    // setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
      disabled={isLoading}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5 mr-3 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default LoadingButton;
