import React from 'react';
import s from 'styled-components';

const MovieContainer = s.div`
  display: grid;
  grid-gap: 1.25rem;
  grid-template-columns: repeat( auto-fill, minmax(200px, 1fr));
  overflow: scroll;
  padding: 1rem;
  width: 100%;
  `;

const MovieCard = s.div`
  background-color: #505168;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: #fff;
  border-radius: 10px;
  position: relative;
  &:last-child {
    margin-bottom: 4rem;
  }
  `;

const MovieImg = s.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const Rating = s.div`
  font-family: 'Righteous', cursive;
  position: absolute;
  top: -0.75rem;
  right: -0.25rem;
  color: white;
  font-weight: bold;
`;

const Movies = ({ list = [] }) => {
  console.log('list', list);
  return (
    <>
      <MovieContainer>
        {list.map((el) => {
          const rating = el.vote_average * 10;
          if (el.poster_path) {
            return (
              <MovieCard key={el.id}>
                <MovieImg
                  src={`https://image.tmdb.org/t/p/w342${el.poster_path}`}
                />
                <Rating className={`c100 p${rating} small lightBlue`}>
                  <span>{`${rating}%`}</span>
                  <div className="slice">
                    <div className="bar" />
                    <div className="fill" />
                  </div>
                </Rating>

                {/* <Rating>{el.vote_average * 10}</Rating> */}
              </MovieCard>
            );
          }
        })}
      </MovieContainer>
    </>
  );
};

export default Movies;

// {
//   "popularity": 25.835,
//   "vote_count": 4905,
//   "video": false,
//   "poster_path": "/adHKzS0v29apMxJlKuvAf1ykNnS.jpg",
//   "id": 39514,
//   "adult": false,
//   "backdrop_path": "/omUvDkT8IYJPYuiENmFvNiGtIXE.jpg",
//   "original_language": "en",
//   "original_title": "RED",
//   "genre_ids": [
//     28,
//     12,
//     35,
//     80,
//     53
//   ],
//   "title": "RED",
//   "vote_average": 6.7,
//   "overview": "When his peaceful life is threatened by a high-tech assassin, former black-ops agent, Frank Moses reassembles his old team in a last ditch effort to survive and uncover his assailants.",
//   "release_date": "2010-10-13"
// }
