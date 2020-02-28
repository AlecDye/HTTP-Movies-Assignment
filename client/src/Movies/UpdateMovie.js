import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateMovie = () => {
    const match = useRouteMatch();
    const history = useHistory();
    const [movie, setMovie] = useState(initialMovie);

    const handleChange = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    return (
        <div>
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="Director"
                    value={movie.director}
                />
                <input
                    type="text"
                    name="stars"
                    onChange={handleChange}
                    placeholder="Stars"
                    value={movie.stars}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;