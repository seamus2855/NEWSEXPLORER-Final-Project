import "./NewsCard.css";
import notFoundImage from "../../images/not-found.svg";

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
  const source =
    typeof card.source === "string"
      ? card.source
      : card.source?.name || "Unknown Source";

  const image = card.urlToImage || card.image || notFoundImage;
  const link = card.url || card.link || undefined;
  const isSaved = Boolean(card.isSaved);
  const keyword = card.keyword || "";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const parsedDate = new Date(dateString);
    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = notFoundImage;
  };

  return (
    <article className="news-card">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__main-link"
      >
        <div className="news-card__image-container">
          <img
            src={image}
            alt={title}
            className="news-card__image"
            onError={handleImageError}
          />
        </div>

        <div className="news-card__text-container">
          <p className="news-card__date">{formatDate(date)}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__text">{text}</p>
          <p className="news-card__source">{source}</p>
        </div>
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
                ? "news-card__button--type-trash"
                : isSaved
                  ? "news-card__button--type-bookmark-marked"
                  : "news-card__button--type-bookmark"
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
    </article>
  );
}

export default NewsCard;
