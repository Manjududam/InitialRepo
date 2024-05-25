import React, { useState } from 'react';

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchResult(inputValue);
    setInputValue(''); // Clear input value after submitting
  };

  return (
    <div>
      <h1>Search Component</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter search keyword"
        />
        <button type="submit">Search</button>
      </form>
      {searchResult && (
        <div>
          <h2>Search Result:</h2>
          <p>{searchResult}</p>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
