import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data, isLoading }) => {

    const navigate = useNavigate();
    const carouselContainer = useRef();
    const { url } = useSelector(state => state.home);

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }

    const skItem = () => (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    );

    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill className="arrow carouselLeftNav" onClick={() => navigation("left")} />
                <BsFillArrowRightCircleFill className="arrow carouselRighttNav" onClick={() => navigation("right")} />
                {
                    !isLoading ? (
                        <div className="carouselItems" ref={carouselContainer}>
                            {
                                data?.map((item) => {
                                    const posterUrl = item.poster_path ? `${url.poster}${item.poster_path}` : PosterFallback;
                                    return (
                                        <div key={item.id} className="carouselItem" onClick={() => navigate(`${url}/${item.id}`)}>
                                            <div className="posterBlock">
                                                <Img src={posterUrl} alt={item.title} />
                                                <CircleRating rating={item.vote_average.toFixed(1)} />
                                                <Genres data={item.genre_ids.slice(0, 2)} />
                                            </div>
                                            <div className="textBlock">
                                                <span className="title">
                                                    {item.title || item.name}
                                                </span>
                                                <div className="date">
                                                    {dayjs(item.release_date || item.first_air_date).format("MMM DD, YYYY")}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    )
}

export default Carousel
