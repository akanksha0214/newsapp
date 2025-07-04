import React, {useEffect, useState, useCallback} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  const { category, apiKey, pageSize, setProgress } = props;
  const [articles, setarticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = useCallback(async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(Array.isArray(parsedData.articles) ? parsedData.articles : []);
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    setProgress(100);
  }, [category, apiKey, pageSize, page, setProgress]);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} -NewsAlert`;
    updateNews();
  }, [category, updateNews]);

  const fetchMoreData = async () => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  return (
    <>
      <h2 className="text-center" style={{ margin: '40px 0px' , marginTop:'90px'}}>NewsAlert - Top {capitalizeFirstLetter(category)} headlines</h2>
      {loading && <Spinner/>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={< Spinner />}
      >
        <div className="container">
          <div className="row" >
            {Array.isArray(articles) && articles.map((elements) => {
              return <div className="col-md-4" style={{ padding: '10px' }} key={elements.url}>
                <NewsItem title={elements.title ? elements.title.slice(0, 45) : ""} description={elements.description ? elements.description.slice(0, 80) : ""}
                  imageUrl={elements.urlToImage} newUrl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: '6',
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News;
