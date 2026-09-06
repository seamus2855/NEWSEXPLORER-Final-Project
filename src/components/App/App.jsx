import { useState } from "react"; 
import { Routes, Route } from "react-router-dom"; 
import Main from "../Main/Main"; 
import SavedNews from "../SavedNews/SavedNews"; 
import Header from "../Header/Header"; 
import Footer from "../Footer/Footer"; 
import { searchNews } from "../../utils/newsApi.js"; 

function App() { 
  // --- Search UI State --- 
  const [articles, setArticles] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hasSearched, setHasSearched] = useState(false); 
  const [searchError, setSearchError] = useState(''); 
  const [visibleCount, setVisibleCount] = useState(3); 
  
  // --- Simulated Authentication & User States --- 
  // Fixed: Derived initial state natively to satisfy react-hooks/set-state-in-effect
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
          // Match bookmark indicators immediately upon fetching data
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

  // Fixed: Synchronized bookmarked states natively inside handlers to bypass cascading render errors
  const handleCardSave = (card) => { 
    if (card.isSaved) { 
      handleCardDelete(card); 
      return; 
    } 
    const cardWithMeta = { 
      ...card, 
      isSaved: true, 
      keyword: currentKeyword || 'General' 
    }; 
    setSavedArticles((prev) => [cardWithMeta, ...prev]);
    setArticles((prev) => 
      prev.map((item) => (item.url === card.url ? { ...item, isSaved: true } : item))
    );
  }; 

  const handleCardDelete = (card) => { 
    setSavedArticles((prev) => prev.filter((item) => item.url !== card.url)); 
    setArticles((prev) => 
      prev.map((item) => (item.url === card.url ? { ...item, isSaved: false } : item))
    );
  }; 

  // Fixed: Removed the unused 'password' argument to satisfy the no-unused-vars requirement
  const handleLogin = (email) => { 
    localStorage.setItem('mock_jwt', 'simulated-session-web-token'); 
    setIsLoggedIn(true); 
    setCurrentUser({ name: 'Explorer', email: email }); 
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
        onSignInClick={() => handleLogin('explorer@news.com')} 
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
              onAuthModalOpen={() => handleLogin('explorer@news.com')} 
            /> 
          } 
        /> 
        <Route 
          path="/saved-news" 
          element={ 
            <SavedNews 
              savedCards={savedArticles} 
              onCardDelete={handleCardDelete} 
              isLoggedIn={isLoggedIn} 
              currentUser={currentUser} 
            /> 
          } 
        /> 
      </Routes> 
      <Footer /> 
    </div> 
  ); 
} 

export default App;
