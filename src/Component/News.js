import React, { Component } from "react";
import Newsitem from "./Newsitem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
export class News extends Component {
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe185cd5e8b74da097c1fd47419f00ec&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe185cd5e8b74da097c1fd47419f00ec&pagesize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState ({articles:parsedData.articles , totalResults:parsedData.totalResults});
    this.updateNews();
  }
  // handlePrevClick = async () => {
  //   // console.log("previous");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe185cd5e8b74da097c1fd47419f00ec&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   // page:this.state.page-1,
  //   // articles:parsedData.articles,
  //   // loading:false,
  //   // })
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };
  // handleNextClick = async () => {
  //   //     if(!this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))
  //   //     {

  //   //     }
  //   //     else
  //   //     {
  //   // console.log("next");
  //   //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe185cd5e8b74da097c1fd47419f00ec&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
  //   //     let data = await fetch(url);
  //   //     let parsedData = await data.json();
  //   // this.setState({
  //   //   page:this.state.page+1,
  //   //   articles:parsedData.articles,
  //   //   loading:false,
  //   // })
  //   //   }
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };
  fetchMoreData = async () => {
    this.setState({
      page:this.state.page+1,
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe185cd5e8b74da097c1fd47419f00ec&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <>
        <div className="container my-5">
          <h2>NewsMonkey - Top Headlines</h2>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container m-auto">
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
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
            disabled={this.state.page <= 1}
            className="btn  btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &laquo; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn  btn-dark"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div> */}
        </div>
      </>
    );
  }
}

export default News;
