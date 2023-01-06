import {
    CREATE_REVIEW_LOADING, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL,
    GET_REVIEWS_MOVIE_LOADING, GET_REVIEWS_MOVIE_SUCCESS, GET_REVIEWS_MOVIE_FAIL,
    DELETE_REVIEW_LOADING, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL,
    UPDATE_REVIEW_LOADING, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAIL,
    GET_REVIEW_LOADING, GET_REVIEW_SUCCESS, GET_REVIEW_FAIL,
    GET_REVIEWS_USER_LOADING, GET_REVIEWS_USER_SUCCESS, GET_REVIEWS_USER_FAIL
} from '../Constants/reviewConstants';
import axios from 'axios';



// ACTION FOR CREATING REVIEW

export const createReviewAction = (reviewData, movieId) => async (dispatch, getState) => {

    try {

        dispatch({
            type: CREATE_REVIEW_LOADING
        })


        const { userInfo: { token } } = getState().userLogin

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.post(`/api/review/create/${movieId}`, reviewData, config)

        dispatch({
            type: CREATE_REVIEW_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}





// ACTION FOR GETTING REVIEWS BY MOVIE


export const getReviewsByMovieAction = (page, movieId, category) => async (dispatch) => {

    try {

        dispatch({
            type: GET_REVIEWS_MOVIE_LOADING
        })

        const { data } = await axios.get(`/api/review/getByMovie/${movieId}/get?page=${page}&&cat=${category}`)

        dispatch({
            type: GET_REVIEWS_MOVIE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: GET_REVIEWS_MOVIE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}



// ACTION FOR DELETING REVIEW 

export const deleteReviewAction = (reviewId) => async (dispatch, getState) => {

    try {

        dispatch({
            type: DELETE_REVIEW_LOADING
        })


        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`/api/review/delete/${reviewId}`, config)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}





// ACTION FOR UPDATE REVIEW 


export const updateReviewAction = (reviewData, reviewId) => async (dispatch, getState) => {

    try {

        dispatch({
            type: UPDATE_REVIEW_LOADING
        })


        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(`/api/review/update/${reviewId}`, reviewData, config)

        dispatch({
            type: UPDATE_REVIEW_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: UPDATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}



// ACTION FOR GETTING REVIEW 

export const getReviewAction = (reviewId) => async (dispatch, getState) => {

    try {

        dispatch({
            type: GET_REVIEW_LOADING
        });

        const { userInfo: { token } } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.get(`/api/review/get/${reviewId}`, config);

        dispatch({
            type: GET_REVIEW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}



// ACTION FOR GETTING REVIEWS BY USER

export const getReviewsByUserAction = (page, searchResult = "") => async (dispatch, getState) => {

    try {
        dispatch({
            type: GET_REVIEWS_USER_LOADING
        })

        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.get(`/api/review/getByUser?searchResult=${searchResult}&&page=${page}`, config);


        dispatch({
            type: GET_REVIEWS_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_REVIEWS_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}