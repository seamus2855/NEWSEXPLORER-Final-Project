import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm"; 
import NewsCardList from "../NewsCardList/NewsCardList"; 
import About from "../About/About";
// Import Preloader and NotFound components here if they exist separately
// import Preloader from "../Preloader/Preloader";
// import NotFound from "../NotFound/NotFound";

function Main({ 
  onSearchSubmit, 
  cards, 
  isLoading,        // Prop added to handle the preloader
  hasSearched,      // Prop added to check if a search has run
  searchError,      // Prop added to handle API failure text
  visibleCount,     // Prop added to track slice position
  onShowMore,       // Prop added to fetch 3 more cards
  onCardSave, 
  onCardDelete, 
  isLoggedIn 
}) {
  return (
    <main className="main">
      {/* Search landing background zone */}
      <SearchForm onSearchSubmit={onSearchSubmit} />

      {/* Dynamic Results Block Container */}
      {(isLoading || hasSearched || searchError || cards.length > 0) && (
        <section className="main__results-container">
          
          {/* 1. Preloader animation while searching */}
          {isLoading && (
            <div className="main__loader-container">
              {/* <Preloader /> or your loader markup */}
              <p className="main__status-text">Searching for news...</p>
            </div>
          )}

          {/* 2. Error Message handler */}
          {!isLoading && searchError && (
            <p className="main__error-text">{searchError}</p>
          )}

          {/* 3. Nothing Found handling */}
          {!isLoading && !searchError && hasSearched && cards.length === 0 && (
            <div className="main__not-found-container">
              {/* <NotFound /> or your not found markup */}
              <h3 className="main__not-found-title">Nothing Found</h3>
              <p className="main__status-text">Sorry, but nothing matched your search terms.</p>
            </div>
          )}

          {/* 4. Valid card results layer */}
          {!isLoading && cards.length > 0 && (
            <>
              <h2 className="main__title">Search results</h2>
              
              {/* Slices array directly in the render line up to the current count */}
              <NewsCardList 
                cards={cards.slice(0, visibleCount)} 
                isSearching={isLoading} 
                onCardSave={onCardSave} 
                onCardDelete={onCardDelete} 
                isLoggedIn={isLoggedIn} 
              />

              {/* 5. Pagination control hidden if array elements are exhausted */}
              {visibleCount < cards.length && (
                <button 
                  type="button" 
                  className="main__show-more-button" 
                  onClick={onShowMore}
                >
                  Show more
                </button>
              )}
            </>
          )}

        </section>
      )}

      {/* Static About Author section */}
      <About />
    </main>
  );
}

export default Main;
