import React from 'react';

function NewsCard({ 
  card, 
  isLoggedIn, 
  isSavedNewsPage, 
  onBookmarkClick, 
  onDeleteClick, 
  onAuthModalOpen 
}) {
  // MAPPED FOR NEWS API: Extract and adapt properties from the News API response structure
  const title = card.title;
  const text = card.description || "No preview description available.";
  const date = card.publishedAt;
  const source = card.source?.name || "Unknown Source";
  const image = card.urlToImage || "https://unsplash.com";
  const link = card.url;
  const isSaved = card.isSaved || false;
  const keyword = card.keyword || ""; 

  // Format date to long form text style matching the spec (e.g., "August 2, 2026")
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleActionButtonClick = (e) => {
    e.preventDefault(); // Stop click from firing anchor link
    if (!isLoggedIn) {
      onAuthModalOpen();
      return;
    }
    if (isSavedNewsPage) {
      onDeleteClick(card);
    } else { // FIXED: Added proper else block to cleanly split callback executions
      onBookmarkClick(card);
    }
  };

  return (
    <article className="news-card">
      {/* Article image link */}
      <a href={link} target="_blank" rel="noreferrer" className="news-card__link">
        <img src={image} alt={title || "News image"} className="news-card__image" />
      </a>

      {/* Top action panel */}
      <div className="news-card__top-container">
        {/* Render keyword block only on Saved News page */}
        {isSavedNewsPage && keyword && (
          <div className="news-card__keyword">{keyword}</div>
        )}
        
        <div className="news-card__action-container">
          {/* FIX: Button placed first so CSS sibling combinator (~) can target tooltips */}
          <button 
            type="button" 
            className={`news-card__button ${
              isSavedNewsPage 
                ? 'news-card__button_type_trash' 
                : isSaved 
                  ? 'news-card__button_type_bookmark-marked' 
                  : 'news-card__button_type_bookmark'
            }`} 
            onClick={handleActionButtonClick} 
            aria-label={isSavedNewsPage ? 'Delete article' : 'Save article'} 
          />

          {/* Contextual tooltips placed after button */}
          {!isLoggedIn && !isSavedNewsPage && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
          {isSavedNewsPage && (
            <span className="news-card__tooltip">Remove from saved</span>
          )}
        </div>
      </div>

      {/* Main card description text context link wrapper */}
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
