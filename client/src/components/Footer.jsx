import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-10">
      <div className="flex flex-wrap justify-between">
        {/* About Us Section */}
        <div className="flex-1 m-2">
          <h3 className="text-lg font-semibold">ABOUT US</h3>
          <p className="text-sm mt-2">
            Heaven fructviful doesn't cover lesser dvsays appear creeping seasons
            so behold.
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="flex-1 m-2">
          <h3 className="text-lg font-semibold">CONTACT INFO</h3>
          <p className="text-sm mt-2">Address: Your address goes here, your demo address.</p>
          <p className="text-sm">Phone: +919562590456</p>
          <p className="text-sm">Email: abhijithpkumar123@gmail.com</p>
        </div>

        {/* Important Links Section */}
        <div className="flex-1 m-2">
          <h3 className="text-lg font-semibold">IMPORTANT LINK</h3>
          <ul className="list-none p-0 mt-2 space-y-1">
            <li className="text-sm">View Project</li>
            <li className="text-sm">Contact Us</li>
            <li className="text-sm">Testimonial</li>
            <li className="text-sm">Properties</li>
            <li className="text-sm">Support</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="flex-1 m-2">
          <h3 className="text-lg font-semibold">NEWSLETTER</h3>
          <p className="text-sm mt-2">
            Heaven fruitful doesn't over lesser in days. Appear creeping.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Email Address"
              className="p-2 rounded-l-md border-none w-3/4"
            />
            <button
              type="submit"
              className="p-2 bg-pink-500 text-white rounded-r-md"
            >
              &#10148;
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-wrap justify-between items-center mt-8">
        <div className="flex-1 m-2">
          <h4 className="text-lg font-semibold">Job Finder</h4>
          <p className="text-sm">Get your dream job</p>
        </div>
        <div className="flex-1 m-2 text-center">
          <p className="text-sm">5000+ Talented Hunter</p>
        </div>
        <div className="flex-1 m-2 text-center">
          <p className="text-sm">451 Talented Hunter</p>
        </div>
        <div className="flex-1 m-2 text-center">
          <p className="text-sm">568 Talented Hunter</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
