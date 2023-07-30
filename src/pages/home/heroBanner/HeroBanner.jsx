import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import "./style.scss";

import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';


const HeroBanner = () => {

    const navigate = useNavigate();
    const { url } = useSelector(state => state.home);

    const [background, setBackground] = useState('');
    const [query, setQuery] = useState('');

    const { data, isLoading } = useFetch("/movie/popular");

    useEffect(() => {
        let bg = data?.results?.[Math.floor(Math.random() * data?.results?.length)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    const searchQueryHandler = (e) => {
        if (e.keyCode === 13 && query !== '') {
            navigate(`/search/${query}`);
        }
    }
    return (
        <div className='heroBanner'>
            {
                !isLoading &&
                <div className="backdrop-img">
                    <Img src={`${url.backdrop}${background}`} alt="backdrop" />
                </div>
            }

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">Millions of Movies, TV Shows and people to discover. Explore Now.</span>
                    <div className="searchInput">
                        <input type="text" placeholder='Search for a movie or TV show....'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                            value={query} />
                        <button>Search</button>
                    </div>
                </div>           
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
