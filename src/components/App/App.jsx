import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 🍏 FIX 1: Point to the hook file inside your contexts folder
import { useAuth } from "../../hooks/useAuth.js";

import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Modals layer
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

// 🍏 FIX 2: Correct path and case-sensitivity for your News API utility
import { searchNews } from "../../NewsApi.js";

function App() {
  // --- Destructure Globally Managed Global Auth Context States ---
  const {
    isLoggedIn,
    currentUser,
    login,
    logout,
    isLoading: isAuthLoading,
  } = useAuth();

  // --- Core Layout & Search Engine UI State ---
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  // --- Structural Context Modals Layer ---
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // --- Local UI Storage for Saved Cards Persistence Layer ---
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");

  // --- Modal Navigation State Controls ---
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

  // --- API Search Handling Core Logic ---
  const handleSearchSubmit = (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchError(""); // 👈 Fixed: Consistent double quotes
    setArticles([]);
    setVisibleCount(3);
    setCurrentKeyword(keyword);

    searchNews(keyword)
      .then((data) => {
        if (data.articles) {
          const mappedArticles = data.articles.map((apiArticle) => {
            const isAlreadySaved = savedArticles.some(
              (saved) => saved.url === apiArticle.url,
            );
            return { ...apiArticle, isSaved: isAlreadySaved };
          });
          setArticles(mappedArticles);
        }
      })
      .catch((err) => {
        console.error(err);
        setSearchError(
          "Sorry, something went wrong during the request. Please try again later.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // --- Card State Mutators & Pagination Handlers ---
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const handleCardSave = (card) => {
    if (!isLoggedIn) {
      handleSignInClick();
      return;
    }
    if (card.isSaved) {
      handleCardDelete(card);
      return;
    }
    const cardWithMeta = {
      ...card,
      isSaved: true,
      keyword: currentKeyword || "General",
    };
    setSavedArticles((prev) => [cardWithMeta, ...prev]);
    setArticles((prev) =>
      prev.map((item) =>
        item.url === card.url ? { ...item, isSaved: true } : item,
      ),
    );
  };

  const handleCardDelete = (card) => {
    setSavedArticles((prev) => prev.filter((item) => item.url !== card.url));
    setArticles((prev) =>
      prev.map((item) =>
        item.url === card.url ? { ...item, isSaved: false } : item,
      ),
    );
  };

  // --- Handle Context Action Mapping Pipelines ---
  const handleLoginSubmit = (email) => {
    login({ name: "Explorer", email: email }, "simulated-session-web-token");
    closeAllModals();
  };

  const handleLogoutClick = () => {
    logout();
    setSavedArticles([]);
  };

  if (isAuthLoading) {
    return <div className="loading-screen">Loading layout...</div>;
  }

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        userName={currentUser?.name}
        onLogoutClick={handleLogoutClick}
        onSignInClick={handleSignInClick}
      />

      <Routes>
        <Route
          path="/"
          element={
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
          }
        />

        <Route
          path="/saved-news"
          element={
            isLoggedIn ? (
              <SavedNews
                savedCards={savedArticles}
                onCardDelete={handleCardDelete}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      <Footer />

      {/* --- Overlay Modals Injection Layer --- */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeAllModals}
          onLogin={handleLoginSubmit}
          onRedirect={handleRegisterClick}
        />
      )}
      {isRegisterModalOpen && (
        <RegisterModal
          isOpen={isRegisterModalOpen} // 👈 Fixed: Explicitly passed missing isOpen prop
          onClose={closeAllModals}
          onRedirect={handleSignInClick}
        />
      )}
    </div>
  );
}

export default App;
