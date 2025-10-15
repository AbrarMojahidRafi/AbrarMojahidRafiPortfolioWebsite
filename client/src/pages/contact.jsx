import React from 'react'
import { useState } from 'react'
import { useAuth } from "../store/auth.jsx";
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({
    username: "",
    contact: "",
    email: "",
    message: "",
    subject: "",
  });

  const { user } = useAuth();
  const [userData, setUserData] = useState(true); 
  
  // console.log("User data in contact us page: ", user);
  // console.log("Username: ", user.name);
  // console.log("Email: ", user.email);
  
  // console.log(userData);
  
  if (userData && user) {
    setContactInfo({
      username: user.name,
      contact: user.contact,
      email: user.email,
      subject: "",
      message: "",
    });

    setUserData(false); 
  }

  // console.log(contactInfo);
  

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(contactInfo);

    try {
      // console.log("Submitting contact form...");
      const response = await fetch(`http://localhost:3000/api/auth/AbrarMojahidRafi_PortfolioWebsite/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactInfo),
      });
      // console.log("Response Data : ", response);
      
      if (response.ok) {
        const data = await response.json();
        // console.log("Contact form submitted successfully:", data);
        // alert("Contact form submitted successfully!");
        toast.success("Contact form submitted successfully!");
        // Reset form fields, but keep user info if logged in
        setContactInfo({
          username: user ? user.name : "",
          contact: user ? user.contact : "",
          email: user ? user.email : "",
          subject: "",
          message: "",
        });
      } else {
        const errorData = await response.text();
        // console.error("Error submitting contact form:", errorData);
        // alert("Error submitting contact form: " + errorData); 
        toast.error("Error submitting contact form: " + errorData);
      }
    } catch (error) {
      // console.log("Error", error);
      toast.error("Error submitting contact form. Please try again.");
    }
  };

return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-6xl w-full">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="text-left py-8 bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
            <p className="text-gray-600 mt-2">Get in touch with us. We'd love to hear from you!</p>
          </div>
          
          <div className="md:grid md:grid-cols-2">
            {/* Contact Image */}
            <div className="hidden md:block">
              <img
                src="https://voyager.postman.com/illustration/communication-postmanaut-laptop-postman-illustration.svg"
                alt="Contact us illustration"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Contact Form */}
            <div className="py-12 px-6 sm:px-12">
              <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={contactInfo.username}
                    onChange={handleInput}
                    placeholder="Enter your username"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={contactInfo.contact}
                    onChange={handleInput}
                    placeholder="Enter your contact number"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleInput}
                    placeholder="Enter your email"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={contactInfo.subject}
                    onChange={handleInput}
                    placeholder="Enter message subject"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={contactInfo.message}
                    onChange={handleInput}
                    placeholder="Enter your message"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ContactUs