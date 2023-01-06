import {
    CREATE_REVIEW_LOADING, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL, CREATE_REVIEW_RESET,
    GET_REVIEWS_MOVIE_LOADING, GET_REVIEWS_MOVIE_SUCCESS, GET_REVIEWS_MOVIE_FAIL, GET_REVIEWS_MOVIE_RESET,
    DELETE_REVIEW_LOADING, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET,
    UPDATE_REVIEW_LOADING, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAIL, UPDATE_REVIEW_RESET,
    GET_REVIEW_LOADING, GET_REVIEW_SUCCESS, GET_REVIEW_FAIL, GET_REVIEW_RESET,
    GET_REVIEWS_USER_LOADING, GET_REVIEWS_USER_SUCCESS, GET_REVIEWS_USER_FAIL, GET_REVIEWS_USER_RESET
} from '../Constants/reviewConstants';



// REDUCER TO CREATE REVIEW

export const createReviewReducer = (state = {}, action) => {

    switch (action.type) {
        case CREATE_REVIEW_LOADING:
            return { loading: true }

        case CREATE_REVIEW_SUCCESS:
            return { loading: false, reviewCreated: action.payload, success: true }

        case CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }


        case CREATE_REVIEW_RESET:
            return {}

        default:
            return state;
    }

}




// REDUCER TO GET REVIEWS BY MOVIE

export const getReviewsByMovieReducer = (state = {}, action) => {

    switch (action.type) {
        case GET_REVIEWS_MOVIE_LOADING:
            return { loading: true }

        case GET_REVIEWS_MOVIE_SUCCESS:
            return { loading: false, reviewsForMovie: action.payload, success: true }

        case GET_REVIEWS_MOVIE_FAIL:
            return { loading: false, error: action.payload }

        case GET_REVIEWS_MOVIE_RESET:
            return {}

        default:
            return state;
    }
}




// REDUCER TO DELETE REVIEW

export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_LOADING:
            return { loading: true }

        case DELETE_REVIEW_SUCCESS:
            return { loading: true, reviewDeleted: action.payload, success: true }

        case DELETE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case DELETE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}




// REDUCER TO UPDATE REVIEW

export const updateReviewReducer = (state = {}, action) => {

    switch (action.type) {
        case UPDATE_REVIEW_LOADING:
            return { loading: true }

        case UPDATE_REVIEW_SUCCESS:
            return { loading: false, reviewUpdated: action.payload, success: true }

        case UPDATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case UPDATE_REVIEW_RESET:
            return {}

        default:
            return state
    }

}




// REDUCER TO GET SINGLE REVIEW

export const getReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEW_LOADING:
            return { loading: true }

        case GET_REVIEW_SUCCESS:
            return { loading: false, singleReview: action.payload }

        case GET_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case GET_REVIEW_RESET:
            return {}

        default:
            return state
    }
}





// REDUCER TO GET REVIEWS BY USER

export const getReviewsByUserReducer = (state = {}, action) => {

    switch (action.type) {
        case GET_REVIEWS_USER_LOADING:
            return { loading: true }

        case GET_REVIEWS_USER_SUCCESS:
            return { loading: false, reviewsForUser: action.payload, success: true }

        case GET_REVIEWS_USER_FAIL:
            return { loading: false, error: action.payload }

        case GET_REVIEWS_USER_RESET:
            return {}

        default:
            return state;
    }
}
