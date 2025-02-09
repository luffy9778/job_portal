import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const UserViewTableList = ({data,index, currentPage,limit,handleBlock,}) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900">
        {index + 1 + (currentPage - 1) * limit}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900">{data.firstName}{" "}{data.lastName}</td>
      <td className="px-6 py-4">{data.email}</td>
      <td className="px-6 py-4">{data.phone}</td>
      <td className="px-6 py-4 flex space-x-2">
        {data.isBlocked? (
          <button
            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => handleBlock(data._id,false)}
          >
            Unblock
          </button>
        ) : <button
        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        onClick={() => handleBlock(data._id,true)}
      >
       <FontAwesomeIcon icon={faBan}/> Block
      </button> }
      </td>
    </tr>
 
  )
}

export default UserViewTableList