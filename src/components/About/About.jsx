import React from "react";
import "./About.css";
import authorImage from "../../images/author.jpg"; // Adjust path to your profile image asset

function About() {
  return (
    <section className="about">
      {/* Profile Image container */}
      <img 
        src={authorImage} 
        alt="Author of News Explorer" 
        className="about__image" 
      />
      
      {/* Content layout container */}
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        
        <p className="about__description">
          Hello! I'm a software developer with experience in creating responsive, 
          accessible web applications. This project demonstrates my frontend 
          development capabilities using React, React Router, and secure API integrations.
        </p>
        
        <p className="about__description">
          Through intense practical training, I have mastered building secure authentication 
          systems, structuring clean component architectures, and managing stateful interactive interfaces.
        </p>
      </div>
    </section>
  );
}

export default About;
