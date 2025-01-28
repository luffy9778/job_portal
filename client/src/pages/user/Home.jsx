import React from 'react'
import Navbaruser from '../../components/Navbaruser'
import JobCard from '../../components/user/JobCard'
import Footer from '../../components/Footer'
import logo from '../../assets/linked.svg'

function Home() {
  return (
  <>

      {/* Navbar Section */}
      <Navbaruser />
      <div className="font-sans" >
      {/* Hero Section */}
      <section className="text-center py-20 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 pt-10">Find the Job That Fits Your Life</h1>
        <p className="text-lg text-gray-600 mb-6">We offer thousands of job vacancies right now</p>
        <div className="flex justify-center space-x-2 mb-4">
          <input 
            type="text" 
            placeholder="Job Title, Keywords, or Company" 
            className="border border-gray-300 p-2 rounded w-1/3 focus:outline-orange-600"
          />
          
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Search</button>
        </div>
        <p className="text-gray-600">Browse job offers by Category or Location</p>
      </section>

      {/* Job Sectors Section */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-bold mb-6">Find the Right Job Sectors</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="border border-gray-300 rounded p-4 w-48 bg-white shadow hover:shadow-lg">
            <h3 className="font-bold text-lg mb-2">Software & Data</h3>
            <p className="text-gray-600">121 jobs</p>
            <a href="#" className="text-orange-500 hover:underline">Explore Jobs →</a>
          </div>
          <div className="border border-gray-300 rounded p-4 w-48 bg-white shadow hover:shadow-lg">
            <h3 className="font-bold text-lg mb-2">Sales</h3>
            <p className="text-gray-600">110 jobs</p>
            <a href="#" className="text-orange-500 hover:underline">Explore Jobs →</a>
          </div>
          <div className="border border-gray-300 rounded p-4 w-48 bg-white shadow hover:shadow-lg">
            <h3 className="font-bold text-lg mb-2">Health & Safety</h3>
            <p className="text-gray-600">200 jobs</p>
            <a href="#" className="text-orange-500 hover:underline">Explore Jobs →</a>
          </div>
          <div className="border border-gray-300 rounded p-4 w-48 bg-white shadow hover:shadow-lg">
            <h3 className="font-bold text-lg mb-2">Admin & Office</h3>
            <p className="text-gray-600">150 jobs</p>
            <a href="#" className="text-orange-500 hover:underline">Explore Jobs →</a>
          </div>
        </div>
      </section>

      <section id="about" className="bg-gray-50 py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 max-w-6xl mx-auto">
        {/* Left Side: Image Section */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <img
            src="https://rgitech.weebly.com/uploads/1/0/1/4/101493456/published/castle.jpg?1491822647"
            alt="Smiling Woman"
            className="rounded-md shadow-md w-80"
          />

        </div>

        {/* Right Side: Content Section */}
        <div className="text-center lg:text-left lg:ml-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Millions of jobs. <br /> Find the one that's right for you.
          </h1>
          <p className="text-gray-600 mb-6 max-w-lg">
            Search all the open positions on the web. Get your own personalized salary
            estimate. Read reviews on over 30,000+ companies worldwide.
          </p>
          <ul className="text-gray-700 space-y-3 mb-6">
            <li className="flex items-center">
              <span className="text-orange-500 font-bold text-lg mr-2">✔</span>
              Digital Marketing Solutions for Tomorrow
            </li>
            <li className="flex items-center">
              <span className="text-orange-500 font-bold text-lg mr-2">✔</span>
              Our Talented & Experienced Marketing Agency
            </li>
            <li className="flex items-center">
              <span className="text-orange-500 font-bold text-lg mr-2">✔</span>
              Create your own skin to match your brand
            </li>
          </ul>
          <button className="px-6 py-3 bg-orange-400 text-white text-sm font-semibold rounded-md shadow-md hover:bg-orange-500 transition duration-300">
            Contact us
          </button>
        </div>
      </div>
    </section>
    </div>

    <div className="font-sans text-center pt-10">
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>Featured jobs</h1>
      <section id='jobs'>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
    
      <JobCard/>
      <JobCard/>
      <JobCard/>
      <JobCard/>

      
    </div>
      </section>
      </div>
      <Footer/>
  </>
  )
}

export default Home