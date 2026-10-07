import "./SavedNews.css";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ savedCards = [], onCardDelete, isLoggedIn, currentUser }) {
  // Format keywords according to the Figma specification
  const renderKeywordSummary = () => {
    const rawKeywords = savedCards
      .map((card) => card.keyword)
      .filter(Boolean);

    // Normalize and count frequency (case-insensitive deduplication)
    const counts = {};
    const displayMap = {};

    rawKeywords.forEach((kw) => {
      const lower = kw.toLowerCase();
      // Capitalize first letter of each keyword
      const formatted = kw.charAt(0).toUpperCase() + kw.slice(1);
      counts[lower] = (counts[lower] || 0) + 1;
      if (!displayMap[lower]) {
        displayMap[lower] = formatted;
      }
    });

    const sortedUniqueKeys = Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a],
    );
    const totalKeywords = sortedUniqueKeys.length;

    if (totalKeywords === 0) return null;

    if (totalKeywords === 1) {
      return (
        /* FIXED: Updated single underscore (_) variants to strict BEM double hyphens (--) */
        <span className="saved-news__keywords--bold">
          {displayMap[sortedUniqueKeys[0]]}
        </span>
      );
    }

    if (totalKeywords === 2) {
      return (
        <>
          <span className="saved-news__keywords--bold">
            {displayMap[sortedUniqueKeys[0]]}
          </span>{" "}
          and{" "}
          <span className="saved-news__keywords--bold">
            {displayMap[sortedUniqueKeys[1]]}
          </span>
        </>
      );
    }

    if (totalKeywords === 3) {
      return (
        <>
          <span className="saved-news__keywords--bold">
            {displayMap[sortedUniqueKeys[0]]}
          </span>
          ,{" "}
          <span className="saved-news__keywords--bold">
            {displayMap[sortedUniqueKeys[1]]}
          </span>
          , and{" "}
          <span className="saved-news__keywords--bold">
            {displayMap[sortedUniqueKeys[2]]}
          </span>
        </>
      );
    }

    // When 4 or more keywords exist: "A, B, and X other"
    const remainingCount = totalKeywords - 2;
    return (
      <>
        <span className="saved-news__keywords--bold">
          {displayMap[sortedUniqueKeys[0]]}
        </span>
        ,{" "}
        <span className="saved-news__keywords--bold">
          {displayMap[sortedUniqueKeys[1]]}
        </span>
        , and{" "}
        <span className="saved-news__keywords--bold">
          {remainingCount} other
        </span>
      </>
    );
  };

  return (
    <main className="saved-news">
      {/* 1. Header Information Area */}
      <section className="saved-news__header">
        <p className="saved-news__subtitle">Saved articles</p>
        <h1 className="saved-news__title">
          {currentUser?.name || "User"}, you have {savedCards.length} saved{" "}
          {savedCards.length === 1 ? "article" : "articles"}
        </h1>
        {savedCards.length > 0 && (
          <p className="saved-news__keywords">
            By keywords: {renderKeywordSummary()}
          </p>
        )}
      </section>

      {/* 2. Saved Cards Grid Area */}
      <section className="saved-news__content">
        {savedCards.length > 0 ? (
          <NewsCardList
            cards={savedCards}
            onCardDelete={onCardDelete}
            isLoggedIn={isLoggedIn}
            /* FIXED: Changed from isSavedNews={true} to align perfectly with NewsCardList keys */
            isSavedNewsPage={true}
          />
        ) : (
          <p className="saved-news__empty-message">No articles saved yet.</p>
        )}
      </section>
    </main>
  );
}

export default SavedNews;
