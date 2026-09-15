import "./SavedNews.css";
import NewsCardList from "../NewsCardList/NewsCardList"; // Adjust path if needed

function SavedNews({ savedCards = [], onCardDelete, isLoggedIn, currentUser }) {
  // Extract unique keywords and sort them by frequency of appearance
  const getKeywordSummary = () => {
    const keywords = savedCards.map((card) => card.keyword).filter(Boolean);
    const counts = {};
    keywords.forEach((kw) => {
      counts[kw] = (counts[kw] || 0) + 1;
    });

    // Sort keywords from most frequent to least frequent
    const sortedKeywords = Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a],
    );

    if (sortedKeywords.length === 0) {
      return "";
    }
    if (sortedKeywords.length <= 3) {
      return sortedKeywords.join(", ");
    }

    // If there are more than 3 keywords, group the remainder into "and X more"
    return `${sortedKeywords.slice(0, 2).join(", ")}, and ${sortedKeywords.length - 2} more`;
  };

  return (
    <section className="saved-news">
      {/* 1. High-level Summary Header block */}
      <div className="saved-news__header">
        <p className="saved-news__subtitle">Saved articles</p>
        <h1 className="saved-news__title">
          {currentUser?.name || "User"}, you have {savedCards.length} saved
          articles
        </h1>
        {savedCards.length > 0 && (
          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords-bold">
              {getKeywordSummary()}
            </span>
          </p>
        )}
      </div>

      {/* 2. Card Content Grid Wrapper layout area */}
      <div className="saved-news__container">
        {savedCards.length > 0 ? (
          /* Fixed: Synchronized component properties to match NewsCardList definitions */
          <NewsCardList
            cards={savedCards}
            onCardDelete={onCardDelete}
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <p className="saved-news__empty-message">No articles saved yet.</p>
        )}
      </div>
    </section>
  );
}

export default SavedNews;
