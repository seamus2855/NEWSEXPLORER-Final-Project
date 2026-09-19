import "./NewsCard.css";

function NewsCard({
  card,
  isLoggedIn,
  isSavedNewsPage,
  onBookmarkClick,
  onDeleteClick,
  onAuthModalOpen,
}) {
  // Extract and adapt properties safely
  const title = card.title || "No Title Provided";
  const text =
    card.description || card.text || "No preview description available.";
  const date = card.publishedAt || card.date;
  const source = card.source?.name || card.source || "Unknown Source";
  const image = card.urlToImage || card.image || "https://unsplash.com"; // Reliable fallback news image
  const link = card.url || card.link;
  const isSaved = card.isSaved || false;
  const keyword = card.keyword || "";

  // Format date matching standard guidelines (e.g., "August 2, 2026")
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate)
      ? ""
      : parsedDate.toLocaleDateString("en-US", options);
  };

  const handleActionButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stops the card click handler from triggering

    if (!isLoggedIn) {
      onAuthModalOpen();
      return;
    }

    if (isSavedNewsPage) {
      onDeleteClick(card);
      return;
    }

    onBookmarkClick(card);
  };

  const handleCardClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article
      className="news-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      {/* Article image layout */}
      <img src={image} alt={title} className="news-card__image" />

      {/* Top action panel overlay */}
      <div
        className="news-card__top-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Render keyword block only on Saved News page */}
        {isSavedNewsPage && keyword && (
          <div className="news-card__keyword">{keyword}</div>
        )}

        <div className="news-card__action-container">
          <button
            type="button"
            className={`news-card__button ${
              isSavedNewsPage
                ? "news-card__button_type_trash"
                : isSaved
                  ? "news-card__button_type_bookmark-marked"
                  : "news-card__button_type_bookmark"
            }`}
            onClick={handleActionButtonClick}
            aria-label={isSavedNewsPage ? "Delete article" : "Save article"}
          />

          {/* Tooltips targetable via general sibling selector (~) */}
          {!isLoggedIn && !isSavedNewsPage && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
          {isSavedNewsPage && (
            <span className="news-card__tooltip">Remove from saved</span>
          )}
        </div>
      </div>

      {/* Main card description text context */}
      <div className="news-card__text-container">
        <p className="news-card__date">{formatDate(date)}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{text}</p>
        <p className="news-card__source">{source}</p>
      </div>
    </article>
  );
}

export default NewsCard;
