import './App.css';

import Home from './components/nav/home';
import BookUpload from './components/bookUpload/book-upload';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './components/explore/explore';
import { client } from './client';
import { ApolloProvider } from '@apollo/client';

function App() {
  return (
    // <Router basename="/">
    //   <Routes>
    //     <Route path="/" element={<Home/>}/>
    //     <Route path="/upload" element={<BookUpload/>}/>
    //   </Routes>
    // </Router>

    <ApolloProvider client={client}>
      <div className="App">
        <Home></Home>
      </div>
    </ApolloProvider>
  );
}

export default App;
