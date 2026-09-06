import { useState, useEffect } from "react"; // Fixed: Added missing React hooks hooks
import { Routes, Route } from "react-router-dom"; // Fixed: Added missing router routing tokens
import Main from "../Main/Main"; 
import SavedNews from "../SavedNews/SavedNews"; 
import Header from "../Header/Header"; 
import Footer from "../Footer/Footer"; 
import { searchNews } from "../../utils/NewsAPI"; 

function App() { 
  // --- Search UI State --- 
  const [articles, setArticles] = useState([]); // All fetched articles 
  const [isLoading, setIsLoading] = useState(false); // Preloader visibility 
  const [hasSearched, setHasSearched] = useState(false); // Has a search been attempted? 
  const [searchError, setSearchError] = useState(''); // API error messages 
  const [visibleCount, setVisibleCount] = useState(3); // Pagination tracker 
  
  // --- Simulated Authentication & User States --- 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null); // Stores logged-in profile data 
  
  // --- Simulated Database Storage --- 
  const [savedArticles, setSavedArticles] = useState([]); 
  const [currentKeyword, setCurrentKeyword] = useState(''); // Tracks active keyword for attaching to saved tags 

  // 1. STUB: Check for an authentication token on browser startup 
  useEffect(() => { 
    const token = localStorage.getItem('mock_jwt'); 
    if (token) { 
      setIsLoggedIn(true); 
      setCurrentUser({ name: 'Explorer', email: 'explorer@news.com' }); 
    } 
  }, []); 

  // Sync main articles search cards whenever saved articles change behind the scenes 
  useEffect(() => { 
    setArticles((prevArticles) => 
      prevArticles.map((apiArticle) => { 
        const isAlreadySaved = savedArticles.some((saved) => saved.url === apiArticle.url); 
        return { ...apiArticle, isSaved: isAlreadySaved }; 
      }) 
    ); 
  }, [savedArticles]); 

  // 2. STUB: Login handler simulation 
  const handleLogin = (email, password) => { 
    localStorage.setItem('mock_jwt', 'simulated-session-web-token'); 
    setIsLoggedIn(true); 
    setCurrentUser({ name: 'Explorer', email: email }); 
  }; 

  // 3. STUB: Logout handler simulation 
  const handleLogout = () => { 
    localStorage.removeItem('mock_jwt'); 
    setIsLoggedIn(false); 
    setCurrentUser(null); 
    setSavedArticles([]); // Clear saved grid display data on user profile exit 
  }; 

  // --- API Search Request Trigger --- 
  const handleSearchSubmit = (keyword) => { 
    setIsLoading(true); 
    setHasSearched(true); 
    setSearchError(''); 
    setArticles([]); 
    setVisibleCount(3); 
    setCurrentKeyword(keyword); // Keep track of the active search query string for keyword tagging 
    
    searchNews(keyword) 
      .then((data) => { 
        if (data.articles) { 
          // Cross-reference with existing saved articles to keep bookmark states matched 
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
        setIsLoading(false); // Remove preloader 
      }); 
  }; 

  // --- Pagination Trigger --- 
  const handleShowMore = () => { 
    setVisibleCount((prevCount) => prevCount + 3); 
  }; 

  // 4. STUB: Save Card simulation with keyword tag injection 
  const handleCardSave = (card) => { 
    // If the article is already marked as saved, intercept the action and delete it (toggles flag) 
    if (card.isSaved) { 
      handleCardDelete(card); 
      return; 
    } 
    const cardWithMeta = { 
      ...card, 
      isSaved: true, 
      keyword: currentKeyword || 'General' // Populates specific custom keyword badge for Figma matching 
    }; 
    setSavedArticles((prev) => [cardWithMeta, ...prev]); 
  }; 

  // 5. STUB: Delete Card simulation with multi-view state matching 
  const handleCardDelete = (card) => { 
    // Remove card from saved list stack array 
    setSavedArticles((prev) => prev.filter((item) => item.url !== card.url)); 
  }; 

  return ( 
    <div className="page"> 
      {/* Fixed: Synced prop names with Header component definitions to map user profile text */}
      <Header 
        isLoggedIn={isLoggedIn} 
        userName={currentUser?.name} 
        onLogoutClick={handleLogout} 
        onSignInClick={() => handleLogin('explorer@news.com', 'password')} 
      /> 
      
      <Routes> 
        {/* Main home route receives search results state & functions */} 
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
              onAuthModalOpen={() => handleLogin('explorer@news.com', 'password')} // Simulated direct login for click testing 
            /> 
          } 
        /> 
        
        {/* Saved news layout route */} 
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
