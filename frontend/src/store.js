import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userRegisterReducer, userLoginReducer, userWatchlistReducer, userDeleteReducer, getWatchedListReducer, listUsersReducer, updateUserReducer } from './Reducers/userReducers';
import { addMovieReducer, getAllMoviesReducer, editMovieReducer, getMovieReducer, deleteMovieReducer } from './Reducers/movieReducers';
import { createReviewReducer, getReviewsByMovieReducer, deleteReviewReducer, updateReviewReducer, getReviewReducer, getReviewsByUserReducer } from './Reducers/reviewReducers';



// REDUCERS

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    addMovie: addMovieReducer,
    getAllMovies: getAllMoviesReducer,
    editMovie: editMovieReducer,
    getMovie: getMovieReducer,
    deleteMovie: deleteMovieReducer,
    createReview: createReviewReducer,
    getReviewsByMovie: getReviewsByMovieReducer,
    deleteReview: deleteReviewReducer,
    updateReview: updateReviewReducer,
    getReview: getReviewReducer,
    userWatchlist: userWatchlistReducer,
    userDelete: userDeleteReducer,
    getReviewsByUser: getReviewsByUserReducer,
    getWatchedList: getWatchedListReducer,
    listUsers: listUsersReducer,
    updateUser: updateUserReducer
})





// INITIALIZING VALUES FROM LOCAL STORAGE ON MOUNTING APP
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;


// INITIAL STATE
const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}


// MIDDLEWARE FOR REDUX
const middleware = [thunk]




// REDUX STORE

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;