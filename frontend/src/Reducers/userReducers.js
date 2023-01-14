import {
    USER_REGISTER_LOADING, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_RESET,
    USER_LOGIN_LOADING, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_RESET,
    USER_WATCHLIST_LOADING, USER_WATCHLIST_SUCCESS, USER_WATCHLIST_FAIL, USER_WATCHLIST_RESET,
    USER_DELETE_LOADING, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_RESET,
    USER_GET_WATCHLIST_LOADING, USER_GET_WATCHLIST_SUCCESS, USER_GET_WATCHLIST_FAIL, USER_GET_WATCHLIST_RESET,
    USERS_LIST_LOADING, USERS_LIST_SUCCESS, USERS_LIST_FAIL, USERS_LIST_RESET,
    USER_UPDATE_LOADING, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET,
    SET_ADMIN_LOADING, SET_ADMIN_SUCCESS, SET_ADMIN_FAIL, SET_ADMIN_RESET
} from '../Constants/userContstants';





// REDUCER TO REGISTER USER

export const userRegisterReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_REGISTER_LOADING:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }


        case USER_REGISTER_RESET:
            return {}

        default:
            return state;
    }
}

// REDUCER TO LOGIN USER

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_LOADING:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGIN_RESET:
            return {}

        default:
            return state
    }
}




// REDUCER TO SET WATCHED LIST OF USER

export const userWatchlistReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_WATCHLIST_LOADING:
            return { loading: true }

        case USER_WATCHLIST_SUCCESS:
            return { loading: false, success: true }

        case USER_WATCHLIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_WATCHLIST_RESET:
            return {}

        default:
            return state;
    }
}






// REDUCER TO DELETE USER

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_LOADING:
            return { loading: true }

        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        case USER_DELETE_RESET:
            return {}

        default:
            return state;
    }
}






// REDUCER TO GET WATCHED LIST OF USER

export const getWatchedListReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GET_WATCHLIST_LOADING:
            return { loading: true }

        case USER_GET_WATCHLIST_SUCCESS:
            return { loading: false, myWatchedList: action.payload }

        case USER_GET_WATCHLIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_GET_WATCHLIST_RESET:
            return {}

        default:
            return state;
    }
}



// REDUCER TO GET ALL USERS FOR ADMIN

export const listUsersReducer = (state = {}, action) => {

    switch (action.type) {

        case USERS_LIST_LOADING:
            return { loading: true }

        case USERS_LIST_SUCCESS:
            return { loading: false, users: action.payload, success: true }

        case USERS_LIST_FAIL:
            return { loading: false, error: action.payload }

        case USERS_LIST_RESET:
            return {}

        default:
            return state;
    }

}




// REDUCER TO UPDATE USER PROFILE

export const updateUserReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_UPDATE_LOADING:
            return { loading: true }

        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_RESET:
            return {}

        default:
            return state;
    }

}


//SET ADMIN REDUCER

export const setAdminReducer = (state = {}, action) => {

    switch (action.type) {
        case SET_ADMIN_LOADING:
            return { loading: true }

        case SET_ADMIN_SUCCESS:
            return { loading: false, success: true }

        case SET_ADMIN_FAIL:
            return { loading: false, error: action.payload }

        case SET_ADMIN_RESET:
            return {}
        default:
            return state
    }

}