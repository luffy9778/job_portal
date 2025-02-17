import React, { useState } from "react";
import { Users, Home, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    text: "Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam.",
    name: "User Name",
    profession: "Profession",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    text: "Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam.",
    name: "User Name",
    profession: "Profession",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    text: "Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam.",
    name: "User Name",
    profession: "Profession",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  }
];

export default function RecruiterHome() {
  const [current, setCurrent] = useState(1);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {/* <div className="w-1/5 bg-gray-200 text-white p-5 flex flex-col space-y-4"></div> */}

        {/* Main Content */}
        <div className=" p-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-6">Our Users Say!!!</h1>
          <div className="flex justify-center gap-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 w-1/3 transition-all rounded-lg shadow-md ${
                  index === current ? "bg-orange-400 text-white" : "bg-orange-100"
                }`}
              >
                <p className="text-lg">“{testimonial.text}”</p>
                <div className="flex items-center mt-4">
                  <img
                    src={testimonial.image}
                    alt="client"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm">{testimonial.profession}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-4 h-4 rounded-full ${
                  index === current ? "bg-orange-400" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="max-w-4xl text-center py-16 px-4">
            <h1 className="text-4xl font-bold text-gray-900">
              24k Talented people are getting Jobs
            </h1>
            <p className="mt-4 text-lg font-semibold text-gray-800">
              Mollit anim laborum duis au dolor in voluptate velit ess cillum dolore eu lore dsu quality mollit anim laborumuis au dolor in voluptate velit cillum.
            </p>
            <p className="mt-4 text-gray-600">
              Mollit anim laborum. Duis aute irufg dhjkolorh in re voluptate velit esscillumlore eu quife nrulla pariatur. Excghecepteur signjnt occa cupidatat non inulpadeserunt mollit aboru. temnthp incididbnt ut labore mollit anim laborum suis aute.
            </p>
            <Link to="addJob">
            <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-orange-600 transition">
            Post A Job
          </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
