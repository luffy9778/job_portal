import React from "react";
import { Bar } from "recharts";
import { BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import ViewRecruiter from "./recruiter/ViewRecruiter";

const data = [
  { name: "Jan", users: 400, Applications: 120 },
  { name: "Feb", users: 300, Applications: 100 },
  { name: "Mar", users: 500, Applications: 200 },
  { name: "Apr", users: 200, Applications: 150 },
  { name: "May", users: 700, Applications: 250 },
];

const recruiters = [
  { id: 1, name: "John Doe", company: "ABC Corp", position: "HR Manager" },
  { id: 2, name: "Jane Smith", company: "XYZ Ltd", position: "Recruiter" },
  { id: 3, name: "Sam Wilson", company: "Tech Solutions", position: "Hiring Manager" },
  { id: 4, name: "Lisa Johnson", company: "Innovate Inc.", position: "Talent Acquisition" },
];

function AdminDashBoard() {
  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-4"><a href="#" className="text-gray-700">Dashboard</a></li>
          <li className="mb-4"><a href="#" className="text-gray-700">Users</a></li>
          <li className="mb-4"><a href="#" className="text-gray-700">Applications</a></li>
          <li className="mb-4"><a href="#" className="text-gray-700">Revenue</a></li>
        </ul>
      </div>


      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-gray-600 text-lg">1,500</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold">Applications</h2>
            <p className="text-gray-600 text-lg">320</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold">Revenue</h2>
            <p className="text-gray-600 text-lg">$12,400</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">User & Order Growth</h2>
          <BarChart width={600} height={300} data={data} className="mx-auto">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" name="Users" />
            <Bar dataKey="Applications" fill="#82ca9d" name="Applications" />
          </BarChart>
        </div>

        {/* Recruiter List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Recruiter List</h2>
          <ul className="space-y-4">
            {recruiters.map((recruiter) => (
              <li key={recruiter.id} className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{recruiter.name}</h3>
                <p className="text-gray-600">{recruiter.position} at {recruiter.company}</p>
              </li>
            ))}
          </ul>
        </div> 
      </div>
    </div>
  );
}

export default AdminDashBoard;
