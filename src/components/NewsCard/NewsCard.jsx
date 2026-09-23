function NewsCard({
  card,
  isLoggedIn,
  isSavedNewsPage,
  onBookmarkClick,
  onDeleteClick,
  onAuthModalOpen,
}) {
  const title = card.title || "Untitled Article";
  const text = card.description || "No preview description available.";
  const date = card.publishedAt;
  const source = card.source?.name || "Unknown Source";
  const image = card.urlToImage || card.image || "https://unsplash.com"; // Added a functional generic news image fallback
  const link = card.url || card.link;
  const isSaved = card.isSaved || false;
  const keyword = card.keyword || "";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleActionButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

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

  return (
    <article className="news-card">
      <a href={link} target="_blank" rel="noreferrer" className="news-card__link">
        <img
          src={image}
          alt={title}
          className="news-card__image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://unsplash.com";
          }}
        />
      </a>

      <div className="news-card__top-container">
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
          {!isLoggedIn && !isSavedNewsPage && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
          {isSavedNewsPage && (
            <span className="news-card__tooltip">Remove from saved</span>
          )}
        </div>
      </div>

      <a href={link} target="_blank" rel="noreferrer" className="news-card__text-container">
        <p className="news-card__date">{formatDate(date)}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{text}</p>
        <p className="news-card__source">{source}</p>
      </a>
    </article>
  );
}

export default NewsCard;
