import "./Preloader.css";

function Preloader({ text = "Searching for news..." }) {
  return (
    <div className="preloader">
      {/* FIXED: Converted to a proper BEM element selector matching the block architecture */}
      <div className="preloader__circle" />

      {/* Accessible context label description */}
      <p className="preloader__text">{text}</p>
    </div>
  );
}

export default Preloader;
