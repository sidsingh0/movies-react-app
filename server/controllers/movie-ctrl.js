const Movie = require('../models/movie-model');

const createMovie = async (req, res) => {
    try {
        const body = req.body;
        
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a movie',
            });
        }
        
        const movie = new Movie(body);
        
        await movie.save();

        return res.status(201).json({
            success: true,
            id: movie._id,
            message: 'Movie created!',
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: 'Movie not created!',
        });
    }
};

const updateMovie = async (req, res) => {
    try {
        const body = req.body;
        
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update!',
            });
        }

        const movie = await Movie.findOne({ _id: req.params.id });

        if (!movie) {
            return res.status(404).json({
                success: false,
                error: 'Movie not found!',
            });
        }

        movie.name = body.name;
        movie.time = body.time;
        movie.rating = body.rating;
        
        await movie.save();

        return res.status(200).json({
            success: true,
            id: movie._id,
            message: 'Movie was updated!',
        });
    } catch (error) {
        return res.status(404).json({
            error,
            message: 'Movie was not updated.',
        });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findOneAndDelete({ _id: req.params.id });

        if (!movie) {
            return res.status(404).json({
                success: false,
                error: 'Movie not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: movie,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id });

        if (!movie) {
            return res.status(404).json({
                success: false,
                error: 'No movies found',
            });
        }

        return res.status(200).json({
            success: true,
            data: movie,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});

        if (!movies.length) {
            return res.status(404).json({
                success: false,
                error: 'No movies found',
            });
        }

        return res.status(200).json({
            success: true,
            data: movies,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById,
};