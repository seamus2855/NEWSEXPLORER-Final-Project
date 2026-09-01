import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  // 1. Maintain a state for the explicit validation error message
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
    // Clear the error message while the user is typing a correction
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 2. Validate that the text is not empty or just spaces
    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }

    // Clear any existing errors and submit the valid keyword
    setError("");
    onSearch(keyword.trim());
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__input-wrapper">
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter topic"
          value={keyword}
          onChange={handleChange}
          required
        />
        {/* 3. Display the error message visually when it exists */}
        {error && <span className="search-form__error">{error}</span>}
      </div>
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
