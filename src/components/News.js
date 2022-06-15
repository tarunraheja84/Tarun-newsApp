import React , {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News= (props) =>{
    const [articles,setArticles]=useState([]);
    const [loading ,setLoading]=useState(true);
    const [page,setPage]=useState(1);
    const [totalResults,setTotalResults]=useState(0);
       


   const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }; 
  
  const updateNews= async ()=>{ 
    let url=(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`)
      props.setProgress(10);
      setLoading(true);
      let data= await fetch(url);
      props.setProgress(30);
      let parsedData= await data.json();
      props.setProgress(70);
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
      setPage(page+1);
  }

  useEffect(()=>{
    document.title=`${capitalizeFirstLetter(props.category)}- Taruns's NewsApp`;   
    updateNews();
     /* eslint-disable */ 
  },[])

    return (
      <>
          <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>Tarun's NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <center><strong> News API is paid if hosted</strong></center>
          <InfiniteScroll
          dataLength={articles.length}
          next={updateNews}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >   
          <div className="container my-3">
          <div className="row">
            {articles.map((element)=>{
            return <div className="col-md-4"  key={element.url}> 
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} source={element.source.name}/>
            </div>
            })}

          </div>
          </div>
          </InfiniteScroll>  
      </>
    )
}

export default News

News.defaultProps = {
  country: 'in',
  pageSize:9,
  page:1,
  category:"general",
  totalResults:0
}
News.propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}
