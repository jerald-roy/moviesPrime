import HomePage from "./pages/homePage"
import MovieDetails from "./pages/movieDetails";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}> </Route>
        <Route path="/movie/:imdbID" element={<MovieDetails></MovieDetails>}> </Route>
        </Routes>
  </BrowserRouter>
  </>
}

export default App
