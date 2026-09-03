import { useState, useEffect } from 'react'; 
import { Routes, Route } from 'react-router-dom'; 
import Main from './Main'; 
import SavedNews from './SavedNews'; // Fixed: Added missing closing quote
import Header from './Header';       // Fixed: Added missing closing quote
import Footer from './Footer';       // Fixed: Removed trailing slash and added missing closing quote
import { searchNews } from '../utils/newsApi'; 

function App() { 
  const [articles, setArticles] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hasSearched, setHasSearched] = useState(false); 
  const [searchError, setSearchError] = useState(''); 
  const [visibleCount, setVisibleCount] = useState(3); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [savedArticles, setSavedArticles] = useState([]); 
  const [currentKeyword, setCurrentKeyword] = useState(''); 

  useEffect(() => { 
    const token = localStorage.getItem('mock_jwt'); 
    if (token) { 
      setIsLoggedIn(true); 
      setCurrentUser({ name: 'Explorer', email: 'explorer@news.com' }); 
    } 
  }, []); 

  const handleLogin = (email, password) => { 
    localStorage.setItem('mock_jwt', 'simulated-session-web-token'); 
    setIsLoggedIn(true); 
    setCurrentUser({ name: 'Explorer', email }); 
  }; 

  const handleLogout = () => { 
    localStorage.removeItem('mock_jwt'); 
    setIsLoggedIn(false); 
    setCurrentUser(null); 
    setArticles((prev) => prev.map((art) => ({ ...art, isSaved: false }))); 
  }; 

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

  const handleShowMore = () => { 
    setVisibleCount((prevCount) => prevCount + 3); 
  }; 

  const handleCardSave = (card) => { 
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

  return ( 
    <div className="page"> 
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUser={currentUser} /> 
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
            onAuthModalOpen={() => handleLogin('explorer@news.com', 'password')} 
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
    </div> 
  ); 
} 

export default App;
