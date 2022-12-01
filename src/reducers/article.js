'use strict';

export default (state = {}, action) => {
  switch (action.type) {
  case 'ARTICLE_PAGE_LOADED':
    return {
      ...state,
      articles: action.payload[0].articles,
      comments: action.payload[1].comments
    };
    break;
  case 'ARTICLE_PAGE_UNLOADED':
    return {};
    break;
  case 'ADD_COMMENT':
    return {
      ...state,
      commentErrors: action.error ? action.payload.errors : null,
      comments: action.error ? null : 
			       (state.comments || []).concat([action.payload.comment])
    };
    break;
  case 'DELETE_COMMENT':
    const commentId=action.commentId;
    return {
      ...state,
      comments: state.comments.filter(comment => comment.id !== commentId)
    }
    break;
  default:
    break;
  }

  return state;
} 
