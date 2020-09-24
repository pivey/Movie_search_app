import React, { useReducer } from 'react';
import axios from 'axios';
import s, { css } from 'styled-components';
import BarLoader from 'react-spinners/BarLoader';
import { search } from './utils/makeRequestCreator';
import Movies from './components/Movies';

const spinnerCSS = css`
  margin-top: 5rem;
`;

const MainContainer = s.div`
  max-width: 1100px;
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchInput = s.input.attrs(() => ({
  placeholder: 'Type something to search',
}))`
  width: 50vw;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
  font-family: roboto;
  border: none;
  color: black:
  &:focus {}
  background-color: mistyrose;
`;

const initialState = {
  movies: [],
  loading: false,
  value: '',
};

// action types
const setMoveData = 'SET_MOVIES';
const setLoading = 'SET_LOADING';
const setValue = 'SET_VALUE';

function setMovieAction(payload) {
  return {
    type: setMoveData,
    payload,
  };
}

function setLoadingAction(payload) {
  return {
    type: setLoading,
    payload,
  };
}

function setValueAction(payload) {
  return {
    type: setValue,
    payload,
  };
}

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_VALUE':
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
}

function App() {
  const [appState, setDispatchAction] = React.useReducer(
    movieReducer,
    initialState
  );

  const config = async () =>
    axios(
      `https://api.themoviedb.org/3/configuration?api_key=f11b5053bc5fb7fa9f5aadb798a4e21f`
    );

  (async () => {
    const configRes = await config();
    console.log('here is your config', configRes.data.images);
  })();

  const searchMovies = async (val) => {
    setDispatchAction(setLoadingAction(true));
    const res = await search(
      `https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );

    const movies = await res;

    setTimeout(() => {
      setDispatchAction(setMovieAction(movies));
      setDispatchAction(setLoadingAction(false));
    }, 1000);
  };

  const changeHandler = async (e) => {
    searchMovies(e.target.value);
    setDispatchAction(setValueAction(e.target.value));
  };

  return (
    <MainContainer>
      <div>
        <SearchInput
          onChange={(e) => changeHandler(e)}
          value={appState.value}
        />
      </div>
      {appState.movies && <Movies list={appState.movies} />}
      <BarLoader
        css={spinnerCSS}
        size={150}
        color="#9013FE"
        loading={appState.loading}
      />
    </MainContainer>
  );
}

export default App;
