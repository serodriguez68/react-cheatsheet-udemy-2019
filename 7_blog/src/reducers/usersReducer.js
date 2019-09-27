export default (prevUsers=[], action) => {
  switch (action.type) {
      case 'FETCH_USER':
          return [...prevUsers, action.payload];
       default:
           return prevUsers;
  }
};