import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    id: null,
    title: "",
    director: "",
    metascore: null,
    stars: ""
}

const MovieForm = () => {
    const [editMovie, setEditMovie] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
    }
    //todo: handleSubmit
    //todo: handleChanges
    //todo: axios put request


    return (
        <form onSubmit={handleSubmit}>
            <input />
            <button>Update</button>
        </form>
    )
}

export default MovieForm;