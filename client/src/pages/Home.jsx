// Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = React.useMemo(() => [
    'Full Stack Web Developer',
    'Frontend Developer',
    'Backend Developer'
  ], []);

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % roles.length;
      const fullText = roles[current];
      
      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );
      
      setTypingSpeed(isDeleting ? 30 : 150);
      
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  return (
    <section className="hero-section min-h-screen flex items-center justify-center px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text Content - First Div */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 whitespace-nowrap">
              Hello, It's Me 
              <br />
              <span className="text-gradient">Abrar Mojahid Rafi</span>
            </h2>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 whitespace-nowrap">
              And I'm a <span className="animated-text">{text}</span>
              <span className="cursor">|</span>
            </h2>
            <p className="text-gray-800 mb-8 max-w-lg mx-auto md:mx-0">
              I'm a passionate developer with expertise in both frontend and backend technologies. 
              I love creating responsive, user-friendly web applications with clean and efficient code.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="btn-primary">Download CV</button>
              <button className="btn-secondary">Contact Me</button>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <a href="#" className="social-icon">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
          
          {/* Image Content - Second Div with Round Image */}
          <div className="md:w-1/2 flex flex-col items-center mt-10 md:mt-0">
            <div className="relative">
              <div className="profile-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Abrar Mojahid Rafi" 
                  className="profile-image"
                />
              </div>
              
              <div className="floating-element floating-element-1">
                <span>React</span>
              </div>
              <div className="floating-element floating-element-2">
                <span>Node.js</span>
              </div>
              <div className="floating-element floating-element-3">
                <span>MongoDB</span>
              </div>
              <div className="floating-element floating-element-4">
                <span>Tailwind</span>
              </div>
            </div>
            
            {/* Email display with icon - Moved further down */}
            <div className="email-display flex items-center justify-center mt-10">
              <i className="fas fa-envelope text-gray-700 mr-2"></i>
              <span className="text-gray-700">abrar.mojahid.rafi1@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;