import React from 'react';
import { FaSearch } from 'react-icons/fa';
import useSearch from './useSearch'; // Import the useSearch custom hook

const SearchBar = () => {
  const { handleSearch } = useSearch(); // Use the useSearch custom hook

  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(inputValue); // Call handleSearch with inputValue

    console.log(inputValue);
    
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="search flex items-center gap-10 bg-white text-black border border-gray-300 rounded-md focus-within:border-blue-600">
        <input
          type="text"
          placeholder="Search for jobs"
          value={inputValue}
          onChange={handleChange}
          className="py-3 px-8 rounded-md border-none bg-transparent focus:outline-none focus:ring-0 flex-1"
        />
        <FaSearch
          size={22}
          className="text-gray-500 cursor-pointer mr-4"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default SearchBar;
