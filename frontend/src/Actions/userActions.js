import axios from 'axios';
import {
    USER_REGISTER_LOADING, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,

    USER_LOGIN_LOADING, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_RESET,
    USER_WATCHLIST_LOADING, USER_WATCHLIST_SUCCESS, USER_WATCHLIST_FAIL,
    USER_DELETE_LOADING, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
    USER_GET_WATCHLIST_LOADING, USER_GET_WATCHLIST_SUCCESS, USER_GET_WATCHLIST_FAIL,
    USERS_LIST_LOADING, USERS_LIST_SUCCESS, USERS_LIST_FAIL,
    USER_UPDATE_LOADING, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from '../Constants/userContstants';
import { CREATE_REVIEW_RESET } from '../Constants/reviewConstants';


//ACTION TO REGISTER USER

export const userRegisterAction = (userData) => async (dispatch) => {

    try {

        dispatch({
            type: USER_REGISTER_LOADING
        })


        const config = {
            header: {
                "Content-Type": "application/json",
            }
        }


        const { data } = await axios.post(`/api/user/register`, userData, config)


        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}





// ACTION TO LOGIN USER

export const userLoginAction = (userData) => async (dispatch) => {

    try {

        dispatch({
            type: USER_LOGIN_LOADING
        })

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(`/api/user/login`, userData, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}




// ACTION TO LOGOUT USER

export const logoutAction = () => (dispatch) => {
    try {

        dispatch({
            type: USER_LOGIN_RESET
        })

        dispatch({
            type: CREATE_REVIEW_RESET
        })

        localStorage.removeItem('userInfo')

    } catch (error) {
        console.log('Error in user logout')
    }
}



// ACTION TO SET WATCHED LIST OF USER

export const userWatchlistAction = (movieId, status) => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_WATCHLIST_LOADING
        });


        const { userInfo: { token } } = getState().userLogin

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        console.log("staus", status)
        const { data } = await axios.get(`/api/user/watchlist/${movieId}/set?q=${status}`, config)

        dispatch({
            type: USER_WATCHLIST_SUCCESS,
            payload: data
        })


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_WATCHLIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}



// ACTION TO DELETE USER

export const userDeleteAction = (userId) => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_DELETE_LOADING
        })

        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.delete(`/api/user/delete/${userId}`, config)


        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}



// ACTION TO GET WATCHED LIST OF USER

export const getWatchlistAction = (page, searchResult = "") => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_GET_WATCHLIST_LOADING
        });

        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.get(`/api/user/getWatchedList?page=${page}&&searchResult=${searchResult}`, config)

        dispatch({
            type: USER_GET_WATCHLIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_GET_WATCHLIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


// ACTION TO GET ALL USERS FOR ADMIN

export const listUsersAction = (page, searchResult = "") => async (dispatch, getState) => {


    try {

        dispatch({
            type: USERS_LIST_LOADING
        })


        const { userInfo: { token } } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.get(`/api/user/getUsers?page=${page}&&searchResult=${searchResult}`, config)

        dispatch({
            type: USERS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USERS_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}



// ACTION TO UPDATE USER PROFILE

export const userUpdateAction = (userData) => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_UPDATE_LOADING
        })



        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.put(`/api/user/update`, userData, config)


        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message

        })
    }

}
