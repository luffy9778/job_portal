import React from 'react'
import logo from '../../assets/linked.svg'
import { Link } from 'react-router-dom'

const jobCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
         <img src={logo} class="h-8" alt="Flowbite Logo" />
          <div>
            <h3 className="text-lg font-medium">LinkedIn</h3>
            <p className="text-sm text-gray-500">New York, US</p>
          </div>
        </div>
        <h4 className="text-lg font-semibold">UI / UX Designer fulltime</h4>
        <p className="text-sm text-gray-500 my-2">Fulltime · 4 minutes ago</p>
        <p className="text-sm text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          architecto eveniet, dolor quo repellendus pariatur.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded">
            Adobe XD
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded">
            Figma
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded">
            Photoshop
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-800">$500/Hour</p>
          <Link to="/jobDetails">
          <button className="bg-orange-400 text-white text-sm font-medium py-2 px-4 rounded hover:bg-orange-500">
            Details
          </button></Link>
        </div>
      </div>
  )
}

export default jobCard