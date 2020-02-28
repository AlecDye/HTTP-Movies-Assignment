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

const UpdateMovie = props => {
    const match = useRouteMatch();
    const history = useHistory();
    const [movie, setMovie] = useState(initialMovie);

    const handleChange = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const movie = props.movies.find(v => `${v.id}` === match.params.id);
        console.log("useEffect", movie)
        if (movie) {
            setMovie(movie);
        }
    }, [props.movie, match])

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/movies/${movie.id}`, movie)
            .then(res => {
                console.log("PUT request", res);
                const updatedMovies = props.movies.map(entry => {
                    if (entry.id === res.data.id) {
                        return res.data;
                    } else {
                        return entry;
                    }
                });
                props.setMovie(updatedMovies);
                history.push('/');
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