import React from "react";

const DateFilter = ({isDropdownOpen,setIsDropdownOpen,selectedFilter,setSelectedFilter,filters}) => {
    
  return (
    <div className="relative z-20">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
      >
        {selectedFilter.label}
        <svg
          className="w-2.5 h-2.5 ml-2"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
          <ul className="p-3 space-y-1 text-sm text-gray-700">
            {filters.map((filter) => (
              <li key={filter.value}>
                <button
                  onClick={() => {
                    setSelectedFilter(filter);
                    setIsDropdownOpen(false);
                  }}
                  className="flex w-full items-center p-2 rounded-sm hover:bg-gray-100"
                >
                  {filter.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
