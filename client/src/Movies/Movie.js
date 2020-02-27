import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { useParams, useHistory } from "react-router-dom";
import MovieCard from './MovieCard';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = e => {
    e.preventDefault();
    history.push(`/update-movie/${movie.id}`)
  }

  //todo: handleDelete
  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        setMovie(res.data);
        history.push('/movies')
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <div className='edit-button' onClick={editMovie}>
        Edit
      </div>
      <div className='edit-button' onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
