function NewsCard({
  card,
  isLoggedIn,
  isSavedNewsPage,
  onBookmarkClick,
  onDeleteClick,
  onAuthModalOpen,
}) {
  // Extract and adapt properties safely
  const title = card.title;
  const text = card.description || "No preview description available.";
  const date = card.publishedAt;
  const source = card.source?.name || "Unknown Source";
  const image = card.urlToImage || card.image || "https://unsplash.com"; // Fallback generic news image
  const link = card.url || card.link;
  const isSaved = card.isSaved || false;
  const keyword = card.keyword || "";

  // Format date matching standard guidelines (e.g., "August 2, 2026")
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleActionButtonClick = (e) => {
    e.preventDefault(); // Stop click from firing anchor link
    e.stopPropagation(); // Prevent event bubbling up into wrapper links

    // 1. If user is logged out, show login modal immediately
    if (!isLoggedIn) {
      onAuthModalOpen();
      return;
    }

    // 2. If logged in and on the Saved News route, call delete
    if (isSavedNewsPage) {
      onDeleteClick(card);
      return;
    }

    // 3. If logged in and on the Main News page, toggle the bookmark handler
    onBookmarkClick(card);
  };

  return (
    <article className="news-card">
      {/* Article image link */}
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="news-card__link"
      >
        <img
          src={image}
          alt={title || "News article"}
          className="news-card__image"
        />
      </a>

      {/* Top action panel overlay */}
      <div className="news-card__top-container">
        {/* Render keyword block only on Saved News page */}
        {isSavedNewsPage && keyword && (
          <div className="news-card__keyword">{keyword}</div>
        )}

        <div className="news-card__action-container">
          {/* Button placed first so CSS sibling combinator (~) can target tooltips */}
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

          {/* Contextual tooltips placed after button for adjacent selector compatibility */}
          {!isLoggedIn && !isSavedNewsPage && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
          {isSavedNewsPage && (
            <span className="news-card__tooltip">Remove from saved</span>
          )}
        </div>
      </div>

      {/* Main card description text context link wrapper */}
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="news-card__text-container"
      >
        <p className="news-card__date">{formatDate(date)}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{text}</p>
        <p className="news-card__source">{source}</p>
      </a>
    </article>
  );
}

export default NewsCard;
