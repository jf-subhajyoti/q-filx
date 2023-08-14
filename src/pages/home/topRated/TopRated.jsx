import React, { useState } from 'react'

import useFetch from '../../../hooks/useFetch';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

const TopRated = () => {
    const [endPoint, setEndPoint] = useState('movie');

    const handleTabChange = (tab) => {
        tab == 'Movies' ? setEndPoint('movie') : setEndPoint('tv');
    }

    const { data, isLoading } = useFetch(`/${endPoint}/top_rated`);

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={handleTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} isLoading={isLoading} media_type={endPoint} />
        </div>
    )
}

export default TopRated
