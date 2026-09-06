import "./Preloader.css";

function Preloader({ text = "Searching for news..." }) {
  return (
    <div className="preloader">
      {/* Visual CSS loading spinner ring */}
      <div className="circle-preloader" />

      {/* Accessible context label description */}
      <p className="preloader__text">{text}</p>
    </div>
  );
}

export default Preloader;
