import "./AboutAuthor.css";

function AboutAuthor() {
	const baseUrl = import.meta.env?.BASE_URL || "/";
	const cleanImgPath = `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}images/about-author.svg`;

	return (
		<section className="about-author">
			<h2>About the Author</h2>
			<img src={cleanImgPath} alt="About Seamus" />
			<h3>Seamus</h3>
			<p>
				Welcome to my project! I am a passionate developer and creator focused
				on building clean, accessible, and user-centric web experiences. With a
				solid foundation in software engineering, I thoroughly enjoy solving
				complex algorithmic or interface problems through elegant, semantic
				code. This project represents a culmination of my practical skills
				engineering front-end user interfaces in React, configuring structured
				client-side form validation mechanisms, and parsing asynchronous data
				pipelines using third-party News REST APIs.
			</p>
			<a href="#projects">View My Work</a>
		</section>
	);
}

export default AboutAuthor;
