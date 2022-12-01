export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME_PAGE_UNLOADED':
      return {};
    default:
      break;
  }
   
  return state;
};

