import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const MovieForm = props => {
    const [movieList, setMovieList] = useState(initialMovie);
    const { id } = useParams();
    // const id = 1;

    useEffect(() => {
        const movieToUpdate = props.movies.find(movie => `${movie.id}` === id);

        if (movieToUpdate) {
            setMovieList(movieToUpdate);
        }
    }, [props.movies, id])

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieList)
            .then(res => {
                console.log("put", res);
                setMovieList(res.data);
                props.history.push(`/`)
            })
            .catch(err => console.log(err))
    }

    const handleChange = e => {
        // e.preventDefault();
        e.persist();
        setMovieList({
            ...movieList,
            [e.target.name]: e.target.value
        })
    }


    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <h2>Edit Movie</h2>
            {/* <label htmlFor="id">ID:</label>
            <input
                id="id"
                className="id-input"
                type="number"
                name="id"
                value={movieList.id}
                onChange={handleChange} /> */}
            <label htmlFor="title">Title:</label>
            <input
                id="title"
                className="title-input"
                type="text"
                name="title"
                value={movieList.title}
                onChange={handleChange} />

            <label htmlFor="director">Director:</label>
            <input
                id="director"
                className="director-input"
                type="text"
                name="director"
                value={movieList.director}
                onChange={handleChange} />
            <label htmlFor="stars">Actors / Actresses:</label>
            <input
                className="stars-input"
                type="text"
                name="stars"
                value={movieList.stars}
                onChange={handleChange} />
            <button>Update</button>
        </form>
    )
}

export default MovieForm;