import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearchSubmit, headerChildren }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }
    setError("");
    onSearchSubmit(keyword.trim());
  };

  return (
    <div className="search-form__hero-wrapper">
      {headerChildren}

      <div className="search-form__container">
        <h1 className="search-form__title">What's going on in the world?</h1>
        <p className="search-form__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>

        <form className="search-form" onSubmit={handleSubmit} noValidate>
          <div className="search-form__field-wrapper">
            <input
              type="text"
              className={`search-form__input${error ? " search-form__input--type-error" : ""}`}
              placeholder="Enter topic"
              value={keyword}
              onChange={handleChange}
              aria-label="Search news topics"
              required
            />
            <button type="submit" className="search-form__button">
              Search
            </button>
          </div>

          {error && (
            <span className="search-form__error" id="search-input-error" aria-live="polite">
              {error}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
