import "./AboutAuthor.css";
// IMPORT THE ACCESSIBLE SVG ASSET DIRECTLY FROM THE SRC DIRECTORY
import authorPhoto from "../images/about-author.svg";

function AboutAuthor() {
  return (
    <section id="about-author" className="about-author">
      <div className="about-author__container">
        {/* Enforces proper layout spacing and circular image bounds */}
        <div className="about-author__image-wrapper">
          <img 
            src={authorPhoto} 
            alt="Seamus, creator of News Explorer" 
            className="about-author__photo" 
          />
        </div>
        
        <div className="about-author__bio-content">
          <h2 className="about-author__title">About the Author</h2>
          <p className="about-author__name">
            <strong>Seamus</strong>
          </p>
          <p className="about-author__description">
            Welcome to my project! I am a passionate developer and creator focused
            on building clean, accessible, and user-centric web experiences. With a
            solid foundation in software engineering, I thoroughly enjoy solving
            complex algorithmic or interface problems through elegant, semantic
            code. This project represents a culmination of my practical skills
            engineering front-end user interfaces in React, configuring structured
            client-side form validation mechanisms, and parsing asynchronous data
            pipelines using third-party News REST APIs.
          </p>
          <div className="about-author__links">
            <a href="#projects" className="about-author__btn">
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutAuthor;
