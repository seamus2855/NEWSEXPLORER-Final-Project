import React from "react";
import { useLocation } from "react-router-dom";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ 
  cards = [], // Fallback default to prevent map crashes
  onCardSave, 
  onCardDelete, 
  isLoggedIn,
  onAuthModalOpen 
}) {
  const location = useLocation();

  // Determine if the current view is the saved news view
  const isSavedNewsPage = location.pathname === "/saved-news";

  return (
    <ul className="news-card-list">
      {cards.map((card, index) => (
        // Using url + index as key in case duplicate articles are returned by the API
        <li key={`${card.url || card.link || index}-${index}`} className="news-card-list__item">
          <NewsCard
            card={card}
            isLoggedIn={isLoggedIn}
            isSavedNewsPage={isSavedNewsPage} // Fixed: Passes route indicator flag directly down
            onBookmarkClick={onCardSave}      // Fixed: Mapped properly to match NewsCard callbacks
            onDeleteClick={onCardDelete}      // Fixed: Mapped properly to match NewsCard callbacks
            onAuthModalOpen={onAuthModalOpen}  // Fixed: Connects authorization modal trigger
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;
