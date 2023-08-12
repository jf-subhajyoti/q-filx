import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import { getDataFromApi } from "./utils/api";
import Home from "./pages/home/Home";
import Detail from "./pages/details/Detail";
import SearchResult from "./pages/searchResults/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFoundError from "./pages/pageNotFoundError/PageNotFoundError";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {

  const dispatch = useDispatch();

  const getConfigurationData = async () => {
    let data = await getDataFromApi('/configuration');

    let url = {
      image_baseUrl: data.images.secure_base_url,
      backdrop: data.images.secure_base_url + "original",
      poster: data.images.secure_base_url + "original",
      profile: data.images.secure_base_url + "original",
    };
    
    dispatch(getApiConfiguration(url));
  }

  const getGenresData = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let genresData = {};

    endPoints.forEach(endPoint => {
      promises.push(getDataFromApi(`/genre/${endPoint}/list`));
    })

    const data = await Promise.all(promises);

    data.map(({genres}) => {
      return genres.map(item => (genresData[item.id] = item));
    });

    dispatch(getGenres(genresData));
  }

  useEffect(() => {
    getConfigurationData();
    getGenresData();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/:mediaType/:id" element={<Detail />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFoundError />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
