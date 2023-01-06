import {
    ADD_MOVIE_LOADING, ADD_MOVIE_SUCCESS, ADD_MOVIE_FAIL, ADD_MOVIE_RESET,
    GET_MOVIES_LOADING, GET_MOVIES_SUCCESS, GET_MOVIES_FAIL, GET_MOVIES_RESET,
    EDIT_MOVIE_LOADING, EDIT_MOVIE_SUCCESS, EDIT_MOVIE_FAIL, EDIT_MOVIE_RESET,
    GET_MOVIE_LOADING, GET_MOVIE_SUCCESS, GET_MOVIE_FAIL, GET_MOVIE_RESET,
    DELETE_MOVIE_LOADING, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_FAIL, DELETE_MOVIE_RESET
} from '../Constants/movieConstants';



// REDUCER TO ADD MOVIE

export const addMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_MOVIE_LOADING:
            return { loading: true }

        case ADD_MOVIE_SUCCESS:
            return { loading: false, movieAdded: action.payload, success: true }

        case ADD_MOVIE_FAIL:
            return { loading: false, error: action.payload }


        case ADD_MOVIE_RESET:
            return {}

        default:
            return state
    }
}





// REDUCER FOR GET ALL MOVIES

export const getAllMoviesReducer = (state = { movies: [] }, action) => {
    switch (action.type) {

        case GET_MOVIES_LOADING:
            return { loading: true, }

        case GET_MOVIES_SUCCESS:
            return { loading: false, movies: action.payload }

        case GET_MOVIES_FAIL:
            return { loading: false, error: action.payload }

        case GET_MOVIES_RESET:
            return { movies: [] }

        default:
            return state;
    }
}




// REDUCER TO EDIT MOVIE

export const editMovieReducer = (state = {}, action) => {

    switch (action.type) {
        case EDIT_MOVIE_LOADING:
            return { loading: true }

        case EDIT_MOVIE_SUCCESS:
            return { loading: false, movieEdited: action.payload, success: true }

        case EDIT_MOVIE_FAIL:
            return { loading: false, error: action.payload }


        case EDIT_MOVIE_RESET:
            return {}

        default:
            return state;
    }
}





// REDUCER TO GET SINGLE MOVIE

export const getMovieReducer = (state = {}, action) => {
    switch (action.type) {

        case GET_MOVIE_LOADING:
            return { loading: true }

        case GET_MOVIE_SUCCESS:

            return { loading: false, movie: action.payload }

        case GET_MOVIE_FAIL:
            return { loading: false, error: action.payload }

        case GET_MOVIE_RESET:
            return {}

        default:
            return state;
    }
}






// REDUCER TO DELETE MOVIE

export const deleteMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_MOVIE_LOADING:
            return { loading: true }

        case DELETE_MOVIE_SUCCESS:
            return { loading: false, success: true }

        case DELETE_MOVIE_FAIL:
            return { loading: false, error: action.payload }

        case DELETE_MOVIE_RESET:
            return {}

        default:
            return state;
    }
}