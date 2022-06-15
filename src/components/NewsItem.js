import React from "react";

const NewsItem =(props)=> {

      let {title,description,imageUrl,newsUrl,author,source}=props;
    return (
      <div className="my-3" width="88px" height="88px">
        <div className="card container">
          <div style={{display:"flex",
                        justifyContent:"flex-end",
                        position:"absolute",
                        right:"0"}}>
        <span  className="position-absolute  badge rounded-pill bg-danger"style={{zIndex:"1"}}>
          {source}
          </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
         
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}....
            </p>
            
            <p className="card-text"><small className="text-muted">By {!author?"unknown":author}</small></p>
            <a href={newsUrl} target="_blank"  rel="noreferrer" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
