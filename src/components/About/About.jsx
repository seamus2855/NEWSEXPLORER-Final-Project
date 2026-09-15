import "./About.css";

function About() {
  return (
    <section className="about">
      {/* Fixed: Use the clean public absolute path string directly */}
      <img src="/images/author.jpg" alt="Author" className="about__image" />
      <div className="about__text-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Write your author biography description text here...
        </p>
      </div>
    </section>
  );
}

export default About;
