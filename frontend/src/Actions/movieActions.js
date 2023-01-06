import axios from 'axios';
import {
    ADD_MOVIE_LOADING, ADD_MOVIE_SUCCESS, ADD_MOVIE_FAIL,
    GET_MOVIES_LOADING, GET_MOVIES_SUCCESS, GET_MOVIES_FAIL,
    EDIT_MOVIE_LOADING, EDIT_MOVIE_SUCCESS, EDIT_MOVIE_FAIL,
    GET_MOVIE_LOADING, GET_MOVIE_SUCCESS, GET_MOVIE_FAIL,
    DELETE_MOVIE_LOADING, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_FAIL
} from '../Constants/movieConstants';


// ACTION TO ADD MOVIE

export const addMovieAction = (movieData) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ADD_MOVIE_LOADING
        });


        const { userInfo: { token } } = getState().userLogin

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.post(`/api/movie/create`, movieData, config);

        dispatch({
            type: ADD_MOVIE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: ADD_MOVIE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}



// ACTION TO GET ALL MOVIES

export const getAllMoviesAction = (page, searchResult = '', cat = '') => async (dispatch) => {

    try {

        dispatch({
            type: GET_MOVIES_LOADING
        })



        const { data } = await axios.get(`/api/movie/getAll?q=${searchResult}&&page=${page}&&cat=${cat}`);

        dispatch({
            type: GET_MOVIES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_MOVIES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}




// ACTION TO EDIT MOVIE

export const editMovieAction = (movieData, movieId) => async (dispatch, getState) => {

    try {

        dispatch({
            type: EDIT_MOVIE_LOADING
        })

        const { userInfo: { token } } = getState().userLogin

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(`/api/movie/update/${movieId}`, movieData, config)

        dispatch({
            type: EDIT_MOVIE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: EDIT_MOVIE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}



// ACTION GET SINGLE MOVIE

export const getMovieAction = (id) => async (dispatch) => {

    try {

        dispatch({
            type: GET_MOVIE_LOADING
        })


        const { data } = await axios.get(`/api/movie/get/${id}`);

        dispatch({
            type: GET_MOVIE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_MOVIE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


// ACTION TO DELETE MOVIE

export const deleteMovieAction = (id) => async (dispatch, getState) => {

    try {

        dispatch({
            type: DELETE_MOVIE_LOADING
        })

        const { userInfo: { token } } = getState().userLogin

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.delete(`/api/movie/delete/${id}`, config);

        dispatch({
            type: DELETE_MOVIE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_MOVIE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}