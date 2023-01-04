'use strict';

export default (state = {}, action) => {
  switch (action.type) {
  case 'HOME_PAGE_LOADED':
    return {
      ...state,
      articles: action.payload.articles,
      articlesCount: action.payload.articlesCount
    };
  case 'HOME_PAGE_UNLOADED':
    return {};
  case 'PROFILE_PAGE_LOADED':
  case 'PROFILE_FAVORITES_PAGE_LOADED':
    return {
      ...state,
      articles: action.payload[1].articles,
      articlesCount: action.payload[1].articlesCount
    };
   case 'CHANGE_TAB':
    return {
      ...state,
      articles: action.payload.articles,
      articlesCount: action.payload.articlesCount,
      tab: action.tab
    };
   case 'APPLY_TAG_FILTER':
     return {
      ...state,
      articles: action.payload.articles,
      articlesCount: action.payload.articlesCount,
      tab: null,
      tag: action.tag
    };
  case 'PROFILE_PAGE_UNLOADED':
  case 'PROFILE_FAVORITES_PAGE_UNLOADED':
    return {};
  }

  return state;
}
