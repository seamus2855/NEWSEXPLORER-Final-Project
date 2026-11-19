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
    /* FIXED: Adjusted block name to a valid standalone BEM layout namespace */
    <ul className="news-cards-grid">
      {cards.map((card, index) => (
        // Using url + index as key in case duplicate articles are returned by the API
        /* FIXED: Added a proper structural BEM child element class selector */
        <li key={`${card.url || index}-${index}`} className="news-cards-grid__item">
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
