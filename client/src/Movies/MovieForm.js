import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

const initialMovie = {
    id: null,
    title: "",
    director: "",
    metascore: null,
    stars: ""
}

const MovieForm = () => {
    const [editMovie, setEditMovie] = useState(initialMovie);
    const { id } = useParams();

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http:localhost:5000/api/movies/${id}`, editMovie)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const handleChange = e => {
        // e.preventDefault();
        e.persist();
        setEditMovie({
            ...editMovie,
            [e.target.name]: e.target.value
        })
    }


    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                id="title"
                className="title-input"
                type="text"
                name="title"
                value={editMovie.title}
                onChange={handleChange} />

            <label htmlFor="director">Director:</label>
            <input
                id="director"
                className="director-input"
                type="text"
                name="director"
                value={editMovie.director}
                onChange={handleChange} />
            <label htmlFor="stars">Actors / Actresses:</label>
            <input
                className="stars-input"
                type="text"
                name="stars"
                value={editMovie.stars}
                onChange={handleChange} />
            <button>Update</button>
        </form>
    )
}

export default MovieForm;