import { useState, useEffect } from 'react';

const SearchField = ({ placeholderText, search, clearInput }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    search(e.target.value);
  };

  useEffect(() => {
    if (clearInput) {
      setInputValue('');
      search('');
    }
  }, [clearInput]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(inputValue);
    }
    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'Backspace'
    ) {
      return;
    }
    search(inputValue);
  };

  return (
    <div className='flex justify-end relative'>
      <label className='relative'>
      <input
        type='text'
        placeholder={placeholderText}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className='bg-gray-100 p-3 text-lg pr-12 rounded-[.25rem] focus:ring focus:ring-[#663399] focus:outline-none'
        autoFocus
      />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
        </label>
    </div>
  );
};

export default SearchField;
