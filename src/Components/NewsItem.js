import React from 'react';
import './NewsItem.css';

const NewsItem =(props)=>{
    let {title,description,imageUrl,newUrl,author,date,source}=props;
    return (
      <div className='my-3'> 
        <div className="card news-card">
        <div style={{
          display:"flex",
          justifyContent:"flex-end",
          position:"absolute",
          right:"0"
        }}>
        <span className="badge rounded-pill bg-danger source-badge">{source}</span>
        </div>
          <img src={imageUrl} className="card-img-top news-image" alt="..."/>
            <div className="card-body">
            <h5 className="card-title news-title"> {title}...</h5>
              <p className="card-text news-description">{description}...</p>
              <p className='card-text'><small className='text-muted'> By {!author ? "unknown" :author} on {new Date(date).toGMTString()} </small></p>
              <a href={newUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark news-btn">Read More</a>
          </div>
        </div>
      </div>
    )
  }

export default NewsItem