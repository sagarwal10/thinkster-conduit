import React from 'react';
import { Link } from 'react-router'; 

const ArticlePreview = props => {
  const article = props.article;

  return (
    <div className="article-preview">
      <div className="article-meta">
	<Link to={`@${article.author.username}`} className="author">
	    <img src={article.author.image} alt="" />
        </Link>
	
	<div className="info">
	  <Link to={`@${article.author.username}`} className="author">
	    {article.author.username}
       i  </Link>
	  <span className="date">
	    {new Date(article.createdAt).toDateString()}
	  </span>
	</div>

	<div className="pull-xs-right">
	  <button
	    className="btn btn-sm btn-outline-primary">
	    <i className="ion-heaet"></i> {article.favoriteCount}
	  </button>
	</div>
      </div>

      <Link to={`article/${article.slug}`} className="preview-link">
	<h1>{article.title}</h1>
	<p>{article.description}</p>
	<span>Read more...</span>
	<ul className="tag-list">
	  {
	    article.tagList.map(tag => {
	      return(
	        <li className="tag-default tag-pill tag-outline" 
		    key={tag}>
		  {tag}
	        </li>);
	    })
	  }
	</ul>
      </Link>
    </div>
  );
}

export default ArticlePreview; 


 




