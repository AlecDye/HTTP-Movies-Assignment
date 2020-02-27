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
        <form onSubmit={handleSubmit}>
            <input
                className="title-input"
                type="text"
                name="title"
                value={editMovie.title}
                onChange={handleChange} />
            <input
                className="director-input"
                type="text"
                name="title"
                value={editMovie.director}
                onChange={handleChange} />
            <input
                className="stars-input"
                type="text"
                name="title"
                value={editMovie.stars}
                onChange={handleChange} />
            <button>Update</button>
        </form>
    )
}

export default MovieForm;