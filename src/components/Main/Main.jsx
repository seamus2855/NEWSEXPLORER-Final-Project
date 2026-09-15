import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";

function Main({
  onSearchSubmit,
  cards = [],
  isLoading,
  hasSearched,
  searchError,
  visibleCount,
  onShowMore,
  onCardSave,
  onCardDelete,
  isLoggedIn,
}) {
  return (
    <main className="main">
      {/* Search landing background zone */}
      <SearchForm onSearchSubmit={onSearchSubmit} />

      {/* 1. Preloader block shown immediately while searching */}
      {isLoading && (
        <section className="main__results-container main__results-container_status">
          <div className="main__loader-container">
            <Preloader />
            <p className="main__status-text">Searching for news...</p>
          </div>
        </section>
      )}

      {/* Render layout states once loading has finalized */}
      {!isLoading && (
        <>
          {/* 2. Error Message handler */}
          {searchError && (
            <section className="main__results-container main__results-container_status">
              <p className="main__error-text">{searchError}</p>
            </section>
          )}

          {/* 3. Nothing Found handling */}
          {hasSearched && cards.length === 0 && !searchError && (
            <section className="main__results-container main__results-container_status">
              <div className="main__not-found-container">
                <div className="main__not-found-icon" />
                <h3 className="main__not-found-title">Nothing Found</h3>
                <p className="main__status-text">
                  Sorry, but nothing matched your search terms.
                </p>
              </div>
            </section>
          )}

          {/* 4. Valid card results layer */}
          {cards.length > 0 && !searchError && (
            <section className="main__results-container">
              <h2 className="main__title">Search results</h2>
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
                  aria-label="Show more news articles"
                >
                  Show more
                </button>
              )}
            </section>
          )}
        </>
      )}

      {/* Static About Author section */}
      <About />
    </main>
  );
}

export default Main;
