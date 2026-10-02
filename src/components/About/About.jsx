// AboutAuthor.jsx
import "./AboutAuthor.css";

function AboutAuthor() {
  return (
    <section id="about-author" className="about-author-section">
      <div className="author-container">
        <div className="author-image-wrapper">
          {/* Points directly to the working asset in your public folder */}
          <img
            src="/images/about-author.svg"
            alt="Seamus, Full Stack Web Developer and creator of News Explorer"
            className="author-photo"
          />
        </div>
        <div className="author-bio-content">
          <h2 className="author-bio-content__title">About the Author</h2>
          <p className="author-name">
            <strong>Seamus</strong>
          </p>
          <p className="author-description">
            Welcome to my project! I am a passionate developer and creator
            focused on building clean, accessible, and user-centric web
            experiences. With a solid foundation in software engineering, I
            thoroughly enjoy solving complex algorithmic or interface problems
            through elegant, semantic code. This project represents a
            culmination of my practical skills engineering front-end user
            interfaces in React, configuring structured client-side form
            validation mechanisms, and parsing asynchronous data pipelines using
            third-party News REST APIs.
          </p>
          <div className="author-links">
            <a
              href="https://github.com"
              className="author-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutAuthor;
