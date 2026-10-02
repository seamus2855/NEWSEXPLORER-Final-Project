import NewsCard from "../NewsCard/NewsCard"; // Fixes the 'NewsCard' is not defined error
import "./NewsCardList.css";

function NewsCardList({
  cards,
  onCardSave,
  onCardDelete,
  isLoggedIn,
  isSavedNewsPage = false, // Defaults to false, but allows the SavedNews page to override it
  onAuthModalOpen,
}) {
  return (
    <ul className="news-card-list">
      {cards.map((card, index) => (
        // Using url + index as key in case duplicate articles are returned by the API
        <li key={`${card.url || index}-${index}`}>
          <NewsCard
            card={card}
            isLoggedIn={isLoggedIn}
            isSavedNewsPage={isSavedNewsPage}
            onBookmarkClick={onCardSave}
            onDeleteClick={onCardDelete}
            onAuthModalOpen={onAuthModalOpen} // Passed down to open login modal for unauthorized users
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;
