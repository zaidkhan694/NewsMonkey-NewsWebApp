import React from "react";

const  Newsitem = (props) =>{
    let { title, description, imageUrl, newsUrl, author, time, source } =
      props;
    return (
      <div>
        <div className="card my-3">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By <b>{!author ? "Unknown" : author}</b> on{" "}
                <b>{new Date(time).toGMTString()}</b>
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read More
            </a>
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'88%' , zIndex:'1'}}>
              {source}
            </span>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
