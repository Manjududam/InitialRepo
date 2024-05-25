// useSearch.js

import { useState } from 'react';

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return { searchTerm, handleSearch };
};

export default useSearch; // Ensure that useSearch is exported as default
