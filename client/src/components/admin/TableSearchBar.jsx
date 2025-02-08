import React from 'react'

const TableSearchBar = ({query,setQuery}) => {
  return (
    <div className="relative w-full sm:w-80">
    <input
      type="text"
      placeholder="Search for items"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="block w-full p-2 pl-10 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>  )
}

export default TableSearchBar