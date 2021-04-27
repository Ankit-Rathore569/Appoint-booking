import axios from "axios";
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    ALL_USER_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
} from "../Constants/userConstants";

export const register = (userData) => async (dispatch) => {
    console.log("userData", userData);

    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const { data } = await axios.post("/api/register", userData);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data.result,
        });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/login",
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load user
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({
            type: LOAD_USER_REQUEST,
        });

        const { data } = await axios.get("/api/me");

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get all users
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USER_REQUEST })

        const { data } = await axios.get('/api/admin/users')

        dispatch({
            type: ALL_USER_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
// Logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get("/api/logout");

        dispatch({
            type: LOGOUT_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
