import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// Import your modal components here:
import LoginModal from "../LoginModal/LoginModal"; 
import RegisterModal from "../RegisterModal/RegisterModal"; 
import { searchNews } from "../utils/newsApi.js";

function App() {
  // --- Search UI State ---
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);

  // --- Modal Visibility States ---
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // --- Simulated Authentication & User States ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('mock_jwt') !== null;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('mock_jwt');
    return token ? { name: 'Explorer', email: 'explorer@news.com' } : null;
  });

  // --- Simulated Database Storage ---
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState('');

  // --- Modal Action Handlers ---
  const handleSignInClick = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  // --- API Search Request Trigger ---
  const handleSearchSubmit = (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchError('');
    setArticles([]);
    setVisibleCount(3);
    setCurrentKeyword(keyword);
    searchNews(keyword)
      .then((data) => {
        if (data.articles) {
          const mappedArticles = data.articles.map((apiArticle) => {
            const isAlreadySaved = savedArticles.some((saved) => saved.url === apiArticle.url);
            return { ...apiArticle, isSaved: isAlreadySaved };
          });
          setArticles(mappedArticles);
        }
      })
      .catch((err) => {
        console.error(err);
        setSearchError('Sorry, something went wrong during the request. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // --- Pagination Trigger ---
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const handleCardSave = (card) => {
    if (!isLoggedIn) {
      handleSignInClick(); // Open modal if anonymous user tries to save
      return;
    }
    if (card.isSaved) {
      handleCardDelete(card);
      return;
    }
    const cardWithMeta = { ...card, isSaved: true, keyword: currentKeyword || 'General' };
    setSavedArticles((prev) => [cardWithMeta, ...prev]);
    setArticles((prev) => prev.map((item) => (item.url === card.url ? { ...item, isSaved: true } : item)) );
  };

  const handleCardDelete = (card) => {
    setSavedArticles((prev) => prev.filter((item) => item.url !== card.url));
    setArticles((prev) => prev.map((item) => (item.url === card.url ? { ...item, isSaved: false } : item)) );
  };

  const handleLogin = (email) => {
    localStorage.setItem('mock_jwt', 'simulated-session-web-token');
    setIsLoggedIn(true);
    setCurrentUser({ name: 'Explorer', email: email });
    closeAllModals();
  };

  const handleLogout = () => {
    localStorage.removeItem('mock_jwt');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
  };

  return (
    <div className="page">
      <Header 
        isLoggedIn={isLoggedIn} 
        userName={currentUser?.name} 
        onLogoutClick={handleLogout} 
        onSignInClick={handleSignInClick} // 👈 Fixed: Now opens the state instead of logging in instantly
      />
      <Routes>
        <Route path="/" element={
          <Main 
            onSearchSubmit={handleSearchSubmit} 
            onShowMore={handleShowMore} 
            cards={articles} 
            isLoading={isLoading} 
            hasSearched={hasSearched} 
            searchError={searchError} 
            visibleCount={visibleCount} 
            onCardSave={handleCardSave} 
            onCardDelete={handleCardDelete} 
            isLoggedIn={isLoggedIn} 
            onAuthModalOpen={handleSignInClick} 
          />
        } />
        <Route path="/saved-news" element={
          <SavedNews 
            savedCards={savedArticles} 
            onCardDelete={handleCardDelete} 
            isLoggedIn={isLoggedIn} 
            currentUser={currentUser} 
          />
        } />
      </Routes>
      <Footer />

      {/* --- Overlay Modals Injection Layer --- */}
      {isLoginModalOpen && (
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={closeAllModals} 
          onLogin={handleLogin} 
          onRedirect={handleRegisterClick} 
        />
      )}
      {isRegisterModalOpen && (
        <RegisterModal 
          isOpen={isRegisterModalOpen} 
          onClose={closeAllModals} 
          onRedirect={handleSignInClick} 
        />
      )}
    </div>
  );
}

export default App;
