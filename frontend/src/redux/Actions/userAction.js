import axios from "axios";
import {
    CLEAR_ERRORS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from "../Constants/userConstants";

export const register = (userData) => async (dispatch) => {

    console.log("userData", userData)

    try {

        dispatch({ type: USER_REGISTER_REQUEST });

        const { data } = await axios.post('/api/register', userData);


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
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
