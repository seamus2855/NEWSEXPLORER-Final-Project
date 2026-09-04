// src/components/NewsCardList/NewsCardList.jsx
import React from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ cards, onCardSave, onCardDelete, isLoggedIn }) {
  return (
    <ul className="news-card-list">
      {cards.map((card, index) => (
        // Using url + index as key in case duplicate articles are returned by the API
        <li key={`${card.url}-${index}`}>
          <NewsCard 
            card={card}
            onCardSave={onCardSave}
            onCardDelete={onCardDelete}
            isLoggedIn={isLoggedIn}
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;
