import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import './style.scss'

const HeroBanner = () => {

    const [background, setbackground] = useState("")
    const [query, setquery] = useState("")
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home)

    const { data, loading } = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        setbackground(bg)
    }, [data])
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
            <div className='heroBanner'>
                {!loading && <div className="backdropImg">
                    <Img src={background} />
                </div>}
                <div className="opacityLayer"></div>
                <ContentWrapper>
                    <div className="heroBannerContent">
                        <span className="title">Welcome</span>
                        <span className="subTitle">Millions of movies , TV shows and people to discover Explore now.</span>
                        <div className="searchInput">
                            <input type="text" placeholder='Search for movie or TV show...' onChange={(e) => setquery(e.target.value)}
                                onKeyUp={searchQueryHandler} />
                            <button>Search</button>
                        </div>
                    </div>
                </ContentWrapper>
                
            </div>

    )
}

export default HeroBanner