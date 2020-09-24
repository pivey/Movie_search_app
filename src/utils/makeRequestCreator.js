import axios from 'axios';

const makeRequestCreator = () => {
  let cancelToken;

  return async (query) => {
    // Check if we made a request
    if (cancelToken) {
      // Cancel the previous request before making a new request
      cancelToken.cancel();
    }
    // Create a new CancelToken
    cancelToken = axios.CancelToken.source();
    try {
      const res = await axios(query, { cancelToken: cancelToken.token });
      const result = res.data.results;
      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log('Request canceled', error.message);
      } else {
        // Handle usual errors
        console.log('Something went wrong: ', error.message);
      }
    }
  };
};

export const search = makeRequestCreator();
