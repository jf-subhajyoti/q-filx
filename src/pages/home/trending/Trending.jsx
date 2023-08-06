import React, { useState } from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import Carousel from '../../../components/carousel/Carousel'

import useFetch from '../../../hooks/useFetch'

const Trending = () => {

    const [timeWindow, setTimeWindow] = useState('day');

    const handleTabChange = (tab) => {
        setTimeWindow(tab.toLowerCase());
    }

    const { data, isLoading } = useFetch(`/trending/all/${timeWindow}?`);

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={handleTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} isLoading={isLoading} />
        </div>
    )
}

export default Trending
