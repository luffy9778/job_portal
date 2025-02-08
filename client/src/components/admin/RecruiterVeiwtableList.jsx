import React from "react";

const RecruiterVeiwtableList = ({data,index, currentPage,limit,handleApprove,handleReject}) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900">
        {index + 1 + (currentPage - 1) * limit}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900">{data.name}</td>
      <td className="px-6 py-4">{data.email}</td>
      <td className="px-6 py-4">{data.company.name}</td>
      <td className="px-6 py-4 flex space-x-2">
        {data.status === "pending" ? (
          <button
            className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={() => handleApprove(data._id)}
          >
            Approve
          </button>
        ) : data.status === "approved" ? (
          <p className="text-green-600 font-semibold">Approved</p>
        ) : (
          <p className="text-red-600 font-semibold">Rejected</p>
        )}
      </td>
      <td className="px-6 py-4">
        {data.status !== "rejected" && (
          <button
            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => handleReject(data._id)}
          >
            Block
          </button>
        )}
        {data.status === "rejected" && (
          <button
            className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={() => handleApprove(data._id)}
          >
            Approve
          </button>
        )}
      </td>
    </tr>
  );
};

export default RecruiterVeiwtableList;
