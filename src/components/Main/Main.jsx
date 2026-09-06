import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import Preloader from "../Preloader/Preloader"; // Uncommented if these exist

function Main({
  onSearchSubmit,
  cards = [], // Fallback default to prevent slice crashes
  isLoading,
  hasSearched,
  searchError,
  visibleCount, // Fixed: Cleaned up loose parameters here
  onShowMore,
  onCardSave,
  onCardDelete,
  isLoggedIn,
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
              <Preloader />
              <p className="main__status-text">Searching for news...</p>
            </div>
          )}

          {/* Render layout states once loading has finalized */}
          {!isLoading && (
            <>
              {/* 2. Error Message handler */}
              {searchError && <p className="main__error-text">{searchError}</p>}

              {/* 3. Nothing Found handling */}
              {hasSearched && cards.length === 0 && !searchError && (
                <div className="main__not-found-container">
                  {/* Fixed: Removed the undefined <NotFound /> tag to stop lint compiler crashes */}
                  <h3 className="main__not-found-title">Nothing Found</h3>
                  <p className="main__status-text">
                    Sorry, but nothing matched your search terms.
                  </p>
                </div>
              )}

              {/* 4. Valid card results layer */}
              {cards.length > 0 && (
                <>
                  <h2 className="main__title">Search results</h2>
                  
                  {/* Slices array directly up to the current visible count */}
                  <NewsCardList
                    cards={cards.slice(0, visibleCount)}
                    isSearching={isLoading}
                    onCardSave={onCardSave}
                    onCardDelete={onCardDelete}
                    isLoggedIn={isLoggedIn}
                  />

                  {/* 5. Pagination control hidden if elements are exhausted */}
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
