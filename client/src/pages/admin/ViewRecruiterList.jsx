import React, { useEffect, useState } from 'react'

function ViewRecruiterList() {
    const [recruiters,setRecruiters] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() =>{
        const fetchRecruiters = async () => {
            try {
                const response = await fetch('http://localhost:3500/recruiters');
                const data = await response.json();
                setRecruiters(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
    };
    fetchRecruiters();
    }, []);

    const handleApprove = async (id) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            alert('No token found. Please log in.');
            return;
          }
    
          const response = await axios.post(
            'http://localhost:3500/job/getAllRecriuter',
            {
              id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            alert("Recruiter approved successfully");
            setRecruiters((prev) => prev.filter((recruiter) => recruiter._id !== id));
          } else {
            alert("Failed to approve recruiter");
          }
        } catch (error) {
          console.error("Error approving recruiter:", error);
        }
      };
    
  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Recruiter List</h1>
        {recruiters.length === 0 ? (
          <p>No recruiters found.</p>
        ) : (
          <table className="w-full border-collapse bg-gray-50">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {recruiters.map((recruiter) => (
                <tr key={recruiter._id} className="border-b">
                  <td className="p-4">{recruiter.Recruiter.name}</td>
                  <td className="p-4">{recruiter.Recruiter.email}</td>
                  <td className="p-4">{recruiter.Recruiter.companyName}</td>
                  <td className="p-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      onClick={() => handleApprove(recruiter.Recruiter)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </>
  )
}

export default ViewRecruiterList