import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearchSubmit }) { // Fixed: Synced prop name with Main.jsx parameters
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
    // Clear the error message while the user is typing a correction
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that the text is not empty or just spaces
    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }

    // Clear any existing errors and submit the valid keyword
    setError("");
    onSearchSubmit(keyword.trim());
  };

  return (
    <div className="search-form__container">
      <h1 className="search-form__title">What's going on in the world?</h1>
      <p className="search-form__subtitle">
        Find the latest news on any topic and save them in your personal account.
      </p>

      <form className="search-form" onSubmit={handleSubmit} noValidate>
        {/* Fixed: Grouped fields into a structured row block to preserve layout alignment */}
        <div className="search-form__field-wrapper">
          <input
            type="text"
            className="search-form__input"
            placeholder="Enter topic"
            value={keyword}
            onChange={handleChange}
            required
          />
          
          {/* Displays the error message visually when it exists */}
          {error && <span className="search-form__error">{error}</span>}
          
          <button type="submit" className="search-form__button">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
