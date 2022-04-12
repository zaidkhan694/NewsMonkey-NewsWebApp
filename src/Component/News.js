import React from "react";
import Newsitem from "./Newsitem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
const News = (props) =>{
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
    
  const updateNews = async ()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fe185cd5e8b74da097c1fd47419f00ec&page=${page}&pagesize=${props.pageSize}`;
    setloading (true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading (false);
  }
  useEffect(() => {
    updateNews();
  }, [])
  
    

  // handlePrevClick = async () => {
  //   // console.log("previous");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fe185cd5e8b74da097c1fd47419f00ec&page=${page-1}&pagesize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // setState({
  //   // page:page-1,
  //   // articles:parsedData.articles,
  //   // loading:false,
  //   // })
  //   setState({ page: page - 1 });
  //   updateNews();
  // };
  // handleNextClick = async () => {
  //   //     if(!page+1 > Math.ceil(totalResults/props.pageSize))
  //   //     {

  //   //     }
  //   //     else
  //   //     {
  //   // console.log("next");
  //   //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fe185cd5e8b74da097c1fd47419f00ec&page=${page+1}&pagesize=${props.pageSize}`;
  //   //     let data = await fetch(url);
  //   //     let parsedData = await data.json();
  //   // setState({
  //   //   page:page+1,
  //   //   articles:parsedData.articles,
  //   //   loading:false,
  //   // })
  //   //   }
  //   setState({ page: page + 1 });
  //   updateNews();
  // };
  const fetchMoreData = async () => {
   
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fe185cd5e8b74da097c1fd47419f00ec&page=${page+1}&pagesize=${props.pageSize}`;
    setpage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();

    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults);
    // setloading (false);
    
  };
    return (
      <>
        <div className="container my-5">
          <h2 className="text-center" style={{marginTop:'80px'}} >NewsMonkey - Top Headlines</h2>
          {loading && <Spinner/>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container m-auto">
          <div className="row">
            {!loading &&
              articles.map((element) => {
                return (
                  
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title}
                      description={element.description}
                      imageUrl={
                        !element.urlToImage
                          ? "https://media.istockphoto.com/photos/words-news-picture-id959801552?s=2048x2048"
                          : element.urlToImage
                      }
                      newsUrl={element.url}
                      author={element.author}
                      time={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })} 
               </div>
          </div>
          </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={page <= 1}
            className="btn  btn-dark"
            onClick={handlePrevClick}
          >
            {" "}
            &laquo; Previous
          </button>
          <button
            type="button"
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            className="btn  btn-dark"
            onClick={handleNextClick}
          >
            Next &raquo;
          </button>
        </div> */}
        </div>
      </>
    );
  
}

export default News;
